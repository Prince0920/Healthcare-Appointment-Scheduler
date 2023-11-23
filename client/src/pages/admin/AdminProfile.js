import React, { useEffect, useState } from 'react';
import Layouts from '../../components/Layouts';
import SubmitButton from '../../components/buttons/SubmitButton';
import { SERVER_BASE_URL } from '../../config/config.local';
import axios from 'axios';
import AdminPrimaryInfo from './AdminPrimaryinfo';
import { toast } from 'react-toastify';

const AdminProfile = () => {
  const handleSubmit = () => {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [primaryInfo, setPrimaryInfo] = useState({ fullname: '', email: '' });

  const fetchAdminProfile = async () => {
    try {
      let fetchApiUrl = SERVER_BASE_URL + '/api/v1/admin/adminProfileInfo';
      const res = await axios.get(fetchApiUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        console.log(res.data.data);
        setPrimaryInfo(res.data.data);
      } else {
        console.log('something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const handleProfileInfoChange = (e) => {
    const { name, value } = e.target;
    setPrimaryInfo({
      ...primaryInfo,
      [name]: value,
    });
    console.log(value);
  };

  const handleSubmitAdmiProUpdate = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const adminProfileData = {
      primaryInfo: primaryInfo,
    };
    // console.log(hospitalProfileData);
    try {
      const res = await axios.post(
        SERVER_BASE_URL + '/api/v1/admin/adminUpdateProfile',
        JSON.stringify(adminProfileData),
        {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'content-type': 'application/json',
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }

    //console.log("Yes submitted");
  };

  return (
    <Layouts>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card  card-primary">
                  <div class="card-header" bis_skin_checked="1">
                    <h3 class="card-title">Admin Profile</h3>
                  </div>
                  <div className="card-body">
                    <form>
                      <AdminPrimaryInfo
                        primaryInfo={primaryInfo}
                        handleProfileInfoChange={handleProfileInfoChange}
                      />
                      {/* Submit Button */}
                      <SubmitButton
                        onClick={handleSubmitAdmiProUpdate}
                        isSubmitting={isSubmitting}
                        buttonText="Update"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layouts>
  );
};

export default AdminProfile;
