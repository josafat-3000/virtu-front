import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

const Sidebar = () => {
  const items = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <Link to="/another">Another Page</Link>,
    },
  ];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      items={items}
    />
  );
};

export default Sidebar;
