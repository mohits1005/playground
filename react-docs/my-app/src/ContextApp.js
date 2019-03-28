import React, { Component } from 'react';
const ThemeContext = React.createContext({ theme: 'light', changeTheme:()=>{}});
const UserContext = React.createContext({name: 'Guest'})
class ToolBar extends Component {
    render() {
        return (
            <div>
                {/* <ThemedButton theme={this.props.theme} /> */}
                <ThemedButton />
            </div>
        )
    }
}
class ThemedButton extends Component {
    static contextType = ThemeContext;
    render() {
        return (
            <div>
                {/* <button theme={this.props.theme} >Click</button> */}
                <button theme={this.context.theme} onClick={this.context.changeTheme} >Click</button>
            </div>
        )
    }
}
function Layout(props){
    return (
        <ThemeContext.Consumer>
            { theme => (
            <UserContext.Consumer>
                { user => (
                    <div theme={theme.theme}>
                        User: {user.name}
                        {/* Theme: {theme} */}
                    </div>
                )}
            </UserContext.Consumer>
            )}
        </ThemeContext.Consumer>
    )
}
class ContextApp extends Component {
    constructor(props){
        super(props)
        this.changeTheme = this.changeTheme.bind(this);
        this.state = { theme: 'dark', changeTheme: this.changeTheme }
    }
    changeTheme(){
        this.setState(state => ({theme: state.theme === 'dark'?'light':'dark'}));
    }
    render() {
        const signedInUser = {name: 'Guest'}
        return (
            <ThemeContext.Provider value={this.state}>
                <UserContext.Provider value={signedInUser}>
                    <Layout />
                </UserContext.Provider>
                {/* <ToolBar theme="dark" /> */}
                <ToolBar />
                <button onClick={this.changeTheme}>
                    Change theme
                </button>
            </ThemeContext.Provider>
        )
    }
}
export default ContextApp;