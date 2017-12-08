import deepFreeze from 'deep-freeze'
import { addVideoSnap, filterVideos, addVideoCaption, setUser } from '../actions/index'
import { createStore } from 'redux'
import user from './reducer_user';

test('set user', () => {
  const stateBefore = {}
  const action = setUser({
    id: '223343594599694696969',
    name: 'Lucas Assis',
    email: 'lucasassis413@gmail.com',
    imageUrl: 'https://lh6.googleusercontent.com/-QfM_0nb2xPY/AAAAAAAAAAI/AAAAAAAAEcs/pt71PdwxEls/s96-c/photo.jpg'
  })
  const stateAfter = {
    id: '223343594599694696969',
    name: 'Lucas Assis',
    email: 'lucasassis413@gmail.com',
    imageUrl: 'https://lh6.googleusercontent.com/-QfM_0nb2xPY/AAAAAAAAAAI/AAAAAAAAEcs/pt71PdwxEls/s96-c/photo.jpg'
  }

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(user(stateBefore, action)).toEqual(stateAfter)
})

test('replace user', () => {
  const stateBefore = {
    id: '1903297439490328495123',
    name: 'Lucas Assis',
    email: 'lucasassis413@gmail.com',
    imageUrl: 'https://lh6.googleusercontent.com/-QfM_0nb2xPY/AAAAAAAAAAI/AAAAAAAAEcs/pt71PdwxEls/s96-c/photo.jpg'

  }
  const action = setUser({
    id: '1231500569123586496032',
    name: 'Jorge Lucas',
    email: 'thelastjedi@starwars.com',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTA0Mjc0NzExNzBeQTJeQWpwZ15BbWU3MDEzMzQ3MDI@._V1_UY317_CR0,0,214,317_AL_.jpg'
  })
  const stateAfter = {
    id: '1231500569123586496032',
    name: 'Jorge Lucas',
    email: 'thelastjedi@starwars.com',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTA0Mjc0NzExNzBeQTJeQWpwZ15BbWU3MDEzMzQ3MDI@._V1_UY317_CR0,0,214,317_AL_.jpg'
  }

  deepFreeze(stateBefore)
  deepFreeze(action)

  expect(user(stateBefore, action)).toEqual(stateAfter)

})

