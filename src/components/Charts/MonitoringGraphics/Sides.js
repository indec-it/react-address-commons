import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row} from 'react-bootstrap';
import {Doughnut} from 'react-chartjs-2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVectorSquare, faSpinner} from '@fortawesome/free-solid-svg-icons';

import {getTooltipLabel} from '../utils';

const Sides = ({sidesResponse, loadingSides}) => (
    <div className="box-doughnut">
        <h4 className="sides text-center">
            <FontAwesomeIcon icon={faVectorSquare}/>
            &nbsp;
            Lados
        </h4>
        {loadingSides ? <FontAwesomeIcon icon={faSpinner} pulse size="3x"/> : (
            <Doughnut
                data={sidesResponse}
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
                            text: sidesResponse.total,
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
                    <span className="sides-added"/>
                    Nuevos
                </li>
                <li>
                    <span className="sides-deleted"/>
                    Bajas
                </li>
                <li>
                    <span className="sides-without-dwellings"/>
                    Sin viviendas
                </li>
            </ul>
        </Row>
    </div>
);

Sides.propTypes = {
    sidesResponse: PropTypes.shape({
        total: PropTypes.number
    }).isRequired,
    loadingSides: PropTypes.bool
};

Sides.defaultProps = {
    loadingSides: true
};

export default connect(state => ({
    loadingSides: state.overview.loadingSides
}))(Sides);
