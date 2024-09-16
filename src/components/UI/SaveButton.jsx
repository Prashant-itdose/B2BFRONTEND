import React from 'react'

const SaveButton = ({btnName,handleSubmit}) => {
  return (
    <button className='text-white' onClick={() => handleSubmit()}>{btnName}</button>
  )
}

export default SaveButton