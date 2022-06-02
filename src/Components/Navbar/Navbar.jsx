import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className='navbar navbar-light bg-light navbar-expand-sm'>
         <div className='container'>
           <Link to={'/'} className='navbar-brand'>
             <i className='fa fa-mobile text-primary'></i> Contact <span className='text-primary'>Manager</span>
           </Link>
         </div>
      </nav>
    </React.Fragment>
  )
}

export default Navbar
