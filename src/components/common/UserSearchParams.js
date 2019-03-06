import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Dropdown, IconButton, TextField} from '@indec/react-commons';

const UserSearchParams = ({
    states, roles, state, rol, term, onChange, onSubmit
}) => (
    <Row className="form-group">
        <Col sm={4}>
            <Dropdown
                control="state"
                label="Jurisdicción"
                value={state}
                options={states}
                onChange={onChange}
            />
        </Col>
        <Col sm={4}>
            <Dropdown
                control="rol"
                label="Rol"
                value={rol}
                options={roles}
                onChange={onChange}
            />
        </Col>
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
            <IconButton onClick={onSubmit} icon={faSearch}/>
        </Col>
    </Row>
);

UserSearchParams.propTypes = {
    states: PropTypes.arrayOf(PropTypes.shape({})),
    roles: PropTypes.arrayOf(PropTypes.shape({})),
    state: PropTypes.number,
    rol: PropTypes.string,
    term: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

UserSearchParams.defaultProps = {
    states: [],
    roles: [],
    state: null,
    rol: null,
    term: null
};

export default UserSearchParams;
