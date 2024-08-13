import React from 'react';
import { Layout, Typography, Avatar, Dropdown, Menu, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const userMenu = (
  <Menu>
    <Menu.Item key="1">Profile</Menu.Item>
    <Menu.Item key="2">Settings</Menu.Item>
    <Menu.Item key="3">Logout</Menu.Item>
  </Menu>
);

const DashboardHeader = ({ collapsed, toggle }) => (
  <Header className="dashboard-header" style={{
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  }}>
    <Space size="large">
      {React.createElement(
        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: 'trigger',
          onClick: toggle,
          style: { fontSize: '20px', color: '#1890ff' },
        }
      )}
      <Title level={3} style={{ margin: 0, fontSize: '20px' }}>
        My Dashboard
      </Title>
    </Space>
    <Dropdown overlay={userMenu} placement="bottomRight">
      <Avatar size="large" icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
    </Dropdown>
  </Header>
);

export default DashboardHeader;
