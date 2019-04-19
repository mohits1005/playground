import React, { Component, createElement } from 'react'
import { Row, Column } from './responsive';
import { DATA } from '../seed';
import ReactQuill from 'react-quill';
import Plyr from 'plyr';
class App extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params.token);
        var data = DATA;
        // console.log(data);
        var divs = document.getElementsByClassName('ql-video');
        for (let i = 0; i < divs.length; i++) {
            var div = divs[i];
            // console.log(div.src);
            // var video_div = document.createElement("div");
            var video_div = document.createElement("VIDEO");
            video_div.classList.add("ql-video");
            video_div.setAttribute("data-video-id", div.src);
            video_div.setAttribute("controls", "");
            var source_div = document.createElement("SOURCE");
            source_div.setAttribute("src", div.src);
            source_div.setAttribute("type", "video/mp4");
            // var text_node = document.createTextNode("Hi");
            video_div.appendChild(source_div);
            div.replaceWith(video_div);

            //setup video player
            // const player = new Plyr(document.querySelector('.ql-video'));
            // const players = Plyr.setup('.ql-video');
        }
        // console.log(div)
    }

    render() {
        const text = "<p><span style=\"color: rgb(0, 0, 0);\">The words of your record-keeping (no<\/span> pun <span style=\"color: rgb(0, 0, 0);\">intended) skills have spread across the world and y<\/span>ou've been chosen as the next Archive Keeper. <span style=\"color: rgb(0, 0, 0);\">Movies and the information about them are still stored on paper.<\/span><\/p>";
        const text2 = "<video class=\"nomnom ql-video ql-video-home\" src=\"http:\/\/file-examples.com\/wp-content\/uploads\/2017\/04\/file_example_MP4_480_1_5MG.mp4\" \" style=\"height: 320px;\"><\/video>";
        return (
            <div>
                <Row>
                    <Column sm="8" xs="12" center className="playground">
                        <Column sm="1" xs="12" className="avatar-card" >
                            <img src="https://facenxt.com/static/imgs/facenxt_bot.svg" alt="" className="avatar" />
                        </Column>
                        <Column sm="1" xs="12" className="avatar-card" hidden_sm hidden_xs>
                            <div className="avatar user-avatar align-right">
                                <div className="avatar-letter">
                                    M
                                </div>
                            </div>
                        </Column>
                        <Column sm="9" xs="12" className="content-card">
                            {/* <div className="box-content">
                                Welcome to the City of Hollywood, Mohit s!
                            </div> */}
                            <ReactQuill theme={null} readOnly={true} className="box-content" value={text2} />
                        </Column>
                        <Column sm="1" xs="12" className="avatar-card" hidden_sm hidden_xs>
                            <div className="avatar user-avatar">
                                <div className="avatar-letter">
                                    M
                                </div>
                            </div>
                        </Column>
                    </Column>
                </Row>

            </div>
        )
    }
}
export default App;