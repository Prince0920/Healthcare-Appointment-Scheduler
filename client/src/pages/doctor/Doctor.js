import React, { useEffect, useState } from 'react';
import { Steps } from 'antd'; // Import the Steps component
import axios from 'axios';
import Layouts from '../../components/Layouts';
import ContentHeader from '../../components/ContentHeader';
import SubmitButton from '../../components/buttons/SubmitButton';
import BasicDetail from './BasicDetail';
import AddressDetails from './AddressDetails';
import AdditionalDetails from './AdditionalDetails';
import WorkingHours from './WorkingHours';
import { SERVER_BASE_URL } from '../../config/config.local';
import { toast } from 'react-toastify';

const { Step } = Steps; // Destructure the Step component

export const Doctor = () => {
  // Create a new state variable for address
  const [currentStage, setCurrentStage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define constants
  const API_URL = SERVER_BASE_URL + '/api/v1/doctor/profile';

  const [basicData, setBasicData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
  });

  const [address, setAddress] = useState({
    landmark: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [additionalDetails, setAdditionalDetails] = useState({
    education: '',
    experience: '',
    medicalSpecialty: '',
    certifications: [],
    about: '',
    telemedicine: false,
  });
  // Create a new state variable for working hours
  const [workingHours, setWorkingHours] = useState([
    { day: 'Monday', hours: '' },
    { day: 'Tuesday', hours: '' },
    { day: 'Wednesday', hours: '' },
    { day: 'Thursday', hours: '' },
    { day: 'Friday', hours: '' },
    { day: 'Saturday', hours: '' },
    { day: 'Sunday', hours: '' },
  ]);

  // Create a separate handler function for working hours changes
  const handleWorkingHoursChange = (e, index) => {
    const { name, value } = e.target;
    setWorkingHours(prevWorkingHours => {
      const updatedWorkingHours = [...prevWorkingHours];
      updatedWorkingHours[index]['hours'] = value;
      return updatedWorkingHours;
    });
  };

  const nextStage = e => {
    e.preventDefault();

    // Validate the data for the current step
    if (currentStage === 0) {
      // Check basic data validation
      const isBasicDataValid = validateBasicData();
      console.log('isBasicDataValidisBasicDataValid', isBasicDataValid);
      if (isBasicDataValid) {
        setCurrentStage(currentStage + 1);
      }
    } else if (currentStage === 1) {
      // Check address validation
      const isAddressValid = validateAddress();
      if (isAddressValid) {
        setCurrentStage(currentStage + 1);
      }
    } else if (currentStage === 2) {
      // Check additional details validation
      const isAdditionalDetailsValid = validateAdditionalDetails();
      if (isAdditionalDetailsValid) {
        setCurrentStage(currentStage + 1);
      }
    } else if (currentStage === 3) {
      // Proceed to the next step without validation
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = e => {
    e.preventDefault(); // Prevent the default form submission behavior
    setCurrentStage(currentStage - 1);
  };

  // Create a separate handler function for address changes
  const handleAddressChange = e => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  // Create a separate handler function for basic data changes
  const handleBasicDataChange = e => {
    const { name, value } = e.target;
    setBasicData({
      ...basicData,
      [name]: value,
    });
  };

  const handleAdditionalDetailsChange = e => {
    const { name, value } = e.target;

    if (name === 'certifications') {
      // Split the comma-separated string into an array
      const certificationsArray = value.split(',').map(certification => certification.trim());
      setAdditionalDetails(prevDetails => ({
        ...prevDetails,
        [name]: certificationsArray,
      }));
    } else {
      setAdditionalDetails(prevDetails => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  // Validation error states
  const [basicDataErrors, setBasicDataErrors] = useState({});
  const [addressErrors, setAddressErrors] = useState({});
  const [additionalDetailsErrors, setAdditionalDetailsErrors] = useState({});

  // Validation rules (customize these according to your requirements)
  const validateBasicData = () => {
    const errors = {};
    if (!basicData.fullName) {
      errors.fullname = 'Fullname is required';
    }
    if (!basicData.gender) {
      errors.gender = 'Gender is required';
    }
    if (!basicData.dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    }
    if (!basicData.phone) {
      errors.phone = 'Phone is required';
    }
    setBasicDataErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAddress = () => {
    const errors = {};

    // Validate street address
    if (!address.street) {
      errors.street = 'Street Address is required';
    }

    // Validate landmark
    if (!address.landmark) {
      errors.landmark = 'Landmark is required';
    }

    // Validate city
    if (!address.city) {
      errors.city = 'City is required';
    }

    // Validate state
    if (!address.state) {
      errors.state = 'State is required';
    }

    // Validate postal code
    if (!address.postalCode) {
      errors.postalCode = 'Postal Code is required';
    }

    // Validate country
    if (!address.country) {
      errors.country = 'Country is required';
    }

    // Set errors for address fields
    setAddressErrors(errors);

    // Check if there are any errors
    return Object.keys(errors).length === 0;
  };

  const validateAdditionalDetails = () => {
    const errors = {};

    // Validate education
    if (!additionalDetails.education) {
      errors.education = 'Education is required';
    }

    // Validate experience
    if (!additionalDetails.experience) {
      errors.experience = 'Experience is required';
    }

    // Validate medical specialty
    if (!additionalDetails.medicalSpecialty) {
      errors.medicalSpecialty = 'Medical Specialty is required';
    }

    // Set errors for additional details fields
    setAdditionalDetailsErrors(errors);

    // Check if there are any errors
    return Object.keys(errors).length === 0;
  };

  // Function to fetch patient profile
  const getDoctorProfile = () => {
    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        let doctorProfile = response.data.data;
        console.log('doctor get profile', doctorProfile);
        const dateOfBirth = doctorProfile.dateOfBirth
          ? new Date(doctorProfile.dateOfBirth).toISOString().split('T')[0]
          : '';
        setBasicData({
          fullName: doctorProfile.fullName,
          gender: doctorProfile.gender,
          dateOfBirth: dateOfBirth,
          phone: doctorProfile.phone,
        });
        setAddress(doctorProfile.address);
        setAdditionalDetails({
          education: doctorProfile.education,
          experience: doctorProfile.experience,
          medicalSpecialty: doctorProfile.medicalSpecialty,
          certifications: doctorProfile.certifications,
          about: doctorProfile.about,
          telemedicine: doctorProfile.telemedicine,
        });
        setWorkingHours(doctorProfile.workingHours);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    getDoctorProfile();
  }, []);
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const validateAdditionalError = validateAdditionalDetails();
    const validateAddressError = validateAddress();
    const validateBasicError = validateBasicData();

    console.log('validateAdditionalError', validateAdditionalError);
    console.log('validateAddressError', validateAddressError);
    console.log('validateBasicError', validateBasicError);
    if (validateAdditionalError && validateAddressError && validateBasicError) {
      try {
        const dataToSend = {
          ...basicData,
          address,
          ...additionalDetails,
          workingHours,
        };

        axios
          .put(API_URL, dataToSend, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          .then(response => {
            if (response.data.success) {
              toast.success(response.data.message);
            }
            // Reset isSubmitting to false after successful submission
            setIsSubmitting(false);
          })
          .catch(error => {
            console.error('Error:', error);
            // Reset isSubmitting to false after submission error
            setIsSubmitting(false);
          });
      } catch (error) {
        // Handle and display error messages
      }
    }
  };
  const steps = [
    {
      title: 'Basic Details',
      content: (
        <BasicDetail
          doctorData={basicData}
          handleInputChange={handleBasicDataChange}
          basicDataErrors={basicDataErrors}
        />
      ),
    },
    {
      title: 'Address Details',
      content: (
        <AddressDetails
          address={address}
          handleAddressChange={handleAddressChange}
          addressErrors={addressErrors}
        />
      ),
    },
    {
      title: 'Additional Details',
      content: (
        <AdditionalDetails
          additionalDetails={additionalDetails}
          handleAdditionalDetailsChange={handleAdditionalDetailsChange}
          additionalDetailsErrors={additionalDetailsErrors}
        />
      ),
    },
    {
      title: 'Working Hours',
      content: (
        <WorkingHours
          workingHours={workingHours}
          handleWorkingHoursChange={handleWorkingHoursChange}
        />
      ),
    },
  ];

  return (
    <Layouts>
      <div className='content-wrapper'>
        <ContentHeader
          heading='Doctor Profile'
          bredCumName='Doctor Profile'
        />
        <section className='content'>
          <div className='container-fluid'>
            <div className='card card-primary'>
              <div className='card-header'>
                <h3 className='card-title'>Update Doctor Details</h3>
              </div>
              <div className='card-body'>
                <Steps current={currentStage}>
                  {steps.map((step, index) => (
                    <Step
                      key={index}
                      title={step.title}
                    />
                  ))}
                </Steps>
                <div className='steps-content'>{steps[currentStage].content}</div>
                <div className='steps-action'>
                  {currentStage > 0 && (
                    <button
                      onClick={prevStage}
                      className='btn btn-primary mr-2'>
                      Back
                    </button>
                  )}
                  {currentStage < steps.length - 1 && (
                    <button
                      onClick={nextStage}
                      className='btn btn-primary'>
                      Next
                    </button>
                  )}
                  {currentStage === steps.length - 1 && (
                    <SubmitButton
                      onClick={handleSubmit}
                      isSubmitting={isSubmitting}
                      buttonText='Submit'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layouts>
  );
};

export default Doctor;
