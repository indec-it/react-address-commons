import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Panel, PanelGroup} from 'react-bootstrap';
import {LoadingButton} from '@indec/react-commons';

import {requestFetchDwellings} from '../../actions/dwellings';
import DwellingsTable from './DwellingsTable';
import SideData from './SideData';

const Sides = ({sides, loading, ...props}) => (
    <PanelGroup accordion>
        {sides.map(side => (
            <Panel eventKey={side._id}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        {`Lado N ${side.number}`}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse onEntered={() => props.requestFetchDwellings(side._id)}>
                    <Panel.Body>
                        {loading ? <LoadingButton/> : (
                            <Fragment>
                                <SideData side={side}/>
                                <DwellingsTable/>
                            </Fragment>
                        )}
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        ))}
    </PanelGroup>
);

Sides.propTypes = {
    requestFetchDwellings: PropTypes.func.isRequired,
    sides: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
        })
    ),
    loading: PropTypes.bool
};

Sides.defaultProps = {
    sides: [],
    loading: false
};

export default connect(
    state => ({
        sides: state.radio.sides,
        loading: state.radio.loadingDwellings
    }),
    dispatch => ({
        requestFetchDwellings: side => dispatch(requestFetchDwellings(side))
    })
)(Sides);
