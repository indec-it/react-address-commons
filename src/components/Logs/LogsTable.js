import React from 'react';
import PropTypes from 'prop-types';
import {Col, Table, Row} from 'react-bootstrap';

import {Log} from '../../model';
import DateUtilsService from '../../services/dateUtils';

const LogsTable = ({logs}) => (
    <Row>
        <Col sm={12}>
            <Table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Logueo</th>
                        <th>Fecha de Sincronzacion</th>
                        <th>Version de App</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => (
                        <tr key={log._id}>
                            <td className="text-center">{log.user.username}</td>
                            <td className="text-center">{log.user.name}</td>
                            <td className="text-center">{log.user.surname}</td>
                            <td className="text-center">
                                {DateUtilsService.formatDateTime(log.loginDate)}
                            </td>
                            <td className="text-center">{DateUtilsService.formatDateTime(log.createdAt)}</td>
                            <td className="text-center">{log.appVersion}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
);

LogsTable.propTypes = {
    logs: PropTypes.arrayOf(PropTypes.instanceOf(Log)).isRequired
};

export default LogsTable;
