import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingButton, PageHeader} from '@indec/react-commons';

import {requestDwellingSpreadsheets} from '../../actions/spreadsheet';
import {radioPropTypes} from '../../util/propTypes';
import {randomString} from '../../util';
import BlockData from './BlockData';
import DwellingsTable from './DwellingsTable';
import RadioData from './RadioData';

class DwellingSpreadsheets extends PureComponent {
    componentDidMount() {
        this.props.requestDwellingSpreadsheets(this.props.match.params);
    }

    renderContent() {
        const {blocks, path, radioData} = this.props;
        return (
            <Fragment>
                <PageHeader
                    path={path}
                    title="Listado de Viviendas para actualizar en campo."
                    className="hidden-print"
                />
                <RadioData radioData={radioData}/>
                {blocks.map(block => (
                    <div key={`${block.blockNumber}${block.sideNumber}`} className="page-break">
                        {block.dwellings.map(rows => (
                            <Fragment key={randomString()}>
                                <br/>
                                <BlockData block={block}/>
                                <br/>
                                <DwellingsTable dwellings={rows}/>
                            </Fragment>
                        ))}
                    </div>
                ))}
            </Fragment>
        );
    }

    render() {
        return this.props.loading ? <LoadingButton/> : this.renderContent();
    }
}

DwellingSpreadsheets.propTypes = {
    requestDwellingSpreadsheets: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({})
    }).isRequired,
    blocks: PropTypes.arrayOf(PropTypes.shape({
        blockNumber: PropTypes.number,
        sideNumber: PropTypes.number,
        dwellings: PropTypes.arrayOf(
            PropTypes.shape({})
        )
    })),
    radioData: radioPropTypes,
    loading: PropTypes.bool,
    path: PropTypes.string.isRequired
};

DwellingSpreadsheets.defaultProps = {
    blocks: [],
    radioData: {},
    loading: false
};

export default connect(
    state => ({
        radioData: state.spreadsheet.radioData,
        blocks: state.spreadsheet.dwellings,
        loading: state.spreadsheet.loading
    }),
    {requestDwellingSpreadsheets}
)(DwellingSpreadsheets);
