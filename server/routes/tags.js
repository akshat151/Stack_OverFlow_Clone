const router = require('express').Router();
const Tags = require('../models/tags');

// return all tags in the db
router.get("/view_tags", async (req, res) => {
    try {
        const allTags = await Tags.find()
        const tagList = allTags.map((tag) => {
            const formattedData = {tid: tag.id, name: tag.name}
            return formattedData
        })
        res.status(200).json(tagList)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})

module.exports = router