import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFilter } from '../redux/actions'
const Filter = (props) => {
    function toggleBtnClick(filter) {
        props.toggleFilter(filter);
    }
    return (
        <div>
            <button onClick={() => toggleBtnClick("ALL")}>All</button>
            <button onClick={() => toggleBtnClick("COMPLETED")}>Completed</button>
            <button onClick={() => toggleBtnClick("INCOMPLETE")}>Incomplete</button>
        </div>
    )
}
export default connect(null, { toggleFilter })(Filter)