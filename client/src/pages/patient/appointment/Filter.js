import React, { useEffect, useState } from 'react';

const Filter = ({ fetchProviders }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    location: '',
    specialization: '',
    date: '',
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
                {' '}
                {/* Placed the filter on the left side  */}
                <label className='form-label'>Location</label>
                <input
                  type='text'
                  name='location'
                  value={searchCriteria.location}
                  onChange={handleSearchChange}
                  className='form-control'
                />
              </div>
              <div className='col-12 mb-3'>
                <label className='form-label'>Specialization</label>
                <input
                  type='text'
                  name='specialization'
                  value={searchCriteria.specialization}
                  onChange={handleSearchChange}
                  className='form-control'
                />
              </div>
              <div className='col-12 mb-3'>
                <label className='form-label'>Date</label>
                <input
                  type='date'
                  name='date'
                  value={searchCriteria.date}
                  onChange={handleSearchChange}
                  className='form-control'
                />
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
