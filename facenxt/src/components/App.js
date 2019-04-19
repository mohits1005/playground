import React, { Component } from 'react'
import { DATA } from '../seed';
import Box from './Box';
class App extends Component{
    constructor(props){
        super(props);
        this.state = {boxes:[]};
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        // console.log(params.token);
        var data = DATA;
        // console.log(data);
        this.setState({boxes: data});
    }
    render(){
        const {boxes} = this.state;
        return(
            <div>
                {boxes.length > 0 && boxes.map((box) => {
                    return (
                        <Box key={box.box_id} data={box}/>
                    )
                })}
            </div>
        )
    }
} 
export default App;