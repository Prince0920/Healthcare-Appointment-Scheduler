import React from 'react';

const WorkingHours = ({ workingHours, handleWorkingHoursChange }) => {
  return (
    <div className='form-group'>
      <label>Working Hours</label>
      <div className='working-hours-input'>
        {workingHours.map((item, index) => (
          <div
            key={index}
            className='working-hours-day'>
            <label>{item.day}</label>
            <input
              type='text'
              name={`workingHours[${index}].hours`}
              value={item.hours}
              onChange={e => handleWorkingHoursChange(e, index)}
              placeholder={`e.g., 9:00 AM - 5:00 PM`}
              className='form-control'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingHours;
