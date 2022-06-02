import React,{useState,useEffect} from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'
import { ContactService } from '../../../services/Contactservice'
import Spinner from '../../Spinner'
const Editcontact = () => {

  let navigate=useNavigate();
  let {contactid}=useParams();

  let [state, setState]=useState({
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
  });

  useEffect(()=>{
    try{
      async  function fetchMyAPI() {
      setState({...state,loading:true});
      let response = await ContactService.getcontact(contactid);
      let groupresponse = await ContactService.getAllGroups();
      setState(
          {...state,
              loading:false,
              contacts:response.data,
              group:groupresponse.data
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
  },[contactid]);


  let updateinput=(event)=>{
    setState({
      ...state,
      contacts:{
        ...state.contacts,
        [event.target.name]:event.target.value
      }
    })
  }


  let submitform=(e)=>{
    e.preventDefault();
    try{
      async  function updateMyAPI() {
      let response = await ContactService.updatecontact(state.contacts,contactid);
      if(response){
           navigate('/contacts/list',{replace:true}); 
      }
    }
    updateMyAPI();
    }
    catch(error){
    setState({...state,errorMessage:error.message})
    navigate(`/contacts/edit/${contactid}`,{replace:false}); 
    }
    };


  let {loading,group,contacts,errorMessage}=state;

  return (
    <React.Fragment>    
      {
        loading?<Spinner/>:
         <React.Fragment>
           <section className='addcontact-form m-3'>
<div className="container">
 <div className="row">
   <div className="col">
     <p className='h4 text-success'>Update Contact</p>
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
             onChange={updateinput}
            type="text" className='form-control' placeholder='Photo Url' />
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
              <option value="" selected disabled >Select a Group</option>
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
            <input type='submit' className='btn btn-primary w-25' value='Update'/>
<Link to={'/Contacts/list'} className='btn btn-dark ms-2 w-25'>Cancel</Link>
          </div>
        </form>
        </div>  
        <div className="col-sm-5">
         <img src={contacts.photo} alt='' className='contact-img'/>
         </div>
  </div>

</div>
    </section>
         </React.Fragment>
      }  
    
  </React.Fragment>
  )
}

export default Editcontact