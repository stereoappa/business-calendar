import {
    ADD_SLOT
} from './types';


export function addSlot(data) {
    return {
        type: ADD_SLOT,
        data
    }
}
