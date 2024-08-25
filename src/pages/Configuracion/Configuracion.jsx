import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, Select, notification, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const initialUsers = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin' },
  { id: 2, name: 'Ana Gómez', email: 'ana@example.com', role: 'User' },
  // Más usuarios...
];

const roles = ['Admin', 'User', 'Manager'];

const Configuracion = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  const showAddUserModal = () => {
    setCurrentUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditUserModal = (user) => {
    setCurrentUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        if (currentUser) {
          // Edit existing user
          setUsers(users.map(user => (user.id === currentUser.id ? { ...user, ...values } : user)));
          notification.success({
            message: 'Usuario actualizado',
            description: 'El usuario ha sido actualizado con éxito.',
          });
        } else {
          // Add new user
          const newUser = { id: users.length + 1, ...values };
          setUsers([...users, newUser]);
          notification.success({
            message: 'Usuario añadido',
            description: 'El nuevo usuario ha sido añadido con éxito.',
          });
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (user) => {
    Modal.confirm({
      title: 'Eliminar Usuario',
      content: `¿Estás seguro de que deseas eliminar a ${user.name}?`,
      onOk: () => {
        setUsers(users.filter(u => u.id !== user.id));
        notification.success({
          message: 'Usuario eliminado',
          description: 'El usuario ha sido eliminado con éxito.',
        });
      },
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'Correo Electrónico',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      width: 100,
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 100,
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditUserModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Configuración de Usuarios">
        <Row style={{ marginBottom: '16px' }}>
          <Col span={24}>
            <Button type="primary" icon={<PlusOutlined />} onClick={showAddUserModal}>
              Añadir Usuario
            </Button>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          scroll={{ x: 600 }}
        />
      </Card>

      <Modal
        title={currentUser ? 'Modificar Usuario' : 'Añadir Usuario'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={currentUser ? 'Actualizar' : 'Añadir'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
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
            name="role"
            label="Rol"
            rules={[{ required: true, message: 'Por favor selecciona un rol' }]}
          >
            <Select placeholder="Selecciona un rol">
              {roles.map(role => (
                <Option key={role} value={role}>{role}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Configuracion;
