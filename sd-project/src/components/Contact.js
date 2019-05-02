import React, { Component } from 'react';
import { Row, Column } from './responsive';
import { DATA } from '../seed';
class Contact extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { id, name, email, phone, company, starred } = this.props.data;
        let star = 
            <svg width="20" height="20" viewBox="0 0 24 24" ><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></svg>
        if(starred == 1){
            star =
                <svg width="20" height="20" viewBox="0 0 24 24" ><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
        }
        return (
            <Row className='contact-wrap contact-body'>
                <Column sm="10" xs="12" center className="contact-card">
                    <Column sm="2" xs="12" className="contact-column contact-person">
                        <img src="https://facenxt.com/static/imgs/facenxt_bot.svg" alt="" className="avatar" />
                        <div className="contact-name">
                            {name}
                            </div>
                    </Column>
                    <Column sm="2" hidden_xs className="contact-column">
                        <div className="">
                            {email}
                            </div>
                    </Column>
                    <Column sm="2" hidden_xs className="contact-column">
                        <div className="">
                            {phone}
                            </div>
                    </Column>
                    <Column sm="2" hidden_xs className="contact-column">
                        <div className="">
                            {company}
                            </div>
                    </Column>
                    <Column sm="1" hidden_xs className="contact-column contact-mod">
                        <div className="contact-star" onClick={() => this.props.toggleStarredContact(id)}>
                            {star}
                        </div>
                        <div className="contact-edit" onClick={() => this.props.handleOpenEditModal(id)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" ><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path></svg>
                        </div>
                    </Column>
                </Column>
            </Row>
        )
    }
}
export default Contact;