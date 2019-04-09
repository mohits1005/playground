import {ADD_TODO} from "../actionTypes";
export default function (state = [{ content: 'Yo!' }, { content: 'Yo!' }, { content: 'Yo!' }], action){
    switch(action.type){
        case ADD_TODO:{
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        }
        default:{
            return state
        }
    }
}