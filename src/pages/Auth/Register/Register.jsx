import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import './Register.css'; // Archivo de estilos
import logo from '../../../assets/virtu.png'; // Ruta de la imagen del logo
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (values) => {
    setError('');
    setSuccess('');

    // Aquí iría la lógica para registrar al usuario, por ejemplo:
    // const { data, error } = await supabase.auth.signUp({
    //   email: values.email,
    //   password: values.password,
    // });

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Registro exitoso. Por favor, revisa tu correo electrónico para la confirmación.');
      form.resetFields();
      // Redirigir o hacer algo después del registro exitoso
      navigate('/login');
    }
  };

  return (
    <Row justify="center" align="middle" className="register-container">
      <Col xs={22} sm={18} md={12} lg={10} xl={8}>
        <Card className="register-card">
          <div className="register-logo">
            <img src={logo} alt="Logo" className="logo-image" />
            <UserOutlined className="user-icon" />
          </div>
          <Title level={4} className="register-title">
            Crear una Cuenta
          </Title>
          <Typography.Text className="register-title">
            Por favor, completa los detalles para crear tu cuenta
          </Typography.Text>
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={handleRegister}
            className="register-form"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Por favor, introduce tu nombre de usuario' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nombre de Usuario"
                size="large"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, type: 'email', message: 'Por favor, introduce un correo electrónico válido' }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Correo Electrónico"
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Por favor, introduce tu contraseña' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Contraseña"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            {error && (
              <Typography.Text type="danger" className="register-error">
                {error}
              </Typography.Text>
            )}
            {success && (
              <Typography.Text type="success" className="register-success">
                {success}
              </Typography.Text>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-button"
                size="large"
                
              >
                Registrarse
              </Button>
            </Form.Item>
          </Form>
          <Typography.Text className="register-login">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </Typography.Text>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm;
