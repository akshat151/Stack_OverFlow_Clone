import React, { useEffect, useMemo, useState } from "react";
import { DateTimeFormatting, sideBarDataForRest } from "./data/utility.jsx";
import {
  PinAnswer,
  UpdateAnsVote,
  UpdateQuesVote,
  ViewsCount,
} from "../services/ApiServices/questionServices.js";
import { FaRegComments } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";

const ViewQuestion = ({
  id,
  userInfo,
  allQuestions,
  setAllQuestions = () => {},
  handleClickSideBar = () => {},
  handleViewComments = () => {},
}) => {
  const quesData = allQuestions.questions.find(({ qid }) => qid === id);

  const [isPinAns, setIsPinAns] = useState(quesData.pinAnswerId || "");
  const [ansPerPage, setAnsPerPage] = useState(() => {
    if (quesData?.pinAnswerId === "") return 5;
    return 4;
  });

  useEffect(() => {
    if (quesData.pinAnswerId !== "") {
      setAnsPerPage((prev) => prev - 1);
    }
  }, [quesData.pinAnswerId]);

  const [pageNo, setPageNo] = useState(0);

  const [totalVotesAndType, setTotalVotesAndType] = useState({
    votes: quesData.votes,
    type: quesData.voteType,
  });

  /**
   * API'S
   */

  // TODO: 1) all answers api
  // TODO: 2) call api by question id

  // ================= EVENT HANDLERS START =================

  // answer mapping by ans ids
  const ansByIdMapping = {};
  allQuestions.answers.forEach((item) => {
    ansByIdMapping[item.aid] = item;
  });

  // find the question with the given id

  const convertToHyperlink = (text) => {
    const urlRegex = /\[(.*?)\]\((https:\/\/[^\s()]+)\)/g;
    return text.replace(
      urlRegex,
      (match, linkText, url) =>
        `<a href="${url}" target="_blank">${linkText}</a>`
    );
  };

  const handleUpVote = async () => {
    try {
      const data = await UpdateQuesVote({
        type: "like",
        userId: userInfo.userId,
        quesId: id,
      });
      if (data) {
        setTotalVotesAndType((prev) => ({
          votes: prev.votes + 1,
          type: "like",
        }));
      }
    } catch (error) {}
  };

  const handleDownVote = async () => {
    try {
      const data = await UpdateQuesVote({
        type: "dislike",
        userId: userInfo.userId,
        quesId: id,
      });
      if (data) {
        setTotalVotesAndType((prev) => ({
          votes: prev.votes - 1,
          type: "dislike",
        }));
      }
    } catch (error) {}
  };

  // ================= EVENT HANDLERS END =================

  // To increament views on every page visit of view questions
  useEffect(() => {
    setAllQuestions((state) => {
      const ques = state.questions.map((item) => {
        if (item.qid === id) return { ...item, views: item.views + 1 };
        return item;
      });
      return { ...state, questions: ques };
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const callViewsCountApi = async () => {
      // eslint-disable-next-line
      const data = await ViewsCount(id);
    };
    callViewsCountApi();
  }, [id]);

  // ==================== PAGINATION START ==================

  const pinAnsData = useMemo(() => {
    if (isPinAns === "") return quesData.ansIds;
    return quesData.ansIds.filter((item) => item !== isPinAns);
  }, [quesData.ansIds, isPinAns]);

  const ansList = useMemo(() => {
    let start = pageNo * ansPerPage;
    let end = (pageNo + 1) * ansPerPage;
    if (isPinAns === "") return pinAnsData?.slice(start, end);
    const data = pinAnsData?.slice(start, end);
    return [isPinAns, ...data];
  }, [pageNo, pinAnsData, ansPerPage, isPinAns]);

  const totalPageNo = Math.ceil(quesData?.ansIds?.length / ansPerPage);

  // ==================== PAGINATION END ==================

  const handlePinAns = ({ qid, aid }) => {
    setIsPinAns(aid);
    setAllQuestions((stateData) => {
      const newQue = stateData.questions.map((item) => {
        if (item.qid === qid) {
          console.log(item);
          return { ...item, pinAnswerId: aid };
        }
        return item;
      });

      return { ...stateData, questions: newQue };
    });
  };

  /**
   * JSX
   */
  return (
    <div className="VIEW__MAIN">
      <div className="VIEW__HEADER">
        {/* top  */}
        <div className="VIEW__HEADER__TOP" id="answersHeader">
          <div>
            <h2 id="answersCount">{quesData.ansIds.length} answers</h2>
          </div>
          <div>
            <h2 id="queName">{quesData.title}</h2>
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
        {/* bottom  */}
        <div className="VIEW__HEADER__BOTTOM" id="questionBody">
          <div id="quesViews">
            <p>{quesData.views} views</p>
            <p
              style={{ marginTop: "1rem", cursor: "pointer" }}
              onClick={() =>
                handleViewComments({
                  type: "questions",
                  qid: quesData.qid,
                  aid: "",
                })
              }
            >
              <FaRegComments /> {quesData.comments}
            </p>
            <div
              style={{
                display: userInfo.userId !== "" ? "flex" : "none",
                flexDirection: "column",
                gap: ".5rem",
                justifyContent: "center",
                alignItems: "center",
                width: "2rem",
                marginRight: "-2rem",
                userSelect: "none",
                marginTop: "1rem",
              }}
            >
              <FaRegThumbsUp
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: totalVotesAndType.type === "like" && "blue",
                }}
                onClick={() => {
                  if (totalVotesAndType.type !== "like") handleUpVote();
                }}
              />
              {totalVotesAndType.votes}
              <FaRegThumbsDown
                style={{
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: totalVotesAndType.type === "dislike" && "blue",
                }}
                onClick={() =>
                  totalVotesAndType.type !== "dislike" && handleDownVote()
                }
              />
            </div>
          </div>
          <div
            id="queDetailText"
            dangerouslySetInnerHTML={{
              __html: convertToHyperlink(quesData?.text),
            }}
          />
          <div id="date">
            <p>
              <span>{quesData.askedBy}</span> asked{" "}
              {DateTimeFormatting(quesData.askDate)}
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
          marginBottom: "1rem",
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
      <div className="BORDER__DASHED"></div>
      {/* ================ ANSWERS =============== */}
      <div className="VIEW__QUES__ANSWERS answerText">
        {ansList.map((id, idx) => {
          const ansData = ansByIdMapping[id];
          return (
            <AnswersSubComp
              ansData={ansData}
              qid={quesData.qid}
              quesData={quesData}
              isPinAns={isPinAns}
              userInfo={userInfo}
              setIsPinAns={setIsPinAns}
              convertToHyperlink={convertToHyperlink}
              handleViewComments={handleViewComments}
              handlePinAns={handlePinAns}
            />
          );
        })}
      </div>
      <div
        style={{
          padding: "2rem",
          display: userInfo.userId !== "" ? "" : "none",
          marginBottom: "1rem",
        }}
      >
        <button
          id="postAnswerButton"
          onClick={() =>
            handleClickSideBar(sideBarDataForRest, "AnswerQuestion", id)
          }
        >
          Answer Question
        </button>
      </div>
    </div>
  );
};

// ============= ANSWER SUB_COMP ==============

function AnswersSubComp({
  qid,
  ansData,
  userInfo,
  convertToHyperlink,
  handleViewComments,
  isPinAns,
  setIsPinAns,
  handlePinAns,
}) {
  const [totalVotesAndType, setTotalVotesAndType] = useState({
    votes: ansData.votes,
    type: ansData.voteType,
  });

  const handleUpVote = async () => {
    try {
      const data = await UpdateAnsVote({
        type: "like",
        userId: userInfo.userId,
        quesId: qid,
        ansId: ansData.aid,
      });
      if (data) {
        setTotalVotesAndType((prev) => ({
          votes: prev.votes + 1,
          type: "like",
        }));
      }
    } catch (error) {}
  };

  const handleDownVote = async () => {
    try {
      const data = await UpdateAnsVote({
        type: "dislike",
        userId: userInfo.userId,
        quesId: qid,
        ansId: ansData.aid,
      });
      console.log(data);
      if (data) {
        setTotalVotesAndType((prev) => ({
          votes: prev.votes - 1,
          type: "dislike",
        }));
      }
    } catch (error) {}
  };

  const handlePin = async (aid) => {
    const data = await PinAnswer({ qid, aid });
    if (data) handlePinAns({ qid, aid });
    //handlePinAns({ qid, aid });
  };

  /**
   * JSX
   */
  return (
    <div className="VIEW__ANS__CONTENT answerAuthor">
      <div
        style={{
          display: userInfo.userId !== "" ? "flex" : "none",
          flexDirection: "column",
          gap: ".5rem",
          justifyContent: "center",
          alignItems: "center",
          width: "5rem",
          userSelect: "none",
          position: "relative",
        }}
      >
        <FaRegThumbsUp
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: totalVotesAndType.type === "like" && "blue",
          }}
          onClick={() => {
            if (totalVotesAndType.type !== "like") handleUpVote();
          }}
        />
        {totalVotesAndType.votes}
        <FaRegThumbsDown
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: totalVotesAndType.type === "dislike" && "blue",
          }}
          onClick={() =>
            totalVotesAndType.type !== "dislike" && handleDownVote()
          }
        />
      </div>
      <div>
        {" "}
        <p
          style={{ marginTop: "1rem", cursor: "pointer" }}
          onClick={() =>
            handleViewComments({
              type: "answers",
              aid: ansData.aid,
              qid,
            })
          }
        >
          <FaRegComments /> {ansData.comments}
        </p>
      </div>
      <div
        className="ANS__TEXT"
        dangerouslySetInnerHTML={{
          __html: convertToHyperlink(ansData?.text),
        }}
      />
      <div className="ANS__DATE" style={{ position: "relative" }}>
        <span>{ansData?.ansBy}</span> {DateTimeFormatting(ansData?.ansDate)}
        <div style={{ position: "absolute", top: "-2.5rem", right: 0 }}>
          {isPinAns === "" && (
            <MdPushPin
              style={{ fontSize: "1.3rem", cursor: "pointer" }}
              onClick={() => handlePin(ansData.aid)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewQuestion;
