import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getTodosByFilter } from '../redux/selectors';
import { toggleTodo } from '../redux/actions'
const TodoList = ({ todos,...props }) => {
    function toggleBtnClick(id){
        props.toggleTodo(id);
    }
    return(
        <ul>
            {
                todos && todos.length
                    ? todos.map((todo) => {
                        return (
                            <div key={todo.id}>
                                <div>
                                    {todo.content}&nbsp;
                                    <span>
                                        {todo.completed === false? 'Not Completed':'Completed'}
                                    </span>&nbsp;
                                    <button onClick={() => toggleBtnClick(todo.id)}>Toggle</button>
                                </div>
                            </div>
                        )
                    })
                    : "No todos! yay"
            }
        </ul>
    )
}
const mapStateToProps = state => {
    // const todos = getTodoList(state);
    const { filter } = state;
    const todos = getTodosByFilter(state, filter);
    return {todos};
}
export default connect(mapStateToProps,{toggleTodo})(TodoList)