import {
    sumBy, flatten, filter, find, get, sum, subtract, uniq
} from 'lodash';

const DWELLINGS_WITHOUT_TYPE = 'Sin tipo';

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

    const filterResponse = filter(response, r => (state ? r._id.state === state : true));

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

    const edited = sumBy(filterResponse, p => p.editedBlocks);
    const added = sumBy(filterResponse, p => p.addedBlocks);
    const trimmed = sumBy(filterResponse, p => p.trimmedBlocks);
    const deleted = sumBy(filterResponse, p => p.deletedBlocks);
    const totalBlocks = sumBy(filterResponse, p => p.blocks);
    const unedited = subtract(totalBlocks, sum([edited, added, trimmed, deleted]));

    const blocksResponse = {
        labels: [
            'Actualizadas',
            'Nuevas',
            'Recorte',
            'Baja',
            'Sin editar'
        ],
        datasets: [{
            backgroundColor: [
                '#000',
                '#222983',
                '#b07cc6',
                '#dc0050',
                '#dcd775'
            ],
            data: [
                edited,
                added,
                trimmed,
                deleted,
                unedited
            ]
        }],
        total: totalBlocks
    };

    const addedSides = sumBy(filterResponse, p => p.addedSides);
    const deletedSides = sumBy(filterResponse, p => p.deletedSides);
    const totalSides = sumBy(filterResponse, p => p.sides);
    const sidesWithoutDwellings = subtract(totalSides, sum([addedSides, deletedSides]));

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
                addedSides,
                deletedSides,
                sidesWithoutDwellings
            ]
        }],
        total: totalSides
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
                sumBy(filterResponse, p => p.addedDwellings),
                sumBy(filterResponse, p => p.deletedDwellings)
            ]
        }],
        total: sumBy(filterResponse, p => p.dwellings)
    };

    const typesName = uniq(flatten(
        filterResponse.map(p => p.dwellingTypes.map(type => type.type || DWELLINGS_WITHOUT_TYPE))
    ));

    const dwellingsTypes = {
        labels: typesName,
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
            data: typesName.map(type => sumBy(filterResponse, p => get(
                find(p.dwellingTypes, dt => (DWELLINGS_WITHOUT_TYPE === type && !dt.type) || dt.type === type),
                'value',
                0
            )))
        }]
    };

    return {
        provinceData, blocksResponse, sidesResponse, dwellingsResponse, dwellingsTypes
    };
};

export default parseResponse;
