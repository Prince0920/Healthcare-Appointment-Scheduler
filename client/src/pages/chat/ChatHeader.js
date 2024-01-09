import React from 'react';

const ChatHeader = () => {
  return (
    <div className='card-header'>
      <h3 className='card-title'>Direct Chat</h3>
      <div className='card-tools'>
        <span
          data-toggle='tooltip'
          title='3 New Messages'
          className='badge badge-light'>
          3
        </span>
        <button
          type='button'
          className='btn btn-tool'
          data-widget='collapse'>
          <i className='fas fa-minus' />
        </button>
        <button
          type='button'
          className='btn btn-tool'
          data-toggle='tooltip'
          title='Contacts'
          data-widget='chat-pane-toggle'>
          <i className='fas fa-comments' />
        </button>
        <button
          type='button'
          className='btn btn-tool'
          data-widget='remove'>
          <i className='fas fa-times' />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
