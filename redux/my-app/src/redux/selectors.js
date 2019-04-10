export const getTodoList = store => 
    store && store.todos ? store.todos: [];

export const getTodosByFilter = (store, filter) => {
    const allTodos = getTodoList(store);
    switch(filter){
        case 'ALL':{
            return allTodos;
        }
        case 'COMPLETED':{
            return allTodos.filter(todo => {
                if(todo.completed === true)
                    return todo
            });
        }
        case 'INCOMPLETE':{
            return allTodos.filter(todo => {
                console.log(todo)
                if (todo.completed === false)
                    return todo
            });
        }
    }
}
