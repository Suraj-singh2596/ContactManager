import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/Contactservice'
import Spinner from '../../Spinner'
const Addcontact = () => {

  let navigate=useNavigate();

   let [state, setState] = useState({
    loading:false,
    contacts:{
          name:'',
          company:'',
          email:'',
          title:'',
          mobile:'',
          photo:'',
          groupid:''
    },
    group:[],
    errorMessage: ``
   })

   let updateinput=(event)=>{
     setState({
       ...state,
       contacts:{
         ...state.contacts,
         [event.target.name]:event.target.value
       }
     })
   }


   useEffect( () => {
    try{
        async  function fetchMyAPI() {
        setState({...state,loading:true});
        let response = await ContactService.getAllGroups();
        setState(
            {...state,
                loading:false,
                group:response.data
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

let submitform=(e)=>{
e.preventDefault();
try{
  async  function PostMyAPI() {
  let response = await ContactService.createcontact(state.contacts);
  if(response){
       navigate('/contacts/list',{replace:true}); 
  }
}
PostMyAPI();
}
catch(error){
setState({...state,errorMessage:error.message})
navigate('/contacts/add',{replace:false}); 
}
};

let {loading,group,contacts,errorMessage}=state;
  return (
   <React.Fragment>
     
     <section className='addcontact-form m-3'>
<div className="container">
  <div className="row">
    <div className="col">
      <p className='h4 text-success'>Create Contact</p>
      <i>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, et non blanditiis quia unde consequuntur nulla enim provident officia sint quos, quibusdam corporis eaque omnis exercitationem necessitatibus! Reprehenderit, eius fuga?</i>
       
    </div>
  </div>

  <div className="row">
       <div className="col-sm-5">
         <form onSubmit={submitform}>
           <div className='m-3'>
             <input 
             required={true}
             name='name'
             value={contacts.name}
             onChange={updateinput}
             type="text" className='form-control' placeholder='Name' />
           </div>

           <div className='m-3'>
             <input 
              required={true}
             name='photo'
             value={contacts.photo}
             onChange={updateinput} type="text" className='form-control' placeholder='Photo Url' />
           </div>
           <div className='m-3'>
             <input 
             required={true}
             name='mobile'
             value={contacts.mobile}
             onChange={updateinput}
             type="number" className='form-control' placeholder='Mobile' />
           </div>
           <div className='m-3'>
             <input
             required={true}
             name='email'
             value={contacts.email}
             onChange={updateinput}
             type="email" className='form-control' placeholder='Email' />
           </div>
           <div className='m-3'>
             <input
             required={true}
             name='company'
             value={contacts.company}
             onChange={updateinput}
             type="text" className='form-control' placeholder='Company name' />
           </div>
           <div className='m-3'>
             <input
              required={true}
              name='title'
              value={contacts.title}
              onChange={updateinput}
             type="text" className='form-control' placeholder='title' />
           </div>
           <div className='m-3'>
             <select
             required={true}
             name='groupid'
             value={contacts.groupid}
             onChange={updateinput}
             type="text" className='form-control'>
               <option value="" disabled selected>Select a group</option>
               {
                 group.length>0 &&
                 group.map(group=>{
                    return(
                      <option value={group.id} key={group.id}>{group.name}</option>
                    )
                 })
               }
              
             </select>
           </div>
           <div className="m-3">
             <input type='submit' className='btn btn-success w-25' value='Create'/>
<Link to={'/Contacts/list'} className='btn btn-dark ms-2 w-25'>Cancel</Link>
           </div>
         </form>
         </div>  
   </div>

</div>
     </section>
   </React.Fragment>
  )
}

export default Addcontact