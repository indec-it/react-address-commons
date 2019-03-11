import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {DateUtilsService} from '@indec/react-commons/services';

import {radioPropTypes} from '../../util/propTypes';

const BlockSpreadsheets = ({radioData, blocks}) => (
    <Fragment>
        <table className="table-width">
            <tbody>
                <tr>
                    <td className="column-md column-lg">{`Jurisdicción: ${radioData.state}`}</td>
                    <td className="column-md column-lg">{`Departamento: ${radioData.department}`}</td>
                    <td className="column-md">{`Aglomerado: ${radioData.agglomerate}`}</td>
                    <td className="column-md column-lg">{`Localidad: ${radioData.locality}`}</td>
                    <td className="column-md">{`Fracción: ${radioData.fraction}`}</td>
                    <td className="column-md">{`Radio: ${radioData.radio}`}</td>
                    <td className="column-md">{`UPS: ${radioData.ups}`}</td>
                    <td className="column-md">{`Área: ${radioData.area}`}</td>
                    <td className="column-md">{`Fecha: ${DateUtilsService.formatDateTime(new Date())}`}</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <table className="table-width">
            <tr>
                <td className="column-md"><strong>Nombre y Apellido del Actualizador:</strong></td>
                <td className="column-md"><strong>Nombre y Apellido del Supervisor:</strong></td>
            </tr>
        </table>
        <br/>
        {blocks.map(block => (
            <div key={block.blockNumber} className="page-break">
                <table className="table-width">
                    <tbody>
                        <tr>
                            <td className="column-md column-lg">{`Manzana Nro: ${block.blockNumber}`}</td>
                            <td className="column-md">Agregar:</td>
                            <td className="column-md">Dividir:</td>
                            <td className="column-md">Dar de baja:</td>
                            <td className="column-md">Mover:</td>
                            <td className="column-md">Confirmar:</td>
                        </tr>
                        <tr>
                            <td className="column-md" colSpan="14">Observaciones:</td>
                        </tr>
                    </tbody>
                </table>
                {block.dwellings.map(rows => (
                    <Fragment key={Date.now()}>
                        <table className="table-width page-break">
                            <tbody>
                                <tr>
                                    <td className="column-sm">Lado</td>
                                    <td className="column-sm">Código</td>
                                    <td className="column-md column-lg">Nombre Calle</td>
                                    <td className="column-sm">Alt. Mín.</td>
                                    <td className="column-sm">Alt. Máx.</td>
                                    <td className="column-sm">C. Postal:</td>
                                    <td className="column-md">viv.</td>
                                    <td className="column-md column-lg">Observaciones:</td>
                                </tr>
                                {rows.map(datum => (
                                    <Fragment key={datum.sideNumber}>
                                        <tr>
                                            <td className="column-sm">{datum.sideNumber}</td>
                                            <td className="column-sm">{datum.zipCode}</td>
                                            <td className="column-md column-lg">{datum.streetName}</td>
                                            <td className="column-sm">{datum.initialNumber}</td>
                                            <td className="column-sm">{datum.finalNumber}</td>
                                            <td className="column-sm">{datum.postalCode}</td>
                                            <td className="column-md"/>
                                            <td className="column-md column-lg empty-block"/>
                                        </tr>
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                        <br/>
                    </Fragment>
                ))}
            </div>
        ))}
    </Fragment>
);

BlockSpreadsheets.propTypes = {
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
    })).isRequired,
    radioData: radioPropTypes.isRequired
};

export default BlockSpreadsheets;
