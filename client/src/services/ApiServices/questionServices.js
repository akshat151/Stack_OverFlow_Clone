import config from "../config.js";
import http from "../httpServices/httpService.js";

const endpoint = config.baseUrl;

// api for all questions
export async function getAllQues() {
  try {
    const { data } = await http.get(`${endpoint}/questions/view_questions`);
    return data;
  } catch (error) {}
}

// api for question by id
export async function getQuesById() {
  try {
    const { data } = await http.get(`${endpoint}/`);
    return data;
  } catch (error) {}
}

// api for adding question
export async function AddQuestion(req, id) {
  try {
    const { data } = await http.post(
      `${endpoint}/questions/add_question?id=${id}`,
      req
    );
    return data;
  } catch (error) {
    alert(error.response.data.message);
  }
}

// update questions vote
export async function UpdateQuesVote(req) {
  try {
    const { data } = await http.post(`${endpoint}/questions/update_votes`, req);
    return data;
  } catch (error) {
    alert(error.response.data.message);
    return false;
  }
}

// update answers vote
export async function UpdateAnsVote(req) {
  try {
    const { data } = await http.post(`${endpoint}/answers/update_votes`, req);
    return data;
  } catch (error) {
    alert(error.response.data.message);
    return false;
  }
}

// api for adding answer
export async function AddAnswers(req, id) {
  try {
    const { data } = await http.post(
      `${endpoint}/answers/add_answer?id=${id}`,
      req
    );
    return data;
  } catch (error) {}
}

// api for searching by tag or title
export async function SearchTagsAndTitle(req) {
  try {
    const { data } = await http.post(`${endpoint}/questions/search`, {
      searchText: req,
    });
    return data;
  } catch (error) {}
}

// api for sorting questions
export async function SortingApi(req) {
  try {
    const { data } = await http.post(`${endpoint}/questions/sort`, {
      sortBtn: req,
    });
    return data;
  } catch (error) {}
}

// api for adding question
export async function ViewsCount(id) {
  try {
    const { data } = await http.post(`${endpoint}/questions/views_count`, {
      id: id,
    });
    return data;
  } catch (error) {}
}

// ================== COMMENTS SERVICE ======================

// view particular ques comments
export async function ViewQuesComments(id) {
  try {
    const { data } = await http.get(`${endpoint}/view_ques_comments?id=${id}`);
    console.log(data);
    return data;
  } catch (error) {}
}

// view particular ans comments
export async function ViewAnsComments(id) {
  try {
    const { data } = await http.get(`${endpoint}/view_ans_comments?id=${id}`);
    console.log(data);
    return data;
  } catch (error) {}
}

// add comment to related ques
export async function AddCommentToQues(req) {
  try {
    const { data } = await http.post(`${endpoint}/add_comment_ques`, req);
    return data;
  } catch (error) {}
}

// add comment to related ans
export async function AddCommentToAns(req) {
  try {
    const { data } = await http.post(`${endpoint}/add_comment_ans`, req);
    return data;
  } catch (error) {}
}

// ================== USER PROFILE SERVICE ======================

// get user info by id
export async function getUserInfo(id) {
  try {
    const { data } = await http.get(`${endpoint}/user?id=${id}`);
    return data;
  } catch (error) {}
}

// api for adding question
export async function getUserDataPage(req) {
  try {
    const { data } = await http.post(`${endpoint}/user_data_page`, req);
    return data;
  } catch (error) {}
}

// update user questions/answers/tags
export async function UpdateUserPageData(req) {
  try {
    const { data } = await http.put(`${endpoint}/update_user_data_page`, req);
    return data;
  } catch (error) {
    alert(error.response.data.message);
    return false;
  }
}

// delete user questions/answers/tags
export async function DeleteUserPageData(req) {
  try {
    const { id, type } = req;
    const { data } = await http.delete(
      `${endpoint}/delete_data_page?id=${id}&type=${type}`,
      req
    );
    return data;
  } catch (error) {
    alert(error.response.data.message);
    return false;
  }
}

// PinAnswer

export async function PinAnswer(req) {
  try {
    console.log(req, "reqqq")
    const { data } = await http.post(`${endpoint}/questions/pin_answer`, req);
    return data;
  } catch (error) {
    alert(error.response.data.message);
    return false;
  }
}
