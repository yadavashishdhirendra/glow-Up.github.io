import React from 'react'
import LoadingGif from '../Assets/Image/Barline-Loading-Images-1.gif'

const Loader = () => {
  return (
    <div className='loading-gif'>
        <img src={LoadingGif} alt="" />
    </div>
  )
}

export default Loader