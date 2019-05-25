import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const DwellingsTable = ({dwellings}) => (
    <table className="table-width page-break">
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
                    Tipo de Vivienda
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
            {dwellings.map(dwelling => (
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
);

DwellingsTable.propTypes = {
    dwellings: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired
};

export default DwellingsTable;
