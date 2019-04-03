import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Col, Panel, PanelGroup, Row
} from 'react-bootstrap';
import {faFileCsv} from '@fortawesome/free-solid-svg-icons';
import {IconButton, LoadingButton, Role} from '@indec/react-commons';

import {requestExportBlock} from '../../actions/blocks';
import {requestFetchSides} from '../../actions/sides';
import {roles} from '../../constants';
import Sides from './Sides';

const Blocks = ({
    blocks, loading, sessionRoles, ...props
}) => (
    <PanelGroup accordion>
        {blocks.map(block => (
            <Panel eventKey={block.blockId}>
                <Panel.Heading>
                    <Row>
                        <Col sm={4}>
                            <Panel.Title toggle>
                                {`Manzana ${block.blockNumber}`}
                            </Panel.Title>
                        </Col>
                        <Col sm={8} className="text-right">
                            <Role roles={[roles.NATIONAL_COORDINATOR]} sessionRoles={sessionRoles}>
                                <IconButton
                                    icon={faFileCsv}
                                    onClick={() => props.requestExportBlock(block)}
                                >
                                    Exportar
                                </IconButton>
                            </Role>
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
    sessionRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    loading: PropTypes.bool
};

Blocks.defaultProps = {
    blocks: [],
    loading: false
};

export default connect(
    state => ({
        loading: state.radio.loadingSides,
        sessionRoles: state.session.profile.roles
    }),
    dispatch => ({
        requestFetchSides: blockId => dispatch(requestFetchSides(blockId)),
        requestExportBlock: block => dispatch(requestExportBlock(block))
    })
)(Blocks);
