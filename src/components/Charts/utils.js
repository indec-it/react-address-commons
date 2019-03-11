import {head, sum} from 'lodash';
import {chartsColours} from '../common';

import {getPercentage} from '../../util';

const dwellings = dwelling => {
    const data = [
        dwelling.onCourse,
        dwelling.total,
        dwelling.response,
        dwelling.noResponse,
        dwelling.firstCause,
        dwelling.secondCause,
        dwelling.thirdCause,
        dwelling.fourthCause,
        dwelling.fifthCause,
        dwelling.sixthCause,
        dwelling.seventhCause,
        dwelling.eigthCause
    ];

    const label = dwelling._id.ups
        ? `${dwelling._id.stateName} Fracción: ${dwelling._id.ups} Viviendas` : `${dwelling._id.stateName} Viviendas`;
    return {
        labels: [
            'Total', 'Relevadas', 'Resp.', 'No Resp.',
            '1 DES', '2 DEM', '3 FDS', '4 ECR', '5 VUE', '6 LCV', '7 DNE', '8 AIN'
        ],
        datasets: [{
            label,
            backgroundColor: 'rgba(0, 68, 255, 0.2)',
            borderColor: 'rgba(0, 68, 255, 1)',
            borderWidth: 1,
            data,
            ...chartsColours(dwelling._id.stateId)
        }]
    };
};

const getTooltipLabel = (tooltipItem, data) => {
    const dataset = head(data.datasets);
    const label = data.labels[tooltipItem.index];
    const count = dataset.data[tooltipItem.index];
    const percent = getPercentage(count, sum(dataset.data), 2);
    return ` ${label}: ${count} (${percent}%)`;
};

export {dwellings};
export {getTooltipLabel};
