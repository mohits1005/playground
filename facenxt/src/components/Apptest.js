import React, { Component } from 'react'
import CodeMirror from 'codemirror'
import '../../node_modules/codemirror/mode/python/python'
class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var codeDiv = document.getElementsByClassName('code')[0];
        var myCodeMirror = CodeMirror.fromTextArea(codeDiv, {
            lineNumbers: true,
            matchBrackets: true
        });
        myCodeMirror.setSize(null, "380px");
        myCodeMirror.setOption("mode", 'text/x-python');
        myCodeMirror.refresh();
    }
    render() {
        return (
            <div className="cm_wrapper">
                <textarea className="code">
                </textarea>
            </div>
        )
    }
}
export default App;