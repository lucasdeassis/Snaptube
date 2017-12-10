import React from 'react'
import { connect } from 'react-redux'

const VideoDetail = ({ videos, video }) => {
  const getCaptionFromStateVideo = (videos, videoId) => {
    const videoSnap = videos.find(videoSnap => (
      videoSnap.video.id.videoId === videoId
    ))

    return videoSnap.caption
  }

  if (!video.id) {
    return <div />
  }

  const videoId = video.id.videoId

  /* convert format "0:00:07.799,0:00:10.559" to start time in seconds only
  ex: convert `0:04:09.939,0:04:13.689
  heavily we're acknowledging it right" to 249`
  each minute is multiplied by 60 seconds */
  const snapStartTime = () => {
    let caption = getCaptionFromStateVideo(videos, videoId)

    if (!caption) {
      return 0
    }

    // split on new line and get time
    let captionTime = caption.split(/\r?\n/)[0]

    // get full start time
    captionTime = captionTime.split(',')[0]

    // get separated hours minutes and sec
    captionTime = captionTime.split(':')

    // multiply each part of the time by its corresponding sec value
    captionTime = (captionTime[0] * 3600 + captionTime[1] * 60 + parseInt(captionTime[2]))

    return captionTime || 0
  }

  const url = `https://www.youtube.com/embed/${videoId}?start=${snapStartTime()}`

  return (
    <div className='video-detail col-md-8 container'>
      <div className='embed-responsive embed-responsive-16by9'>
        <iframe title='video embed' className='embed-responsive-item' src={url} />
      </div>
      <div className='details'>
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
    </div>
  )
}

const mapStateToProps = ({ videos }, ownProps) => {
  return {
    videos: videos,
    video: ownProps.video
  }
}

export default connect(mapStateToProps)(VideoDetail)
