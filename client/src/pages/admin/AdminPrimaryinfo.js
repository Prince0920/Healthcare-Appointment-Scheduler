import React from "react";
import SingleImageUpload from "../../components/forms/SingleImageUpload"
import axios from "axios";
import { SERVER_BASE_URL } from "../../config/config.local"
import { toast } from 'react-toastify';
const AdminPrimaryinfo = ({ primaryInfo, handleProfileInfoChange }) => {

  const handleUploadButtonClick = async data => {
    try {
      const formData = new FormData();
      formData.append('avatar', data);

      // Make the API call
      
      const response = await axios.post(
        SERVER_BASE_URL + '/api/v1/admin/profile-pitcher',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Profile Image saved success!!');
      } else {
        toast.success('Please try again..');
      }
      // Handle the API response as needed
    } catch (error) {
      console.error('API Error:', error);
      // Handle API error
    }
  };


  return (
    <div className="row">


        <div className='col-12'>
          <SingleImageUpload
            handleUploadButtonClick={handleUploadButtonClick}
            imageUrl={primaryInfo?.profileImage}
          />
       
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="fullname"
            value={primaryInfo.fullname}
            onChange={handleProfileInfoChange}
            required
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={primaryInfo.email}
            onChange={handleProfileInfoChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPrimaryinfo;
