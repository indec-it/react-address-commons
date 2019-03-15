import {call, put} from 'redux-saga/effects';

import {handleError} from '../actions/common';
import DownloadBlock from '../services/downloadBlock';
import BlockService from '../services/block';

// eslint-disable-next-line
export function* exportBlock({block: {blockId, blockNumber}}) {
    try {
        const sides = yield call(BlockService.exportBlock, blockId);
        DownloadBlock.download({number: blockNumber}, sides, 'block');
    } catch (err) {
        yield put(handleError(err));
    }
}
