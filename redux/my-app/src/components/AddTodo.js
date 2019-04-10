import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions'
const AddTodo = (props) => {
    const [val, setVal] = useState('');
    function handleChange(e){
        setVal(e.target.value);
    }
    function handleClick(){
        // alert(val);
        props.addTodo(val);
        setVal('');
    }
    return (
        <React.Fragment>
            <input value={val} onChange={handleChange}/>
            <button onClick={handleClick}>Save</button>
        </React.Fragment>
    )
}
export default connect(null, { addTodo})(AddTodo);    