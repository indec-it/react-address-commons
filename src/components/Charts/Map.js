import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Row} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEraser} from '@fortawesome/free-solid-svg-icons';

import Argentina from './Argentina';

const Map = ({
    availableStates, selectedState, onCleanSelection, onStateClick
}) => (
    <Fragment>
        <Row>
            <Col sm={6} className="no-padding">
                <Button className="btn-clean" bsSize="xsmall" onClick={onCleanSelection}>
                    <FontAwesomeIcon icon={faEraser}/>
                    &nbsp;
                    Limpiar Selección
                </Button>
            </Col>
            <Col sm={6} className="pull-right">
                <ul className="legend">
                    <li>
                        <span className="state-with-data"/>
                        Contiene datos
                    </li>
                    <li>
                        <span className="state-selected"/>
                        Selección actual
                    </li>
                    <li>
                        <span className="state-without-data"/>
                        Sin datos
                    </li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Argentina
                handleClick={onStateClick}
                availableStates={availableStates}
                selectedState={selectedState}
            />
        </Row>
    </Fragment>
);

Map.propTypes = {
    availableStates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selectedState: PropTypes.shape({}).isRequired,
    onCleanSelection: PropTypes.func.isRequired,
    onStateClick: PropTypes.func.isRequired
};

export default Map;
