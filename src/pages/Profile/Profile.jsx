import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, Row, Col, Typography, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFinish = (values) => {
    // Lógica para guardar la información del perfil
    console.log('Received values of form: ', values);
    notification.success({
      message: 'Perfil actualizado',
      description: 'Tu perfil ha sido actualizado con éxito.',
    });
  };

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      notification.success({
        message: 'Foto de perfil actualizada',
        description: 'Tu foto de perfil ha sido actualizada con éxito.',
      });
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Perfil</Title>
      <Card style={{ marginBottom: '16px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            name: 'Juan Pérez',
            email: 'juan@example.com',
            phone: '+1234567890',
          }}
        >
          <Row gutter={16}>
            <Col span={24} md={8}>
              <Form.Item label="Foto de Perfil">
                <Upload
                  action="/upload" // URL del servidor para manejar la subida
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                >
                  {fileList.length < 1 && <UploadOutlined />}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={24} md={16}>
              <Form.Item
                name="name"
                label="Nombre Completo"
                rules={[{ required: true, message: 'Por favor ingresa tu nombre completo' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Correo Electrónico"
                rules={[{ type: 'email', message: 'El correo electrónico no es válido' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Teléfono"
                rules={[{ required: true, message: 'Por favor ingresa tu número de teléfono' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Dirección"
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Guardar Cambios</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title="Configuración de la Cuenta" style={{ marginBottom: '16px' }}>
        <Button type="link">Cambiar Contraseña</Button>
        <Button type="link">Verificar Correo Electrónico</Button>
        <Button type="link" danger>Eliminar Cuenta</Button>
      </Card>

      <Card title="Preferencias" style={{ marginBottom: '16px' }}>
        <Button type="link">Cambiar Tema</Button>
        <Button type="link">Configurar Notificaciones</Button>
        <Button type="link">Seleccionar Idioma</Button>
      </Card>

      <Card title="Seguridad" style={{ marginBottom: '16px' }}>
        <Button type="link">Configurar 2FA</Button>
        <Button type="link">Revisar Actividad Reciente</Button>
      </Card>

      <Card title="Integraciones" style={{ marginBottom: '16px' }}>
        <Button type="link">Conectar Redes Sociales</Button>
        <Button type="link">Gestionar Aplicaciones Vinculadas</Button>
      </Card>

      <Card title="Soporte y Ayuda">
        <Button type="link">Contacto Soporte Técnico</Button>
        <Button type="link">FAQ</Button>
        <Button type="link">Enviar Feedback</Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
