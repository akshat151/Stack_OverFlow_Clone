import config from "../config.js";
import http from "../httpServices/httpService.js";

const endpoint = config.baseUrl;

// api for all tags
export async function getAllTags() {
  try {
    const { data } = await http.get(`${endpoint}/tags/view_tags`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// api for question filter by tag name
export async function getQuesByTag(tagName) {
  try {
    const { data } = await http.get(`${endpoint}/${tagName}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
