import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row} from 'react-bootstrap';
import {Doughnut} from 'react-chartjs-2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faSpinner} from '@fortawesome/free-solid-svg-icons';

import {getTooltipLabel} from '../utils';

const Radios = ({provinceData, stateName, loading}) => (
    <div className="box-doughnut">
        <h4 className="state text-center">
            <FontAwesomeIcon icon={faMapMarkerAlt}/>
            &nbsp;
            Jurisdicción:
            &nbsp;
            {stateName}
        </h4>
        {loading ? <FontAwesomeIcon icon={faSpinner} pulse size="3x"/> : (
            <Doughnut
                data={provinceData}
                height="280%"
                options={{
                    tooltips: {
                        callbacks: {
                            label: getTooltipLabel
                        }
                    },
                    legend: {
                        display: false
                    },
                    plugins: {
                        datalabels: {
                            display: false
                        }
                    },
                    elements: {
                        center: {
                            text: provinceData.total,
                            fontStyle: 'Arial',
                            sidePadding: 20
                        }
                    },
                    maintainAspectRatio: true,
                    responsive: true
                }}
            />
        )}
        <Row>
            <ul className="legend">
                <li>
                    <span className="state-unassigned"/>
                    Sin asignar
                </li>
                <li>
                    <span className="state-assigned"/>
                    Asignadas
                </li>
                <li>
                    <span className="state-in-progress"/>
                    Actualizando
                </li>
                <li>
                    <span className="state-closed"/>
                    Cerradas
                </li>
                <li>
                    <span className="state-supervision"/>
                    Supervisando
                </li>
                <li>
                    <span className="state-supervised"/>
                    Supervisadas
                </li>
                <li>
                    <span className="state-approved"/>
                    Aprobadas
                </li>
                <li>
                    <span className="state-done"/>
                    Terminadas
                </li>
            </ul>
        </Row>
    </div>
);

Radios.propTypes = {
    provinceData: PropTypes.shape({
        total: PropTypes.number
    }).isRequired,
    stateName: PropTypes.string,
    loading: PropTypes.bool
};

Radios.defaultProps = {
    stateName: null,
    loading: true
};

export default connect(state => ({
    loading: state.overview.loading
}))(Radios);
