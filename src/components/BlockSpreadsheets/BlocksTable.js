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
            {blocks.map(block => (
                <tr>
                    <td className="column-sm">{block.sideNumber}</td>
                    <td className="column-sm">{block.zipCode}</td>
                    <td className="column-md column-lg">{block.streetName}</td>
                    <td className="column-sm">{block.initialNumber}</td>
                    <td className="column-sm">{block.finalNumber}</td>
                    <td className="column-sm">{block.postalCode}</td>
                    <td className="column-md"/>
                    <td className="column-md column-lg empty-block">{block.observations}</td>
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
            postalCode: PropTypes.number,
            observations: PropTypes.string
        })
    ).isRequired
};

export default BlocksTable;
