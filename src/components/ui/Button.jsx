import React from 'react'

const Button = ({classname, text}) => {
  return (
    <div className={`${classname} px-6 py-2 cursor-pointer transition-all duration-200 rounded-lg active:scale-[.97]`}>{text}</div>
  )
}

export default Button