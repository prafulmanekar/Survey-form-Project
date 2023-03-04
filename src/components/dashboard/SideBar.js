import './Sidebar.css'
import homeIcon from '../../images/home.png'
import peopleIcon from '../../images/people.png'
import listIcon from '../../images/list.png'
import { useNavigate } from 'react-router-dom'

function SideBar() {
    const navigate = useNavigate()
    function sendToDashboard() {
        navigate('/dashboard')
    }
    return <div className="side-bar">
        <img src={homeIcon} onClick={sendToDashboard} />
        <img src={peopleIcon} onClick={sendToDashboard} />
        <img src={listIcon} onClick={sendToDashboard} />
    </div>
}

export default SideBar