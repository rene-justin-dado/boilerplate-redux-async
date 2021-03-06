import request from 'superagent'

export const receivePosts = (subreddit, posts) => {
  return {
    type: 'RECEIVE_POSTS',
    posts: posts.map(post => post.data)
  }
}

export const setSubreddit = subredditSearch => {
  return {
    type: 'SUBREDDIT_SEARCH',
    subredditSearch
  }
}

export const loader = status => {
  return {
    type: 'LOADING',
    status
  }
}

export const warning = status => {
  return {
    type: 'ERROR',
    status
  }
}

export function search (evt, dispatch) {
  if (evt.keyCode === 13) {
    dispatch(setSubreddit(evt.currentTarget.value))
    dispatch(fetchPosts())
    evt.currentTarget.value = ''
  }
}

export function fetchPosts () {
  return (dispatch, getState) => {
    dispatch(warning(false))
    dispatch(loader(true))
    const subreddit = getState().search
    return request
      .get(`https://crossorigin.me/https://www.reddit.com/r/${subreddit}.json`)
      .end((err, res) => {
        if (err) {
          dispatch(warning(true))
          return
        }
        dispatch(loader(false))
        dispatch(receivePosts(subreddit, res.body.data.children))
      })
  }
}
