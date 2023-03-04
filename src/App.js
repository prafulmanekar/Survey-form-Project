import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SurveyList from './components/dashboard/SurveyList';
import Login from './components/login/login'
import Register from './components/register/register'
import CreateSurvey from './components/createSurvey/CreateSurvey';
import FullCreateQuestionPage from './components/createQuestions/FullCreateQuestionPage';
import EditSurvey from './components/createSurvey/EditSurvey';

function App() {

  // check if user is looged in
  let loginStatus = localStorage.getItem("isLoggedIn")

  return (<div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/"
          element={
            loginStatus === null ? <Login /> : <SurveyList />
          }>
        </Route>
        {/* <Route path="/" element={<Login />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<SurveyList />}></Route>
        <Route path='/createSurvey' element={<CreateSurvey />}></Route>
        <Route path='/editSurvey' element={<EditSurvey />}></Route>
        <Route path='/createQuestions' element={<FullCreateQuestionPage />}></Route>
      </Routes>
    </BrowserRouter>
  </div>);
}

export default App;
