import React, { Component } from 'react';
export class VideoBlog extends Component {
    constructor(props) {
        super(props);
        this.state = { videoBlog: null };
    }
    componentDidMount() {
        setTimeout(() => {
            var url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
            this.setState({ videoBlog: url })
        }, 2000)
    }
    render() {
        return <video height="250" width="250" controls src={this.state.videoBlog} />
    }
}
export class RelatedVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: []
        }
    }
    componentDidMount() {
        setTimeout(() => {
            var url = ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'];
            this.setState({ videoList: url })
        }, 2000)
    }
    render() {
        const { videoList } = this.state;
        return videoList.map((video) => <video height="250" width="250" controls src={video} />)
    }
}