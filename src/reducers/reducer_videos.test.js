import deepFreeze from 'deep-freeze'
import { addVideoSnap, filterVideos, addVideoCaption } from '../actions/index'
import { createStore } from 'redux'
import videos from './reducer_videos'
import { selectVideo } from '../actions/actions_videos';

const videoTestData = {
  kind: 'youtube#searchResult',
  etag: '7991kDR-QPaa9r0pePmDjBEa2h8/BbkmsbkiGnm-qxf0pQvzscXTs7E',
  id: {
    kind: 'youtube#video',
    videoId: 'jBN2_YuTclU'
  },
  snippet: {
    publishedAt: '2013-09-16T20:21:06.000Z',
    channeldId: 'UCZzFRKsgVMhGTxffpzgTJlQ',
    channelTitle: `Zak George's Dog Training rEvolution`,
    title: 'How to Train Your Dog to NOT PULL on the Leash!',
    description: '...'
  }
}

test('add new video', () => {
  const stateBefore = []

  const action = addVideoSnap(videoTestData,
    `0:00:07.799,0:00:10.559 how to walk on a leash without pulling`)

  const stateAfter = [{
    video: videoTestData,
    caption: `0:00:07.799,0:00:10.559 how to walk on a leash without pulling`
  }]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(videos(stateBefore, action)).toEqual(stateAfter)
})

test('add new video with empty caption', () => {
  const stateBefore = []
  const action = addVideoSnap(videoTestData, '')

  const stateAfter = [{
    video: videoTestData,
    caption: ``
  }]
  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(videos(stateBefore, action)).toEqual(stateAfter)
})

test('add caption to existing video', () => {
  const action = addVideoCaption(videoTestData.id.videoId,
    `0:08:38.169,0:08:41.860 farther and farther away they don't tend`)

  const stateBefore = [
    {
      video: {
        kind: 'youtube#searchResult',
        etag: '7991kDR-QPaa9r0pePmDjBEa2h8/2jlk3jlfkd-qxf0pQvzscXTs7E',
        id: {
          kind: 'youtube#video',
          videoId: '23js_sdskfj'
        },
        snippet: {
          publishedAt: '2013-09-16T20:21:06.000Z',
          channeldId: 'UCZzFRKsgVMhGTxffpzgTJlQ',
          channelTitle: `Zak George's /Cat Training rEvolution`,
          title: 'How to Train Your Cat to NOT PULL!',
          description: '...'
        }
      },
      caption: `0:00:07.799,0:00:10.559 how to walk on a leash without pulling`
    },
    {
      video: videoTestData,
      caption: ``
    },
    {
      video: {
        kind: 'youtube#searchResult',
        etag: '7991kDR-QPaa9r0pePmDjBEa2h8/we2klej3-qwkejqwjekE',
        id: {
          kind: 'youtube#video',
          videoId: '23ldjsfj;_32'
        },
        snippet: {
          publishedAt: '2013-09-16T20:21:06.000Z',
          channeldId: 'sadojlqk4j23-fewfkj;',
          channelTitle: `Zaks`,
          title: 'title',
          description: '...'
        }
      },
      caption: `0:00:12.420,0:00:15.719 click Subscribe right now that way`
    }
  ]
  const stateAfter = [
    {
      video: {
        kind: 'youtube#searchResult',
        etag: '7991kDR-QPaa9r0pePmDjBEa2h8/2jlk3jlfkd-qxf0pQvzscXTs7E',
        id: {
          kind: 'youtube#video',
          videoId: '23js_sdskfj'
        },
        snippet: {
          publishedAt: '2013-09-16T20:21:06.000Z',
          channeldId: 'UCZzFRKsgVMhGTxffpzgTJlQ',
          channelTitle: `Zak George's /Cat Training rEvolution`,
          title: 'How to Train Your Cat to NOT PULL!',
          description: '...'
        }
      },
      caption: `0:00:07.799,0:00:10.559 how to walk on a leash without pulling`
    },
    {
      video: videoTestData,
      caption: `0:08:38.169,0:08:41.860 farther and farther away they don't tend`
    },
    {
      video: {
        kind: 'youtube#searchResult',
        etag: '7991kDR-QPaa9r0pePmDjBEa2h8/we2klej3-qwkejqwjekE',
        id: {
          kind: 'youtube#video',
          videoId: '23ldjsfj;_32'
        },
        snippet: {
          publishedAt: '2013-09-16T20:21:06.000Z',
          channeldId: 'sadojlqk4j23-fewfkj;',
          channelTitle: `Zaks`,
          title: 'title',
          description: '...'
        }
      },
      caption: `0:00:12.420,0:00:15.719 click Subscribe right now that way`
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(videos(stateBefore, action)).toEqual(stateAfter)
})

test('gets default state on unknown action', () => {
  const stateBefore = []
  const action = {
    type: 'NO_KNOWN_TYPE',
    payload: `sqwd13edsf`
  }
  const stateAfter = []

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(videos(stateBefore, action)).toEqual(stateAfter)
})

test('gets default state term on create store', () => {
  const store = createStore(videos)
  const initialState = []

  expect(store.getState()).toEqual(initialState)
})

test('gets single object list state on filter action', () => {
  const stateBefore = [
    {
      video: {
        kind: 'youtube#searchResult',
        etag: '7991kDR-QPaa9r0pePmDjBEa2h8/2jlk3jlfkd-qxf0pQvzscXTs7E',
        id: {
          kind: 'youtube#video',
          videoId: '23js_sdskfj'
        },
        snippet: {
          publishedAt: '2013-09-16T20:21:06.000Z',
          channeldId: 'UCZzFRKsgVMhGTxffpzgTJlQ',
          channelTitle: `Zak George's /Cat Training rEvolution`,
          title: 'How to Train Your Cat to NOT PULL!',
          description: '...'
        }
      },
      caption: `0:00:07.799,0:00:10.559 how to walk on a leash without pulling`
    },
    {
      video: videoTestData,
      caption: ``
    },
    {
      video: {
        kind: 'youtube#searchResult',
        etag: '7991kDR-QPaa9r0pePmDjBEa2h8/we2klej3-qwkejqwjekE',
        id: {
          kind: 'youtube#video',
          videoId: '23ldjsfj;_32'
        },
        snippet: {
          publishedAt: '2013-09-16T20:21:06.000Z',
          channeldId: 'sadojlqk4j23-fewfkj;',
          channelTitle: `Zaks`,
          title: 'title',
          description: '...'
        }
      },
      caption: `0:00:12.420,0:00:15.719 click Subscribe right now that way`
    }
  ]

  const action = filterVideos('23ldjsfj;_32')
  const stateAfter = [{
    video: {
      kind: 'youtube#searchResult',
      etag: '7991kDR-QPaa9r0pePmDjBEa2h8/we2klej3-qwkejqwjekE',
      id: {
        kind: 'youtube#video',
        videoId: '23ldjsfj;_32'
      },
      snippet: {
        publishedAt: '2013-09-16T20:21:06.000Z',
        channeldId: 'sadojlqk4j23-fewfkj;',
        channelTitle: `Zaks`,
        title: 'title',
        description: '...'
      }
    },
    caption: `0:00:12.420,0:00:15.719 click Subscribe right now that way`
  }]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(videos(stateBefore, action)).toEqual(stateAfter)
})

test('set selected to existing video setting other videos unselected', () => {
  const action = selectVideo(videoTestData.id.videoId, true)

  const stateBefore = [
    {
      video: {
        kind: 'youtube#searchResult',
        etag: '7991kDR-QPaa9r0pePmDjBEa2h8/2jlk3jlfkd-qxf0pQvzscXTs7E',
        id: {
          kind: 'youtube#video',
          videoId: '23js_sdskfj'
        },
        snippet: {
          publishedAt: '2013-09-16T20:21:06.000Z',
          channeldId: 'UCZzFRKsgVMhGTxffpzgTJlQ',
          channelTitle: `Zak George's /Cat Training rEvolution`,
          title: 'How to Train Your Cat to NOT PULL!',
          description: '...'
        }
      },
      caption: `0:00:07.799,0:00:10.559 how to walk on a leash without pulling`
    },
    {
      video: videoTestData,
      caption: `0:08:38.169,0:08:41.860 farther and farther away they don't tend`
    },
    {
      video: {
        kind: 'youtube#searchResult',
        etag: '7991kDR-QPaa9r0pePmDjBEa2h8/we2klej3-qwkejqwjekE',
        id: {
          kind: 'youtube#video',
          videoId: '23ldjsfj;_32'
        },
        snippet: {
          publishedAt: '2013-09-16T20:21:06.000Z',
          channeldId: 'sadojlqk4j23-fewfkj;',
          channelTitle: `Zaks`,
          title: 'title',
          description: '...'
        }
      },
      caption: `0:00:12.420,0:00:15.719 click Subscribe right now that way`
    }
  ]
  const stateAfter = [
    {
      video: {
        kind: 'youtube#searchResult',
        etag: '7991kDR-QPaa9r0pePmDjBEa2h8/2jlk3jlfkd-qxf0pQvzscXTs7E',
        id: {
          kind: 'youtube#video',
          videoId: '23js_sdskfj'
        },
        snippet: {
          publishedAt: '2013-09-16T20:21:06.000Z',
          channeldId: 'UCZzFRKsgVMhGTxffpzgTJlQ',
          channelTitle: `Zak George's /Cat Training rEvolution`,
          title: 'How to Train Your Cat to NOT PULL!',
          description: '...'
        },
        selected: false
      },
      caption: `0:00:07.799,0:00:10.559 how to walk on a leash without pulling`
    },
    {
      video: {
        ...videoTestData,
        selected: true
      },
      caption: `0:08:38.169,0:08:41.860 farther and farther away they don't tend`
    },
    {
      video: {
        kind: 'youtube#searchResult',
        etag: '7991kDR-QPaa9r0pePmDjBEa2h8/we2klej3-qwkejqwjekE',
        id: {
          kind: 'youtube#video',
          videoId: '23ldjsfj;_32'
        },
        snippet: {
          publishedAt: '2013-09-16T20:21:06.000Z',
          channeldId: 'sadojlqk4j23-fewfkj;',
          channelTitle: `Zaks`,
          title: 'title',
          description: '...'
        },
        selected: false
      },
      caption: `0:00:12.420,0:00:15.719 click Subscribe right now that way`
    }
  ]

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(videos(stateBefore, action)).toEqual(stateAfter)
})


