import React from 'react';
import ChatContact from './ChatContact';

const ChatContactsList = () => {
  return (
    <div className='direct-chat-contacts'>
      <ul className='contacts-list'>
        <ChatContact
          imgSrc={'https://adminlte.io/docs/3.0/assets/img/user1-128x128.jpg'}
          name={'Count Dracula'}
          date={'2/28/2015'}
          msg={'How have you been? I was...'}
        />
        <ChatContact
          imgSrc={'https://adminlte.io/docs/3.0/assets/img/user7-128x128.jpg'}
          name={'Sarah Doe'}
          date={'2/23/2015'}
          msg={'I will be waiting for...'}
        />
        <ChatContact
          imgSrc={'https://adminlte.io/docs/3.0/assets/img/user3-128x128.jpg'}
          name={'Nadia Jolie'}
          date={'2/20/2015'}
          msg={"I'll call you back at..."}
        />
        <ChatContact
          imgSrc={'https://adminlte.io/docs/3.0/assets/img/user5-128x128.jpg'}
          name={'Nora S. Vans'}
          date={'2/10/2015'}
          msg={'Where is your new...'}
        />
        <ChatContact
          imgSrc={'https://adminlte.io/docs/3.0/assets/img/user6-128x128.jpg'}
          name={'John K.'}
          date={'1/27/2015'}
          msg={'Can I take a look at...'}
        />
        <ChatContact
          imgSrc={'https://adminlte.io/docs/3.0/assets/img/user8-128x128.jpg'}
          name={'Kenneth M.'}
          date={'1/4/2015'}
          msg={'Never mind I found...'}
        />
      </ul>
    </div>
  );
};

export default ChatContactsList;
