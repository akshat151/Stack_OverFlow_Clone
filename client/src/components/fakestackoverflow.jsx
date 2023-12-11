import { useMemo, useState, useEffect } from "react";
// comp
import Header from "./Header.jsx";
import Questions from "./Questions.jsx";
import Sidebar from "./Sidebar.jsx";

// data
import {
  SearchTextFunc,
  SortQueData,
  sideBarDataForRest,
  sideBarDataQuestions,
} from "./data/utility.jsx";

// import ques from "../models/model.js";

// comp
import Tags from "./Tags";
import AskQuestions from "./AskQuestions";
import ViewQuestion from "./ViewQuestion";
import AnswerQuestion from "./AnswerQuestion";
import UserPage from "./UserPage.jsx";
// services
import {
  SearchTagsAndTitle,
  SortingApi,
} from "../services/ApiServices/questionServices.js";
import Login from "./Login.jsx";
import ViewComments from "./ViewComments.jsx";
import AddComments from "./AddComments.jsx";
import useSessionState from "../hooks/useSessionState.jsx";

export default function FakeStackOverflow() {
  const [btnId, setBtnId] = useState("");
  const [queId, setQueId] = useState("");
  const [isTag, setIsTag] = useState(true);
  const [commentQId, setCommentQId] = useState({ type: "", qid: "", aid: "" });
  // login & user info
  const [isLoggedIn, setIsLoggedIn] = useSessionState("user", false);
  const [userInfo, setUserInfo] = useSessionState("userData", { username: "", userId: "" });
  // search input
  const [searchInput, setSearchInput] = useState("");
  const [activePage, setActivePage] = useState("Questions");
  const [sideBarData, setSideBarData] = useState(sideBarDataQuestions);
  const [allQuestions, setAllQuestions] = useState({});
  const [defaultQuestions, setDefaultQuestions] = useState(allQuestions);

  /**
   * API's
   */

  // TODO: all questions API'S

  // ===================== EVENT-HANDLERS START =======================

  // change page
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  // on sidebar click
  const handleClickSideBar = (data, page, quesId = "") => {
    setSideBarData(data);
    handlePageChange(page);
    if (quesId !== "") setQueId(quesId);
  };

  // go to view questions page by id
  const handleViewQuesById = (id) => {
    setQueId(id);
    handleClickSideBar(sideBarDataForRest, "ViewQuestion");
  };
  // ===================== EVENT-HANDLERS END =======================
  // ==================== LOGIC PART START =======================

  // get all tags from all questions list
  const tagsMapping = {};
  allQuestions?.tags?.forEach(({ tid, name }) => {
    tagsMapping[tid] = name;
  });

  // search by tags , title & text
  let questionsData = useMemo(() => {
    return SearchTextFunc(
      searchInput,
      defaultQuestions.questions,
      defaultQuestions.tags
    );
  }, [searchInput, defaultQuestions]);

  // sort by clicking buttons
  questionsData = useMemo(() => {
    if (btnId === "")
      return questionsData?.slice()?.sort((a, b) => b.askDate - a.askDate);

    return SortQueData(btnId, questionsData, defaultQuestions.answers);
  }, [btnId, defaultQuestions, questionsData]);

  // ==================== LOGIC PART END =======================

  useEffect(() => {
    setDefaultQuestions(allQuestions);
    setBtnId("");
  }, [allQuestions]);

  const handleSearchApi = async (req) => {
    const data = await SearchTagsAndTitle(req);
    setAllQuestions((state) => ({ ...state, questions: data || [] }));
  };

  const handleSortApi = async (req) => {
    const data = await SortingApi(req);
    setAllQuestions((state) => ({ ...state, questions: data || [] }));
  };

  const handleViewComments = ({ type, qid = "", aid = "" }) => {
    setCommentQId({ type, qid, aid });
    handleClickSideBar(sideBarDataForRest, "ViewComments");
  };

  useEffect(() => {
    if (!isLoggedIn) setActivePage("Questions");
  }, [isLoggedIn]);

  /**
   * JSX
   */
  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        userId={userInfo.userId}
        setUserInfo={setUserInfo}
        setIsLoggedIn={setIsLoggedIn}
        setSearchInput={setSearchInput}
        handleSearchApi={handleSearchApi}
        handleClickSideBar={handleClickSideBar}
      />
      {/* LOGIN */}
      <div style={{ display: !isLoggedIn ? "block" : "none" }}>
        <Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />
      </div>
      <div className="MAIN__BODY" style={{ display: isLoggedIn ? "" : "none" }}>
        {/* SIDEBAR  */}
        <Sidebar
          setIsTag={setIsTag}
          setBtnId={setBtnId}
          sideBarData={sideBarData}
          allQuestions={allQuestions}
          setAllQuestions={setAllQuestions}
          handleClickSideBar={handleClickSideBar}
          setDefaultQuestions={setDefaultQuestions}
        />

        {/* CONTENT  */}
        <div className="CONTENT">
          {/* question page  */}
          {activePage === "Questions" && (
            <Questions
              isTag={isTag}
              userInfo={userInfo}
              setBtnId={setBtnId}
              quesLists={questionsData}
              tagsMapping={tagsMapping}
              handleSortApi={handleSortApi}
              setAllQuestions={setAllQuestions}
              handleViewQuesById={handleViewQuesById}
              handleClickSideBar={handleClickSideBar}
            />
          )}
          {/* tag page  */}
          {activePage === "Tags" && (
            <Tags
              setIsTag={setIsTag}
              userInfo={userInfo}
              allQuestions={allQuestions}
              setAllQuestions={setDefaultQuestions}
              handleClickSideBar={handleClickSideBar}
            />
          )}
          {/* ask quesitons page  */}
          {activePage === "AskQuestions" && (
            <AskQuestions
              userId={userInfo.userId}
              allQuestions={allQuestions}
              username={userInfo.username}
              setAllQuestions={setAllQuestions}
              handleClickSideBar={handleClickSideBar}
            />
          )}
          {/* view quesiton page  */}
          {activePage === "ViewQuestion" && (
            <ViewQuestion
              id={queId}
              userInfo={userInfo}
              allQuestions={allQuestions}
              setAllQuestions={setAllQuestions}
              handleClickSideBar={handleClickSideBar}
              handleViewComments={handleViewComments}
            />
          )}
          {/* view quesiton page  */}
          {activePage === "AnswerQuestion" && (
            <AnswerQuestion
              queId={queId}
              username={userInfo.username}
              userId={userInfo.userId}
              setAllQuestions={setAllQuestions}
              handleClickSideBar={handleClickSideBar}
            />
          )}
          {activePage === "UserPage" && <UserPage userInfo={userInfo} />}
          {activePage === "ViewComments" && (
            <ViewComments
              userInfo={userInfo}
              commentQId={commentQId}
              allQuestions={allQuestions}
              setAllQuestions={setAllQuestions}
              handleClickSideBar={handleClickSideBar}
            />
          )}
          {activePage === "AddComments" && (
            <AddComments
              commentQId={commentQId}
              allQuestions={allQuestions}
              username={userInfo.username}
              handleClickSideBar={handleClickSideBar}
            />
          )}
        </div>
      </div>
    </div>
  );
}
