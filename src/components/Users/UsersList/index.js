import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Grid, Row} from 'react-bootstrap';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {concat, isEmpty, includes} from 'lodash';
import {LoadingIndicator, PageHeader, Pages} from '@indec/react-commons';

import {UserSearchParams} from '../../common';
import {optionsForUsersSelect, roles} from '../../../constants';
import {User} from '../../../model';
import {requestUsers} from '../../../actions';
import {statePropTypes} from '../../../util/propTypes';
import UsersTable from './UsersTable';

const getRoles = sessionRoles => {
    if (includes(sessionRoles, roles.COORDINATOR)) {
        return [
            {_id: 'sc', name: 'Subcoordinador Provincial'},
            {_id: 'su', name: 'Supervisor'},
            {_id: 'po', name: 'Actualizador'}
        ];
    }
    if (includes(sessionRoles, roles.SUB_COORDINATOR)) {
        return [
            {_id: 'su', name: 'Supervisor'},
            {_id: 'po', name: 'Actualizador'}
        ];
    }
    return optionsForUsersSelect;
};

class UsersList extends Component {
    static propTypes = {
        requestUsers: PropTypes.func.isRequired,
        sessionRoles: PropTypes.arrayOf(PropTypes.string),
        states: PropTypes.arrayOf(statePropTypes),
        users: PropTypes.arrayOf(PropTypes.instanceOf(User)),
        loading: PropTypes.bool,
        usersCount: PropTypes.number,
        userCredentialsRoute: PropTypes.string.isRequired,
        pageSize: PropTypes.number
    };

    static defaultProps = {
        users: [],
        states: [],
        sessionRoles: [],
        usersCount: 0,
        pageSize: 0,
        loading: false
    };

    constructor(props) {
        super(props);
        this.state = {
            state: '',
            rol: '',
            term: '',
            selectedPage: 0
        };
    }

    componentDidMount() {
        this.props.requestUsers();
    }

    handleChange({target: {id, value}}) {
        this.setState(state => ({...state, [id]: value}));
    }

    handleSubmit() {
        const {state, rol, term} = this.state;
        this.props.requestUsers(state, rol, term);
    }

    handleChangePage(page) {
        const {rol, state} = this.state;
        this.props.requestUsers(state, rol, null, this.props.pageSize * page);
        this.setState(() => ({selectedPage: page}));
    }

    render() {
        const {
            rol, selectedPage, state, term
        } = this.state;
        const {
            loading, pageSize, users, usersCount, states, userCredentialsRoute, sessionRoles
        } = this.props;
        return (
            <Grid>
                <PageHeader icon={faUser} title="Usuarios"/>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <UserSearchParams
                    {...{state, rol, term}}
                    states={states ? concat([{_id: null, name: '[Todas]'}], states) : states}
                    roles={getRoles(sessionRoles)}
                    onChange={e => this.handleChange(e)}
                    onSubmit={() => this.handleSubmit()}
                />
                <br/>
                <Row>
                    {loading && <LoadingIndicator label="Obteniendo Información..."/>}
                    {isEmpty(users) && !loading ? (
                        <h3 className="text-center">
                            No hay Usuarios Asignados
                        </h3>
                    ) : (
                        <Fragment>
                            <UsersTable users={users} userCredentialsRoute={userCredentialsRoute}/>
                            <Pages
                                pageSize={pageSize}
                                resultsCount={usersCount}
                                selectedPage={selectedPage}
                                onChange={page => this.handleChangePage(page)}
                            />
                        </Fragment>
                    )}
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        users: state.user.users,
        loading: state.user.loading,
        usersCount: state.user.usersCount,
        pageSize: state.user.pageSize,
        states: state.user.states,
        sessionRoles: state.session.profile.roles
    }),
    dispatch => ({
        requestUsers: (state, rol, term, skip) => dispatch(requestUsers(state, rol, term, skip))
    })
)(UsersList);
