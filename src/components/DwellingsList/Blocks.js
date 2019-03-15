import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Col, Panel, PanelGroup, Row
} from 'react-bootstrap';
import {faFileCsv} from '@fortawesome/free-solid-svg-icons';
import {IconButton, LoadingButton} from '@indec/react-commons';

import {requestExportBlock} from '../../actions/blocks';
import {requestFetchSides} from '../../actions/sides';
import Sides from './Sides';

const Blocks = ({blocks, loading, ...props}) => (
    <PanelGroup accordion>
        {blocks.map(block => (
            <Panel eventKey={block.blockId}>
                <Panel.Heading>
                    <Row>
                        <Col sm={4}>
                            <Panel.Title toggle>
                                {`Manzana N ${block.blockNumber}`}
                            </Panel.Title>
                        </Col>
                        <Col sm={8} className="text-right">
                            <IconButton
                                icon={faFileCsv}
                                onClick={() => props.requestExportBlock(block)}
                            >
                                Exportar
                            </IconButton>
                        </Col>
                    </Row>
                </Panel.Heading>
                <Panel.Collapse onEntered={() => props.requestFetchSides(block.blockId)}>
                    <Panel.Body>
                        {loading ? <LoadingButton/> : <Sides/>}
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        ))}
    </PanelGroup>
);

Blocks.propTypes = {
    requestExportBlock: PropTypes.func.isRequired,
    requestFetchSides: PropTypes.func.isRequired,
    blocks: PropTypes.arrayOf(
        PropTypes.shape({
            blockNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            blockId: PropTypes.string
        })
    ),
    loading: PropTypes.bool
};

Blocks.defaultProps = {
    blocks: [],
    loading: false
};

export default connect(
    state => ({
        loading: state.radio.loadingSides
    }),
    dispatch => ({
        requestFetchSides: blockId => dispatch(requestFetchSides(blockId)),
        requestExportBlock: block => dispatch(requestExportBlock(block))
    })
)(Blocks);