import React from 'react';

function Feedback() {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <i className="fa fa-solid fa-clock"></i>
        <span> It only takes two minutes!!</span>
      </div>

      <form 
        action="https://docs.google.com/forms/d/e/1FAIpQLSdDi8frJ33H02fAFV5pKf6lEykxvWK4em609tTbVEV92Yi_ZA/formResponse"
        method="POST"
        target="_self"
      >
        <div className="mb-3">
          <label htmlFor="uname" className="form-label">
            <i className="fa fa-solid fa-user"></i> Name
          </label>
          <input 
            type="text" 
            id="uname" 
            name="entry.485428648" 
            className="form-control" 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <i className="fa fa-solid fa-envelope"></i> Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            name="entry.879531967" 
            className="form-control" 
            required 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            <i className="fa-solid fa-phone"></i> Phone No
          </label>
          <input 
            type="tel" 
            id="phone" 
            name="entry.1696159737" 
            className="form-control" 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            <i className="fa-solid fa-face-smile"></i> 
            Did you find the information provided about the platform clear and helpful?
          </label> 
          <div className="form-check form-check-inline">
            <input 
              type="radio" 
              id="yes" 
              name="entry.1591633300" 
              value="yes" 
              className="form-check-input" 
              defaultChecked 
            />
            <label htmlFor="yes" className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input 
              type="radio" 
              id="no" 
              name="entry.1591633300" 
              value="no" 
              className="form-check-input" 
            />
            <label htmlFor="no" className="form-check-label">No</label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="msg" className="form-label">
            <i className="fa-solid fa-comments" style={{ marginRight: '3px' }}></i> Write your Suggestions:
          </label>
          <textarea 
            id="msg" 
            name="entry.326955045" 
            className="form-control" 
            rows="4" 
            required 
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;
