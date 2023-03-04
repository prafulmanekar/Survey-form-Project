const mongoose = require('mongoose')

let surveySchema = mongoose.Schema({
    "surveyName": String,
    "description": String,
    "type": String,
    "startDate": String,
    "endDate": String,
    "otherCriteria": String,
    "image": String,
    "userId": String
})

let surveyModel = mongoose.model('Survey', surveySchema)

module.exports = surveyModel