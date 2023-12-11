const router = require("express").Router();
const Questions = require("../models/questions");
const Answers = require("../models/answers");
const Tags = require("../models/tags");
const Users = require("../models/users");
const ModelFactory = require("../utils/modelFactory");
const questionFactory = new ModelFactory("Question");
const tagFactory = new ModelFactory("Tag");

function getInvalidResponse(message, res) {
  return res.status(400).json({ message, result: false });
}

function getValidResponse(message, res, userId) {
  return res.status(200).json({ message, result: true, userId });
}

// update pin answer
router.post("/pin_answer", async (req, res) => {
  try {
    const { qid, aid } = req.body;

    const ques = await Questions.findById(qid);
    ques.pinAnswerId = aid;
    const dbRes = await ques.save();

    if (dbRes && ques) return res.status(200).json({ message: "success" });

    return res.status(404).json({ message: "Please send valid request" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// add a new question
router.post("/add_question", async (req, res) => {
  try {
    const { title, text, tags: tagNames } = req.body;
    const { id: userId } = req.query;

    const user = await Users.findById(userId);
    const tagIds = [];
    let isNewTag = false;
    const tagList = await Tags.find();

    // for reputation more than 50
    if (user.reputation >= 50) {
      // adding new tags to the tags db
      tagNames.forEach(async (name) => {
        const existingTag = tagList.find((tag) => tag.name === name);
        if (!existingTag) {
          const newTag = tagFactory.create({ name, tag_added_by: userId });
          tagIds.push(newTag._id);
          await newTag.save();
        } else {
          tagIds.push(existingTag._id);
        }
      });
    } else {
      // for reputation less than 50 check there should be no new tag
      tagNames.forEach(async (name) => {
        const existingTag = tagList.find((tag) => tag.name === name);
        if (!existingTag) {
          isNewTag = true;
        } else {
          tagIds.push(existingTag._id);
        }
      });
    }

    // adding a new question to the questions db
    const newQuestion = questionFactory.create({
      title,
      text,
      tags: tagIds,
      askedBy: user.username,
      ask_date_time: new Date(),
      answers: [],
      comments: [],
      views: 0,
      votes: 0,
      last_answer_time: "",
    });
    if (isNewTag)
      return getInvalidResponse(
        "You do not have enough reputation to add a new tag.",
        res
      );

    await newQuestion.save();
    return res.status(200).json("Question successfully added");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// return all questions in the db
router.get("/view_questions", async (req, res) => {
  try {
    const allQuestions = await Questions.find();
    const questionList = allQuestions.map(
      ({
        _id,
        title,
        text,
        tags,
        askedBy,
        ask_date_time,
        answers,
        views,
        comments,
        votes,
        pinAnswerId,
        voteType,
      }) => {
        const formattedData = {
          qid: _id,
          title,
          text,
          tagIds: tags,
          askedBy: askedBy,
          askDate: ask_date_time,
          ansIds: answers,
          views,
          votes,
          comments: comments.length,
          voteType,
          pinAnswerId: pinAnswerId || "",
        };
        return formattedData;
      }
    );
    const allAnswers = await Answers.find();
    const answerList = allAnswers.map((item) => {
      return {
        ...item._doc,
        aid: item._id,
        ansBy: item.ans_by,
        ansDate: item.ans_date_time,
        votes: item.votes,
        comments: item.comments.length,
        voteType: item.voteType,
      };
    });

    const allTags = await Tags.find();
    const tagList = allTags.map((item) => {
      return { ...item._doc, tid: item._id };
    });

    const finalRes = {
      questions: questionList,
      answers: answerList,
      tags: tagList,
    };
    return res.status(200).json(finalRes);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

function SearchTextFunc(inputText, questions, tags) {
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

// search question by tags and text
router.post("/search", async (req, res) => {
  try {
    const { searchText } = req.body;
    const allQuestions = await Questions.find();
    const questionList = allQuestions.map(
      ({
        _id,
        title,
        text,
        tags,
        askedBy,
        ask_date_time,
        answers,
        views,
        comments,
        votes,
        last_answer_time,
      }) => {
        const formattedData = {
          qid: _id,
          title,
          text,
          tagIds: tags,
          askedBy: askedBy,
          askDate: ask_date_time,
          ansIds: answers,
          views,
          comments,
          votes,
          last_answer_time,
        };
        return formattedData;
      }
    );

    const allTags = await Tags.find();
    const tagList = allTags.map((tag) => {
      const formattedData = { tid: tag.id, name: tag.name };
      return formattedData;
    });
    const data = SearchTextFunc(searchText, questionList, tagList);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/sort", async (req, res) => {
  try {
    let sortedQues;
    let filterUnansweredQues;
    let sortAllQuesList;

    const { sortBtn } = req.body;
    const allQuestions = await Questions.find();
    const answerList = await Answers.find();

    // sort on the basis of newest
    if (sortBtn === "newest") {
      sortedQues = allQuestions
        .slice()
        .sort((a, b) => b.ask_date_time - a.ask_date_time);
      const questionList = sortedQues.map(
        ({
          _id,
          title,
          text,
          tags,
          askedBy,
          ask_date_time,
          answers,
          views,
        }) => {
          const formattedData = {
            qid: _id,
            title,
            text,
            tagIds: tags,
            askedBy: askedBy,
            askDate: ask_date_time,
            ansIds: answers,
            views,
          };
          return formattedData;
        }
      );
      return res.status(200).json(questionList);
    }

    // sort on the basis of unanswered
    if (sortBtn === "unanswered") {
      filterUnansweredQues = allQuestions?.filter(
        ({ answers }) => answers?.length === 0
      );
      const questionList = filterUnansweredQues.map(
        ({
          _id,
          title,
          text,
          tags,
          askedBy,
          ask_date_time,
          answers,
          views,
        }) => {
          const formattedData = {
            qid: _id,
            title,
            text,
            tagIds: tags,
            askedBy: askedBy,
            askDate: ask_date_time,
            ansIds: answers,
            views,
          };
          return formattedData;
        }
      );
      return res.status(200).json(questionList);
    }

    // sort on the basis of active
    if (sortBtn === "active") {
      sortAllQuesList = [...allQuestions];

      sortAllQuesList.forEach((item) => {
        let newAnsDate = 0;
        item.answers?.forEach((ansId) => {
          answerList.forEach(({ _id, ans_date_time }) => {
            const convertedDate = new Date(ans_date_time).getTime();
            if (ansId === _id && convertedDate > newAnsDate) {
              newAnsDate = convertedDate;
            }
          });
        });
        item.ask_date_time = newAnsDate;
      });

      sortAllQuesList.sort(
        (a, b) =>
          new Date(b.ask_date_time).getTime() -
          new Date(a.ask_date_time).getTime()
      );

      const questionList = sortAllQuesList.map(
        ({
          _id,
          title,
          text,
          tags,
          askedBy,
          ask_date_time,
          answers,
          views,
        }) => {
          const formattedData = {
            qid: _id,
            title,
            text,
            tagIds: tags,
            askedBy: askedBy,
            askDate: ask_date_time,
            ansIds: answers,
            views,
          };
          return formattedData;
        }
      );

      return res.status(200).json(questionList);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/views_count", async (req, res) => {
  try {
    const { id } = req.body;
    const question = await Questions.findById(id);
    question.views = question.views + 1;
    await question.save();
    return res.status(200).json("views incremented");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/update_votes", async (req, res) => {
  try {
    const { quesId, type, userId } = req.body;
    const userName = await Users.findById(userId);
    if (userName.reputation >= 50) {
      if (type === "like") {
        const question = await Questions.findById(quesId);
        question.votes = question.votes + 1;
        question.voteType = "like";
        await question.save();
        const user = await Users.find({ username: question.askedBy });
        const reputation = user[0].reputation + 5;
        await Users.updateOne(
          { _id: userId },
          { $set: { reputation: reputation } }
        );

        return getValidResponse("upvoted", res);
      }
      if (type === "dislike") {
        const question = await Questions.findById(quesId);
        question.votes = question.votes - 1;
        question.voteType = "dislike";
        await question.save();
        const user = await Users.find({ username: question.askedBy });
        const reputation = user[0].reputation - 10;
        await Users.updateOne(
          { _id: userId },
          { $set: { reputation: reputation } }
        );
        return getValidResponse("downvoted", res);
      }
    } else {
      return getInvalidResponse(
        "You cannot vote because your reputation is less than 50",
        res
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
