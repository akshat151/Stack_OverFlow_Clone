import React from "react";
import { sideBarDataQuestions, sideBarDataTags } from "./data/utility.jsx";
import { getAllQues } from "../services/ApiServices/questionServices.js";

const sideBarMapping = {
  Questions: sideBarDataQuestions,
  Tags: sideBarDataTags,
};

const Sidebar = ({
  sideBarData = [],
  handleClickSideBar = () => {},
  allQuestions,
  setDefaultQuestions,
  setBtnId,
  setIsTag,
  setAllQuestions,
}) => {
  const handleSidebarClick = (name) => {
    setDefaultQuestions(allQuestions);
    setBtnId("");
    if (name === "Questions") {
      const callAllQuestionApi = async () => {
        const data = await getAllQues();
        if (data) {
          const sortedQuestions = data.questions
            .slice()
            .sort(
              (a, b) =>
                new Date(b.askDate).getTime() - new Date(a.askDate).getTime()
            );
          setAllQuestions({ ...data, questions: sortedQuestions });
        }
      };

      callAllQuestionApi();
      setIsTag(true);
    }
    handleClickSideBar(sideBarMapping[name], name);
  };

  /**
   * JSX
   */
  return (
    <div className="SIDEBAR__MAIN" id="sideBarNav">
      {sideBarData.map(({ name, selected }, idx) => (
        <div
          id="sideBarNavItems"
          key={idx}
          className={`${selected && "SELECTED__SIDEBAR"}`}
          onClick={() => handleSidebarClick(name)}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
