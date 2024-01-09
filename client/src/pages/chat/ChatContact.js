import React from 'react';

const ChatContact = ({ imgSrc, name, date, msg }) => {
  return (
    <li>
      <a href='#'>
        <img
          className='contacts-list-img'
          src={imgSrc}
        />
        <div className='contacts-list-info'>
          <span className='contacts-list-name'>
            {name}
            <small className='contacts-list-date float-right'>{date}</small>
          </span>
          <span className='contacts-list-msg'>{msg}</span>
        </div>
      </a>
    </li>
  );
};

export default ChatContact;
