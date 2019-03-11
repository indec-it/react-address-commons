import {chunk, map} from 'lodash';

const chunkBlocksDwellings = ({blocks, firstDwellingChunkSize, dwellingChunkSize}) => map(blocks, (block, index) => {
    if (index === 0) {
        return ({...block, dwellings: chunk(block.dwellings, firstDwellingChunkSize)});
    }
    return ({...block, dwellings: chunk(block.dwellings, dwellingChunkSize)});
});

export default chunkBlocksDwellings;
