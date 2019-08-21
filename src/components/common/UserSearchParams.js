import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {
    Dropdown, IconButton, TextField, Role
} from '@indec/react-commons';

import {statePropTypes} from '../../util/propTypes';
import {roles as rolesEnum} from '../../constants';

const UserSearchParams = ({
    states, roles, state, rol, term, onChange, onSubmit, sessionRoles
}) => (
    <Row className="form-group">
        {states && (
            <Col sm={4}>
                <Dropdown
                    control="state"
                    label="Jurisdicción"
                    value={state}
                    options={states}
                    onChange={onChange}
                />
            </Col>
        )}
        <Role
            roles={[
                rolesEnum.NATIONAL_COORDINATOR,
                rolesEnum.NATIONAL_COORDINATOR_RO,
                rolesEnum.COORDINATOR,
                rolesEnum.SUB_COORDINATOR,
                rolesEnum.READ_ONLY_COORDINATOR
            ]}
            sessionRoles={sessionRoles}
        >
            <Col sm={4}>
                <Dropdown
                    control="rol"
                    label="Rol"
                    value={rol}
                    options={roles}
                    onChange={onChange}
                />
            </Col>
        </Role>
        <Col sm={3}>
            <TextField
                control="term"
                label="Usuario/Nombre/Apellido"
                value={term}
                onChange={onChange}
            />
        </Col>
        <Col sm={1} className="text-center">
            <br/>
            <IconButton onClick={onSubmit} icon={faSearch}>Buscar</IconButton>
        </Col>
    </Row>
);

UserSearchParams.propTypes = {
    states: PropTypes.arrayOf(statePropTypes),
    roles: PropTypes.arrayOf(PropTypes.shape({})),
    state: PropTypes.number,
    rol: PropTypes.string,
    term: PropTypes.string,
    sessionRoles: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

UserSearchParams.defaultProps = {
    states: [],
    roles: [],
    state: null,
    rol: null,
    term: null,
    sessionRoles: []
};

export default connect(state => ({
    sessionRoles: state.session.profile.roles
}))(UserSearchParams);
