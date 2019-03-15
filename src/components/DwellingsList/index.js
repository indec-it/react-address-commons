import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {requestFetchRadios} from '../../actions/radios';
import Radios from './Radios';

class DwellingsList extends PureComponent {
    static propTypes = {
        requestFetchRadios: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({})
        }).isRequired
    };

    componentDidMount() {
        this.props.requestFetchRadios(this.props.match.params);
    }

    render() {
        return (
            <Radios/>
        );
    }
}

export default connect(
    null,
    dispatch => ({
        requestFetchRadios: params => dispatch(requestFetchRadios(params))
    })
)(DwellingsList);
