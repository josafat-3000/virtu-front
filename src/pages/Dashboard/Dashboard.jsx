import React, { useEffect } from 'react';
import {
  EyeOutlined, ClockCircleOutlined, LogoutOutlined, CalendarOutlined
} from '@ant-design/icons';
import { Card, Table, Empty, Statistic, Row, Col, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';// Ajusta la ruta según sea necesario
import { fetchVisitStats } from '../../store/visitSlice.js'
import './Dashboard.css';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Usuario',
    dataIndex: 'Users', // Datos del usuario
    key: 'userName',
    render: (user) => user ? user.name : 'No disponible', // Ajusta 'name' si es necesario
  },
  {
    title: 'Acción',
    dataIndex: 'access_type', // Tipo de acceso (check-in/check-out)
    key: 'accessType',
    render: (text) => text === 'check_in' ? (
      <span style={{ color: 'green' }}>
        <UserAddOutlined /> Entrada
      </span>
    ) : (
      <span style={{ color: 'red' }}>
        <UserDeleteOutlined /> Salida
      </span>
    ),
  },
  {
    title: 'Fecha y Hora',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (text) => new Date(text).toLocaleString(), // Formatea la fecha y hora
  },
  {
    title: 'Detalles de Visita',
    dataIndex: 'Visits', // Datos de la visita
    key: 'visitReason',
    render: (visit) => visit ? visit.visit_reason : 'No disponible', // Ajusta 'visit_reason' si es necesario
  },
];

  

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.name);
  const { pending, in_progress } = useSelector((state) => state.visits);

  useEffect(() => {
    dispatch(fetchVisitStats()); // Obtén los datos al montar el componente
  }, [dispatch]);

  return (
    <div style={{ margin: '16px' }}>
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

    </div>
  );
};

const DashboardCard = ({ title, value, icon }) => {
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
};


export default Dashboard;
