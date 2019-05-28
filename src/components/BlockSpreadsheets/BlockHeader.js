import React from 'react';
import PropTypes from 'prop-types';

const BlockHeader = ({blockNumber}) => (
    <table className="table-width">
        <tbody>
            <tr>
                <td className="column-md column-lg">{`Manzana Nro: ${blockNumber}`}</td>
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
);

BlockHeader.propTypes = {
    blockNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default BlockHeader;
