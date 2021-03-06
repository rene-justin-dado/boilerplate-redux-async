import React, {PropTypes} from 'react'

import Post from './Post'

const Subreddit = ({subreddits, loading, warning}) => (
  <div>
    {!loading && subreddits.map((post, i) =>
      <Post
        key={i}
        title={post.title}
        date={convertEpoch(post.created)}
        content={post.selftext.substring(0, 120)}
      />
    )}
    {warning && <h1>GAME OVER, MAN. GG.</h1>}
    {loading && <img src='../../dankLoader.gif' />}
  </div>
)

Subreddit.propTypes = {
  subreddits: PropTypes.array.isRequired
}

export default Subreddit

function convertEpoch (epochTime) {
  var d = new Date(0)
  d.setUTCSeconds(epochTime)
  return d.toString()
}
