import React, { useState } from "react";
import { sideBarDataForRest } from "./data/utility.jsx";
import {
  AddAnswers,
  getAllQues,
} from "../services/ApiServices/questionServices.js";

const AnswerQuestion = ({
  queId,
  userId,
  username,
  setAllQuestions = () => {},
  handleClickSideBar = () => {},
}) => {
  const [ansFormData, setAnsFormData] = useState({
    answerUsernameInput: username,
    answerTextInput: "",
  });

  // eslint-disable-next-line
  const callAllQuestionApi = async () => {
    const data = await getAllQues();
    setAllQuestions(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var errorMessageu = document.getElementById("error-message-u");
    var errorMessagea = document.getElementById("error-message-a");
    let isValid = false;

    const { answerUsernameInput: ansBy, answerTextInput: text } = ansFormData;

    if (ansBy === "") {
      errorMessageu.textContent = "Username cannot be empty";
      errorMessagea.textContent = "";
      isValid = true;
    } else if (text === "") {
      errorMessagea.textContent = "Answer text cannot be empty";
      errorMessageu.textContent = "";
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
              errorMessagea.textContent = "Invalid hyperlink";
              errorMessageu.textContent = "";
              return;
            }
          }
        } else {
          errorMessagea.textContent = "Invalid hyperlink";
          errorMessageu.textContent = "";
          return;
        }
      } else {
        errorMessageu.textContent = "";
        errorMessagea.textContent = "";
      }
    }

    if (isValid) {
      return;
    }

    const answeredFormData = {
      aid: "id" + new Date().getTime(), // id of an answer
      text,
      ansBy,
      ansDate: new Date().getTime(), // posted at [date / time]
    };

    const finalData = { id: queId, text, ans_by: ansBy };

    AddAnswers(finalData, userId);
    //callAllQuestionApi()

    setAllQuestions((state) => {
      const ques = state.questions.map((que) => {
        if (que.qid === queId) {
          return { ...que, ansIds: [answeredFormData.aid, ...que.ansIds] };
        }
        return que;
      });

      return {
        ...state,
        questions: ques,
        answers: [answeredFormData, ...state.answers],
      };
    });

    handleClickSideBar(sideBarDataForRest, "ViewQuestion", queId);
  };

  const handleChange = ({ target }) => {
    setAnsFormData((prev) => ({ ...prev, [target.id]: target.value }));
  };

  /**
   * JSX
   */
  return (
    <form className="newQuePageBody" id="formId" onSubmit={handleSubmit}>
      <div className="formBody">
        {/* question text */}
        <div id="quesText">
          <div id="quesUsername" style={{ display: "none" }}>
            <label>
              Username<sup>*</sup>
            </label>

            <input
              placeholder="enter username..."
              id="answerUsernameInput"
              onChange={handleChange}
              value={ansFormData.formUsernameInput}
            />
            <p id="error-message-u"></p>
          </div>
        </div>
        <div id="quesText">
          <label>
            Answer Text<sup>*</sup>
          </label>
          <span>Add details</span>

          <textarea
            rows="10"
            cols="50"
            id="answerTextInput"
            onChange={handleChange}
            value={ansFormData.formTextInput}
          ></textarea>
          <p id="error-message-a"></p>
        </div>
        <div className="submit-form">
          {/* post question button */}
          <button type="submit" id="postAnswerButton">
            Post Answer
          </button>
          <p>* indicates mandatory fields</p>
        </div>
      </div>
    </form>
  );
};

export default AnswerQuestion;
