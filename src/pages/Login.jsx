import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Row, Col, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './LoginForm.css'; // Archivo de estilos
import logo from '../assets/virtu.png'; // Ruta de la imagen del logo
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/userSlice';

const { Title } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { loading, error, user } = useSelector((state) => state.user); // Ahora también obtenemos el estado `user`
  const dispatch = useDispatch();

  // Maneja el envío del formulario
  const handleSignIn = async () => {
    setFormError('');

    const data = { email, password };
    const result = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(result)) {
      setEmail('');
      setPassword('');
      navigate('/'); // Redirige al home o dashboard
    } else if (loginUser.rejected.match(result)) {
      setFormError(result.error.message);
    }
  };

  return (
    <Row justify="center" align="middle" className="login-container">
      <Col xs={22} sm={18} md={12} lg={10} xl={8}>
        <Card className="login-card">
          <div className="login-logo">
            <img src={logo} alt="Logo" className="logo-image" />
            <LockOutlined className="lock-icon" />
          </div>
          <Title level={4} className="register-title">
            Inicia sesión
          </Title>
          <Typography.Text className="register-title">
            Por favor, introduce tus datos
          </Typography.Text>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleSignIn}
            className="login-form"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Por favor, introduce tu correo electrónico' },
                { type: 'email', message: 'El correo electrónico no es válido' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Correo electrónico"
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
            {formError && (
              <Typography.Text type="danger" className="login-error">
                {formError}
              </Typography.Text>
            )}
            <Form.Item className="login-remember">
              <a href="#" className="login-forgot">¿Olvidaste tu contraseña?</a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                size="large"
                loading={loading} // Maneja el estado de carga
              >
                Iniciar Sesión
              </Button>
              {error && (
                <Alert
                  message="Error"
                  description="Error al iniciar sesión."
                  type="error"
                  showIcon
                  className="login-error-alert"
                />
              )}
            </Form.Item>
          </Form>
          <Typography.Text className="login-register">
            ¿No te has registrado? <a href="/register">Regístrate</a>
          </Typography.Text>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
