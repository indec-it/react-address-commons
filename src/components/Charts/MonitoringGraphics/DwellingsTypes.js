import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs-2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartBar, faSpinner} from '@fortawesome/free-solid-svg-icons';
import 'chartjs-plugin-datalabels';

import {getTooltipLabel} from '../utils';

const DwellingsTypes = ({dwellingsTypes, loadingDwellingsTypes}) => (
    <div className="box-doughnut">
        <h4 className="dwellings text-center">
            <FontAwesomeIcon icon={faChartBar}/>
            &nbsp;
            Tipo de viviendas
        </h4>
        {loadingDwellingsTypes ? <FontAwesomeIcon icon={faSpinner} pulse size="3x"/> : (
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
        )}
    </div>
);

DwellingsTypes.propTypes = {
    dwellingsTypes: PropTypes.shape({}),
    loadingDwellingsTypes: PropTypes.bool
};

DwellingsTypes.defaultProps = {
    dwellingsTypes: {},
    loadingDwellingsTypes: true
};

export default connect(state => ({
    loadingDwellingsTypes: state.overview.loadingDwellingsTypes
}))(DwellingsTypes);
