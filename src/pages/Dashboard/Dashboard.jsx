import React, { useState, useEffect } from 'react';
import {
  EyeOutlined, ClockCircleOutlined, UserOutlined, BellOutlined, HomeOutlined, CalendarOutlined, SettingOutlined, LogoutOutlined
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import { Card, Avatar, Button, Table, Empty, Statistic, ConfigProvider, Row, Col, Space } from 'antd';
import logo from '../../assets/virtu.png';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Ajusta el camino según tu estructura de archivos
import { useSelector, useDispatch } from 'react-redux';
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
import { fetchVisitStats } from '../../store/visitSlice.js';


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
  getItem('Acciones', '6', <BellOutlined />),
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

const profileMenu = [
  {
    key: 'opc',
    icon: <Avatar icon={<UserOutlined />} />,
    children: [
      {
        key: '1',
        label: 'Configuración',
        icon: <UserOutlined />,
      },
      {
        key: '2',
        label: 'Configuración',
        icon: <SettingOutlined />,
      },
      {
        key: '3',
        label: 'Salir',
        icon: <LogoutOutlined />,
      },]
  }
];


const Dash = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user.name);
  const dispatch = useDispatch();

  const { pending, in_progress, load, error } = useSelector((state) => state.visits);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setTimeout(() => {
      setData([]);
      setLoading(false);
    }, 1000);
    dispatch(fetchVisitStats());
  }, [dispatch]);

  const chartData = [
    { name: 'Pending Visits', value: pending },
    { name: 'In Progress Visits', value: in_progress },
  ];

  return (
    <ConfigProvider theme={{
      components: {
        Layout: {
          headerBg: "rgb(2,106,159)",
          siderBg: "rgb(2,106,159)",
          triggerBg: "rgb(40,75,124)",
        },
        Menu: {
          darkItemBg: "rgb(2,106,159)",
          darkItemSelectedBg: "rgb(40,75,124)",
        },
      },
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
            marginInlineStart: collapsed ? '80px' : '200px',
            transition: 'margin-inline-start 0.2s',
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
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: 'calc(100%-${collapsed ? 80px : 200px})',
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
              <Menu items={profileMenu}>
              </Menu>


            </div>
          </Header>
          <Content style={{ margin: '16px' }}>
              {user && (
                <Title level={3}>Bienvenido, {user}</Title>
              )}
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={12} lg={6}>
                <DashboardCard
                  icon={
                    <EyeOutlined
                      style={{
                        color: "purple",
                        backgroundColor: "rgba(0,255,255,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                      }}
                    />
                  }
                  title={"Visitas presentes"}
                  value={in_progress}
                />
              </Col>

              <Col xs={24} sm={12} md={12} lg={6}>
                <DashboardCard
                  icon={
                    <ClockCircleOutlined
                      style={{
                        color: "orange",
                        backgroundColor: "rgba(255,165,0,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                      }}
                    />
                  }
                  title={"Visitas esperadas"}
                  value={pending}
                />
              </Col>

              <Col xs={24} sm={12} md={12} lg={6}>
                <DashboardCard
                  icon={
                    <LogoutOutlined
                      style={{
                        color: "green",
                        backgroundColor: "rgba(0,255,0,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                      }}
                    />
                  }
                  title={"Salidas"}
                  value={0}
                />
              </Col>

              <Col xs={24} sm={12} md={12} lg={6}>
                <DashboardCard
                  icon={
                    <CalendarOutlined
                      style={{
                        color: "blue",
                        backgroundColor: "rgba(0,0,255,0.25)",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                      }}
                    />
                  }
                  title={"Visitas totales del día"}
                  value={0}
                />
              </Col>
            </Row>

          </Content>

          <Content style={{ margin: '16px' }}>
            <div className="content-container">
              <Card title="Eventos recientes" className="content-card">
                <Table
                  columns={columns}
                  dataSource={data}
                  locale={{
                    emptyText: <Empty description="No hay datos disponibles" />,
                  }}
                  rowKey="id"
                />
              </Card>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Virtu ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

function DashboardCard({ title, value, icon }) {
  return (
    <Card
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '10px',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <Statistic title={title} value={value} style={{ marginLeft: 16 }} />
      </div>
    </Card>
  );
}


export default Dash;
