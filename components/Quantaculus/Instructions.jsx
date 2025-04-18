import React from 'react'
import * as styles from './Quantaculus.module.scss'

const Instructions = ({onQuizOpen}) => {

  const handleSubmit = async (event) => {
    onQuizOpen();
    event.preventDefault();
  }

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  return (
    <div className={styles.instructions}>
        <h1>INSTRUCTIONS</h1>
        <ul>
            <li>Total Questions: 80</li>
            <li>Total Time: 25 min and 25 sec per question</li>
            <li>Marking Scheme: +1 for correct answer/ -1 for wrong answer/ 0 for unattempted.</li>
            <li>The test will auto-submit after the countdown of 25 minutes runs out. Additionally, each question will auto submit after 25 seconds.</li>
            <li>Do not reload the page, as your progress will not be saved.</li>
            <li>The test has to be attempted using only one device. Both the teammates have to attempt it together through a single device.</li>
            <li>The responses cannot be changed after a test has been submitted.</li>
            <li>Use of unfair means and taking more than the alloted time is not allowed.</li>
            <li> The use of calculators and using internet for obtaining answers is strictly prohibited. If found guilty, SAC reserves the right to disqualify the team.</li>
            <li>Marks, then time taken, then accuracy is to be considered in case of tiebreaker.</li>
        </ul>

        <div className={styles.instructionsButtons}> 
          <button onClick={handleSubmit}>NEXT</button>
          <button onClick={handleLogout} className={styles.logout}>LOGOUT</button>
        </div>
    </div>
  )
}

export default Instructions;