import React from 'react';
import PropTypes from 'prop-types';

const BlockData = ({block}) => (
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
);

BlockData.propTypes = {
    block: PropTypes.shape({
        blockNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        sideNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        zipCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        streetName: PropTypes.string
    }).isRequired
};

export default BlockData;
