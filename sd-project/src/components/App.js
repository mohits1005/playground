import React, { Component } from 'react';
import { Row, Column } from './responsive';
import { DATA } from '../seed';
import Contact from './Contact';
import Modal from 'react-modal';
import EditForm from './EditForm';
import InsertForm from './InsertForm';
Modal.setAppElement('#app');
class App extends Component{
    constructor(props){
        super(props);
        this.state = { contacts: [], editModalId: -1, insertModal: false};
        this.toggleStarredContact = this.toggleStarredContact.bind(this);
        this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
        this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
        this.editFormSubmit = this.editFormSubmit.bind(this);
        this.handleCloseInsertModal = this.handleCloseInsertModal.bind(this);
        this.handleOpenInsertModal = this.handleOpenInsertModal.bind(this);
        this.addFormSubmit = this.addFormSubmit.bind(this);
    }
    handleOpenEditModal(id) {
        this.setState({ editModalId: id });
    }
    handleCloseEditModal() {
        this.setState({ editModalId: -1 });
    }
    handleOpenInsertModal() {
        this.setState({ insertModal: true });
    }
    handleCloseInsertModal() {
        this.setState({ insertModal: false });
    }
    addFormSubmit(contact){
        var new_contacts = this.state.contacts;
        contact.id = new_contacts.length + 1;
        contact.starred = 0;
        new_contacts.push(contact)
        this.setState({contacts:new_contacts});
    }
    componentDidMount(){
        //load seed data
        var data = DATA;
        this.setState({ contacts: data });
    }
    editFormSubmit(id, contact){
        const { contacts } = this.state;
        var new_contacts = [];
        for (var i = 0; i < contacts.length; i++) {
            if (contacts[i]['id'] == id) {
                let new_contact = contacts[i];
                new_contact.name = contact.name;
                new_contact.phone = contact.phone;
                new_contact.email = contact.email;
                new_contact.company = contact.company;
                new_contacts.push(new_contact);
            }
            else {
                new_contacts.push(contacts[i]);
            }
        }
        this.setState({ contacts: new_contacts });
    }
    toggleStarredContact(id){
        const { contacts } = this.state;
        var new_contacts = [];
        for (var i = 0; i < contacts.length; i++) {
            if (contacts[i]['id'] == id){
                let new_contact = contacts[i]
                if(contacts[i]['starred'] == 1)
                    new_contact['starred'] = 0;
                else
                    new_contact['starred'] = 1;
                new_contacts.push(new_contact);
            }
            else{
                new_contacts.push(contacts[i]);
            }
        }
        this.setState({ contacts: new_contacts });
    }
    render(){
        const { contacts, editModalId, insertModal } = this.state;
        const displayContactsNumber = <div className='contact-number'>
            CONTACTS ({contacts.length})
        </div>
        var starredContacts = [];
        for(var i=0;i<contacts.length;i++){
            if(contacts[i]['starred'] == 1)
                starredContacts.push(contacts[i]);
        }
        const displayStarredContactsNumber = <div className='contact-number'>
            STARRED CONTACTS ({starredContacts.length})
        </div>
        let customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                display: 'table', /* This is important */
                overflow: 'auto',
                width: 'auto',
            }
        };
        const editModal = (
            <Modal
                isOpen={this.state.editModalId === -1 ? false : true}
                style={customStyles}
                id={editModalId}
                contacts={contacts}
            >
                <EditForm id={editModalId} contacts={contacts} editFormSubmit={this.editFormSubmit} handleCloseEditModal={this.handleCloseEditModal}/>
                <button className="cancel-btn" onClick={this.handleCloseEditModal}>Cancel</button>
            </Modal>
        )
        const insertModalElem = (
            <Modal
                isOpen={insertModal}
                style={customStyles}
            >
                <InsertForm addFormSubmit={this.addFormSubmit} handleCloseInsertModal={this.handleCloseInsertModal} />
                <button className="cancel-btn" onClick={this.handleCloseInsertModal}>Cancel</button>
            </Modal>
        )
        return(
            <div>
                {editModalId !== -1 && editModal}
                {insertModal && insertModalElem}
                <button className="create-btn" onClick={this.handleOpenInsertModal}>Create Contact</button>
                <Row className='contact-wrap '>
                    <Column sm="10" hidden_xs center className=" contact-card">
                        <Column sm="2" xs="12" className="contact-header contact-column contact-person">
                            <div className="">
                                Name
                            </div>
                        </Column>
                        <Column sm="2" xs="12" className="contact-header contact-column">
                            <div className="">
                                Email
                            </div>
                        </Column>
                        <Column sm="2" xs="12" className="contact-header contact-column">
                            <div className="">
                                Phone number
                            </div>
                        </Column>
                        <Column sm="2" xs="12" className="contact-header contact-column">
                            <div className="">
                                Job title and company
                            </div>
                        </Column>
                        <Column sm="1" xs="12" className="contact-header contact-column">
                        </Column>
                    </Column>
                </Row>
                <Row className='contact-wrap '>
                    <Column sm="10" xs="12" center className=" contact-card">
                        {starredContacts.length > 0 && displayStarredContactsNumber}
                    </Column>
                </Row>
                {starredContacts.length > 0 && starredContacts.map((contact) => {
                    return (
                        <Contact key={contact.id} data={contact} toggleStarredContact={this.toggleStarredContact} handleOpenEditModal={this.handleOpenEditModal}/>
                    )
                })}
                <Row className='contact-wrap '>
                    <Column sm="10" xs="12" center className=" contact-card">
                        {contacts.length > 0 && displayContactsNumber}
                    </Column>
                </Row>
                {contacts.length > 0 && contacts.map((contact) => {
                    return (
                        <Contact key={contact.id} data={contact} toggleStarredContact={this.toggleStarredContact} handleOpenEditModal={this.handleOpenEditModal}/>
                    )
                })}
            </div>
        )
    }
} 
export default App;