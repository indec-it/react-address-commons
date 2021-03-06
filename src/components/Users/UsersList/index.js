import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Grid, Row} from 'react-bootstrap';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {
    concat, isEmpty, includes, some
} from 'lodash';
import {LoadingIndicator, PageHeader, Pages} from '@indec/react-commons';

import {UserSearchParams} from '../../common';
import {optionsForUsersSelect, roles} from '../../../constants';
import {User} from '../../../model';
import {requestUsers} from '../../../actions';
import {statePropTypes} from '../../../util/propTypes';
import UsersTable from './UsersTable';

const getRoles = sessionRoles => {
    if (some(sessionRoles, rol => includes([roles.COORDINATOR, roles.READ_ONLY_COORDINATOR], rol))) {
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

class UsersList extends PureComponent {
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
                    state={state}
                    rol={rol}
                    term={term}
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

UsersList.propTypes = {
    requestUsers: PropTypes.func.isRequired,
    sessionRoles: PropTypes.arrayOf(PropTypes.string),
    states: PropTypes.arrayOf(statePropTypes),
    users: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    loading: PropTypes.bool,
    usersCount: PropTypes.number,
    userCredentialsRoute: PropTypes.string.isRequired,
    pageSize: PropTypes.number
};

UsersList.defaultProps = {
    users: [],
    states: [],
    sessionRoles: [],
    usersCount: 0,
    pageSize: 0,
    loading: false
};

export default connect(
    state => ({
        users: state.user.users,
        loading: state.user.loading,
        usersCount: state.user.usersCount,
        pageSize: state.user.pageSize,
        states: state.user.states,
        sessionRoles: state.session.profile.roles
    }),
    {requestUsers}
)(UsersList);
