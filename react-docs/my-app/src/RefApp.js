import React, { Component } from 'react';
class CustomTextInput extends Component{
    render(){
        return (
            <input type='text' ref={this.props.textInput} />
        )
    }
}
class RefApp extends Component {
    constructor(props) {
        super(props)
        //create a ref to store the text element DOM input
        this.textInput = React.createRef();
    }
    focus() {
        // Explicitly focus the text input using the raw DOM API
        // Note: we're accessing "current" to get the DOM node
        this.textInput.current.focus();
    }
    componentDidMount(){
        this.focus();
    }
    render(){
        return(
            <CustomTextInput textInput={this.textInput}/>
        )
    }
}
export default RefApp;