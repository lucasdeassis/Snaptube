import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Navbar from './Navbar'
import Search from './Search'
import youtubeApi from '../youtube_api'
import VideoList from './Video_list'
import VideoDetail from './Video_detail'
import { addVideoSnap, addVideoCaption, searchSnap } from '../actions/index'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedVideo: {},
      videos: [],
      authorized: true
    }

    this.searchVideo = this.searchVideo.bind(this)
    this.searchVideoCaptions = this.searchVideoCaptions.bind(this)
    // 1. Load the JavaScript YOUTUBE client library.
    youtubeApi.load()
  }

  searchVideo (query) {
    this.props.dispatch(searchSnap(query))

    youtubeApi.searchVideo(query, videosFromSearch => {
      videosFromSearch.forEach(video => {
        console.log(video + '__________\n')
        this.props.dispatch(addVideoSnap(video.id.videoId))
      })

      this.setState({
        videos: videosFromSearch
      })
    })
  }

  searchVideoCaptions (selectedVideo) {
    youtubeApi.searchVideoCaptions(selectedVideo.id.videoId)
      .then((caption) => {
        console.log(' video caption -' + caption)

        youtubeApi.getCaption(caption.id)
          .then(response => {
            console.log(`caption content - ${response.body}`)

            caption = this.extractCaptionFromApi(response.body, this.props.query)

            this.props.dispatch(addVideoCaption(selectedVideo.id.videoId, caption))

            this.setState({
              selectedVideo
            })
          })
      }, (reason) => {
        console.log('Error: ' + reason)
      })
  }

  extractCaptionFromApi (captionsResponse) {
    let captionList = captionsResponse.split(/\r?\n{2}/)
    const caption = captionList.find(cap => cap.includes(this.props.query)) || ''
    console.log(`caption from query - ${caption}`)

    return caption
  }

  render () {
    return (
      <div className='App'>
        <Navbar />

        <p className='App-intro'>
          Watch specific youtube video pieces
          To find the video part you want, just type the matching audio track.
        </p>

        <Search onSearch={this.searchVideo}
          disabled={!this.state.authorized} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          visible={this.state.videos.length > 0}
          onVideoSelect={this.searchVideoCaptions}
          videos={this.state.videos}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    query: state.query,
    videos: state.videos
  }
}

export default connect(mapStateToProps, null)(App)
