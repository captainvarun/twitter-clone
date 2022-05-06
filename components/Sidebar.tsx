import React from 'react'
import {
  BellIcon,
  BookmarkIcon,
  CloudIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  MailIcon,
  UserIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
import { useSession, signIn, signOut } from 'next-auth/react'

function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start">
      <img
        className="m-3 h-10 w-10"
        src="https://ra.ac.ae/wp-content/uploads/2020/01/logo-twitter-icon-symbol-0.png"
        alt=""
      />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />
      <SidebarRow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? 'Sign out' : 'Sign In'}
      />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
      <button className="mt-4 h-12 rounded-full bg-twitter font-bold text-white hover:bg-twitter/80 md:px-12 lg:px-20">
        <p className="hidden md:inline">Tweet</p>
      </button>

      <div className="absolute bottom-4 flex items-center">
        <img
          className="mt-4 h-10 w-12 rounded-full object-cover"
          src={session?.user?.image}
        />
        <div className="mx-2 mt-3 hidden md:inline">
          <p className="mr-1 font-bold">{session?.user?.name}</p>
          <p className="font-light opacity-90">
            @{session?.user?.name?.replace(/\s+/g, '').toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
