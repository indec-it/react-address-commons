import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col, Grid} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync} from '@fortawesome/free-solid-svg-icons';
import {LoadingIndicator, Pages} from '@indec/react-commons';

import {Log} from '../../model';
import LogsTable from './LogsTable';
import {UserSearchParams} from '../common';

import {requestFetchStates} from '../../actions/review';
import {requestFetchSyncTask} from '../../actions/log';

class Logs extends PureComponent {
    static propTypes = {
        requestFetchSyncTask: PropTypes.func.isRequired,
        requestFetchStates: PropTypes.func.isRequired,
        logs: PropTypes.arrayOf(PropTypes.instanceOf(Log)),
        states: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })),
        pageSize: PropTypes.number,
        logsCount: PropTypes.number,
        loading: PropTypes.bool
    };

    static defaultProps = {
        logs: [],
        states: [],
        logsCount: 0,
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
                <Row>
                    <Col sm={12}>
                        <h2>
                            <FontAwesomeIcon icon={faSync}/>
                            &nbsp;
                            Sincronizaciones realizadas
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <hr className="hr-title"/>
                    </Col>
                </Row>
                <UserSearchParams
                    {...{
                        states, state, rol, term
                    }}
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
                            resultsCount={logsCount}
                            selectedPage={selectedPage}
                            onChange={page => this.handleChangePage(page)}
                        />
                    </Fragment>
                )}
            </Grid>
        );
    }
}

export default connect(
    state => ({
        states: state.review.states,
        logs: state.log.logs,
        pageSize: state.log.pageSize,
        logsCount: state.log.logsCount,
        loading: state.log.loading
    }),
    dispatch => ({
        requestFetchSyncTask: (state, rol, term, skip) => dispatch(requestFetchSyncTask(state, rol, term, skip)),
        requestFetchStates: () => dispatch(requestFetchStates())
    })
)(Logs);
