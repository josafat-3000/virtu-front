import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Avatar, Typography, Button } from 'antd';
import {
  HomeOutlined,
  CalendarOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './sidebar.css';

const { Text } = Typography;
const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const userName = useSelector((state) => state.user.user.name);
  const isSmallerThanMd = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  // Maneja clics fuera del Sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isSmallerThanMd && !collapsed) {
          onCollapse(true);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [collapsed, isSmallerThanMd, onCollapse]);

  // Maneja clics en los elementos del menú
  const handleMenuClick = (e) => {
    switch (e.key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/registros');
        break;
      case '3':
        navigate('/perfil');
        break;
      case '4':
        navigate('/configuracion');
        break;
      case '5':
        navigate('/salir');
        break;
      case '6':
        navigate('/acciones');
        break;
      default:
        break;
    }
    // Oculta el Sidebar si está colapsado
    if (isSmallerThanMd) {
      onCollapse(true);
    }
  };

  return (
    <>
      {isSmallerThanMd && (
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => onCollapse(!collapsed)}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 10000,
          }}
        />
      )}
      <Sider
        ref={sidebarRef} // Añade el ref al Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="md"
        collapsedWidth={isSmallerThanMd ? 0 : 80}
        width={200}
        style={{
          overflow: 'hidden',
          position: 'fixed',
          left: isSmallerThanMd && collapsed ? '-200px' : 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          transition: 'left 0.3s ease, width 0.2s ease',
        }}
      >
        <div className={`logo ${collapsed ? 'collapsed' : ''}`}>
          {profilePictureUrl ? (
            <Avatar className="avatar" src={profilePictureUrl} size={collapsed ? 40 : 80} />
          ) : (
            <Avatar icon={<UserOutlined />} size={collapsed ? 40 : 80} />
          )}
        </div>
        {!collapsed && (
          <div className="logo">
            <Text type="primary" style={{ fontSize: '16px' }}>
              {userName.toUpperCase()}
            </Text>
          </div>
        )}
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={[
            { label: 'Home', key: '1', icon: <HomeOutlined /> },
            { label: 'Registros', key: '2', icon: <CalendarOutlined /> },
            { label: 'Acciones', key: '6', icon: <BellOutlined /> },
            { label: 'Perfil', key: '3', icon: <UserOutlined /> },
            { label: 'Configuración', key: '4', icon: <SettingOutlined /> },
            { label: 'Salir', key: '5', icon: <LogoutOutlined /> },
          ]}
          onClick={handleMenuClick}
        />
      </Sider>
    </>
  );
};

export default Sidebar;
