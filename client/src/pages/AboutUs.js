import React from 'react';
import Layouts from '../components/Layouts';

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '5px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  backgroundColor: '#fff',
};

const headingStyle = {
  color: '#007bff',
  fontSize: '24px',
  marginTop: '20px',
};

const paragraphStyle = {
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '20px',
};

const AboutUs = () => {
  return (
    <Layouts>
      <div className='content-wrapper'>
        <div style={cardStyle}>
          <h2 style={headingStyle}>About Us</h2>
          <p style={paragraphStyle}>
            Welcome to our website! We are a passionate team dedicated to providing you with the best
            services and information.
          </p>
          <p style={paragraphStyle}>
            Our mission is to serve our customers and make a positive impact in their lives. We strive
            to deliver high-quality products and services.
          </p>
          <p style={paragraphStyle}>
            If you have any questions or need assistance, please feel free to contact us. We're here
            to help!
          </p>
        </div>
      </div>
    </Layouts>
  );
};

export default AboutUs;
