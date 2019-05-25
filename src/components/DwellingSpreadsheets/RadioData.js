import React from 'react';

import {radioPropTypes} from '../../util/propTypes';

const RadioData = ({radioData}) => (
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
);

RadioData.propTypes = {
    radioData: radioPropTypes.isRequired
};

export default RadioData;
