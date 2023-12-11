//  ========================= SIDEABR DATA =======================

// questions page
export const sideBarDataQuestions = [
  { name: "Questions", selected: true },
  { name: "Tags", selected: false },
];

// tags page
export const sideBarDataTags = [
  { name: "Questions", selected: false },
  { name: "Tags", selected: true },
];

// for rest pages
export const sideBarDataForRest = [
  { name: "Questions", selected: false },
  { name: "Tags", selected: false },
];

// ========================== DATE TIME FORMATING ==========================

export function DateTimeFormatting(time) {
  const timeDifference = new Date() - new Date(time);

  // formatting to hours minues and seconds

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));

  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  const { month, day, year, times } = {
    month: new Date(time).toLocaleString(undefined, { month: "short" }),

    day: new Date(time).toLocaleString(undefined, { day: "numeric" }),

    year: new Date(time).toLocaleString(undefined, { year: "numeric" }),

    times: new Date(time).toLocaleString(undefined, {
      hour: "numeric",

      minute: "numeric",
    }),
  };

  let newTime = times.split(" ");

  let finalTime;

  if (newTime[0].split(":")[0].length === 1 && newTime[1] === "PM") {
    const newHour = parseInt(newTime[0].split(":")[0]) + 12;

    finalTime = newHour + ":" + newTime[0].split(":")[1];
  } else if (newTime[0].split(":")[0].length === 1) {
    finalTime = "0" + newTime[0].split(":")[0] + ":" + newTime[0].split(":")[1];
  } else {
    finalTime = newTime[0];
  }

  const newDay = day.length === 1 ? "0" : "";

  // final time data return values

  if (hours > 24) return `${month} ${newDay}${day}, ${year} at ${finalTime}`;

  if (hours > 0 && minutes === 0) return `${hours} hours ago`;

  if (hours > 0) return `${hours} hours ${minutes} minutes ago`;

  if (minutes > 0) return `${minutes} minutes ago`;

  return `${seconds} seconds ago`;
}

// ============================ SEARCH LOGIC  ============================

export function SearchTextFunc(inputText, questions, tags) {
  // search value
  const searchValue = inputText.toLowerCase().trim();

  if (searchValue.length === 0) return questions;

  // block value & non block value
  let blockValue = searchValue.match(/\[(.*?)\]/g);
  // eslint-disable-next-line
  blockValue = blockValue?.map((str) => str.replace(/[\[\]]/g, "")) || [];
  let nonBlockValue = searchValue.split(/\[.*?\]/);
  nonBlockValue = nonBlockValue.join(" ").trim();

  // *** filter logic
  const filteredQueList = questions.filter(({ title, text, tagIds }) => {
    const itemTitle = title.toLowerCase();
    const itemText = text.toLowerCase();
    // eslint-disable-next-line
    const itemTags = tags.map(({ tid, name }) => {
      if (tagIds?.includes(tid)) return name;
    });

    // Check if the title contains the nonBlockValue
    let titleMatch = false;
    let textMatch = false;
    if (nonBlockValue.length > 0) {
      titleMatch = itemTitle.includes(nonBlockValue);
      textMatch = itemText.includes(nonBlockValue);
    }

    // Check if all tags in the blockValue are included in the item's tags
    const tagsMatch = blockValue.some((tag) =>
      itemTags.includes(tag.toLowerCase())
    );
    return titleMatch || tagsMatch || textMatch;
  });

  const sortedQuestions = filteredQueList
    .slice()
    .sort((a, b) => b.askDate - a.askDate);

  return sortedQuestions;
}

// ======================== SORTING ======================

export function SortQueData(buttonId, questions, answers) {
  let sortedQuestions;
  let sortAllQuesList;
  let filterByNoAns;

  // newest
  if (buttonId === "newest") {
    sortedQuestions = questions.slice().sort((a, b) => b.askDate - a.askDate);

    return sortedQuestions;
  }

  // active
  if (buttonId === "active") {
    sortAllQuesList = [...questions];

    sortAllQuesList.forEach((item) => {
      let newAnsDate = 0;
      item.ansIds?.forEach((ansId) => {
        answers.forEach(({ aid, ansDate }) => {
          const convertedDate = new Date(ansDate).getTime();
          if (ansId === aid && convertedDate > newAnsDate) {
            newAnsDate = convertedDate;
          }
        });
      });
      item.queAnsDate = newAnsDate;
    });
    console.log(sortAllQuesList)

    sortAllQuesList.sort((a, b) => new Date(b.ansDate).getTime() - new Date(a.ansDate).getTime());

    return sortAllQuesList;
  }

  // unanswered
  if (buttonId === "unanswered") {
    filterByNoAns = questions?.filter(({ ansIds }) => ansIds?.length === 0);

    return filterByNoAns;
  }
}

//  ====================== SUBMIT QUES =============================

export const SubmitQuestionFunc = (data, formData) => {
  const { title, tag, text, username } = formData;

  // const allTagsList = data.tags.map(({ name }) => name);
  let submittedTags = tag.trim().split(" ");
  submittedTags = submittedTags.map((item) => item);

  const finalTagsList = [];
  const dataTagsList = [];
  let finalTagLength = data.tags.length + 1;

  // check if tag is available in data tag list
  for (let i = 0; i < submittedTags.length; i++) {
    let flag = true;
    let valTid = "";
    for (let j = 0; j < data.tags.length; j++) {
      const val = submittedTags[i];
      const { tid, name } = data.tags[j];
      if (val.toLowerCase() === name) {
        flag = false;
        valTid = tid;
        break;
      }
    }
    if (flag) {
      // add new tag in data tag
      dataTagsList.push({
        tid: `t${finalTagLength}`,
        name: submittedTags[i].toLowerCase(),
      });
      finalTagsList.push(`t${finalTagLength}`);
      finalTagLength += 1;
    } else {
      finalTagsList.push(valTid);
    }
  }
 // { title, text, tags, askedBy }
 const finalData = { title: title.trim(), text: text.trim(), tags: submittedTags, askedBy: username }
 //return finalData
  const askedQuesFormData = {
    qid: "id" + new Date().getTime(), // id of a question
    views: 0, // initial views 0
    ansIds: [], // initial answers []
    title: title.trim(), // name of the question
    text: text.trim(), // text of the question
    tagIds: finalTagsList, // tags of the question
    askedBy: username, // posted by username
    askDate: new Date().getTime(), // posted at [date / time ]
  };

  // TODO: [ askedQuesFormData ] to be submit to api with [ finalTagsList ]
  const finalQues = [askedQuesFormData, ...data.questions];

  return { finalQues, dataTagsList, finalData };
};
