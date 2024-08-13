import React, { useState, useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, BellOutlined, HomeOutlined, CalendarOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Card, Avatar, Button, Table, Empty, Spin, ConfigProvider } from 'antd';
import logo from '../assets/virtu.png';
const { Header, Content, Footer, Sider } = Layout;
import './Dashboard.css'; // Ajusta el camino según tu estructura de archivos

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Home', '1', <HomeOutlined />),
  getItem('Registros', '2', <CalendarOutlined />),
  getItem('Perfil', '3', <UserOutlined />),
  getItem('Configuración', '4', <SettingOutlined />),
  getItem('Salir', '5', <LogoutOutlined />),
];


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

const profileMenu = (
  <Menu>
    <Menu.Item key="1">Profile</Menu.Item>
    <Menu.Item key="2">Settings</Menu.Item>
    <Menu.Item key="3">Logout</Menu.Item>
  </Menu>
);

const Dash = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // Simula una llamada a una API para cargar datos
  useEffect(() => {
    setTimeout(() => {
      // Simular datos vacíos
      setData([]);
      setLoading(false);
    }, 1000);
  }, []);


  return (
    <ConfigProvider theme={{
      "components": {
        "Layout": {
          "headerBg": "rgb(2,106,159)",
          "siderBg": "rgb(2,106,159)",
          "triggerBg": "rgb(40,75,124)"
        },
        "Menu": {
          "darkItemBg": "rgb(2,106,159)",
          "darkItemSelectedBg": "rgb(40,75,124)"
        }
      }
    }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
        
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
            scrollbarWidth: 'thin',
            scrollbarColor: 'unset',
          }}
        >
          
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout
          style={{
            marginInlineStart: collapsed ? '80px' : '200px', // Ajusta los valores según el estado colapsado
            transition: 'margin-inline-start 0.2s', // Agrega una transición suave para el margen
          }}
        >
          <Header
            className=''
            style={{
              margin: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 16px',
              background: '#fff',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: 'calc(100%-${collapsed ? 80px : 200px})',
              display: 'flex',
              background: colorBgContainer,
              borderRadius: '10px',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)'

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
              <Menu>
                <Menu.SubMenu title={<Avatar icon={<UserOutlined />} />} popupOffset={[0, 0]}>
                  {profileMenu.props.children}
                </Menu.SubMenu>
              </Menu>
            </div>
          </Header>
          <Content
            style={{
              margin: '16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
              items={[
                {
                  title: 'Home',
                },
                {
                  title: <a href="">Application Center</a>,
                },
                {
                  title: <a href="">Application List</a>,
                },
                {
                  title: 'An Application',
                },
              ]}
            />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Content style={{ margin: '16px', paddingTop: '30px' }}>
            <div className="content-container">
              <Card title="Eventos recientes" className="content-card">
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
              <Card title="Validar Visita" className="content-card">
                Validar Visita
              </Card>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout >
    </ConfigProvider>
  );
};

export default Dash;
