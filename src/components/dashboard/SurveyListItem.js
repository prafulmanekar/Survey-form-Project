import './SurveyListItem.css'
import pencil from "../../images/edit_pencil.png"
import trash_can from "../../images/trash_can.png"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function SurveyListItem({ listItem }) {

    const navigate = useNavigate()
    let [viewQuestions, setViewQuestions] = useState(false)
    let [questionList, setQuestionList] = useState([])
    let [displayState, setDisplay] = useState('flex')

    async function deleteSurvey() {
        await axios.delete(`https://survey-form-project-backend.onrender.com/delete/${listItem._id}`)
        setDisplay('none')
    }

    // send to edit survey page
    function editSurvey(questionItem) {
        localStorage.setItem('surveyId', `${questionItem._id}`)
        navigate('/editSurvey')
    }

    // toggle view of survey questions
    async function viewSurvey() {
        setViewQuestions(prev => !prev)
        let response = await axios.get(`https://survey-form-project-backend.onrender.com/questionList/${listItem._id}`)
        let questionList = response.data
        setQuestionList(questionList)

    }

    return <>
        <div className="survey-list-item" style={{ display: displayState }}>
            <div>{listItem.surveyName}
                &nbsp; &nbsp;
                <img src={listItem.image} width='30' />
            </div>
            <div>{listItem.description}</div >
            <div>{listItem.type}</div >
            <div>{listItem["startDate"]}</div >
            <div>{listItem["endDate"]}</div >
            <div className='icon actions'>
                <button id='survey-list-item-edit' onClick={() => editSurvey(listItem)}>
                    Edit
                </button>
                <button id='survey-list-item-view' onClick={viewSurvey}>
                    {viewQuestions ? 'Close' : 'View'}
                </button>
                <a href='#'>
                    <img src={trash_can} onClick={deleteSurvey} />
                </a>
            </div >
        </div>

        {viewQuestions ? <div className='survey-questions'>
            <ul>
                {questionList.map((question_item, index) => {
                    return <li key={index} className='survey-questions-row'>
                        <div className='survey-questions-left'>
                            Question: {question_item.questionName}
                        </div>
                        <div className='survey-questions-right'>
                            {question_item.options.map((options_item) => {
                                return <>
                                    &nbsp;<input type='radio' name={question_item.questionName} />{options_item}
                                </>
                            })}
                        </div>

                    </li>
                })}
            </ul>
        </div> : <></>}
    </>
}

export default SurveyListItem 