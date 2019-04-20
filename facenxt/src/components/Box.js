import React, {Component} from 'react';
import { Row, Column } from './responsive';
import ReactQuill from 'react-quill';
import uniqueId from 'react-html-id';
class Box extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        //set policy
        const { box_id, type, content, next } = this.props.data;
        var policy = '?Policy=';
        var div = document.getElementById(box_id).getElementsByClassName('ql-video');
        if(div.length > 0){
            var src = div[0].src;
            var new_src = src + policy;
            // console.log(new_src);
            var video_div = document.createElement("VIDEO");
            video_div.classList.add("ql-video");
            video_div.setAttribute("data-video-id", new_src);
            video_div.setAttribute("controls", "");
            var source_div = document.createElement("SOURCE");
            source_div.setAttribute("src", new_src);
            source_div.setAttribute("type", "video/mp4");
            video_div.appendChild(source_div);
            div[0].replaceWith(video_div);
        }
        //hide empty p tags or with Add Quiz
        var p_tags = document.getElementsByTagName('p');
        for(let i=0;i<p_tags.length;i++){
            var p_tag = p_tags[i];
            if (p_tag.innerHTML.trim() == '' || p_tag.innerHTML.trim() == 'Add Quiz')
                p_tag.parentNode.removeChild(p_tag)
        }  
    
    }
    render(){
        const { box_id, type, content, next} = this.props.data;
        const avatar = this.props.avatar;
        const {user, display} = this.props.avatar;
        const userDisplay = user === 'user' && display == 1 ? '': 'vhidden';
        const botDisplay = user === 'bot' && display == 1 ? '' : 'vhidden';
        // console.log(user+' '+display);
        return (
            <Row className='box' id={box_id}>
                <Column sm="9" xs="12" center className="playground">
                    <Column sm="1" xs="12" className={"avatar-card " + botDisplay}>
                        <img src="https://facenxt.com/static/imgs/facenxt_bot.svg" alt="" className="avatar" />
                    </Column>
                    <Column sm="1" xs="12" className={"avatar-card " + userDisplay} visible_xs hidden_sm>
                        <div className="avatar user-avatar align-right">
                            <div className="avatar-letter">
                                M
                                </div>
                        </div>
                    </Column>
                    <Column sm="9" xs="12" className="content-card">
                        <ReactQuill  theme={null} readOnly={true} className="box-content" value={content} />
                    </Column>
                    <Column sm="1" xs="12" className={"avatar-card " + userDisplay} visible_sm hidden_xs>
                        <div className="avatar user-avatar">
                            <div className="avatar-letter">
                                M
                                </div>
                        </div>
                    </Column>
                </Column>
            </Row>
        )
    }
}
export default Box;