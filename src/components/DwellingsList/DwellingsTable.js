import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col, Row, Table} from 'react-bootstrap';
import {DateUtilsService} from '@indec/react-commons/services';

const DwellingsTable = ({dwellings, street}) => (
    <Row>
        <Col sm={12}>
            <Table responsive>
                <thead>
                    <tr>
                        <th>N° Viv. Listado</th>
                        <th>Calle</th>
                        <th>N° Catastral</th>
                        <th>Piso</th>
                        <th>Departamento</th>
                        <th>Edificio</th>
                        <th>Casa/Lote</th>
                        <th>Viv</th>
                        <th>Descripcion</th>
                        <th>Fecha Alta</th>
                        <th>Cod. Variacion</th>
                        <th>Des</th>
                        <th>Fecha Baja</th>
                        <th>Fecha Mod.</th>
                        <th>Fecha de cierre</th>
                    </tr>
                </thead>
                <tbody>
                    {dwellings.map(dwelling => (
                        <tr key={dwelling._id}>
                            <td className="text-center">{dwelling.listNumber}</td>
                            <td>{street.name}</td>
                            <td className="text-center">{dwelling.withoutNumber ? 'S/N' : dwelling.streetNumber}</td>
                            <td className="text-center">{dwelling.groundFloor ? 'PB' : dwelling.floor}</td>
                            <td className="text-center">{dwelling.department}</td>
                            <td className="text-center">{dwelling.building}</td>
                            <td className="text-center">{dwelling.lote}</td>
                            <td className="text-center">
                                {dwelling.dwellingSubtype ? dwelling.dwellingSubtype : dwelling.dwellingTypeCode}
                            </td>
                            <td className="text-center">
                                {dwelling.description}
                            </td>
                            <td className="text-center">
                                {DateUtilsService.formatDateTime(dwelling.createdAt)}
                            </td>
                            <td className="text-center">
                                {dwelling.deleteCode}
                            </td>
                            <td className="text-center">
                                {dwelling.deleteDescription}
                            </td>
                            <td className="text-center">
                                {DateUtilsService.formatDateTime(dwelling.deleteDate)}
                            </td>
                            <td className="text-center">
                                {DateUtilsService.formatDateTime(dwelling.editedAt)}
                            </td>
                            <td className="text-center">
                                {DateUtilsService.formatDateTime(dwelling.closeDate)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    </Row>
);

DwellingsTable.propTypes = {
    dwellings: PropTypes.arrayOf(PropTypes.shape({})),
    street: PropTypes.shape({})
};

DwellingsTable.defaultProps = {
    dwellings: [],
    street: {}
};

export default connect(state => ({
    street: state.radio.street,
    dwellings: state.radio.dwellings
}))(DwellingsTable);
