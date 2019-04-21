import React, { Component } from 'react';
class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const name = this.props.username;
        return (
            <div>
                {name}
            </div>
        )
    }
}
class ListContributors extends Component {
    constructor(props) {
        super(props);
        this.state = { contributorList: [] };
    }
    fetchContributors = () => {
        fetch('http://dummy.restapiexample.com/api/v1/employees')
            .then(data => data.json())
            .then(data => {
                return data.map(({ id, employee_name }) => ({
                    username: employee_name,
                    id: id
                }));
            })
            .then(contributorList => {
                this.setState({ contributorList })
            })
    }
    componentDidMount() {
        this.fetchContributors()
    }
    render() {
        const { contributorList } = this.state;
        return (
            <div>
                {contributorList.map(contributor => {
                    return <Profile {...contributor} key={contributor.id} />
                })}
            </div>
        )
    }
}
export default ListContributors;