import React, { useState, useEffect } from "react"
import './CreateSurvey.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import SideBar from "../dashboard/SideBar";

const EditSurvey = () => {
    // ======================= Log out functionality =======================
    const navigate = useNavigate()
    function logout() {
        navigate('/login')
        localStorage.removeItem("isLoggedIn")
    }

    // ======================= Taking user input =======================
    let [newSurvey, setNewSurvey] = useState({
        surveyId: "",
        surveyName: "",
        description: "",
        type: "",
        startDate: "",
        endDate: "",
        otherCriteria: "",
        image: ""
    })
    // get survey id from local storage
    // then fetch survey data from data base
    // then populate form with survey data
    useEffect(() => {
        let surveyId = localStorage.getItem('surveyId')
        localStorage.removeItem('surveyId')
        axios.get(`https://survey-form-project-backend.onrender.com/getSurvey/${surveyId}`)
            .then(res => {
                setNewSurvey({
                    surveyId: res.data._id,
                    surveyName: res.data.surveyName,
                    description: res.data.description,
                    type: res.data.type,
                    startDate: res.data.startDate,
                    endDate: res.data.endDate,
                    otherCriteria: res.data.otherCriteria,
                    image: res.data.image
                })
            })
    })
    function ChangeSurveyName(e) {
        let value = e.target.value
        setNewSurvey({ ...newSurvey, surveyName: value })
    }
    function ChangeDescription(e) {
        let value = e.target.value
        setNewSurvey({ ...newSurvey, description: value })
    }
    function ChangeType(e) {
        let value = e.target.value
        setNewSurvey({ ...newSurvey, type: value })
    }
    function ChangeStartDate(e) {
        let value = e.target.value
        setNewSurvey({ ...newSurvey, startDate: value })
    }
    function ChangeEndDate(e) {
        let value = e.target.value
        setNewSurvey({ ...newSurvey, endDate: value })
    }
    function ChangeOtherCriteria(e) {
        let value = e.target.value
        setNewSurvey({ ...newSurvey, otherCriteria: value })
    }

    // ======================= Change image to string =======================
    function convertImage(event) {
        let file = event.target.files[0]
        let reader = new FileReader()
        reader.onloadend = function () {
            setNewSurvey({ ...newSurvey, image: reader.result })
        }
        reader.readAsDataURL(file)
    }

    // ======================= Send edits to data base =======================
    async function confirmEditSurvey() {
        if (newSurvey.surveyId !== '') {
            await axios.post('https://survey-form-project-backend.onrender.com/editSurvey', newSurvey)
            navigate('/dashboard')
        } else {
            alert("Sorry! some error happened, go back and try again.")
        }
    }

    // ======================= Rendered Output =======================
    return (
        <div>
            {/* ================ Nav Bar at the top ================ */}
            <nav className='create-survey-navbar'>
                <div className='logo'>LOGO</div>
                <div className="log-out" onClick={logout}>Log Out</div>
            </nav>

            {/* ================ Side bar ================ */}
            <SideBar />

            {/* ================ Header ================ */}
            <header className="createhead">
                <h1>Edit Survey</h1>
                <div className="header-buttons">
                    <Link to="/dashboard">
                        <button className="cancelbtn">Cancel</button>
                    </Link>
                    <button className="nextbtn" onClick={confirmEditSurvey}>Save</button>
                </div>
            </header>

            {/* ================ Main ================ */}
            <main className="create-survey-main">
                <div className="main1">
                    <div>
                        <h2>Name</h2>
                        <input id="namein" type="text" placeholder="" value={newSurvey.surveyName}
                            name="surveyName" onChange={(e) => ChangeSurveyName(e)} />
                    </div>
                    <div>
                        <h2>Description</h2>
                        <input id="descin" type="text" placeholder="" value={newSurvey.description}
                            onChange={(e) => ChangeDescription(e)} />
                    </div>
                    <div>
                        <h2>Type of Survey</h2>
                        <select name="Select" id="surveyselect"
                            onChange={(e) => ChangeType(e)}>
                            <option value="select">select</option>
                            <option value="Video">Video</option>
                            <option value="Image">Image</option>
                            <option value="Text">Text</option>
                        </select>
                    </div>
                </div>
                <div className="main2">
                    <div>
                        <h2>Start Date</h2>
                        <input className="datein" type="date" value={newSurvey.startDate}
                            onChange={(e) => ChangeStartDate(e)} />
                    </div>
                    <div>
                        <h2>End Date</h2>
                        <input className="datein" type="date" value={newSurvey.endDate}
                            onChange={(e) => ChangeEndDate(e)} />
                    </div>
                    <div>
                        <h2>Other Criteria</h2>
                        <input id="critin" type="text" placeholder="" value={newSurvey.otherCriteria}
                            onChange={(e) => ChangeOtherCriteria(e)} />
                    </div>
                    <div>
                        <h2>Upload Image</h2>
                        <label id="uploadlabel" htmlFor="upload" onChange={(e) => convertImage(e)}>
                            Drag and drop to Upload <br />
                            <input type="file" id="upload" />
                        </label>
                        {newSurvey.image !== '' ? <img src={newSurvey.image} className='upload-image' /> : <></>}
                    </div>
                </div>
            </main>
        </div>
    )
}
export default EditSurvey