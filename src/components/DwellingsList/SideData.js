import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row} from 'react-bootstrap';

const SideData = ({side, street}) => (
    <Fragment>
        <Row>
            <Col sm={4}>
                {`Cod. Calle: ${street.code || ''}`}
            </Col>
            <Col sm={4}>
                {`Calle: ${street.name || ''}`}
            </Col>
        </Row>
        <Row>
            <Col sm={4}>
                {`N Min: ${side.initialNumber || ''}`}
            </Col>
            <Col sm={4}>
                {`N Max: ${side.finalNumber || ''}`}
            </Col>
        </Row>
        <Row>
            <Col sm={4}>
                {`Cod. Postal: ${side.postalCode || ''}`}
            </Col>
            <Col sm={4}>
                {`Observaciones: ${side.observations || ''}`}
            </Col>
        </Row>
    </Fragment>
);

SideData.propTypes = {
    side: PropTypes.shape({
        initialNumber: PropTypes.number,
        finalNumber: PropTypes.number,
        postalCode: PropTypes.number,
        observations: PropTypes.string
    }),
    street: PropTypes.shape({
        code: PropTypes.number,
        name: PropTypes.string
    })
};

SideData.defaultProps = {
    side: {},
    street: {}
};

export default connect(state => ({
    street: state.radio.street
}))(SideData);
