import React from 'react';

const ChatFooter = () => {
  return (
    <div className='card-footer'>
      <form
        action='#'
        method='post'>
        <div className='input-group'>
          <input
            type='text'
            name='message'
            placeholder='Type Message ...'
            className='form-control'
          />
          <span className='input-group-append'>
            <button
              type='button'
              className='btn btn-primary'>
              Send
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ChatFooter;
