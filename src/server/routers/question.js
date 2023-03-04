const express = require('express')
const cors = require('cors')
const questionRouter = express.Router()
let questionModel = require('../models/question.js')

questionRouter.use(express.json())
questionRouter.use(cors())

// create new question in a survey
questionRouter.post('/addQuestion', cors(), (req, res) => {

    let { questionName, options } = req.body

    if (questionName !== '' && options !== []) {
        addQuestion()
    }

    async function addQuestion() {
        let newQuestion = new questionModel(req.body)
        await newQuestion.save()
        res.end()
    }
})


module.exports = questionRouter