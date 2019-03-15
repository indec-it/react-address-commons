import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert, Col, Row} from 'react-bootstrap';

import Blocks from './Blocks';

const Radios = ({radios}) => (
    <Row>
        <Col sm={12}>
            {radios.map(radio => (
                <Fragment key={radio.radio}>
                    <Alert className="text-center">
                        <h4>{`Radio: ${radio.radio}`}</h4>
                    </Alert>
                    <br/>
                    <Blocks blocks={radio.blocks}/>
                </Fragment>
            ))}
        </Col>
    </Row>
);

Radios.propTypes = {
    radios: PropTypes.arrayOf(
        PropTypes.shape({
            radio: PropTypes.number.isRequired,
            blocks: PropTypes.arrayOf(
                PropTypes.shape({
                    blockNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                    blockId: PropTypes.string
                })
            )
        })
    )
};

Radios.defaultProps = {
    radios: []
};

export default connect(
    state => ({
        radios: state.radio.radios
    })
)(Radios);
