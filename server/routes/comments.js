const router = require("express").Router();
const Comments = require("../models/comments");
const Questions = require("../models/questions");
const Answers = require("../models/answers");
const ModelFactory = require("../utils/modelFactory");
const commentFactory = new ModelFactory("Comment");

// ================ [ VIEW-QUESTIONS-COMMENTS ] ================

router.get("/view_ques_comments", async (req, res) => {
    try {
      const { id: queId } = req.query;
  
      // database call
      const allComments = await Comments.find();
      const quesData = await Questions.findById(queId);
  
      // if db error
      if (!allComments && !quesData)
        return res.status(400).json({ message: "Database Error" });
  
      const commentMapping = {};
      allComments.forEach(({ _id, comment, comment_by }) => {
        commentMapping[_id] = { text: comment, comment_by };
      });
  
      // final response
      const response = quesData.comments
        .map((item) => {
          if (item in commentMapping) return commentMapping[item];
          return null;
        })
        .filter(Boolean);
  
      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
  
  // ================ [ VIEW-ANSWERS-COMMENTS ] ================
  
  router.get("/view_ans_comments", async (req, res) => {
    try {
      const { id: ansId } = req.query;
  
      // database call
      const allComments = await Comments.find();
      const ansData = await Answers.findById(ansId);
  
      // if db error
      if (!allComments && !ansData)
        return res.status(400).json({ message: "Database Error" });
  
      const commentMapping = {};
      allComments.forEach(({ _id, comment, comment_by }) => {
        commentMapping[_id] = { text: comment, comment_by };
      });
  
      // final response
      const response = ansData.comments
        .map((item) => {
          if (item in commentMapping) return commentMapping[item];
          return null;
        })
        .filter(Boolean);
  
      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  });
  

// ================ [ ADD-QUESTIONS-COMMENTS ] ================

router.post("/add_comment_ques", async (req, res) => {
  try {
    const { id: queId, text, username } = req.body;

    const quesData = await Questions.findById(queId);

    const createdComment = commentFactory.create({
      comment: text,
      comment_by: username,
    });

    await createdComment.save();
    quesData.comments = [createdComment._id, ...quesData.comments]

    await quesData.save();

    return res.status(200).json("success");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// ================ [ ADD-ANSWERS-COMMENTS ] ================

router.post("/add_comment_ans", async (req, res) => {
  try {
    const { id: queId, text, username } = req.body;

    const ansData = await Answers.findById(queId);

    const createdComment = commentFactory.create({
      comment: text,
      comment_by: username,
    });

    await createdComment.save();
    //quesData.comments = [createdComment._id, ...quesData.comments]
    ansData.comments = [createdComment._id, ...ansData.comments];

    await ansData.save();

    return res.status(200).json("success");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;