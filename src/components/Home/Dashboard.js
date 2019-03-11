import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {LoadingIndicator} from '@indec/react-commons';

import {MonitoringGraphics, Map} from '../Charts';

import {
    cleanOverviewReducer, fetchOverview, setMapState, cleanMapSelection
} from '../../actions';

class Dashboard extends Component {
    static propTypes = {
        fetchOverview: PropTypes.func.isRequired,
        cleanOverviewReducer: PropTypes.func.isRequired,
        setMapState: PropTypes.func.isRequired,
        cleanMapSelection: PropTypes.func.isRequired,
        selectedState: PropTypes.shape({}).isRequired,
        availableStates: PropTypes.arrayOf(PropTypes.shape({})),
        general: PropTypes.arrayOf(PropTypes.shape({})),
        response: PropTypes.arrayOf(PropTypes.shape({})),
        logs: PropTypes.arrayOf(PropTypes.shape({})),
        users: PropTypes.arrayOf(PropTypes.shape({})),
        profile: PropTypes.shape({
            state: PropTypes.number,
            roles: PropTypes.arrayOf(PropTypes.string)
        }),
        loading: PropTypes.bool
    };

    static defaultProps = {
        availableStates: null,
        profile: null,
        general: null,
        response: null,
        logs: null,
        users: null,
        loading: false
    };

    componentDidMount() {
        this.props.fetchOverview(this.props.profile);
    }

    componentWillUnmount() {
        this.props.cleanOverviewReducer();
    }

    renderContent() {
        const {
            availableStates, general, response, logs, users, profile, selectedState
        } = this.props;
        return (
            <Fragment>
                <Col sm={3} className="col-map">
                    <Map
                        availableStates={availableStates}
                        selectedState={selectedState}
                        onCleanSelection={() => this.props.cleanMapSelection()}
                        onStateClick={state => this.props.setMapState(state.properties.stateId)}
                    />
                </Col>
                <Col sm={9} className="no-padding">
                    <MonitoringGraphics
                        province={general}
                        stateId={selectedState.stateId}
                        stateName={selectedState.name}
                        response={response}
                        logs={logs}
                        users={users}
                        roles={profile.roles}
                    />
                </Col>
            </Fragment>
        );
    }

    render() {
        const {general, loading} = this.props;
        return (
            <Row>
                {!loading && general ? this.renderContent() : <LoadingIndicator label="Obteniendo Información..."/>}
            </Row>
        );
    }
}

export default connect(
    state => ({
        general: state.overview.general,
        response: state.overview.response,
        logs: state.overview.logs,
        users: state.overview.users,
        selectedState: state.overview.selectedState,
        availableStates: state.overview.availableStates,
        stateName: state.overview.stateName,
        loading: state.overview.loading,
        isNationalCoordinator: state.overview.isNationalCoordinator,
        profile: state.session.profile
    }),
    dispatch => ({
        fetchOverview: profile => dispatch(fetchOverview(profile)),
        cleanOverviewReducer: () => dispatch(cleanOverviewReducer()),
        setMapState: stateId => dispatch(setMapState(stateId)),
        cleanMapSelection: () => dispatch(cleanMapSelection())
    })
)(Dashboard);
