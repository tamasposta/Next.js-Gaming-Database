import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-center py-4'>
        Copyright {(new Date().getFullYear())} - All rights reserved
    </footer>
  )
}

export default Footer