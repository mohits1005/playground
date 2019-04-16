import React, { Component } from 'react'
import { Row, Column } from './responsive';
class App extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params.token);
    }
    render(){
        return(
            <div>
                <Row>
                    <Column sm="10" xs="12">
                        <h1>Welcome to My Starter App</h1>
                    </Column>
                </Row>
            </div>
        )
    }
} 
export default App;