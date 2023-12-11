import React, { useEffect, useMemo, useState } from "react";
import {
  DeleteUserPageData,
  UpdateUserPageData,
  getUserDataPage,
  getUserInfo,
} from "../services/ApiServices/questionServices";
import { DateTimeFormatting } from "./data/utility";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const UserPage = ({ userInfo }) => {
  const [viewData, setViewData] = useState([
    { id: "1", text: "reacjs" },
    { id: "2", text: "nodejs" },
  ]);
  const [viewDataName, setViewDataName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "dummy",
    activeDays: "1",
    reputation: "2",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});

  // =============== EVENT HANDLERS START ================

  useEffect(() => {
    const callApi = async () => {
      const data = await getUserInfo(userInfo.userId);
      if (data) setUserData(data);
    };
    callApi();
  }, [userInfo.userId]);

  //  api call to get-view data
  const callHandleDataApi = async (name, id) => {
    const data = await getUserDataPage({ name, id });
    if (data) setViewData(data);
    setIsLoading(false);
  };

  const handleViewData = (name) => {
    setIsLoading(true);
    setViewDataName(name);
    callHandleDataApi(name, userInfo.userId);
    setEditData({});
    setIsEdit(false);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setIsEdit(true);
  };

  const handleDelete = async (delId) => {
    const data = await DeleteUserPageData({ id: delId, type: viewDataName });
    if (data) {
      const filteredData = viewData.filter(({ id }) => id !== delId);
      setViewData(filteredData);
    }
  };

  // =============== EVENT HANDLERS END ================

  /**
   * JSX
   */
  return (
    <div className="USER_MAIN">
      <br />

      <div className="USER_TITLE">{userData.username}</div>

      {/* ========== USER DATA =========== */}

      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="USER_DATA">
          <p>Active days - {userData.activeDays}</p>
          <p>Reputation - {userData.reputation}</p>
        </div>
      </div>

      <br />
      <br />

      {/* ========== SELECT VIEW DATA =========== */}
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="USER_DATA">
          <button
            onClick={() => handleViewData("questions")}
            style={{
              backgroundColor:
                viewDataName === "questions" ? "rgb(23, 81, 83)" : "cadetblue",
            }}
          >
            View Posted Questions
          </button>
          <button
            onClick={() => handleViewData("answers")}
            style={{
              backgroundColor:
                viewDataName === "answers" ? "rgb(23, 81, 83)" : "cadetblue",
            }}
          >
            View Posted Answers
          </button>
          <button
            onClick={() => handleViewData("tags")}
            style={{
              backgroundColor:
                viewDataName === "tags" ? "rgb(23, 81, 83)" : "cadetblue",
            }}
          >
            View Posted Tags
          </button>
        </div>
      </div>
      <br />
      <br />

      {/* ========== SELECTED VIEW DATA INFO =========== */}

      {isLoading && (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading data...
        </div>
      )}

      {!isLoading && (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          {viewData.length === 0 && viewDataName !== ""
            ? "No Data Available"
            : viewDataName === "" && "Please select to view"}
        </div>
      )}

      {!isLoading && viewData?.length > 0 && (
        <div className="VIEW_DETAILS">
          {/* ========== QUESTIONS =========== */}
          {viewDataName === "questions" && (
            <React.Fragment>
              {!isEdit && (
                <div className="VIEW_DETAILS_DATA">
                  {viewData.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 5 }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <MdModeEdit
                          style={{ cursor: "pointer", fontSize: "1.3rem" }}
                          onClick={() => handleEdit(item)}
                        />
                        <MdDelete
                          style={{
                            color: "red",
                            fontSize: "1.3rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        />
                      </div>
                      <div className="VIEW_DATA_CONTENT">
                        <p id="view_title"> {item.title}</p>
                        <p id="view_date">{DateTimeFormatting(item.askDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {isEdit && (
                <EditComp
                  editData={editData}
                  viewData={viewData}
                  type={viewDataName}
                  userInfo={userInfo}
                  setIsEdit={setIsEdit}
                  setViewData={setViewData}
                  setEditData={setEditData}
                  viewDataName={viewDataName}
                />
              )}
            </React.Fragment>
          )}

          {/* ========== ANSWERS =========== */}
          {viewDataName === "answers" && (
            <React.Fragment>
              {!isEdit && (
                <div className="VIEW_DETAILS_DATA">
                  {viewData.map((item, idx) => (
                    <div style={{ display: "flex", gap: 5 }} key={idx}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <MdModeEdit
                          style={{ cursor: "pointer", fontSize: "1.3rem" }}
                          onClick={() => handleEdit(item)}
                        />
                        <MdDelete
                          style={{
                            color: "red",
                            fontSize: "1.3rem",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                      <div key={idx} className="VIEW_DATA_CONTENT">
                        <p id="view_title"> {item.text}</p>
                        <p id="view_date">{DateTimeFormatting(item.ansDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {isEdit && (
                <EditComp
                  viewData={viewData}
                  editData={editData}
                  type={viewDataName}
                  userInfo={userInfo}
                  setIsEdit={setIsEdit}
                  setEditData={setEditData}
                  setViewData={setViewData}
                  viewDataName={viewDataName}
                />
              )}
            </React.Fragment>
          )}
          {/* ========== TAGS =========== */}
          {viewDataName === "tags" && (
            <React.Fragment>
              {!isEdit && (
                <div className="VIEW_DETAILS_DATA">
                  {viewData.map((item, idx) => (
                    <div style={{ display: "flex", gap: 5 }} key={idx}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <MdModeEdit
                          style={{ cursor: "pointer", fontSize: "1.3rem" }}
                          onClick={() => handleEdit(item)}
                        />
                        <MdDelete
                          style={{
                            color: "red",
                            fontSize: "1.3rem",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                      <div key={idx} className="VIEW_DATA_CONTENT_TAGS">
                        <p id="view_title"> {item.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {isEdit && (
                <EditComp
                  viewData={viewData}
                  editData={editData}
                  type={viewDataName}
                  userInfo={userInfo}
                  setIsEdit={setIsEdit}
                  setEditData={setEditData}
                  setViewData={setViewData}
                  viewDataName={viewDataName}
                />
              )}
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

// ============== EDIT COMP ===============

function EditComp({
  type,
  editData,
  viewData = [],
  viewDataName,
  setIsEdit = () => {},
  setViewData = () => {},
  setEditData = () => {},
  userInfo,
}) {
  const [formData, setFormData] = useState(editData || {});

  const inputData = useMemo(() => {
    if (type === "questions") return ["title", "text"];

    if (type === "answers") return ["text"];

    return ["text"];
  }, [type]);

  // ================ EVENT HANDLERS START ================

  const handleEditChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async () => {
    if (type === "questions") {
      const { id: selectedId, title, text, tags } = formData;

      const newData = viewData.map((item) => {
        if (item.id === selectedId) {
          return { ...item, title, text, tags };
        }
        return item;
      });

      const data = await UpdateUserPageData({
        name: viewDataName,
        id: selectedId,
        data: formData,
        userId: userInfo.userId,
        username: userInfo.username,
      });
      if (data) setViewData(newData);
    }

    if (type === "answers") {
      const { id: selectedId, text } = formData;

      const newData = viewData.map((item) => {
        if (item.id === selectedId) {
          return { ...item, text };
        }
        return item;
      });

      const data = await UpdateUserPageData({
        name: viewDataName,
        id: selectedId,
        data: formData,
      });
      if (data) setViewData(newData);
    }

    if (type === "tags") {
      const { id: selectedId, name } = formData;

      const newData = viewData.map((item) => {
        if (item.id === selectedId) {
          return { ...item, name };
        }
        return item;
      });

      const data = await UpdateUserPageData({
        name: viewDataName,
        id: selectedId,
        data: formData,
      });
      if (data) setViewData(newData);
    }

    setIsEdit(false);
    setEditData({});
  };

  // ================ EVENT HANDLERS END ================

  if (type === "tags") {
    return (
      <div style={{ display: "flex", flexDirection: "column", width: "40rem" }}>
        <div style={{ marginBottom: "1.3rem" }}>
          <label style={{ textTransform: "capitalize", fontWeight: 400 }}>
            Tags
          </label>
          <br />

          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder={`enter tags`}
            onChange={handleEditChange}
            style={{
              padding: "6px 12px",
              fontSize: "1.3rem",
              marginTop: "1rem",
              width: "100%",
            }}
          />

          <br />
          <br />

          <button
            onClick={handleSubmit}
            id="postAnswerButton"
            style={{ width: "8rem" }}
          >
            save changes
          </button>
        </div>
      </div>
    );
  }

  /**
   * JSX
   */
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", width: "40rem" }}>
        {inputData.map((item, idx) => (
          <div style={{ marginBottom: "1.3rem" }}>
            <label style={{ textTransform: "capitalize", fontWeight: 400 }}>
              {item}
            </label>
            <br />

            {item !== "text" ? (
              <input
                key={idx}
                type="text"
                name={item}
                value={formData[item]}
                placeholder={`enter ${item}`}
                onChange={handleEditChange}
                style={{
                  padding: "6px 12px",
                  fontSize: "1.3rem",
                  marginTop: "1rem",
                  width: "100%",
                }}
              />
            ) : (
              <textarea
                name={item}
                value={formData[item]}
                placeholder={`enter ${item}`}
                onChange={handleEditChange}
                rows="10"
                style={{
                  padding: "6px 12px",
                  fontSize: "1.3rem",
                  marginTop: "1rem",
                  width: "100%",
                }}
              ></textarea>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          id="postAnswerButton"
          style={{ width: "8rem" }}
        >
          save changes
        </button>
      </div>
    </div>
  );
}

export default UserPage;
