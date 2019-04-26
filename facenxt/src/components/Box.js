import React, {Component} from 'react';
import { Row, Column } from './responsive';
import ReactQuill from 'react-quill';
import uniqueId from 'react-html-id';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
const getHTML = function (who, deep) {
    if (!who || !who.tagName) return '';
    var txt, ax, el = document.createElement("div");
    el.appendChild(who.cloneNode(false));
    txt = el.innerHTML;
    if (deep) {
        ax = txt.indexOf('>') + 1;
        txt = txt.substring(0, ax) + who.innerHTML + txt.substring(ax);
    }
    el = null;
    return txt;
}
class Box extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const { box_id, type, content, next, content_json } = this.props.data;
        var policy = '?Policy=';
        var div = document.getElementById(box_id);
        // console.log(div);
        //hide video quiz
        var videoQuizDivs = document.getElementsByClassName('video_quiz')
        if(videoQuizDivs && videoQuizDivs.length > 0){
            videoQuizDivs[0].parentNode.removeChild(videoQuizDivs[0])
        }
        //add card class for quiz design
        var card = div.getElementsByClassName('ques_box');
        if(card && card.length > 0){
            div.getElementsByClassName('content-card')[0].classList.add('card');
            //add event listeners for options
            var options = div.getElementsByClassName('option');
            for(let i=0;i<options.length;i++){
                options[i].addEventListener("click",function(event){
                    console.log(box_id+' '+i)
                })
            }
        }
        // adding line numbers to code snippet
        var pre = div.getElementsByClassName('ql-syntax');
        for (var len = pre.length, i = 0; i < len; i++) {
            var code = pre[i];

            var column = document.createElement('div');
            column.setAttribute('aria-hidden', 'true');
            column.setAttribute('class', 'numbers');

            for (var n = 0; n < code.innerHTML.split(/[\n\r]/g).length; n++) {
                column.appendChild(document.createElement('span'));
            }
            pre[i].insertBefore(column, pre[i].getElementsByTagName('span')[0]);
            pre[i].className = 'ql-syntax line-numbers';
        }
        //add class ql-editor
        var editor = div.getElementsByTagName('pre');
        if(editor && editor.length > 0){
            div.getElementsByClassName('box-content')[0].classList.add('ql-editor');
        }
        // Parsing for user input
        let re = /&lt;uinput&gt;(.*?)&lt;\/uinput&gt;/gm;
        var uinput = content.match(re);
        if (uinput != null)
            uinput.map(function (val) {
                let uinp = val.replace(/&lt;\/?uinput&gt;/g, '');
                uinp = JSON.parse(uinp);
                let innerdiv = document.createElement('div');
                innerdiv.className='usr_inp';
                let form = document.createElement('form');
                form.className='input-group'
                form.className='quiz_group'
                let input = document.createElement('input');
                input.setAttribute('type','text');
                input.className = 'form-input';
                form.appendChild(input);
                let submit = document.createElement('input');
                submit.setAttribute('type','submit');
                submit.setAttribute('value','Submit');
                submit.className = 'input-group-btn';
                form.appendChild(submit);
                innerdiv.appendChild(form);
                let new_content = (content).replace(val, innerdiv.innerHTML);
                div.getElementsByClassName('box-content')[0].innerHTML = new_content;
            });
        //parsing for fill ups
        re = /@:fill_up:@/gm;
        var fill_up = content.match(re);
        var code_editor = {};
        var fill_up_answer = [];
        var fill_up_correct_msg = [];
        var fill_up_wrong_msg = [];
        var code_fill_data = {};
        var new_content = content;
        if (type == "snippet" && fill_up != null && content_json != undefined && content_json['options'] != undefined) {
            var snippet_type = 0;
            var k = 0;
            fill_up.map(function (v) {
                if (content_json['options'][k] != undefined) {
                    var fill_up_content = content_json['options'][k];
                    if (fill_up_content['s_t'] != undefined && fill_up_content['s_t'] == 0) {
                        var parentDiv = document.createElement('div');
                        parentDiv.className = 'cm_wrapper';
                        var textArea = document.createElement('textarea');
                        textArea.className = 'cm_textarea';
                        textArea.style.display = 'none';
                        textArea.setAttribute("id", 'snip_' + box_id + '_' + k);
                        parentDiv.appendChild(textArea);
                        var brElement = document.createElement('br');
                        parentDiv.appendChild(brElement);
                        var button1 = document.createElement('button');
                        button1.setAttribute('type','submit');
                        button1.className = 'compile_btn';
                        button1.innerHtml = 'Compile & Run';
                        button1.setAttribute("lang_id", fill_up_content["lang_id"]);
                        button1.setAttribute("data-cm-id", 'snip_' + box_id + '_' + k);
                        parentDiv.appendChild(button1);
                        var a1 = document.createElement('a');
                        a1.className = 'code_reset';
                        a1.innerHTML = 'Reset';
                        parentDiv.appendChild(a1);
                        var outputDiv = document.createElement('div');
                        outputDiv.className = 'compile_output_wrapper';
                        var text = document.createTextNode('Output:');
                        outputDiv.appendChild(text);
                        var codeOuterDiv = document.createElement('div');
                        codeOuterDiv.className = 'code';
                        var codeInnerDiv = document.createElement('code');
                        codeInnerDiv.className = 'compile_output';
                        codeOuterDiv.appendChild(codeInnerDiv);
                        outputDiv.appendChild(codeOuterDiv);
                        var status = document.createElement('div');
                        status.className = 'compile_status';
                        outputDiv.appendChild(status);
                        parentDiv.appendChild(outputDiv);
                                                
                        new_content = (new_content).replace("@:fill_up:@", parentDiv.outerHTML);
                        code_editor['snip_' + box_id + '_' + k] = fill_up_content;
                    }
                    else if (fill_up_content['s_t'] != undefined && fill_up_content['s_t'] == 1) {
                        snippet_type = 1;
                        new_content = (new_content).replace("@:fill_up:@", '<input class="fill_up_inp" type="text"></input>');
                        fill_up_answer.push(fill_up_content['s_t_a']);

                        if (fill_up_content['c_m'] != undefined)
                            fill_up_correct_msg.push(fill_up_content['c_m']);
                        else
                            fill_up_correct_msg.push("");

                        if (fill_up_content['w_m'] != undefined)
                            fill_up_correct_msg.push(fill_up_content['c_m']);
                        else
                            fill_up_correct_msg.push("");
                    }
                    else if (fill_up_content['s_t'] != undefined && fill_up_content['s_t'] == 2) {
                        snippet_type = 2;
                        var code_fill_id = 'code_fill_' + box_id + '_' + k;

                        if (fill_up_content['s_f_t'] != undefined && fill_up_content['s_f_t'] == 0) {
                            var spanDiv = document.createElement('span');
                            spanDiv.className = 'fill_input_clones';
                            var inpDiv = document.createElement('input');
                            inpDiv.className = 'code_fill_inp';
                            inpDiv.setAttribute('type','text');
                            inpDiv.setAttribute("id", code_fill_id);
                            spanDiv.appendChild(inpDiv)                         
                            new_content = (new_content).replace("@:fill_up:@", spanDiv.outerHTML);
                            
                        }
                        if (fill_up_content['s_f_t'] != undefined && fill_up_content['s_f_t'] == 1) {
                            new_content = (new_content).replace("@:fill_up:@", "");
                        }
                        else if (fill_up_content['s_f_t'] != undefined && fill_up_content['s_f_t'] == 2) {
                            var inpClone = document.createElement('span');
                            inpClone.className = 'fill_mcq_input';
                            var spanDiv = document.createElement('span');
                            spanDiv.className = 'popover';
                            spanDiv.className = 'popover-right';
                            spanDiv.className = 'code_fill_mcq_wrapper';
                            var inputDiv = document.createElement('code_fill_inp');
                            inputDiv.setAttribute('type','text');
                            inputDiv.setAttribute("id", code_fill_id);
                            spanDiv.appendChild(inputDiv);
                            var popoverOuterDiv = document.createElement('div');
                            popoverOuterDiv.className = 'popover-container';
                            var popoverInnerDiv = document.createElement('div');
                            popoverInnerDiv.className = 'card';
                            var innerDiv = document.createElement('card-body');
                            innerDiv.className = 'card-body';
                            popoverInnerDiv.appendChild(innerDiv);
                            popoverOuterDiv.appendChild(popoverInnerDiv);
                            spanDiv.appendChild(popoverOuterDiv);
                            new_content = (new_content).replace("@:fill_up:@", inpClone.outerHTML);
                        }
                        code_fill_data['code_fill_' + box_id + '_' + k] = fill_up_content;
                    }
                }
                k++;
            })
            if (snippet_type == 1) {
                new_content += "<button class='btn btn-primary fill_up_btn' onclick='check_fill_up($(this));'>Submit</button>";
                new_content += "<div class='fill_up_status d-hide'></div>";
            }
            if (snippet_type == 2) {
                new_content += "<div class='cm_wrapper'><button class='btn btn-primary compile_btn' onclick='compile_run($(this));'><i class='fa fa-cogs'></i><span class='loading d-hide'></span>&nbsp;Submit</button>";
                new_content += '<div class="compile_output_wrapper d-hide">Output:<div class="code"><code class="compile_output"></code></div></div><div class="compile_status d-hide"></div></div>';
            }
            div.setAttribute("data-snippet-type", snippet_type);
            div.getElementsByClassName('box-content')[0].innerHTML = new_content;
            // console.log(div.getElementsByClassName('box-content')[0].innerHTML)
            // console.log(new_content)
        }
        
    }
    render(){
        const { box_id, type, content, next} = this.props.data;
        const avatar = this.props.avatar;
        const {user, display} = this.props.avatar;
        const userDisplay = user === 'user' && display == 1 ? '': 'vhidden';
        const botDisplay = user === 'bot' && display == 1 ? '' : 'vhidden';
        return (
            <Row className='box' id={box_id} >
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
                    <Column sm="9" xs="12" className="content-card box-content">
                        {/* {convertNodeToElement(parsedContent)} */}
                        <div dangerouslySetInnerHTML={{ __html: content }} />
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