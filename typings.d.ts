export interface Tweet extends TweetBody {
  _id: string
  _createdAt: Date
  _updatedAt: Date
  _rev: string
  _type: 'tweet'
  blockTweet: boolean
}

export type TweetBody = {
  text: string
  username: string
  profileImg: string
  image?: string
}

export type CommentBody = {
  comment: string
  tweetId: string
  username: string
  profileImg: string
}

export interface Comment extends CommentBody {
  _id: string
  _createdAt: Date
  _rev: string
  _type: 'comment'
  _updatedAt: Date
  tweet: {
    _ref: string
    _type: 'reference'
  }
}
