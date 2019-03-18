import React from 'react';
import PropTypes from 'prop-types';
import {Bar} from 'react-chartjs-2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartBar} from '@fortawesome/free-solid-svg-icons';
import 'chartjs-plugin-datalabels';

import {getTooltipLabel} from '../utils';

const DwellingsTypes = ({dwellingsTypes}) => (
    <div className="box-doughnut">
        <h4 className="dwellings text-center">
            <FontAwesomeIcon icon={faChartBar}/>
            &nbsp;
            Tipo de viviendas
        </h4>
        <Bar
            data={dwellingsTypes}
            height="100%"
            options={{
                tooltips: {
                    callbacks: {
                        title: () => '',
                        label: getTooltipLabel
                    }
                },
                legend: {
                    display: false
                },
                plugins: {
                    datalabels: {
                        display: true,
                        color: '#000',
                        fontSize: 11,
                        anchor: 'end',
                        align: 'end',
                        offset: -7
                    }
                },
                backgroundColor: 'rgba(251, 85, 85, 0.4)',
                showTooltips: false,
                maintainAspectRatio: true,
                responsive: true
            }}
        />
    </div>
);

DwellingsTypes.propTypes = {
    dwellingsTypes: PropTypes.shape({}).isRequired
};

export default DwellingsTypes;
