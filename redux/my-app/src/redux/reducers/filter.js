import { TOGGLE_FILTER } from "../actionTypes";
export default function (state = 'ALL', action) {
    switch (action.type) {
        case TOGGLE_FILTER: {
            var filter = action.filter;
            return filter;
        }
        default: {
            return state
        }
    }
}