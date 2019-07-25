import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {LoadingIndicator} from '@indec/react-commons';

import {MonitoringGraphics, Map} from '../Charts';
import {
    cleanOverviewReducer, fetchOverview, setMapState, cleanMapSelection
} from '../../actions';
import {requestFetchLogsByState} from '../../actions/overview';

class Dashboard extends PureComponent {
    static propTypes = {
        fetchOverview: PropTypes.func.isRequired,
        cleanOverviewReducer: PropTypes.func.isRequired,
        setMapState: PropTypes.func.isRequired,
        cleanMapSelection: PropTypes.func.isRequired,
        requestFetchLogsByState: PropTypes.func.isRequired,
        selectedState: PropTypes.shape({
            state: PropTypes.number,
            name: PropTypes.string
        }).isRequired,
        availableStates: PropTypes.arrayOf(PropTypes.shape({})),
        general: PropTypes.arrayOf(PropTypes.shape({})),
        response: PropTypes.arrayOf(PropTypes.shape({})),
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
        users: null,
        loading: false
    };

    componentDidMount() {
        this.props.fetchOverview(this.props.profile);
    }

    componentWillUnmount() {
        this.props.cleanOverviewReducer();
    }

    handleChangeState(state) {
        this.props.setMapState(state);
        this.props.requestFetchLogsByState(state);
    }

    renderContent() {
        const {
            availableStates, general, response, users, profile, selectedState
        } = this.props;
        return (
            <Fragment>
                <Col sm={3} className="col-map">
                    <Map
                        availableStates={availableStates}
                        selectedState={selectedState}
                        onCleanSelection={() => this.props.cleanMapSelection()}
                        onStateClick={state => this.handleChangeState(state.properties.state)}
                    />
                </Col>
                <Col sm={9} className="no-padding">
                    <MonitoringGraphics
                        province={general}
                        state={selectedState.state}
                        stateName={selectedState.name}
                        {...{response, users}}
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
        users: state.overview.users,
        selectedState: state.overview.selectedState,
        availableStates: state.overview.availableStates,
        stateName: state.overview.stateName,
        loading: state.overview.loading,
        isNationalCoordinator: state.overview.isNationalCoordinator,
        profile: state.session.profile
    }),
    {
        fetchOverview, cleanOverviewReducer, setMapState, cleanMapSelection, requestFetchLogsByState
    }
)(Dashboard);
