import { Comment } from '../typings'

export const fetchComments = async (tweetId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`
    )

    const comments: Comment[] = await res.json()

    return comments
  } catch (error) {
    return []
  }
}
