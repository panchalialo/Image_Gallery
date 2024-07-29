import React from 'react'

const Footer = () => {
    const today = new Date()
    const currentYear = today.getFullYear()
  return (
    <>
    <div className='w-full h-auto py-3 dark:bg-gray-900 text-center'>
<p className='text-gray-200 text-sm'>Copyright © {currentYear} Panchali Ghatak.</p>
    </div>
    </>
  )
}

export default Footer