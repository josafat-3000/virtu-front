import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/SideBar';
import Header from  '../components/Header';
const {  Content, Footer, Sider } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {/* Aquí va el contenido del Header */}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {/* Aquí va el contenido del Footer */}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
