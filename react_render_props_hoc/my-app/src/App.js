import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import RenderProps from './components/ListContributors';
import {  RelatedVideos, withFetch, VideoBlogView} from './components/VideoBlog';

class App extends Component {
  render() {
    const VideoBlog = () =>  withFetch(VideoBlogView, 'req_url')
    console.log(VideoBlogView)
    return (
      <div>
        <VideoBlog videoId={2}/>
      </div>
    );
  }
}

export default App;
