import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Row, Col } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './LoginForm.css'; // Archivo de estilos
import logo from '../../assets/virtu.png'; // Ruta de la imagen del logo
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/userSlice';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const { loading, err } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  const handleSignIn = async (values) => {
    setError('');

    let data = { email, password };
    dispatch(loginUser(data)).then((result) => {
      if (result.payload) {
        setEmail('');
        setPassword('');
        navigate('/');
      } else {
        navigate('/login');
      }
    });

    // Aquí iría la lógica para iniciar sesión, por ejemplo:
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: values.email,
    //   password: values.password,
    // });

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <Row justify="center" align="middle" className="login-container">
      <Col xs={22} sm={18} md={12} lg={10} xl={8}>
        <Card
          className="login-card"
        >
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
              rules={[{ required: true, message: 'Por favor, introduce tu correo electrónico' }]}
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
            {error && (
              <Typography.Text type="danger" className="login-error">
                {error}
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
              >
                {loading ? 'Iniciando sesión' : 'Iniciar Sesión'}
              </Button>
              {err && (<div>Error</div>)}
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
