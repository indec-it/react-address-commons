import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row} from 'react-bootstrap';
import {Doughnut} from 'react-chartjs-2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faSpinner} from '@fortawesome/free-solid-svg-icons';

import {getTooltipLabel} from '../utils';

const Dwellings = ({dwellingsResponse, loadingDwellings}) => (
    <div className="box-doughnut">
        <h4 className="dwellings text-center">
            <FontAwesomeIcon icon={faHome}/>
            &nbsp;
            Viviendas
        </h4>
        {loadingDwellings ? <FontAwesomeIcon icon={faSpinner} pulse size="3x"/> : (
            <Doughnut
                data={dwellingsResponse}
                height="250%"
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
                            text: dwellingsResponse.total,
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
                    <span className="dwellings-added"/>
                    Nuevas
                </li>
                <li>
                    <span className="dwellings-deleted"/>
                    Bajas
                </li>
            </ul>
        </Row>
    </div>
);

Dwellings.propTypes = {
    dwellingsResponse: PropTypes.shape({
        total: PropTypes.number
    }).isRequired,
    loadingDwellings: PropTypes.bool
};

Dwellings.defaultProps = {
    loadingDwellings: true
};

export default connect(state => ({
    loadingDwellings: state.overview.loadingDwellings
}))(Dwellings);
