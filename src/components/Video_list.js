import React from 'react'
import VideoListItem from './Video_list_item'

const VideoList = props => {
  const videoItems = props.videos.map(video => {
    return <VideoListItem
      onVideoSelect={props.onVideoSelect}
      key={video.etag}
      video={video}
    />
  })

  return (
    <div className="video-list-group list-group align-items-center">
      <ul className="col-lg-8 col-md-12">
        {videoItems}
      </ul>
    </div>
  )
}

export default VideoList
