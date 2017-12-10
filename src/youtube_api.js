import YTSearch from 'youtube-api-search'
import oauth2 from './oauth_api'
/**
 * remove from object the params that came empty
 * @param {*} params
 */
const removeEmptyParams = (params) => {
  for (var p in params) {
    if (!params[p] || params[p] === 'undefined') {
      delete params[p]
    }
  }
  return params
}

/**
 *
 * @param {*} requestMethod  GET, POST, PUT
 * @param {*} path url to call
 * @param {*} params varies accordingly to https://developers.google.com/youtube/v3/docs/captions or videos
 * @param {*} properties additional properties
 */
const apiRequest = (requestMethod, path, params, properties) => {
  params = removeEmptyParams(params)
  var request
  if (properties) {
    var resource = oauth2.createResource(properties)
    request = window.gapi.client.request({
      'body': resource,
      'method': requestMethod,
      'path': path,
      'params': params
    })
  } else {
    request = window.gapi.client.request({
      'method': requestMethod,
      'path': path,
      'params': params
    })
  }

  return request
}

/**
 * https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.captions.list or .download
 * to see responses format
 */
const youtubeApi = {
  isAuthorized: false,

  load: (currentUserListener) => {
    window.gapi.load('client:auth2', () => oauth2.start(currentUserListener))
  },

  searchVideo (term) {
    return new Promise((resolve, reject) => {
      if (this.isAuthorized) {
        YTSearch({ key: 'AIzaSyBsSxXHTV-VudZeNMaAFgSy6kZCH8r4ppU', term: term }, (searchResult) => {
          if (searchResult) {
            resolve(searchResult)
          } else {
            reject(new Error(`No videos found for query - ${term}`))
          }
        })
      } else {
        reject(new Error('You need to sign in with Google!'))
      }
    })
  },

  searchVideoCaptions: (videoId) => {
    const isEnglishCaption = (caption) => caption.snippet.language === 'en'
    const isPortugueseCaption = (caption) => caption.snippet.language === 'pt'

    const captionInList = (captionsListResponse, isEnglishCaption, isPortugueseCaption) => {
      return captionsListResponse.items.find(caption => isEnglishCaption(caption) || isPortugueseCaption(caption))
    }

    return new Promise((resolve, reject) => {
      const request = apiRequest('GET',
        'https://www.googleapis.com/youtube/v3/captions',
        {
          'part': 'snippet',
          'videoId': videoId,
          'onBehalfOfContentOwner': ''
        })

      request.execute((captionsListResponse) => {
        const caption = captionInList(captionsListResponse, isEnglishCaption, isPortugueseCaption)
        if (caption) {
          resolve(caption)
        } else {
          reject(new Error('No english or portuguese captions were found for this video.'))
        }
      })
    })
  },

  getCaption: (captionsId) => {
    return new Promise((resolve, reject) => {
      const request = apiRequest('GET',
        'youtube/v3/captions/' + captionsId,
        {
          'tfmt': 'sbv',
          'onBehalfOfContentOwner': '',
          'tlang': ''
        })

      // see https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientrequestargs
      request.execute((jsonResponse, rawResponse) => {
        const response = JSON.parse(rawResponse).gapiRequest

        if (response.data.status !== 200) {
          reject(new Error(response.data.body))
        }

        const videoCaption = response.data.body
        resolve(videoCaption)
      })
    })
  }
}

export default youtubeApi
