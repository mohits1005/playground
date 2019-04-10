import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'
import Filter from './components/Filter'

class App extends Component {
  render() {
    return (
      <div>
        <TodoList />
        <AddTodo />
        <Filter />
      </div>
    );
  }
}

export default App;
