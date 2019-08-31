import {
    sumBy, filter, sum, subtract, reduce, forEach, map
} from 'lodash';

const parseResponse = (state, province, {
    blocks, sides, dwellings, dwellingsTypes: types
}) => {
    const filteredProvince = filter(province, p => (state ? p._id.state === state : true));

    const unassigned = sumBy(filteredProvince, p => p.unassigned);
    const assigned = sumBy(filteredProvince, p => p.assigned);
    const inProgress = sumBy(filteredProvince, p => p.inProgress);
    const close = sumBy(filteredProvince, p => p.close);
    const supervision = sumBy(filteredProvince, p => p.supervision);
    const supervised = sumBy(filteredProvince, p => p.supervised);
    const approved = sumBy(filteredProvince, p => p.approved);
    const done = sumBy(filteredProvince, p => p.done);

    const filterBlocks = filter(blocks, r => (state ? r._id.state === state : true));
    const filterSides = filter(sides, r => (state ? r._id.state === state : true));
    const filterDwellings = filter(dwellings, r => (state ? r._id.state === state : true));
    const filterDwellingsTypes = filter(types, r => (state ? r._id.state === state : true));

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

    const edited = sumBy(filterBlocks, p => p.editedBlocks);
    const added = sumBy(filterBlocks, p => p.addedBlocks);
    const trimmed = sumBy(filterBlocks, p => p.trimmedBlocks);
    const deleted = sumBy(filterBlocks, p => p.deletedBlocks);
    const totalBlocks = sumBy(filterBlocks, p => p.blocks);

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
                edited,
                added,
                trimmed,
                deleted
            ]
        }],
        total: totalBlocks
    };

    const addedSides = sumBy(filterSides, p => p.addedSides);
    const deletedSides = sumBy(filterSides, p => p.deletedSides);
    const totalSides = sumBy(filterSides, p => p.sides);
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
                sumBy(filterDwellings, p => p.addedDwellings),
                sumBy(filterDwellings, p => p.deletedDwellings)
            ]
        }],
        total: sumBy(filterDwellings, p => p.dwellings)
    };

    const dwellingTypesNames = [];
    const dwellingTypesValues = [];
    const responseDwellingsTypes = map(filterDwellingsTypes, dwellingType => dwellingType.dwellingTypes);

    const dwellingTypes = reduce(
        responseDwellingsTypes,
        (result, item) => {
            const newResult = {...result};
            forEach(item, (value, key) => {
                if (newResult[key]) {
                    newResult[key] += value;
                } else {
                    newResult[key] = value;
                }
            });
            return newResult;
        },
        {}
    );

    forEach(dwellingTypes, (value, key) => dwellingTypesNames.push(key) && dwellingTypesValues.push(value));

    const dwellingsTypesResponse = {
        labels: dwellingTypesNames,
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
            data: dwellingTypesValues
        }]
    };

    return {
        provinceData, blocksResponse, sidesResponse, dwellingsResponse, dwellingsTypesResponse
    };
};

export default parseResponse;
