import React from 'react';
import PropTypes from 'prop-types';
import {Row} from 'react-bootstrap';
import {Doughnut} from 'react-chartjs-2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTh} from '@fortawesome/free-solid-svg-icons';

import {getTooltipLabel} from '../utils';

const Blocks = ({blocksResponse}) => (
    <div className="box-doughnut">
        <h4 className="blocks text-center">
            <FontAwesomeIcon icon={faTh}/>
            &nbsp;
            Manzanas
        </h4>
        <Doughnut
            data={blocksResponse}
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
                        text: blocksResponse.total,
                        fontStyle: 'Arial',
                        sidePadding: 20
                    }
                },
                maintainAspectRatio: true,
                responsive: true
            }}
        />
        <Row>
            <ul className="legend">
                <li>
                    <span className="blocks-edited"/>
                    Actualizadas
                </li>
                <li>
                    <span className="blocks-added"/>
                    Nuevas
                </li>
                <li>
                    <span className="blocks-trimmed"/>
                    Recorte
                </li>
                <li>
                    <span className="blocks-deleted"/>
                    Baja
                </li>
                <li>
                    <span className="blocks-unedited"/>
                    Sin editar
                </li>
            </ul>
        </Row>
    </div>
);

Blocks.propTypes = {
    blocksResponse: PropTypes.shape({}).isRequired
};

export default Blocks;
