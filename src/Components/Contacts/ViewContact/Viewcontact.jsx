import React,{useState,useEffect} from 'react'
import { Link ,useParams} from 'react-router-dom'
import { ContactService } from '../../../services/Contactservice'
import Spinner from '../../Spinner'
const Viewcontact = () => {

let{contactid}=useParams();

let [state, setState]=useState({
    loading:false,
    contacts:[],
    errorMessage:'',
    group:{}
  })
  
  useEffect( () => {
      try{
          async  function fetchMyAPI() {
          setState({...state,loading:true});
          let response = await ContactService.getcontact(contactid);
          let GroupResponse= await ContactService.getgroup(response.data)
          setState(
              {...state,
                  loading:false,
                  contacts:response.data,
                  group:GroupResponse.data
              });
      }
      fetchMyAPI();
      }
      catch (error){
          setState(
              {...state,
                  loading:false,
                  errorMessage:error.message
              });
      }
  }, [])

  let {loading,contacts,errorMessage,group}=state;
  return (
    <React.Fragment>
      <div className='container'>
        <br></br>
      <div className="row">
            <div className="col">
                <p className='h3 text-success'>View Contact   &nbsp;
               
                </p>
                <i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, voluptatum enim! Hic commodi quidem sit error, quis incidunt eum rerum suscipit officiis inventore. Culpa quis molestiae harum consequatur tempore tenetur.</i>
      
            </div>
        </div> <br></br>

{
    loading?<Spinner/> : <React.Fragment>
{
    Object.keys(contacts).length>0 && Object.keys(group).length>0 &&
    <div className="card">
                        <div className="card-body">
                            <div className="row align-item-center">
                            <div className="col-md-4">
                                <img src= {contacts.photo} alt='' className='contact-img'/>
                            </div>
                            <div className="col-md-8">
                                <ul className='list-group'>
                                   <li className='list-group-item  list-group-item-action'>
                                       Name:<span className='fw-bold'> {contacts.name}</span>
                                   </li>
                                   <li className='list-group-item  list-group-item-action'>
                                   Mobile:<span className='fw-bold'> {contacts.mobile}</span>
                                   </li>
                                   <li className='list-group-item  list-group-item-action'>
                                   Email:<span className='fw-bold'> {contacts.email}</span>
                                   </li> 
                                   <li className='list-group-item  list-group-item-action'>
                                   Company:<span className='fw-bold'> {contacts.company}</span>
                                   </li> 
                                   <li className='list-group-item  list-group-item-action'>
                                   Title:<span className='fw-bold'> {contacts.title}</span>
                                   </li> 
                                   <li className='list-group-item  list-group-item-action'>
                                   Group:<span className='fw-bold'> {group.name}</span>
                                   </li>                                   
                                </ul>
                            </div>                            
                            </div>
                        </div>
                        
       </div>
}


    </React.Fragment>
}

       
                    <br></br>
                    <Link to={'/Contacts/list'} className='btn btn-primary'><i className='fa fa-arrow-left'></i> Back</Link></div>
    </React.Fragment>
    )
}

export default Viewcontact