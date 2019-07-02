import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs-2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync} from '@fortawesome/free-solid-svg-icons';
import {filter, map} from 'lodash';
import 'chartjs-plugin-datalabels';

import {getTooltipLabel} from '../utils';

const parseData = (logs, state) => {
    const filteredLogs = state ? filter(logs, log => log.user.state === state) : logs;
    return {
        labels: map(filteredLogs, log => log.user.username),
        datasets: [{
            borderColor: 'rgba(255, 140, 26, 1)',
            borderWidth: 1,
            data: map(filteredLogs, log => log.count)
        }]
    };
};

const Synchronization = ({logs, state}) => (
    <div className="box-doughnut">
        <h4 className="synchronization text-center">
            <FontAwesomeIcon icon={faSync}/>
            &nbsp;
            Sincronizaciones
        </h4>
        <Bar
            data={parseData(logs, state)}
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

Synchronization.propTypes = {
    logs: PropTypes.arrayOf(PropTypes.shape({})),
    state: PropTypes.number.isRequired
};

Synchronization.defaultProps = {
    logs: []
};

export default connect(state => ({
    logs: state.overview.logs
}))(Synchronization);
