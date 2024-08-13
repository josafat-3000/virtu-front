import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Avatar, Dropdown, Button, Table, Empty, Spin , ConfigProvider } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, BellOutlined, HomeOutlined, CalendarOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'; // Asegúrate de importar los íconos aquí
import 'antd/dist/reset.css'; // Asegúrate de importar el CSS de Ant Design
import './Dashboard.css'; // Ajusta el camino según tu estructura de archivos
import logo from '../assets/virtu.png';

const { Header, Sider, Content } = Layout;

// Define el menú del dropdown para el perfil
const profileMenu = (
  <Menu>
    <Menu.Item key="1">Profile</Menu.Item>
    <Menu.Item key="2">Settings</Menu.Item>
    <Menu.Item key="3">Logout</Menu.Item>
  </Menu>
);

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simula una llamada a una API para cargar datos
    useEffect(() => {
      setTimeout(() => {
        // Simular datos vacíos
        setData([]);
        setLoading(false);
      }, 1000);
    }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const columns = [
    {
        title: 'ID',
        dataIndex: 'dateTime',
        key: 'dateTime',
      },
    {
      title: 'Nombre Visitante',
      dataIndex: 'eventType',
      key: 'eventType',
    },
    {
      title: 'Asunto',
      dataIndex: '',
      key: 'eventDetails',
    },
    {
      title: 'Departamento',
      dataIndex: 'accessBy',
      key: 'accessBy',
    },
    {
      title: 'Hora de llegada',
      dataIndex: 'locks',
      key: 'locks',
    },
    {
      title: 'Hora de salida',
      dataIndex: 'people',
      key: 'people',
    },
    
  ];

  return (
    <ConfigProvider theme={{
      "components": {
        "Layout": {
          "headerBg": "rgb(2,106,159)",
          "siderBg": "rgb(2,106,159)",
          "triggerBg": "rgb(2,106,159)"
        },
        "Menu": {
    "darkItemBg": "rgb(2,106,159)"
  }
      } 
  }}>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
        trigger={null}
        width={200}
        className="sider"
        style={{
          position: 'fixed',
          height: '100vh', // Asegura que el Sider ocupe toda la altura
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          <Button
            className="trigger"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggle}
          />
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>Eventos</Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>Perfil</Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>Configuracion</Menu.Item>
          <Menu.Item key="5" icon={<LogoutOutlined />}>Salir</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{
          marginLeft: collapsed ? '80px' : '200px', // Ajuste para margen izquierdo cuando el Sider está colapsado
        }}>
        <Header className="header" style={{
              padding: 0,
              paddingLeft: '10px',
              position: 'fixed',
              zIndex: 1,
              width: `calc(100% - ${collapsed ? '80px' : '200px'})`, // Ajusta el ancho según el estado colapsado del Sider
            }}>
          <div className="header-left">
            <img src={logo} alt="Logo" className="header-logo-image" />
          </div>
          <div className="header-right">
            <Button
              type="text"
              icon={<BellOutlined />}
              className="notification-icon"
            />
            <Dropdown overlay={profileMenu} trigger={['click']}>
              <Avatar icon={<UserOutlined />} className="profile-icon" />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '16px', paddingTop: '30px' }}>
          <div className="content-container">
            <Card title="Eventos recientes"  className="content-card">
              {loading ? (
                <Spin size="large" />
              ) : (
                <Table
                  columns={columns}
                  dataSource={data}
                  locale={{
                    emptyText: <Empty description="No hay datos disponibles" />
                  }}
                  rowKey="id"
                />
              )}
            </Card>
            <Card title="Generar Visita" className="content-card">
              Generar Visita
            </Card>
            <Card title="Validar Visita"  className="content-card">
              Validar Visita
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;
