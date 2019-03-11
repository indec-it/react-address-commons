/* eslint-disable */
import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMap} from '@fortawesome/free-solid-svg-icons';
import {includes} from 'lodash';

import Manuals from './Manuals';
import Dashboard from './Dashboard';
import {roles} from '../../constants';
import {User} from '../../model';

const isNationalCoordinator = profile => (
    includes(profile.roles, roles.NATIONAL_COORDINATOR_RO) || includes(profile.roles, roles.NATIONAL_COORDINATOR)
);

class Home extends PureComponent {
    static propTypes = {
        profile: PropTypes.instanceOf(User)
    };

    static defaultProps = {
        profile: null
    };

    constructor(props) {
        super(props);
        this.state = {
            showDashboard: isNationalCoordinator(this.props.profile)
        };
    }

    handleChange() {
        this.setState(state => ({showDashboard: !state.showDashboard}));
    }

    render() {
        const {showDashboard} = this.state;
        return (
            <Grid>
                <Row>
                    <Col sm={1}>
                        <br/>
                        <input
                            className="tgl tgl-ios"
                            id="cb5"
                            type="checkbox"
                            onClick={() => this.handleChange()}
                            onTouchStart={() => this.handleChange()}
                            checked={showDashboard}
                        />
                        <label htmlFor="cb5" className="tgl-btn"/>
                    </Col>
                    <Col sm={11}>
                        <h2>
                            {showDashboard ? (
                                <Fragment>
                                    <FontAwesomeIcon icon={faMap}/>
                                    &nbsp;Visión General
                                </Fragment>
                            ) : (
                                <Fragment>
                                    Lista de Instructivos
                                </Fragment>
                            )}
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <Row>
                    {showDashboard ? <Dashboard/> : <Manuals/>}
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        profile: state.session.profile
    })
)(Home);
