import React from 'react'
import Loading from '../assests/images/loadintext.gif'
 
const Spinner = () => {
  return (
    <React.Fragment>  
        <div className='loadingcomponent'> <img src={Loading} alt="" className='d-block m-auto loadingcomponent'/></div>
       
    </React.Fragment>
  )
}

export default Spinner