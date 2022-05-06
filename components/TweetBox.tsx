import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
  XIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const imageInputRef = React.useRef<HTMLInputElement>(null)

  const { data: session } = useSession()
  const [imageOpen, setImageOpen] = useState<boolean>(false)

  const addTweetImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (!imageInputRef.current?.value) return

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageOpen(false)
  }

  const postTweet = async () => {
    const tweetBody: TweetBody = {
      text: input as string,
      username: session?.user?.name ?? 'Unknown User',
      profileImg:
        session?.user?.image ??
        'https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg',
      image,
    }

    const result = await fetch('/api/addTweet', {
      method: 'POST',
      body: JSON.stringify(tweetBody),
    })

    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast('Tweet Posted', {
      icon: `🚀`,
    })

    setInput('')
    setImage('')
    setImageOpen(false)
  }

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault()
    postTweet()
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="mt-4 h-14 w-14 rounded-full object-cover"
        src={
          session?.user?.image ??
          'https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg'
        }
        alt=""
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's happening?"
          />

          {image && (
            <div className="relative">
              <img
                className="mt-2 mb-5 h-72 w-full rounded-xl object-cover shadow"
                src={image}
                alt=""
              />
              <XIcon
                onClick={() => {
                  setImage('')
                }}
                className="absolute top-4 left-2 h-6 w-6 text-white"
              />
            </div>
          )}
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter">
              <PhotographIcon
                onClick={() => setImageOpen(!imageOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>

            <button
              onClick={handleSubmit}
              className="cursor-pointer rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40"
              disabled={!input || !session}
            >
              Tweet
            </button>
          </div>

          {imageOpen && (
            <div className="rounded-lf mt-5 flex bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL..."
              />
              <button onClick={addTweetImage} className="font-bold text-white">
                Add Image
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
