import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  EditOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const ActionsPage = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Generar Nueva Visita',
      description: 'Crea un nuevo registro de visita.',
      icon: <PlusOutlined />,
      action: () => navigate('/acciones/generar-visita'),
    },
    {
      title: 'Modificar Detalles de la Visita',
      description: 'Actualiza la información de una visita existente.',
      icon: <EditOutlined />,
      action: () => navigate('/acciones/modificar-visita'),
    },
    {
      title: 'Validar Visita',
      description: 'Verifica y confirma la visita.',
      icon: <CheckCircleOutlined />,
      action: () => navigate('/acciones/validar-visita'),
    },
    {
      title: 'Cancelar Visita',
      description: 'Cancela una visita programada.',
      icon: <DeleteOutlined />,
      action: () => navigate('/acciones/cancelar-visita'),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {actions.map((action, index) => (
          <Col
            xs={24}  // En dispositivos pequeños, ocupa toda la fila
            sm={12}  // En dispositivos medianos, ocupa la mitad de la fila
            md={12}   // En dispositivos grandes, ocupa un tercio de la fila
            lg={12}   // En pantallas muy grandes, ocupa un sexto de la fila
            key={index}
          >
            <Card
              title={action.title}
              bordered={false}
              style={{ 
                textAlign: 'center', // Centra el texto y los iconos
                borderRadius: '8px', // Bordes redondeados
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra sutil
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Hace que el Card ocupe toda la altura disponible en el Col
                maxWidth: '600px', // Ancho fijo para todas las tarjetas
                margin: '0 auto', // Centra la tarjeta dentro del Col
                padding: '16px', // Agrega un relleno para evitar que el contenido quede pegado al borde
              }}
            >
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between' 
              }}>
                <div style={{ marginBottom: '16px' }}>
                  {action.description}
                </div>
                <Button 
                  type="primary" 
                  onClick={action.action} 
                  icon={action.icon} 
                  style={{ width: '100%', marginTop: 'auto' }} // Botón ocupa el 100% del ancho del Card y se alinea al fondo
                >
                  {action.title}
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ActionsPage;
