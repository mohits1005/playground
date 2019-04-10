import { ADD_TODO, TOGGLE_TODO, TOGGLE_FILTER} from './actionTypes';
let nextTodoId = 0;
export const addTodo = content => ({
    type: ADD_TODO,
    text: content,
    id: ++nextTodoId,
})
export const toggleTodo = id => ({
    type: TOGGLE_TODO,
    id: id,
})
export const toggleFilter = filter => ({
    type: TOGGLE_FILTER,
    filter: filter
})