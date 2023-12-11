const router = require("express").Router();
const Users = require("../models/users");
const Questions = require("../models/questions");
const Answers = require("../models/answers");
const Tags = require("../models/tags");
const ModelFactory = require("../utils/modelFactory");

// ====================== [ USER PAGE DATA ] =====================

router.post("/user_data_page", async (req, res) => {
  try {
    const { id, name } = req.body;
    const user = await Users.findById(id);

    // particular user questions data
    if (name === "questions") {
      const userQuestions = await Questions.find({ askedBy: user.username });
      const tag = await Tags.find();

      const quesData = userQuestions.map((item) => {
        let tagList = [];

        item.tags.forEach((idx) => {
          const tagName = tag.find((t) => t._id === idx);

          if (tagName) {
            tagList.push(tagName.name);
          }
        });

        const tagsString = tagList.join(" ");

        return {
          id: item._id,
          title: item.title,
          askDate: item.ask_date_time,
          text: item.text,
          tags: tagsString,
        };
      });
      return res.status(200).json(quesData);
    }

    // particular user answers data
    if (name === "answers") {
      const userAnswers = await Answers.find({ ans_by: user.username });
      const ansData = userAnswers.map(({ _id, text, ans_date_time }) => {
        return { id: _id, text, ansDate: ans_date_time };
      });
      return res.status(200).json(ansData);
    }

    // particular user tags data
    if (name === "tags") {
      const userTags = await Tags.find({ tag_added_by: id });
      const tagsData = userTags.map(({ name, _id }) => {
        return { name, id: _id };
      });
      return res.status(200).json(tagsData);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// ================== [ UPDATE USER PAGE DATA ] ===================



router.put("/update_user_data_page", async (req, res) => {
  try {
    const { name: pageName, id: quesId, data: updatedData, userId } = req.body;

    // particular user questions data
    if (pageName === "questions") {
      const { text, title, tags } = updatedData;
      const tagsNames = tags.split(" ");

      const isQues = await Questions.updateOne(
        { _id: quesId },
        { $set: { text, title, ask_date_time: new Date() } }
      );

      if (isQues)
        return res
          .status(200)
          .json({ message: "Questions updated successfully" });

      return res.status(400).json({ message: "Database update failed" });
    }

    // particular user answers data
    if (pageName === "answers") {
      const { text } = updatedData;
      const isQues = await Answers.updateOne(
        { _id: quesId },
        { $set: { text, ans_date_time: new Date()} }
      );

      if (isQues)
        return res
          .status(200)
          .json({ message: "Answers updated successfully" });

      return res.status(400).json({ message: "Database update failed" });
    }

    // particular tags data
    if (pageName === "tags") {
      const { name } = updatedData;
      //const tags = await Tags.findOne({ name: name })

      // check if tag is being used by other users
      const questionsWithTag = await Questions.find({ tags: { $in: [quesId] } });
      if (questionsWithTag.length > 1)
        return response.status(400).json({ message: "Tags cannot be updated" });
      const isTag = await Tags.updateOne({ _id: quesId }, { $set: { name } })
      if (isTag)
        return res.status(200).json({ message: "Tag updated successfully" });
    }

    return res.status(400).json({ message: "Please send valid response" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// ================ [ DELETE USER PAGE DATA ] ====================

router.delete("/delete_data_page", async (req, res) => {
  try {
    const { id, type } = req.query;

    // const isTagUpdatePossible = UpdateTags({
    //   quesId: id,
    //   checkForDelete: true,
    // });

    // if (!isTagUpdatePossible)
    //   return res.status(400).json({ message: "Couldn't update tags" });

    // quesIdData.tags;

    //  delete question
    if (type === "questions") {
      const ques = await Questions.find({ _id: id });
      await Promise.all(
        ques[0].answers.map(async (answerId) => {
          await Answers.deleteOne({ _id: answerId });
        })
      );
      const isQues = await Questions.deleteOne({ _id: id });
      if (isQues)
        return res.status(200).json({ message: "Delete Question Success" });
      return res.status(400).json({ message: "Database unable to delete" });
    }

    //  delete answer
    if (type === "answers") {
      const question = await Questions.findOne({ answers: id });

      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      // Remove the answer ID from the answers array in the question document
      await Questions.updateOne(
        { _id: question._id },
        { $pull: { answers: id } }
      );

      const isAns = await Answers.deleteOne({ _id: id });
      if (isAns)
        return res.status(200).json({ message: "Delete Answer Success" });
      return res.status(400).json({ message: "Database unable to delete" });
    }

    // delete tags
    if (type === "tags") {
      // check if tag is being used by other users
      const questionsWithTag = await Questions.find({ tags: { $in: [id] } });
      if (questionsWithTag.length > 1)
        return response.status(400).json({ message: "Tag cannot be deleted" });

      const updatePromises = questionsWithTag.map(question => {
        return Questions.updateOne({ _id: question._id }, { $pull: { tags: id } });
      });

      await Promise.all(updatePromises);

      const isTag = await Tags.deleteOne({ _id: id });
      if (isTag)
        return res.status(200).json({ message: "Tag deleted successfully" });
    }

    return res.status(400).json({ message: "Please send valid response" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// ======================== [ USER INFO ] =======================

router.get("/user", async (req, res) => {
  try {
    const { id } = req.query;

    const user = await Users.findById(id);
    const timeDifference = new Date() - user.registration_date_time;

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return res.status(200).json({
      username: user.username,
      reputation: user.reputation,
      activeDays: daysDifference,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
