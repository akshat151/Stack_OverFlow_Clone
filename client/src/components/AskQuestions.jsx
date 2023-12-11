import React, { useState } from "react";
import { SubmitQuestionFunc, sideBarDataQuestions } from "./data/utility.jsx";
import {
  AddQuestion,
  getAllQues,
} from "../services/ApiServices/questionServices.js";

// const defaultData = {
//   formTitleInput: "",
//   formTextInput: "",
//   formTagInput: "",
//   formUsernameInput: "",
// };

const AskQuestions = ({
  allQuestions = {},
  setAllQuestions,
  handleClickSideBar,
  username = "",
  userId = "",
}) => {
  const [askQuesData, setAskQuesData] = useState({
    formTitleInput: "",
    formTextInput: "",
    formTagInput: "",
    formUsernameInput: username,
  });

  const handleChange = ({ target }) => {
    setAskQuesData((prev) => ({ ...prev, [target.id]: target.value }));
  };

  // eslint-disable-next-line
  const callAllQuestionApi = async () => {
    const data = await getAllQues();
    setAllQuestions(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Other form validation checks
    const titleError = document.getElementById("titleError");
    const tagError = document.getElementById("tagError");
    const textError = document.getElementById("textError");

    const {
      formTitleInput: title,
      formTextInput: text,
      formTagInput: tag,
      formUsernameInput: username,
    } = askQuesData;

    let isValid = false;
    if (title.length === 0) {
      titleError.innerText = "Title cannot be empty";
      isValid = true;
    } else if (title.length > 100) {
      titleError.innerText = "Title cannot be more than 100 characters";
      isValid = true;
    }
    if (text.trim().length === 0) {
      textError.innerText = "Question text cannot be empty";
      isValid = true;
    } else {
      const hyperlinkRegex = /\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g;
      const hyperlinks = text.match(hyperlinkRegex);
      if (hyperlinks) {
        const linkTextRegex = /\[(.*?)\]\((https:\/\/[^\s)]+)\)/;
        const isLinkText = text.match(linkTextRegex);
        if (isLinkText) {
          for (const link of hyperlinks) {
            const isValidLink = /\[(.*?)\]\((https:\/\/[^\s)]+)\)/.test(link);
            const [, linkText, target] = link.match(
              /\[(.*?)\]\((https:\/\/[^\s)]+)\)/
            );
            if (
              !isValidLink ||
              linkText.trim().length === 0 ||
              target.trim().length === 0 ||
              target.indexOf("https://") !== 0
            ) {
              textError.innerText = "Invalid hyperlink";
              return;
            }
          }
        } else {
          textError.innerText = "Invalid hyperlink";
          return;
        }
      }
    }
    let tagArr = tag.split(" ");
    if (tagArr.length > 5) {
      tagError.innerText = "Cannot have more than 5 tags";
      isValid = true;
    }
    tagArr.forEach((item) => {
      if (item.length > 20) {
        tagError.innerText = "New tag length cannot be more than 20";
        isValid = true;
      }
    });
    if (isValid) {
      return;
    }

    // If all validations pass, submit the form
    const formdata = { title, tag, text, username };
    const {
      finalQues,
      dataTagsList,
      finalData: apiData,
    } = SubmitQuestionFunc(allQuestions, formdata);
    //const apiData = SubmitQuestionFunc(allQuestions, formdata);
    try {
      const data = await AddQuestionApiCall(apiData, userId);
      // Update the final form data
      setAllQuestions((state) => ({
        ...state,
        questions: finalQues,
        tags: [...state.tags, ...dataTagsList],
      }));
      // Redirect to questions page
      if (data) {
        handleClickSideBar(sideBarDataQuestions, "Questions");
      }
    } catch (error) {
      console.log(error.response.data)
    }
  };

  async function AddQuestionApiCall(req, id) {
    const data = await AddQuestion(req, id);
    return data;
  }

  return (
    <form className="newQuePageBody" id="formId" onSubmit={handleSubmit}>
      <div className="formBody">
        {/* question title  */}
        <div id="quesTitle">
          <label>
            Question Title<sup>*</sup>{" "}
          </label>
          <span>Limit title to 100 characters or less</span>
          <input
            placeholder="write question title..."
            id="formTitleInput"
            onChange={handleChange}
            value={askQuesData.formTitleInput}
          />
          <p id="titleError"></p>
        </div>
        {/* question text  */}
        <div id="quesText">
          <label>
            Question Text<sup>*</sup>
          </label>
          <span>Add details</span>

          <textarea
            rows="10"
            cols="50"
            id="formTextInput"
            onChange={handleChange}
            value={askQuesData.formTextInput}
          ></textarea>
          <p id="textError"></p>
        </div>
        {/* tags */}
        <div id="quesTags">
          <label>
            Tags<sup>*</sup>
          </label>
          <span>Add keywords separated by whitespace</span>
          <input
            placeholder="enter tags..."
            id="formTagInput"
            onChange={handleChange}
            value={askQuesData.formTagInput}
          />
          <p id="tagError"></p>
        </div>
        {/* username  */}
        <div id="quesUsername" style={{ display: "none" }}>
          <label>
            Username<sup>*</sup>
          </label>

          <input
            placeholder="enter username..."
            id="formUsernameInput"
            onChange={handleChange}
            value={askQuesData.formUsernameInput}
          />
        </div>
        <div className="submit-form">
          {/* post question button  */}
          <button type="submit" id="postQuestionButton">
            Post Question
          </button>
          <p>* indicates mandatory fields</p>
        </div>
      </div>
    </form>
  );
};

export default AskQuestions;
