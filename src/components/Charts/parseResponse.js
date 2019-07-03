import {sumBy, filter, map} from 'lodash';

const parseResponse = (state, province, response) => {
    const filteredProvince = filter(province, p => (state ? p._id.state === state : true));

    const unassigned = sumBy(filteredProvince, p => p.unassigned);
    const assigned = sumBy(filteredProvince, p => p.assigned);
    const inProgress = sumBy(filteredProvince, p => p.inProgress);
    const close = sumBy(filteredProvince, p => p.close);
    const supervision = sumBy(filteredProvince, p => p.supervision);
    const supervised = sumBy(filteredProvince, p => p.supervised);
    const approved = sumBy(filteredProvince, p => p.approved);
    const done = sumBy(filteredProvince, p => p.done);

    const provinceData = {
        labels: [
            'Sin asignar',
            'Asignados',
            'Actualizando',
            'Cerrados',
            'Supervisando',
            'Supervisados',
            'Aprobados',
            'Finalizados'
        ],
        datasets: [{
            backgroundColor: [
                '#222983',
                '#dc0068',
                '#000',
                '#dc0030',
                '#b07cc6',
                '#59465a',
                '#ffcc99',
                '#bfc9ca'
            ],
            data: [
                unassigned,
                assigned,
                inProgress,
                close,
                supervision,
                supervised,
                approved,
                done
            ]
        }],
        total: sumBy(filteredProvince, p => p.open)
    };

    const blocksResponse = {
        labels: [
            'Actualizadas',
            'Nuevas',
            'Recorte',
            'Baja'
        ],
        datasets: [{
            backgroundColor: [
                '#000',
                '#222983',
                '#b07cc6',
                '#dc0050'
            ],
            data: [
                response.blocks.edited,
                response.blocks.added,
                response.blocks.trimmed,
                response.blocks.deleted
            ]
        }],
        total: response.blocks.total
    };

    const sidesResponse = {
        labels: [
            'Nuevas',
            'Bajas',
            'Sin viviendas'
        ],
        datasets: [{
            backgroundColor: [
                '#502f5e',
                '#b07cc6',
                '#dc0068'
            ],
            data: [
                response.sides.added,
                response.sides.deleted,
                response.sides.withoutDwellings
            ]
        }],
        total: response.sides.total
    };

    const dwellingsResponse = {
        labels: [
            'Nuevas',
            'Bajas'
        ],
        datasets: [{
            backgroundColor: [
                '#434947',
                '#bfc9ca'
            ],
            data: [
                response.dwellings.added,
                response.dwellings.deleted
            ]
        }],
        total: response.dwellings.total
    };

    const dwellingsTypes = {
        labels: map(response.dwellingsTypes, dwellingType => dwellingType._id),
        datasets: [{
            backgroundColor: [
                '#ffd9b3',
                '#ffcc99',
                '#ffbf80',
                '#ffb366',
                '#ffa64d',
                '#ff9933',
                '#ff8c1a',
                '#ff8000',
                '#e67300',
                '#cc6600',
                '#b35900',
                '#994d00',
                '#804000',
                '#663300',
                '#4d2600'
            ],
            borderColor: 'rgba(255, 140, 26, 1)',
            borderWidth: 1,
            data: map(response.dwellingsTypes, dwellingType => dwellingType.count)
        }]
    };

    return {
        provinceData, blocksResponse, sidesResponse, dwellingsResponse, dwellingsTypes
    };
};

export default parseResponse;
