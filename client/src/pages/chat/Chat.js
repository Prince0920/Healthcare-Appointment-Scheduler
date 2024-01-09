import React from 'react';
import ChatFooter from './ChatFooter';
import ChatHeader from './ChatHeader';
import ChatContactsList from './ChatContactList/ChatContactsList';
import ChatMessage from './ChatMessage';

const Chat = () => {
  return (
    <div className='card card-primary direct-chat direct-chat-primary'>
      <ChatHeader />
      <div className='card-body'>
        <div className='direct-chat-messages'>
          <ChatMessage
            isRight={false}
            name={'Alexander Pierce'}
            timestamp={'23 Jan 2:00 pm'}
            text={"Is this template really for free? That's unbelievable!"}
            imgSrc={'https://adminlte.io/docs/3.0/assets/img/user1-128x128.jpg'}
          />
          <ChatMessage
            isRight={true}
            name={'Sarah Bullock'}
            timestamp={'23 Jan 2:05 pm'}
            text={'You better believe it!'}
            imgSrc={'https://adminlte.io//docs/3.0/assets/img/user3-128x128.jpg'}
          />
          <ChatMessage
            isRight={false}
            name={'Alexander Pierce'}
            timestamp={'23 Jan 5:37 pm'}
            text={'Working with AdminLTE on a great new app! Wanna join?'}
            imgSrc={'https://adminlte.io/docs/3.0/assets/img/user1-128x128.jpg'}
          />
          <ChatMessage
            isRight={true}
            name={'Sarah Bullock'}
            timestamp={'23 Jan 6:10 pm'}
            text={'I would love to.'}
            imgSrc={'https://adminlte.io/docs/3.0/assets/img/user3-128x128.jpg'}
          />
        </div>
        <ChatContactsList />
      </div>
      <ChatFooter />
    </div>
  );
};

export default Chat;
