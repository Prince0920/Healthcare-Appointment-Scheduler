import React from 'react';

const ChatMessage = ({ isRight, name, timestamp, text, imgSrc }) => {
  const alignmentClass = isRight ? 'right' : '';
  const nameFloatClass = isRight ? 'float-right' : 'float-left';
  const timestampFloatClass = isRight ? 'float-left' : 'float-right';
  return (
    <div className={`direct-chat-msg ${alignmentClass}`}>
      <div className='direct-chat-infos clearfix'>
        <span className={`direct-chat-name ${nameFloatClass}`}>{name}</span>
        <span className={`direct-chat-timestamp ${timestampFloatClass}`}>{timestamp}</span>
      </div>
      <img
        className='direct-chat-img'
        src={imgSrc}
        alt='message user image'
      />
      <div className='direct-chat-text'>{text}</div>
    </div>
  );
};

export default ChatMessage;
