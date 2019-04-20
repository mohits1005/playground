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
        // console.log(params.token+' '+params.track);
        var data = DATA;
        // console.log(data);
        this.setState({boxes: data});
    }
    render(){
        const {boxes} = this.state;
        var lastBox = '';
        return(
            <div>
                {boxes.length > 0 && boxes.map((box) => {
                    var user = 'bot';
                    var display = 1;
                    var substr = '<a href=\"#b';
                    //set bot or user
                    if (box.type == 'quiz') {
                        user = 'user';
                    } else if (box.content.indexOf(substr) >= 0) {
                        user = 'user';
                    }
                    if(user == lastBox)
                        display = 0;
                    lastBox = user;
                    var avatar = {user,display}
                    return (
                        <Box key={box.box_id} data={box} avatar={avatar}/>
                    )
                })}
            </div>
        )
    }
} 
export default App;