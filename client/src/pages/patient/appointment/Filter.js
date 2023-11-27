import React, { useEffect, useState } from 'react';
import { SERVER_BASE_URL } from '../../../config/config.local';
import axios from 'axios';

const Filter = ({ fetchProviders }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    medicalSpecialty: '',
  });

  const handleSearchChange = e => {
    const { name, value } = e.target;
    setSearchCriteria(prevSearchCriteria => ({
      ...prevSearchCriteria,
      [name]: value,
    }));
  };

  //   useEffect(() => {
  //     fetchProviders(searchCriteria);
  //   }, [searchCriteria]);

  const [medicalSpec, setMedicalSpecility] = useState([]);

  const getAllMedicalSpec = async () => {
    const url = SERVER_BASE_URL + '/api/v1/medical-speciality';
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    setMedicalSpecility(res.data.data);
  };

  useEffect(() => {
    getAllMedicalSpec();
  }, []);

  return (
    <div
      className='card'
      style={{ position: 'sticky', top: '20px' }}>
      <div className='card-body'>
        <h2 className='mb-4'>Filter</h2>
        <div className='mb-4 row'>
          {/* Filter section  */}
          <div className='col-md-12 mb-3'>
            {' '}
            {/* Changed the class to col-md-12 to make it full width  */}
            <div className='row'>
              <div className='col-12 mb-3'>
                <label>Medical Specialty</label>
                <select
                  name='medicalSpecialty'
                  value={searchCriteria.medicalSpecialty}
                  onChange={handleSearchChange}
                  className='form-control'>
                  <option
                    value=''
                    disabled>
                    Select Medical Specialty
                  </option>
                  {medicalSpec.map(spec => (
                    <option
                      key={spec._id}
                      value={spec.name}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <button
              onClick={() => {
                fetchProviders(searchCriteria);
              }}
              className='btn btn-primary'>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
