import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommitsList = []

class Comments extends Component {
  state = {commitList: initialCommitsList, name: '', commit: ''}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeCommit = event => {
    this.setState({commit: event.target.value})
  }

  onCommitSubmit = event => {
    event.preventDefault()
    const {name, commit} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newCommit = {
      id: uuidv4(),
      name,
      commit,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commitList: [...prevState.commitList, newCommit],
      name: '',
      commit: '',
    }))
  }

  onDeleteCommit = id => {
    const {commitList} = this.state
    const filteredComments = commitList.filter(
      eachComment => eachComment.id !== id,
    )

    this.setState({commitList: filteredComments})
  }

  onLiked = id => {
    this.setState(prevState => ({
      commitList: prevState.commitList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {name, commit, commitList, initialClassName, date} = this.state
    return (
      <div className="bg-container">
        <h1 className="header">Comments</h1>
        <div className="container">
          <div className="submit-container">
            <p className="para">Say something about 4.0 Technologies</p>
            <form className="form-container" onSubmit={this.onCommitSubmit}>
              <input
                onChange={this.onChangeName}
                value={name}
                placeholder="Your Name"
                className="input-bar"
              />
              <textarea
                rows="5"
                onChange={this.onChangeCommit}
                value={commit}
                placeholder="Your Comment"
                className="text-area-bar"
              />
              <div>
                <button type="submit" className="btn">
                  Add Comment
                </button>
              </div>
            </form>
          </div>

          <div className="comment-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-image"
            />
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="comment-container">
          <div className="comment-length">
            <h1 className="comment-count">{commitList.length}</h1>
            <p className="comment-para">Comments</p>
          </div>
        </div>
        <div>
          <ul>
            {commitList.map(eachComment => (
              <CommentItem
                eachComment={eachComment}
                key={eachComment.id}
                onLiked={this.onLiked}
                onDeleteCommit={this.onDeleteCommit}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
