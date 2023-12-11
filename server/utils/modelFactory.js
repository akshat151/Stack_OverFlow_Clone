const Questions = require("../models/questions");
const Answers = require("../models/answers");
const Tags = require("../models/tags");
const Users = require("../models/users");
const Comments = require("../models/comments");

class ModelFactory {
  constructor(type) {
    this.type = type;
  }

  create({
    title,
    text,
    tags,
    answers,
    comments,
    askedBy,
    ask_date_time,
    views,
    votes,
    last_answer_time,
    name,
    tag_added_by,
    ans_by,
    ans_date_time,
    comment,
    comment_by,
  }) {
    switch (this.type) {
      case "Question":
        return new Questions({
          title,
          text,
          tags,
          answers,
          comments,
          askedBy,
          ask_date_time,
          views,
          votes,
          last_answer_time,
        });
      case "Answer":
        return new Answers({ text, ans_by, ans_date_time, comments, votes });
      case "Tag":
        return new Tags({ name, tag_added_by });
      case "User":
        return new Users({
          username,
          email,
          password,
          reputation,
          registration_date_time,
        });
      case "Comment":
        return new Comments({ comment, comment_by });
      default:
        throw new Error("Invalid type");
    }
  }
}

module.exports = ModelFactory;
