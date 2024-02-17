import React from 'react'
import LoremIpsum from '../utils/loremipsum'
import Placeholder from '../components/Placeholder'
import Message from '../components/Message'

const SingleChat = () => {
  return (
    <div>
      <div className='single-chat'>
        <Message />
        <Message /><Message />
      </div>
      
    </div>
  )
}

export default SingleChat