import React from 'react';
import './CreateQuestion.css'
import { useNavigate } from 'react-router-dom';

function CreateQuestion({ preview, setPreview }) {
  const navigate = useNavigate()
  return (
    <div className="button-group">
      <span>Create Questions</span>
      <div className="button-group-right">
        {!preview ? <button onClick={() => setPreview(prev => !prev)}>Preview</button> : <></>}
        <button onClick={() => {
          navigate('/dashboard')
        }}>Save</button>
      </div>
    </div>
  );
}

export default CreateQuestion;
