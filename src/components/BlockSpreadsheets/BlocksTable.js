import React from 'react';
import PropTypes from 'prop-types';

const BlocksTable = ({blocks}) => (
    <table className="table-width">
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
            {blocks.map(datum => (
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
            ))}
        </tbody>
    </table>
);

BlocksTable.propTypes = {
    blocks: PropTypes.arrayOf(
        PropTypes.shape({
            sideNumber: PropTypes.number,
            zipCode: PropTypes.number,
            streetName: PropTypes.string,
            initialNumber: PropTypes.number,
            finalNumber: PropTypes.number,
            postalCode: PropTypes.number
        })
    ).isRequired
};

export default BlocksTable;
