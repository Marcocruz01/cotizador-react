// rfce es un shortcut para poder tener la estructura ya de un componente en jsx
import React from 'react'

function Button({icon, fn}) {
  return (
    <button
        type='button'
        onClick={fn}
        className='h-8 w-8 flex items-center justify-center font-bold text-white 
        text-2xl bg-lime-500 rounded-full hover:outline-none hover:ring-2 hover:ring-offset-2 
        hover:ring-lime-500 transition duration-200 ease-linear'>
        {icon}
    </button>
  )
}

export default Button