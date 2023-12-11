import React, { useEffect } from "react";
import { sideBarDataForRest, sideBarDataQuestions } from "./data/utility.jsx";
import { getAllTags } from "../services/ApiServices/tagsService.js";

const Tags = ({
  handleClickSideBar = () => {},
  allQuestions,
  setAllQuestions,
  setIsTag,
  userInfo,
}) => {
  /**
   * API's
   */

  // TODO: call tags api
  useEffect(() => {
    const callTagsApi = async () => {
      // eslint-disable-next-line
      const data = await getAllTags();
    };
    callTagsApi();
  }, []);

  // ================= EVENT-HANDLERS-START =================

  // tag id & name mapping
  const tagIdNameMapping = {};
  allQuestions?.tags?.forEach(({ tid, name }) => {
    tagIdNameMapping[tid] = name;
  });

  const tagIdCountMapping = {};
  allQuestions.questions.forEach(({ tagIds }) => {
    tagIds.forEach((id) => {
      if (id in tagIdCountMapping) {
        tagIdCountMapping[id] = tagIdCountMapping[id] + 1;
      } else {
        tagIdCountMapping[id] = 1;
      }
    });
  });

  // redirect to questions page for specifci tag
  const handleTagId = (id) => {
    const filteredData = allQuestions.questions.filter((item) =>
      item.tagIds.includes(id)
    );
    setIsTag(false);
    // TODO: to know you are coming from tag click of tag page - enable setTagsEbale ->true/false
    setAllQuestions({ ...allQuestions, questions: filteredData });
    handleClickSideBar(sideBarDataQuestions, "Questions");
  };

  // ================= EVENT-HANDLERS-END =================

  /**
   * JSX
   */
  return (
    <div>
      <div
        className="VIEW__HEADER__TOP"
        id="answersHeader"
        style={{ padding: "3rem" }}
      >
        <div>
          <h2 id="answersCount">{allQuestions.tags.length} Tags</h2>
        </div>
        <div>
          <h2 id="queName">All Tags</h2>
        </div>
        <div style={{display: userInfo.userId !== "" ? "":"none"}}>
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
      <div className="TAGS__CONTENT">
        {Object.entries(tagIdNameMapping).map(([id, name], idx) => (
          <div key={idx} className="TAG__CARD tagNode">
            <p className="TAG__NAME" onClick={() => handleTagId(id)}>
              {name}
            </p>
            <p>
              {tagIdCountMapping[id] !== undefined
                ? `${tagIdCountMapping[id]} questions`
                : "0 questions"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
