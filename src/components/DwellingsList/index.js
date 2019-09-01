import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {requestFetchRadios} from '../../actions/radios';
import Radios from './Radios';

class DwellingsList extends PureComponent {
    componentDidMount() {
        this.props.requestFetchRadios(this.props.match.params);
    }

    render() {
        return (
            <Radios/>
        );
    }
}

DwellingsList.propTypes = {
    requestFetchRadios: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({})
    }).isRequired
};

export default connect(
    null,
    {requestFetchRadios}
)(DwellingsList);
