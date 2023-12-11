const router = require("express").Router();
const Questions = require("../models/questions");
const Answers = require("../models/answers");
const ModelFactory = require("../utils/modelFactory");
const answerFactory = new ModelFactory("Answer");
const Users = require("../models/users");

function getInvalidResponse(message, res) {
  return res.status(400).json({ message, result: false });
}

function getValidResponse(message, res, userId) {
  return res.status(200).json({ message, result: true, userId });
}

// add an answer to the db
router.post("/add_answer", async (req, res) => {
  try {
    const { text, id } = req.body;
    const { id: userId } = req.query;
    const question = await Questions.findById({ _id: id });

    const user = await Users.findById(userId);

    // using ModelFactory to create an instance of Answer
    const newAnswer = answerFactory.create({
      text,
      ans_by: user.username,
      ans_date_time: new Date(),
      comments: [],
      votes: 0,
    });

    await newAnswer.save();
    question.answers = [newAnswer._id, ...question.answers];
    question.last_answer_time = new Date();

    await question.save();
    return res.status(200).json("Answer saved successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// ==================== UPDATE VOTES  ====================

async function UpdateReputation({
  userId,
  ansId,
  updateVoteBy,
  updateReputationBy,
  voteType,
}) {
  // update vote
  const answer = await Answers.findById(ansId);
  answer.votes = answer.votes + updateVoteBy;
  answer.voteType = voteType;
  const isAns = await answer.save();

  // update reputation
  const user = await Users.find({ username: answer.ans_by });
  const reputation = user[0].reputation + updateReputationBy;
  const isUser = await Users.updateOne(
    { _id: userId },
    { $set: { reputation } }
  );

  return isAns && isUser;
}

router.post("/update_votes", async (req, res) => {
  try {
    const { ansId, type, userId } = req.body;
    const userName = await Users.findById(userId);

    // if reputation is less than 50
    if (userName.reputation < 50)
      return getInvalidResponse(
        "You cannot vote because your reputation is less than 50",
        res
      );

    // if vote is like
    if (type === "like") {
      const response = UpdateReputation({
        userId,
        ansId,
        updateVoteBy: 1,
        updateReputationBy: 5,
        voteType: "like",
      });

      if (response) return getValidResponse("upvoted", res);

      return getInvalidResponse("database error", res);
    }

    // if vote is dislike
    if (type === "dislike") {
      const response = UpdateReputation({
        userId,
        ansId,
        updateVoteBy: -1,
        updateReputationBy: -10,
        voteType: "dislike",
      });

      if (response) return getValidResponse("downvoted", res);

      return getInvalidResponse("database error", res);
    }

    return res.status(400).json({ message: "Please send valid response" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
