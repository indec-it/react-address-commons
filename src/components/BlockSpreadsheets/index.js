import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingButton, PageHeader} from '@indec/react-commons';

import {requestBlockSpreadsheets} from '../../actions/spreadsheet';
import {radioPropTypes} from '../../util/propTypes';
import {randomString} from '../../util';
import BlockHeader from './BlockHeader';
import BlocksTable from './BlocksTable';
import RadioData from './RadioData';
import UserTable from './UserTable';

class BlockSpreadsheets extends PureComponent {
    static propTypes = {
        requestBlockSpreadsheets: PropTypes.func.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({})
        }).isRequired,
        blocks: PropTypes.arrayOf(PropTypes.shape({
            state: PropTypes.string,
            department: PropTypes.string,
            locality: PropTypes.number,
            fraction: PropTypes.number,
            radio: PropTypes.number,
            ups: PropTypes.number,
            agglomerate: PropTypes.number,
            blockNumber: PropTypes.string,
            data: PropTypes.arrayOf(PropTypes.shape({}))
        })),
        radioData: radioPropTypes,
        loading: PropTypes.bool,
        path: PropTypes.string.isRequired
    };

    static defaultProps = {
        blocks: [],
        radioData: {},
        loading: false
    };

    componentDidMount() {
        this.props.requestBlockSpreadsheets(this.props.match.params);
    }

    renderContent() {
        const {blocks, path, radioData} = this.props;
        return (
            <Fragment>
                <PageHeader
                    path={path}
                    title="Listado de Manzanas y Viviendas para actualizar en campo."
                    className="hidden-print"
                />
                <RadioData radioData={radioData}/>
                <br/>
                <UserTable/>
                <br/>
                {blocks.map(block => (
                    <div key={block.blockNumber}>
                        <BlockHeader blockNumber={block.blockNumber}/>
                        {block.dwellings.map(rows => (
                            <div key={randomString()} className="page-break">
                                <BlocksTable blocks={rows}/>
                                <br/>
                            </div>
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

export default connect(
    state => ({
        radioData: state.spreadsheet.radioData,
        blocks: state.spreadsheet.blocks,
        loading: state.spreadsheet.loading
    }),
    dispatch => ({
        requestBlockSpreadsheets: params => dispatch(requestBlockSpreadsheets(params))
    })
)(BlockSpreadsheets);
