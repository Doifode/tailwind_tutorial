import React from 'react'

function Feedback() {
  return (
    <div className="form-box">
            <div className="textup">
                <i className="fa fa-solid fa-clock"></i>
                It only takes two minutes!!
            </div>
            <form action='https://docs.google.com/forms/d/e/1FAIpQLSdDi8frJ33H02fAFV5pKf6lEykxvWK4em609tTbVEV92Yi_ZA/formResponse'>
                <label htmlFor="uname">
                    <i className="fa fa-solid fa-user"></i>
                    Name
                </label>
                <input type="text" id="uname" name="entry.485428648" required />

                <label htmlFor="email">
                    <i className="fa fa-solid fa-envelope"></i>
                    Email Address
                </label>
                <input type="email" id="email" name="entry.879531967" required />

                <label htmlFor="phone">
                    <i className="fa-solid fa-phone"></i>
                    Phone No
                </label>
                <input type="tel" id="phone" name="entry.1696159737" required />

                <label>
                    <i className="fa-solid fa-face-smile"></i>
                    Did you find the information provided about the platform clear and helpful?
                </label> 
                <div className="radio-group">
                    <input type="radio" id="yes" name="entry.1591633300" value="yes" defaultChecked />
                    <label htmlFor="yes">Yes</label>

                    <input type="radio" id="no" name="entry.1591633300" value="no" />
                    <label htmlFor="no">No</label>
                </div>

                <label htmlFor="msg">
                    <i className="fa-solid fa-comments" style={{ marginRight: '3px' }}></i>
                    Write your Suggestions:
                </label>
                <textarea id="msg" name="entry.326955045" rows="4" cols="10" required></textarea>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Feedback