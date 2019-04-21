import React,{Component} from 'react';
class Profile extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const name = this.props.username;
        return (
            <div>
                {name}
            </div>
        )
    }
}
class Graph extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const name = this.props.username;
        return (
            <div>
                This is a Graph: {name}
            </div>
        )
    }
}
class ListContributorsChildren extends Component{
    constructor(props){
        super(props);
        this.state = {contributorList:[]};
    }
    fetchContributors = () => {
        fetch('http://dummy.restapiexample.com/api/v1/employees')
        .then(data => data.json())
        .then(data => {
            return data.map(({id,employee_name}) => ({
                username: employee_name,
                id: id
            }));
        })
        .then(contributorList => {
            this.setState({contributorList})
        })
    }
    componentDidMount(){
        this.fetchContributors()
    }
    render(){
        const {contributorList} = this.state;
        return(
            <React.Fragment>
                {this.props.children(contributorList)}
            </React.Fragment>
        )
    }
}
class ListContributorsRender extends Component {
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
            <React.Fragment>
                {this.props.render(contributorList)}
            </React.Fragment>
        )
    }
}
class RenderProps extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <React.Fragment>
                <ListContributorsChildren>{(contributorList) => {
                    return contributorList.map(contributor => {
                        return <Profile {...contributor} />
                    })    
                    // return <Profile username='moh'/>
                }}
                </ListContributorsChildren>
                <ListContributorsRender render={(contributorList) => {
                    return contributorList.map(contributor => {
                        return <Graph {...contributor} />
                    })
                }}/>
            </React.Fragment>
        )
    }
}
export default RenderProps;
// export default ListContributors;