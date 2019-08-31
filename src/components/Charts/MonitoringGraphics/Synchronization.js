import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs-2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {map} from 'lodash';
import 'chartjs-plugin-datalabels';

import {getTooltipLabel} from '../utils';

const parseData = logs => {
    const userNames = logs.map(log => log.user.username);
    return {
        labels: userNames,
        datasets: [{
            borderColor: 'rgba(255, 140, 26, 1)',
            borderWidth: 1,
            data: map(logs, log => log.count)
        }]
    };
};

const Synchronization = ({logs, loadingLogs}) => (
    <div className="box-doughnut">
        <h4 className="synchronization text-center">
            <FontAwesomeIcon icon={faSync}/>
            &nbsp;
            Sincronizaciones
        </h4>
        {loadingLogs ? <FontAwesomeIcon icon={faSpinner} pulse size="3x"/> : (
            <Bar
                data={parseData(logs)}
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
        )}
    </div>
);

Synchronization.propTypes = {
    logs: PropTypes.arrayOf(PropTypes.shape({})),
    loadingLogs: PropTypes.bool
};

Synchronization.defaultProps = {
    logs: [],
    loadingLogs: true
};

export default connect(state => ({
    logs: state.overview.logs,
    loadingLogs: state.overview.loadingLogs
}))(Synchronization);
