import React from 'react';
import Layouts from '../components/Layouts';

const ContactUs = () => {
  const cardStyle = {
    padding: '20px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    borderRadius: '5px',
    margin: '20px',
  };

  const contactHeadingStyle = {
    color: '#007bff',
    fontSize: '24px',
    marginTop: '20px',
  };

  const contactDetailsStyle = {
    marginTop: '20px',
  };

  const addressStyle = {
    fontSize: '16px',
    marginTop: '10px',
  };

  const contactFormStyle = {
    marginTop: '20px',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const submitButtonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <Layouts>
      <div className='content-wrapper'>
        <div className='card' style={cardStyle}>
          <h2 style={contactHeadingStyle}>Contact Us</h2>

          <div style={contactDetailsStyle}>
            <p>For any inquiries or assistance, please don't hesitate to contact us:</p>

            <address style={addressStyle}>
              <strong>Company Name</strong>
              <br />
              123 Main Street
              <br />
              City, Country
              <br />
              Email: contact@example.com
              <br />
              Phone: +123 456 789
            </address>
          </div>

          <div style={contactFormStyle}>
            <h3>Send Us a Message</h3>
            <form>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Name:</label>
                <input type='text' style={inputStyle} />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Email:</label>
                <input type='email' style={inputStyle} />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Message:</label>
                <textarea rows='4' style={inputStyle}></textarea>
              </div>
              <button type='submit' style={submitButtonStyle}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default ContactUs;
