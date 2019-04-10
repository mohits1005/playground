import { ADD_TODO, TOGGLE_TODO} from "../actionTypes";
export default function (state = [], action){
    switch(action.type){
        case ADD_TODO:{
            return [
                ...state,
                {
                    id: action.id,
                    content: action.text,
                    completed: false
                }
            ];
            
        }
        case TOGGLE_TODO:{
            var todos = []
            var id =  action.id
            state.map((todo) => {
                if(todo.id === id){
                    if(todo.completed === false)
                        todo.completed = true
                    else
                        todo.completed = false
                }
                todos.push(todo);
            })
            return todos
        }
        default:{
            return state
        }
    }
}