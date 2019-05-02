import React, { Component } from 'react';
class InsertForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', email: '', phone: '', company: '', message: '' };
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    onHandleSubmit(event) {
        event.preventDefault();
        var id = this.props.id;
        const { name, email, phone, company } = this.state;
        var content = { name, email, phone, company};
        //check if email is valid and mobile is valid
        var mobile_flag = 0;
        if (/^\d{10}$/.test(phone)) {
            // value is ok, use it
            mobile_flag = 1;
        }
        if (mobile_flag == 1) {
            this.props.addFormSubmit(content);
            this.props.handleCloseInsertModal();
        }
        else {
            this.setState({ message: 'Mobile number is invalid!!' })
        }
    }
    handleInputChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({ [name]: value });
    }
    render() {
        const { name, email, phone, company, message } = this.state;
        return (
            <form id="insertForm" onSubmit={this.onHandleSubmit}>
                <div className="edit-heading">
                    Insert Contact
                </div>
                <hr />
                <div>
                    <input className="form-input" name="name" value={name} onChange={this.handleInputChange} type="text" placeholder="Name" required />
                </div>
                <div>
                    <input className="form-input" name="email" value={email} onChange={this.handleInputChange} type="email" placeholder="Email" />
                </div>
                <div>
                    <input className="form-input" name="phone" value={phone} onChange={this.handleInputChange} type="text" placeholder="Phone number" required />
                </div>
                <div>
                    <input className="form-input" name="company" value={company} onChange={this.handleInputChange} type="text" placeholder="Company" />
                </div>
                <div className="status">
                    {message}
                </div>
                <div>
                    <button className="save-btn" type="submit" value="submit">
                        Save
                    </button>
                </div>
            </form>
        )
    }
}
export default InsertForm;