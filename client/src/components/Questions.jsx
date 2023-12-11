import React, { useEffect, useMemo, useState } from "react";
import { DateTimeFormatting, sideBarDataForRest } from "./data/utility.jsx";
import { getAllQues } from "../services/ApiServices/questionServices.js";
// import { FaRegComments } from "react-icons/fa";

const quesPerPage = 5;

const Questions = ({
  quesLists = [],
  tagsMapping = {},
  handleSortApi = () => {},
  handleViewQuesById = () => {},
  handleClickSideBar = () => {},
  setAllQuestions = () => {},
  userInfo = {},
  isTag,
  handleViewComments = () => {},
}) => {
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    const callAllQuestionApi = async () => {
      const data = await getAllQues();
      const sortedQuestions = data?.questions
        .slice()
        .sort(
          (a, b) =>
            new Date(b.askDate).getTime() - new Date(a.askDate).getTime()
        );
      setAllQuestions({ ...data, questions: sortedQuestions });
    };
    if (isTag) callAllQuestionApi();
    // eslint-disable-next-line
  }, []);

  // ==================== PAGINATION START ==================

  const quesList = useMemo(() => {
    let start = pageNo * quesPerPage;
    let end = (pageNo + 1) * quesPerPage;
    return quesLists?.slice(start, end);
  }, [pageNo, quesLists]);

  const totalPageNo = Math.ceil(quesLists?.length / quesPerPage);

  // ==================== PAGINATION END ==================

  /**
   * JSX
   */
  return (
    <div className="QUES__MAIN">
      {/* QUES HEADER */}
      <div className="QUES__HEADER">
        {/* TOP HEADER */}
        <div className="QUES__HEADER__TOP">
          <div>
            <h2>All Questions</h2>
          </div>
          <div style={{ display: userInfo.userId !== "" ? "" : "none" }}>
            <button
              id="askQuestion"
              onClick={() =>
                handleClickSideBar(sideBarDataForRest, "AskQuestions")
              }
            >
              Ask a Questions
            </button>
          </div>
        </div>
        {/* BOTTOM HEADER */}
        <div className="QUES__HEADER__BOTTOM">
          <div>
            <h2>{quesLists.length} questions</h2>
          </div>
          <div className="QUES__HEADER__BOTTOM__RIGHT">
            <p id="newest" onClick={() => handleSortApi("newest")}>
              Newest
            </p>
            <p id="active" onClick={() => handleSortApi("active")}>
              Active
            </p>
            <p id="unanswered" onClick={() => handleSortApi("unanswered")}>
              Unanswered
            </p>
          </div>
        </div>
      </div>
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
      <div className="BORDER__DASHED"></div>
      {/* QUES MAIN CONENT */}
      <div
        className="QUES__MAIN_CONTENT"
        style={{ overflow: "auto", height: "30rem" }}
      >
        {/* when no ques is empty */}
        {quesList.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            No Question available
          </div>
        )}
        {/* when ques list is not empty  */}
        {quesList.length > 0 &&
          quesList.map(
            (
              { qid, title, views, ansIds, askedBy, tagIds, askDate, comments },
              idx
            ) => (
              <div key={idx} className="QUES__CONTENT">
                {/* views & answers  */}
                <div className="QUES__CONTENT__LEFT postStats">
                  <p>{ansIds?.length} answers</p>
                  <p>{views} views</p>
                  {/* <p
                    style={{ cursor: "pointer" }}
                    onClick={() => handleViewComments("questions", qid)}
                  >
                    <FaRegComments /> {comments ? comments : 0}
                  </p> */}
                </div>
                {/* title & tags */}
                <div className="QUES__CONTENT__TITLE">
                  <h1
                    className="postTitle"
                    onClick={() => handleViewQuesById(qid)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {title}
                  </h1>
                  <div className="QUES__CONTENT__TAGS">
                    {tagIds?.map((id, idx) => (
                      <div key={idx}>{tagsMapping[id]}</div>
                    ))}
                  </div>
                </div>
                {/* asked by  */}
                <div className="QUES__CONTENT__RIGHT lastActivity">
                  <p>
                    <span>{askedBy}</span> asked {DateTimeFormatting(askDate)}
                  </p>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Questions;
