import React, { Component } from 'react'
import youtubeApi from '../youtube_api'
import { connect } from 'react-redux'
import './App.css'
import Navbar from '../components/Navbar'
import Search from './Search'
import VideoList from '../components/Video_list'
import VideoDetail from '../components/Video_detail'
import {
  addVideoSnap,
  addVideoCaption,
  addSnapQuery,
  setUser,
  loadUser,
  selectVideo
} from '../actions/index'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videos: [],
      error: ''
    }

    this.searchVideo = this.searchVideo.bind(this)
    this.searchVideoCaptions = this.searchVideoCaptions.bind(this)

    this.props.loadUser((user) => this.props.setUser(user))
  }

  searchVideo (textQuery) {
    this.props.addSnapQuery(textQuery)

    youtubeApi.searchVideo(textQuery).then(videosFromSearch => {
      this.setState({
        videos: videosFromSearch
      })
    }).catch((reason) => {
      this.setState({
        error: reason.message
      })
    })
  }

  searchVideoCaptions (selectedVideo) {
    this.props.addVideoSnap(selectedVideo)

    youtubeApi.searchVideoCaptions(selectedVideo.id.videoId)
      .then((caption) => {
        this.getCaption(caption.id, selectedVideo)
      }).catch((reason) => {
        this.setState({
          error: reason.message
        })
      })
  }

  getCaption (captionId, selectedVideo) {
    youtubeApi.getCaption(captionId).then(captionSbv => {
      const queryCaption = this.extractQueryCaptionFromApiCaption(captionSbv, this.props.snapQuery)

      this.props.addVideoCaption(selectedVideo.id.videoId, queryCaption)
      this.props.selectVideo(selectedVideo.id.videoId, true)
    }).catch((reason) => {
      this.setState({
        error: reason.message
      })
    })
  }

  subqueryBySpace (query) {
    const noSpaces = () => query.split(' ').length === 1

    if (noSpaces()) {
      return query
    } else {
      return query.substring(0, query.lastIndexOf(' '))
    }
  }

  extractQueryCaptionFromApiCaption (captionsResponse, query) {
    let captionList = captionsResponse.split(/\r?\n{2}/)

    const caption = captionList.find(cap => cap.includes(query)) ||
      this.extractQueryCaptionFromApiCaption(captionsResponse, this.subqueryBySpace(query))

    return caption
  }

  onCloseAlert () {
    this.setState({
      error: ''
    })
  }

  renderErrorAlert () {
    return (
      <div
        className={`alert alert-danger alert-dismissible fade show ${this.state.error ? 'block-display' : 'none-display'}`}
        role='alert'>
        <span className='error-message'> {this.state.error} </span>
        <button type='button' onClick={this.onCloseAlert.bind(this)} className='close' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    )
  }

  render () {
    return (
      <div className='App'>

        <Navbar />

        {this.renderErrorAlert()}

        <p className='App-intro'>
          Watch specific youtube video pieces.
          To find the video part you want, just type the matching audio track.
        </p>

        <Search onSearchTermSubmit={this.searchVideo} />
        <VideoDetail />
        <VideoList
          visible={this.state.videos.length > 0}
          onVideoSelect={this.searchVideoCaptions}
          videos={this.state.videos}
        />

      </div>
    )
  }
}

const mapStateToProps = ({ user, snapQuery, videos }) => {
  return {
    user,
    snapQuery,
    videos
  }
}

export default connect(
  mapStateToProps,
  {
    addVideoSnap,
    addVideoCaption,
    addSnapQuery,
    setUser,
    loadUser,
    selectVideo
  }
)(App)
