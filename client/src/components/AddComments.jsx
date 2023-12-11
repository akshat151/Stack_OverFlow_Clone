import React, { useMemo, useState } from "react";
import {
  AddCommentToAns,
  AddCommentToQues,
} from "../services/ApiServices/questionServices";
import { sideBarDataForRest } from "./data/utility";

const AddComments = ({
  username,
  commentQId,
  allQuestions,
  handleClickSideBar = () => {},
}) => {
  const [text, setText] = useState("");

  const mainTitle = useMemo(() => {
    if (commentQId.type === "questions") {
      const quesData = allQuestions.questions.find(
        ({ qid }) => qid === commentQId.qid
      );

      return quesData.title;
    } else {
      const ansData = allQuestions.answers.find(
        ({ aid }) => aid === commentQId.aid
      );

      return ansData.text;
    }
  }, [allQuestions, commentQId]);

  const handleAddComment = async () => {
    const isVaild = text.length < 140;
    if (isVaild) {
      if (commentQId.type === "questions") {
        const data = await AddCommentToQues({
          id: commentQId.qid,
          text,
          username,
        });
        if (!data) alert(data.message);
      } else {
        const data = await AddCommentToAns({
          id: commentQId.aid,
          text,
          username,
        });
        if (!data) alert(data.message);
      }
      handleClickSideBar(sideBarDataForRest, "ViewComments");
    }
  };

  /**
   * JSX
   */
  return (
    <div className="COMMENT_MAIN">
      <br />
      <br />
      <br />

      <div id="view_title" style={{ textAlign: "center" }}>
        <span style={{ color: "lightsalmon" }}>[{commentQId.type}]</span>{" "}
        {mainTitle}
      </div>
      <br />
      <br />
      <br />

      <div
        style={{
          width: "100%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div id="quesText">
          <label>
            Add Comment<sup>*</sup>
          </label>
          <span>Add details</span>

          <textarea
            rows="10"
            cols="50"
            value={text}
            id="answerTextInput"
            onChange={({ target }) => setText(target.value)}
          ></textarea>
          <p id="error-message-a"></p>
        </div>
        <br />
        <div className="submit-form">
          {/* post question button */}
          <button onClick={handleAddComment} id="postAnswerButton">
            Add Comments
          </button>
          <p>* indicates mandatory fields</p>
        </div>
      </div>
    </div>
  );
};

export default AddComments;
