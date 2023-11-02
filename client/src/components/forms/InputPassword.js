import React from 'react';

const InputPassword = ({ defaultValue, value, handleInputChange }) => {
  return (
    <>
      <label htmlFor='exampleInputPassword1'>Password</label>
      <input
        type='password'
        className='form-control'
        placeholder='********'
        name='password'
        onChange={handleInputChange}
        value={value}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default InputPassword;
