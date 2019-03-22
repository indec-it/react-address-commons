import {chunk, concat, map} from 'lodash';

const chunkBlocksDwellings = ({blocks, firstDwellingChunkSize, dwellingChunkSize}) => map(blocks, (block, index) => {
    if (index === 0) {
        const {dwellings} = block;
        const getFirstFiveDwellings = dwellings.slice(0, 5);
        const restOfDwellings = block.dwellings.slice(5);
        const result = chunk(restOfDwellings, dwellingChunkSize);
        return ({...block, dwellings: concat(chunk(getFirstFiveDwellings, firstDwellingChunkSize), result)});
    }
    return ({...block, dwellings: chunk(block.dwellings, dwellingChunkSize)});
});

export default chunkBlocksDwellings;
