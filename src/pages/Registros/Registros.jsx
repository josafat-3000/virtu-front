import React, {useEffect} from "react";
import { Card, Table, Empty, Row, Col, Typography } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllVisits } from "../../store/allVisitSlice";

const { Title } = Typography;

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nombre del Visitante',
        dataIndex: 'visitor_name', // Nombre del visitante
        key: 'visitor_name',
    },
    {
        title: 'Empresa del Visitante',
        dataIndex: 'visitor_company', // Empresa del visitante (opcional)
        key: 'visitor_company',
    },
    {
        title: 'Razón de la Visita',
        dataIndex: 'visit_reason', // Razón de la visita
        key: 'visit_reason',
    },
    {
        title: 'Material de la Visita',
        dataIndex: 'visit_material', // Material de la visita (opcional)
        key: 'visit_material',
    },
    {
        title: 'Vehículo',
        dataIndex: 'vehicle', // Información sobre el vehículo
        key: 'vehicle',
        render: (vehicle) => vehicle ? 'Sí' : 'No', // Muestra "Sí" o "No"
    },
    {
        title: 'Modelo del Vehículo',
        dataIndex: 'vehicle_model', // Modelo del vehículo (opcional)
        key: 'vehicle_model',
        render: (text) => text ? text : 'No disponible', // Maneja el caso donde es null
    },
    {
        title: 'Placa del Vehículo',
        dataIndex: 'vehicle_plate', // Placa del vehículo (opcional)
        key: 'vehicle_plate',
        render: (text) => text ? text : 'No disponible', // Maneja el caso donde es null
    },
    {
        title: 'Fecha y Hora de la Visita',
        dataIndex: 'visit_date', // Fecha y hora de la visita
        key: 'visit_date',
        render: (text) => new Date(text).toLocaleString(), // Formatea la fecha y hora
    },
    {
        title: 'Usuario ID',
        dataIndex: 'user_id', // ID del usuario relacionado con la visita
        key: 'user_id',
    },
    {
        title: 'Estado',
        dataIndex: 'status', // Estado de la visita
        key: 'status',
        render: (status) => {
            switch (status) {
                case 'pending': // Caso para 'pending'
                    return (
                        <span style={{ color: 'orange' }}>
                            Pendiente
                        </span>
                    );
                case 'in_progress': // Caso para 'in_progress'
                    return (
                        <span style={{ color: 'blue' }}>
                            En Progreso
                        </span>
                    );
                case 'completed': // Caso para 'completed'
                    return (
                        <span style={{ color: 'green' }}>
                            Completado
                        </span>
                    );
                default:
                    return 'Desconocido';
            }
        },
    },
    {
        title: 'Fecha de Creación',
        dataIndex: 'created_at', // Fecha de creación del registro
        key: 'created_at',
        render: (text) => new Date(text).toLocaleString(), // Formatea la fecha y hora
    },
    {
        title: 'Fecha de Actualización',
        dataIndex: 'updated_at', // Fecha de la última actualización
        key: 'updated_at',
        render: (text) => new Date(text).toLocaleString(), // Formatea la fecha y hora
    },
];



function Registros() {
    const dispatch = useDispatch();
    const { visitas, loadingVisits} = useSelector((state) => state.allVisits);

    useEffect(() => {
        dispatch(fetchAllVisits()); // Obtén los datos al montar el componente
    }, [dispatch]);
    return (
        <div style={{ margin: '16px' }}>

            <Card style={{ marginTop: '16px', borderRadius: '10px', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)' }} bordered={true} title="Historial de visitas" >
                <Table
                    columns={columns}
                    dataSource={visitas}
                    loading={loadingVisits}
                    locale={{
                        emptyText: <Empty description="No hay datos disponibles" />,
                    }}
                    rowKey="id"
                    scroll={{ x: true }} // Permite el desplazamiento horizontal
                />
            </Card>


        </div>
    );
}

export default Registros;