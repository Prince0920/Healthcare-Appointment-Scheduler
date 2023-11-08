import React from 'react';

const SubmitButton = ({ onClick, isSubmitting, buttonText }) => (
  <button
    className='btn btn-primary'
    onClick={onClick}
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <i className='fa fa-spinner fa-spin'></i>
    ) : (
      buttonText
    )}
  </button>
);

export default SubmitButton;
