import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App'
import './styles/styles.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)
const Welcome = ({ location }) => (
    <div>
        <h3>Try /preview/token</h3>
    </div>
)
ReactDom.render(
    <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={Welcome} />
            <Route exact path={'/preview/:token'} component={App} />
            <Route exact path={'/facenxt/'} component={Welcome} />
            <Route exact path={'/facenxt/preview/:token/'} component={App} />
            <Route component={NoMatch} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
)