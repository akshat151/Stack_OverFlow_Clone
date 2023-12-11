import React, { useEffect, useMemo, useState } from "react";
import { sideBarDataForRest } from "./data/utility";
import {
  ViewAnsComments,
  ViewQuesComments,
} from "../services/ApiServices/questionServices";

const commentsPerPage = 3;

const ViewComments = ({
  userInfo,
  commentQId,
  allQuestions,
  setAllQuestions = () => { },
  handleClickSideBar = () => { },
}) => {
  const [pageNo, setPageNo] = useState(0);
  const [allComments, setAllComments] = useState([]);

  const mainTitle = useMemo(() => {
    // for questions
    if (commentQId.type === "questions") {
      const quesData = allQuestions.questions.find(
        ({ qid }) => qid === commentQId.qid
      );

      return quesData.title;
    }
    // for answers
    else {
      const ansData = allQuestions.answers.find(
        ({ aid }) => aid === commentQId.aid
      );

      return ansData.text;
    }
  }, [allQuestions, commentQId]);

  const handleGoBack = () => {
    const pageName = "ViewQuestion";
    handleClickSideBar(sideBarDataForRest, pageName);
  };

  useEffect(() => {
    const callApi = async () => {
      const { qid, aid } = commentQId;
      let data = [];
      if (commentQId.type === "questions") {
        data = await ViewQuesComments(qid);
        if (data) {
          setAllQuestions
            ((state) => {
              const newQue = state?.questions?.map((item) => {
                if (item.qid === qid) {
                  return { ...item, comments: data.length };
                }
                return item;
              });
              return { ...state, questions: newQue };
            });
        }
      } else {
        data = await ViewAnsComments(aid);
        if (data) {
          setAllQuestions
            ((state) => {
              const newAns = state?.answers?.map((item) => {
                if (item.aid === aid) {
                  return { ...item, comments: data.length };
                }
                return item;
              });
              return { ...state, answers: newAns };
            });
        }
      }

      if (data) setAllComments(data);
    };
    callApi();
  }, [commentQId]);

  // ==================== PAGINATION START ==================

  const commentList = useMemo(() => {
    let start = pageNo * commentsPerPage;
    let end = (pageNo + 1) * commentsPerPage;
    return allComments?.slice(start, end);
  }, [pageNo, allComments]);

  const totalPageNo = Math.ceil(allComments?.length / commentsPerPage);

  // ==================== PAGINATION END ==================

  /**
   * JSX
   */
  return (
    <div className="COMMENT_MAIN">
      <div className="COMMENT_BTN">
        <button onClick={handleGoBack}>Go back</button>
        <button
          onClick={() => handleClickSideBar(sideBarDataForRest, "AddComments")}
          style={{ display: userInfo.userId === "" ? "none" : "" }}
        >
          Add Comments
        </button>
      </div>
      <br />
      <br />

      <div id="view_title" style={{ textAlign: "center" }}>
        <span style={{ color: "lightsalmon" }}>[{commentQId.type}]</span>{" "}
        {mainTitle}
      </div>
      <br />
      <br />
      {/* =========== PAGINATION START =========== */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <button
          disabled={pageNo === 0}
          onClick={() => setPageNo((prev) => prev - 1)}
          style={{
            fontSize: "1.2rem",
            padding: "2px 7px",
            // display: pageNo === 0 ? "none" : "",
          }}
        >
          prev
        </button>
        <button
          disabled={pageNo === totalPageNo - 1 || totalPageNo === 0}
          onClick={() => setPageNo((prev) => prev + 1)}
          style={{
            fontSize: "1.2rem",
            padding: "2px 7px",
            // display: pageNo === totalPageNo - 1 ? "none" : "",
          }}
        >
          next
        </button>
      </div>
      {/* ============= PAGINATION END ============ */}
      <br />

      {/* ====== COMMENTS ======== */}
      <div style={{ height: "80vh", overflowY: "auto" }}>
  <div className="VIEW_DETAILS_DATA">
    {commentList.map((item, idx) => (
      <div key={idx} className="VIEW_DATA_CONTENT" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p id="view_title">{item.text}</p>
        <p id="view_user">
          <span style={{ color: "black" }}>Comment by </span>
          <span style={{ color: "red" }}>{item.comment_by}</span>
        </p>
        {/* <p id="view_date">{DateTimeFormatting(item.date)}</p> */}
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default ViewComments;
