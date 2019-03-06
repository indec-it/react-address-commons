import React from 'react';
import PropTypes from 'prop-types';
import {
    ButtonToolbar, Col, Row, Table
} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAddressCard, faWrench} from '@fortawesome/free-solid-svg-icons';
import {IconLinkButton} from '@indec/react-commons';
import {includes} from 'lodash';

import {roles} from '../../../constants';
import getRoleName from '../../../util/getRoleName';

const UsersTable = ({users, userCredentialsRoute}) => (
    <Row>
        <Col sm={12}>
            <Table responsive striped bordered condensed hover className="table-vertical-middle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Apellido, Nombre</th>
                        <th>DNI</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Jurisdicción</th>
                        <th>
                            <FontAwesomeIcon icon={faWrench}/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>
                                {user.surname}
                                ,
                                &nbsp;
                                {user.name}
                            </td>
                            <td>{user.documentId}</td>
                            <td>{user.email}</td>
                            <td>{getRoleName(user)}</td>
                            <td>
                                {
                                    includes([
                                        roles.NATIONAL_COORDINATOR, roles.NATIONAL_COORDINATOR_RO
                                    ], user.roles)
                                        ? getRoleName(user)
                                        : user.stateName
                                }
                            </td>
                            <td className="text-center">
                                <ButtonToolbar>
                                    <IconLinkButton
                                        to={`${userCredentialsRoute}/${user._id}`}
                                        icon={faAddressCard}
                                        title="Credencial"
                                    />
                                </ButtonToolbar>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
);

UsersTable.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    userCredentialsRoute: PropTypes.string.isRequired
};

export default UsersTable;
