import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

class CommentItem extends Component {
  render() {
    const {eachComment, onLiked, onDeleteCommit} = this.props
    const {id, name, commit, isLiked, date, initialClassName} = eachComment
    const slicedAlpha = name[0]
    const liked = () => {
      onLiked(id)
    }
    const onDelete = () => {
      onDeleteCommit(id)
    }

    const likedComment = isLiked
      ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

    const commentLiked = isLiked ? 'is-liked' : ''
    const postedTime = formatDistanceToNow(date)
    return (
      <li className="list-container">
        <div className="top-container">
          <div className="sub-top-container">
            <h1 className={`logo-name ${initialClassName}`}>{slicedAlpha}</h1>
            <p className="commented-name">{name}</p>
            <p className="date">{postedTime}</p>
          </div>
          <div className="description-container">
            <p className="comment-description">{commit}</p>
          </div>
        </div>
        <div className="foot-container">
          <div className="sub-food-container">
            <button type="button" className="btn-button" onClick={liked}>
              <img src={likedComment} className="like-logo" alt="like" />
            </button>
            <p className={`like ${commentLiked}`}>Like</p>
          </div>
          <button
            type="button"
            className="btn-button"
            onClick={onDelete}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="like-logo"
            />
          </button>
        </div>
        <hr className="horizontal-line" />
      </li>
    )
  }
}
export default CommentItem
