const mongoose = require('mongoose')

let questionSchema = mongoose.Schema({
    "questionName": String,
    "options": [String],
    "isMCQ": String,
    "surveyId": String
})

let questionModel = mongoose.model('Question', questionSchema)

module.exports = questionModel