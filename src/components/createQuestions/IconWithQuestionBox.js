import React, { useState } from 'react';

function IconWithQuestionBox() {
  const [showBox, setShowBox] = useState(false);

  const handleClick = () => {
    setShowBox(true);
  }

  return (
    <div>
      <img src="icon.png" onClick={handleClick} />
      {showBox &&
        <div>
            Question Type
            <label>
                <input type="radio" name="color" value="red" />
                     Multiple Choice
            </label>
        </div>
      }
    </div>
  );
}
export default IconWithQuestionBox