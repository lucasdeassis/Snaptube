import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Navbar from '../components/Navbar'
import Search from './Search'
import youtubeApi from '../youtube_api'
import VideoList from '../components/Video_list'
import VideoDetail from '../components/Video_detail'
import { addVideoSnap, addVideoCaption, searchSnap, setUser } from '../actions/index'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedVideo: {},
      videos: []
    }

    this.searchVideo = this.searchVideo.bind(this)
    this.searchVideoCaptions = this.searchVideoCaptions.bind(this)
    this.storeUser = this.storeUser.bind(this)

    // 1. Load the JavaScript YOUTUBE client library.
    youtubeApi.load(this.storeUser)
  }

  storeUser (user) {
    this.props.setUser(user)
  }

  searchVideo (query) {
    youtubeApi.searchVideo(query).then(videosFromSearch => {
      this.props.searchSnap(query)

      this.setState({
        videos: videosFromSearch,
        selectedVideo: {}
      })
    }).catch((reason) => {
      console.log('Error: ' + reason)
    })
  }

  searchVideoCaptions (selectedVideo) {
    this.props.addVideoSnap(selectedVideo)

    youtubeApi.searchVideoCaptions(selectedVideo.id.videoId)
      .then((caption) => {
        this.getCaption(caption.id, selectedVideo)
      }).catch((reason) => {
        console.log('Error: ' + reason)
      })
  }

  getCaption (captionId, selectedVideo) {
    youtubeApi.getCaption(captionId).then(captionSbv => {
      console.log(`caption content - ${captionSbv}`)

      const queryCaption = this.extractQueryCaptionFromApiCaption(captionSbv, this.props.snapQuery)

      this.props.addVideoCaption(selectedVideo.id.videoId, queryCaption)

      this.setState({
        selectedVideo
      })
    }).catch((reason) => {
      console.log('Error: ' + reason)
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

    const caption = captionList.find(cap => cap.includes(query)) || this.extractQueryCaptionFromApiCaption(captionsResponse, this.subqueryBySpace(query))

    console.log(`caption from query - ${caption}`)

    return caption
  }

  render () {
    return (
      <div className='App'>
        <Navbar />

        <p className='App-intro'>
          Watch specific youtube video pieces.
          To find the video part you want, just type the matching audio track.
        </p>

        <Search onSearchTermSubmit={this.searchVideo} />
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

const mapStateToProps = ({ snapQuery, videos }) => {
  return {
    snapQuery,
    videos
  }
}

export default connect(
  mapStateToProps,
  {
    addVideoSnap,
    addVideoCaption,
    searchSnap,
    setUser
  }
)(App)
