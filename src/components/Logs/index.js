import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col, Grid} from 'react-bootstrap';
import {faSync} from '@fortawesome/free-solid-svg-icons';
import {LoadingIndicator, PageHeader, Pages} from '@indec/react-commons';

import LogsTable from './LogsTable';
import {UserSearchParams} from '../common';
import {Log} from '../../model';
import {statePropTypes} from '../../util/propTypes';

import {requestFetchStates, requestFetchSyncTask} from '../../actions';

class Logs extends PureComponent {
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
        this.props.requestFetchSyncTask();
        this.props.requestFetchStates();
    }

    handleChange({target: {id, value}}) {
        this.setState(state => ({...state, [id]: value}));
    }

    handleSubmit() {
        const {state, rol, term} = this.state;
        this.props.requestFetchSyncTask(state, rol, term);
    }

    handleChangePage(page) {
        const {rol, state, term} = this.state;
        this.props.requestFetchSyncTask(state, rol, term, this.props.pageSize * page);
        this.setState(() => ({selectedPage: page}));
    }

    render() {
        const {
            rol, state, term, selectedPage
        } = this.state;
        const {
            logs, states, logsCount, pageSize, loading
        } = this.props;
        return (
            <Grid fluid>
                <PageHeader icon={faSync} title="Sincronizaciones realizadas"/>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <UserSearchParams
                    state={state}
                    states={states}
                    rol={rol}
                    term={term}
                    roles={[{_id: 'su', name: 'Supervisor'}, {_id: 'po', name: 'Actualizador'}]}
                    onChange={e => this.handleChange(e)}
                    onSubmit={() => this.handleSubmit()}
                />
                <br/>
                {loading ? <LoadingIndicator label="Obteniendo Información..."/> : (
                    <Fragment>
                        <LogsTable logs={logs}/>
                        <Pages
                            pageSize={pageSize}
                            selectedPage={selectedPage}
                            resultsCount={logsCount}
                            onChange={page => this.handleChangePage(page)}
                        />
                    </Fragment>
                )}
            </Grid>
        );
    }
}

Logs.propTypes = {
    requestFetchSyncTask: PropTypes.func.isRequired,
    requestFetchStates: PropTypes.func.isRequired,
    logs: PropTypes.arrayOf(PropTypes.instanceOf(Log)),
    states: PropTypes.arrayOf(statePropTypes),
    pageSize: PropTypes.number,
    logsCount: PropTypes.number,
    loading: PropTypes.bool
};

Logs.defaultProps = {
    logs: [],
    states: [],
    logsCount: 0,
    pageSize: 0,
    loading: false
};

export default connect(
    state => ({
        states: state.review.states,
        logs: state.log.logs,
        pageSize: state.log.pageSize,
        logsCount: state.log.logsCount,
        loading: state.log.loading
    }),
    {requestFetchSyncTask, requestFetchStates}
)(Logs);
