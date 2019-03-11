import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Button, ButtonGroup, Col, Row
} from 'react-bootstrap';

import {requestFetchManuals, requestFetchVersion} from '../../actions';

class Manuals extends PureComponent {
    static propTypes = {
        requestFetchVersion: PropTypes.func.isRequired,
        requestFetchManuals: PropTypes.func.isRequired,
        version: PropTypes.string,
        date: PropTypes.string,
        manuals: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                url: PropTypes.string,
                title: PropTypes.string,
                roles: PropTypes.arrayOf(PropTypes.string)
            })
        )
    };

    static defaultProps = {
        version: null,
        date: null,
        manuals: []
    };

    componentDidMount() {
        this.props.requestFetchVersion();
        this.props.requestFetchManuals();
    }

    render() {
        const {date, manuals, version} = this.props;
        return (
            <Fragment>
                <Row>
                    <Col sm={6}>
                        <ButtonGroup vertical block>
                            {manuals.map(manual => (
                                <Fragment key={manual._id}>
                                    <Button
                                        target="_blank"
                                        href={manual.url}
                                        className="btn-group-justified"
                                    >
                                        {manual.title}
                                    </Button>
                                </Fragment>
                            ))}
                        </ButtonGroup>
                    </Col>
                    <Col sm={6}>
                        <Row>
                            <Col sm={6} className="text-center">
                                <h4>Versión App Tablet</h4>
                            </Col>
                            <Col sm={6} className="text-center">
                                <h4>Ultima Actualización</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="text-center">
                                <code>{version}</code>
                            </Col>
                            <Col sm={6} className="text-center">
                                <code>{date}</code>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={6}>
                        <ButtonGroup vertical block>
                            <Button className="btn-group-justified">Planilla de Manzanas</Button>
                            <Button className="btn-group-justified">Planilla de Viviendas por lado</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        version: state.version.version,
        date: state.version.date,
        manuals: state.manuals.manuals
    }),
    dispatch => ({
        requestFetchVersion: () => dispatch(requestFetchVersion()),
        requestFetchManuals: () => dispatch(requestFetchManuals())
    })
)(Manuals);
