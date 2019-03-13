import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {LoadingButton} from '@indec/react-commons';

import {requestDwellingSpreadsheets} from '../../actions/spreadsheet';
import {radioPropTypes} from '../../util/propTypes';

class DwellingSpreadsheets extends PureComponent {
    static propTypes = {
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
        loading: PropTypes.bool
    };

    static defaultProps = {
        blocks: [],
        radioData: {},
        loading: false
    };

    componentDidMount() {
        this.props.requestDwellingSpreadsheets(this.props.match.params);
    }

    renderContent() {
        const {blocks, radioData} = this.props;
        return (
            <Fragment>
                <table className="table-width">
                    <tbody>
                        <tr>
                            <td className="column-md column-lg">
                                {`Jurisdicción: ${radioData.state}`}
                            </td>
                            <td className="column-md column-lg">
                                {`Departamento: ${radioData.department}`}
                            </td>
                            <td className="column-md">
                                {`Aglomerado: ${radioData.agglomerate}`}
                            </td>
                            <td className="column-md column-lg">
                                {`Localidad: ${radioData.locality}`}
                            </td>
                            <td className="column-md">{`Radio: ${radioData.radio}`}</td>
                            <td className="column-md">{`Fracción: ${radioData.fraction}`}</td>
                            <td className="column-md">{`UPS: ${radioData.ups}`}</td>
                            <td className="column-md">{`Área: ${radioData.area}`}</td>
                        </tr>
                    </tbody>
                </table>
                {blocks.map(block => (
                    <div key={`${block.blockNumber}${block.sideNumber}`} className="page-break">
                        <br/>
                        <table className="table-width">
                            <tbody>
                                <tr className="table-header-bg">
                                    <td className="column-md">{`Manzana: ${block.blockNumber}`}</td>
                                    <td className="column-md">{`Lado: ${block.sideNumber}`}</td>
                                    <td className="column-md">{`Código: ${block.zipCode}`}</td>
                                    <td className="column-md column-lg">{`Calle: ${block.streetName}`}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        {block.dwellings.map(rows => (
                            <table key={Date.now()} className="table-width page-break">
                                <thead>
                                    <tr>
                                        <td className="column-md table-header-bg data-align-bottom">
                                            Nro. Viv. Listado
                                        </td>
                                        <td className="column-md table-header-bg data-align-bottom">
                                            Nro. Cat
                                        </td>
                                        <td className="column-md table-header-bg data-align-bottom">
                                            Manz Int o Sector
                                        </td>
                                        <td className="column-md table-header-bg data-align-bottom">Edif</td>
                                        <td className="column-md table-header-bg data-align-bottom">
                                            Entr o escal
                                        </td>
                                        <td className="column-md table-header-bg data-align-bottom">
                                            Piso
                                        </td>
                                        <td className="column-md table-header-bg data-align-bottom">
                                            Dto / Hab
                                        </td>
                                        <td className="column-md table-header-bg data-align-bottom">
                                            Casa o Lote
                                        </td>
                                        <td className="column-md table-header-bg data-align-bottom">
                                            Tipo de variacion
                                        </td>
                                        <td className="column-md table-header-bg data-align-bottom">
                                            Cod de variacion
                                        </td>
                                        <td className="column-md table-header-bg data-align-bottom">
                                            Fecha de variacion
                                        </td>
                                        <td className="column-md table-header-bg data-align-bottom">Motivo</td>
                                        <td className="column-md table-header-bg column-lg">
                                            Mover debajo:
                                            <br/>
                                            Manz:
                                            <br/>
                                            Lado:
                                            <br/>
                                            Viv:
                                        </td>
                                    </tr>
                                    {rows.map(dwelling => (
                                        <Fragment key={dwelling._id}>
                                            <tr className="empty">
                                                <td className="column-md data-align-top">
                                                    {dwelling.listNumber}
                                                </td>
                                                <td className="column-md data-align-top">
                                                    {dwelling.streetNumber}
                                                </td>
                                                <td className="column-md data-align-top">
                                                    {dwelling.sector}
                                                </td>
                                                <td className="column-md data-align-top">
                                                    {dwelling.building}
                                                </td>
                                                <td className="column-md data-align-top">
                                                    {dwelling.entrance}
                                                </td>
                                                <td className="column-md data-align-top">{dwelling.floor}</td>
                                                <td className="column-md data-align-top">
                                                    {dwelling.department}
                                                </td>
                                                <td className="column-md data-align-top">{dwelling.lote}</td>
                                                <td className="column-md data-align-top">
                                                    {dwelling.dwellingTypeCode}
                                                </td>
                                                <td className="column-md data-align-top">
                                                    {dwelling.deleteCode}
                                                </td>
                                                <td className="column-md data-align-top">
                                                    {dwelling.deleteDate}
                                                </td>
                                                <td className="column-md data-align-top">
                                                    {dwelling.deleteDescription}
                                                </td>
                                                <td className="column-md"/>
                                            </tr>
                                            <tr>
                                                <td colSpan="15" className="description">
                                                    {`Descripción: ${dwelling.description || ''}`}
                                                </td>
                                            </tr>
                                        </Fragment>
                                    ))}
                                </thead>
                            </table>
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
        blocks: state.spreadsheet.dwellings
    }),
    dispatch => ({
        requestDwellingSpreadsheets: params => dispatch(requestDwellingSpreadsheets(params))
    })
)(DwellingSpreadsheets);
