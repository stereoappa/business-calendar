import {ADD_SLOT} from "@/redux/types";

export function rootReducer(state, action) {
    switch (action.type) {
        case ADD_SLOT:
            state.slotsState.push(action.data)
            return state

        default: return state
    }
}
