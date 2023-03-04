const express = require('express')
const surveyRouter = express.Router()
let surveyModel = require('../models/survey.js')
let questionModel = require('../models/question')
const cors = require('cors')

surveyRouter.use(express.json({ limit: '100mb' }))
surveyRouter.use(cors())

surveyRouter.get('/allSurveys', (req, res) => {
    // fins all surveys with the same user id
    async function findSurveyByUser() {
        let surveyList = await surveyModel.find()
        res.end(JSON.stringify(surveyList))
    }

    findSurveyByUser()
})

surveyRouter.post('/editSurvey', cors(), (req, res) => {
    let { surveyId, ...editedSurvey } = req.body
    async function EditSurveyById() {
        let surveyItem = await surveyModel.findById(surveyId)
        surveyItem.surveyName = editedSurvey.surveyName
        surveyItem.description = editedSurvey.description
        surveyItem.type = editedSurvey.type
        surveyItem.startDate = editedSurvey.startDate
        surveyItem.endDate = editedSurvey.endDate
        surveyItem.otherCriteria = editedSurvey.otherCriteria
        surveyItem.image = editedSurvey.image
        await surveyItem.save()
        res.end()
    }

    EditSurveyById()
})

// get all question in survey list
surveyRouter.get('/questionList/:surveyId', cors(), (req, res) => {
    let surveyId = req.params.surveyId
    async function getQuestions() {
        let questionList = await questionModel.find({ surveyId: surveyId })
        res.end(JSON.stringify(questionList))
    }
    getQuestions()
})

surveyRouter.post('/newSurvey', cors(), (req, res) => {

    // add new survey to database
    async function createSurvey() {
        let newSurvey = new surveyModel(req.body)
        await newSurvey.save()
        res.end('survey added to db')
    }

    createSurvey()
})

surveyRouter.get('/sort', cors(), (req, res) => {
    // fins all surveys with the same user id in sorted order
    async function findSurveyByUserSorted() {
        let surveyList = await surveyModel.find().sort('surveyName')
        res.end(JSON.stringify(surveyList))
    }
    findSurveyByUserSorted()
})

// search survey by word in name
surveyRouter.post('/search', cors(), (req, res) => {
    let { word } = req.body
    // find all surveys where survey name container the given word
    async function findSurveyByWord() {
        let surveyList = await surveyModel.find({ surveyName: word })
        res.end(JSON.stringify(surveyList))
    }

    findSurveyByWord()
})

surveyRouter.delete('/delete/:survey_id', cors(), (req, res) => {
    // make back end call to delete survey
    async function deleteSurvey() {
        await surveyModel.findByIdAndDelete(req.params.survey_id)
        res.end()
    }

    deleteSurvey()
})

surveyRouter.get('/getSurvey/:surveyId', cors(), (req, res) => {
    let surveyId = req.params.surveyId
    async function getSurveyById() {
        if (surveyId !== 'null') {
            // to handle a specific error
            let surveyData = await surveyModel.findById(surveyId)
            res.end(JSON.stringify(surveyData))
        }
    }
    getSurveyById()
})

module.exports = surveyRouter