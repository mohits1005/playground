import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getTodoList } from '../redux/selectors';
const TodoList = ({ todos }) => (
    <ul>
        {
            todos && todos.length
                ? todos.map((todo) => {
                    return <div>{todo.content}</div>
                })
                : "No todos! yay"
        }
    </ul>
)
const mapStateToProps = state => {
    const todos = getTodoList(state);
    return {todos};
}
export default connect(mapStateToProps)(TodoList)