import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import {MonitoringGraphics, Map} from '../Charts';
import {
    cleanOverviewReducer, fetchOverview, setMapState, cleanMapSelection
} from '../../actions';
import {requestFetchLogsByState} from '../../actions/overview';

class Dashboard extends PureComponent {
    componentDidMount() {
        this.props.fetchOverview();
    }

    componentWillUnmount() {
        this.props.cleanOverviewReducer();
    }

    handleChangeState(state) {
        this.props.setMapState(state);
        this.props.requestFetchLogsByState(state);
    }

    render() {
        const {availableStates, selectedState} = this.props;
        return (
            <Row>
                <Col sm={3} className="col-map">
                    <Map
                        availableStates={availableStates}
                        selectedState={selectedState}
                        onCleanSelection={() => this.props.cleanMapSelection()}
                        onStateClick={state => this.handleChangeState(state.properties.state)}
                    />
                </Col>
                <Col sm={9} className="no-padding">
                    <MonitoringGraphics/>
                </Col>
            </Row>
        );
    }
}

Dashboard.propTypes = {
    fetchOverview: PropTypes.func.isRequired,
    cleanOverviewReducer: PropTypes.func.isRequired,
    setMapState: PropTypes.func.isRequired,
    cleanMapSelection: PropTypes.func.isRequired,
    requestFetchLogsByState: PropTypes.func.isRequired,
    selectedState: PropTypes.shape({
        state: PropTypes.number,
        name: PropTypes.string
    }),
    availableStates: PropTypes.arrayOf(PropTypes.shape({}))
};

Dashboard.defaultProps = {
    availableStates: [],
    selectedState: {}
};

export default connect(
    state => ({
        selectedState: state.overview.selectedState,
        availableStates: state.overview.availableStates,
        isNationalCoordinator: state.overview.isNationalCoordinator
    }),
    {
        fetchOverview, cleanOverviewReducer, setMapState, cleanMapSelection, requestFetchLogsByState
    }
)(Dashboard);
