import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React from 'react';

const InputDropdown = ({ options, value, onChange }) => {
 
  const handleMenuClick = ({ key }) => {
    onChange(key);
    // Handle menu click here
    console.log('Selected:', key);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      selectedKeys={[value]}>
      {options.map(option => (
        <Menu.Item key={option}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      placement='bottomRight'>
      <a
        href='#!'
        className='ant-dropdown-link'
        onClick={e => e.preventDefault()}>
        {value} <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default InputDropdown;
