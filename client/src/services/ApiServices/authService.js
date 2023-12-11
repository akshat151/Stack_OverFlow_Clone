import config from "../config.js";
import http from "../httpServices/httpService.js";

const endpoint = config.baseUrl;

// api for all tags
export async function getUserLoggedIn(req) {
  try {
    const { data } = await http.post(`${endpoint}/user/login`, req);
    return data;
  } catch (error) {
    return error?.response?.data;
  }
}

// api for question filter by tag name
export async function getUserSignUp(req) {
  try {
    const { data } = await http.post(`${endpoint}/user/register`, req);
    return data;
  } catch (error) {
    return error?.response?.data;
  }
}
