import React from 'react'
import LoadingImage from '../components/LoadingImage'

const Loading = () => {
  return (
    <div className='flex absolute top-0 w-full bg-white z-[10000] items-center justify-center h-screen'>
      <LoadingImage/>
    </div>
  )
}

export default Loading
