import React,{state,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ContactService } from '../../../services/Contactservice'
import Spinner from '../../Spinner'
const Contactlist = () => {

let [query,setQuery]=useState({
      text:''
});


    let [state, setState]=useState({
      loading:false,
      contacts:[],
      errorMessage:'',
      filteredContacts:[]
    })
    
    useEffect( () => {
        try{
            async  function fetchMyAPI() {
            setState({...state,loading:true});
            let response = await ContactService.getAllContacts();
            setState(
                {...state,
                    loading:false,
                    contacts:response.data,
                    filteredContacts :response.data
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


    //let delete record
    let clickDelete=(contactid)=>{
        try{
            async  function DeleteContact() {
            let response = await ContactService.deletecontact(contactid);
            if(response){
                setState({...state,loading:true});
                let response = await ContactService.getAllContacts();
                setState(
                    {...state,
                        loading:false,
                        contacts:response.data,
                        filteredContacts :response.data
                    });
            }
        }
        DeleteContact();
        }
        catch (error){
            setState(
                {...state,
                    loading:false,
                    errorMessage:error.message
                });
        }
    }

//searchcontact

let searchcontacts=(event)=>{
setQuery({...query, text: event.target.value});
let thecontacts=state.contacts.filter(contact=>{
    return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
});
setState({
...state,
filteredContacts:thecontacts
})
}

let {loading,contacts,errorMessage,filteredContacts}=state;

  return (
      <React.Fragment>
         
    <section className='contact-search p-3'>
<div className="container">
    <div className="grid">
        <div className="row">
            <div className="col">
                <p className='h3'>Contact Manager &nbsp;
                <Link to={'/Contacts/add'} className='btn btn-primary'><i className='fa fa-plus-circle'></i> New Contact</Link>
                </p>
                <i>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, voluptatum enim! Hic commodi quidem sit error, quis incidunt eum rerum suscipit officiis inventore. Culpa quis molestiae harum consequatur tempore tenetur.</i>
      
            </div>
        </div>
        <div className="row">
            <div className="col-sm-6">
                <form className='row mt-3'>
                    <div className="col"> <div className='mb-2'>
                        <input
                        name='text'
                        value={query.text}
                        onChange={searchcontacts}
                        type="text" className='form-control' placeholder='Search here...'/> 
                    </div></div>
                    <div className="col"> <div className='mb-2'>
                        <input type="button" className='btn btn-warning text-white' value='Search'/> 
                    </div></div>
                   
                </form>
            </div>
        </div>
    </div>
</div>
    </section>
    {loading?<Spinner/> : <React.Fragment>
        
    <section className='contact-list'>
        <div className="container">
            <div className="row">
                {
                    filteredContacts.length>0 && filteredContacts.map(contact=>{
                        return(
                            <div className="col-md-6" key={contact.id}>
                            <div className="card my-3">
                                <div className="card-body">
                                    <div className="row align-item-center">
                                    <div className="col-md-4">                                       
                                        <img src={contact.photo} alt='' className='contact-img'/>
                                    </div>
                                    <div className="col-md-7">
                                        <ul className='list-group'>
                                           <li className='list-group-item  list-group-item-action'>
                                               Name:<span className='fw-bold'> {contact.name}</span>
                                           </li>
                                           <li className='list-group-item  list-group-item-action'>
                                           Mobile:<span className='fw-bold'> {contact.mobile}</span>
                                           </li>
                                           <li className='list-group-item  list-group-item-action'>
                                           Email:<span className='fw-bold'> {contact.email}</span>
                                           </li>                                   
                                        </ul>
                                    </div>
                                    <div className="col-md-1 d-flex flex-column align-items-center">
                                    <Link to={`/Contacts/view/${contact.id}`} className='btn btn-warning my-1 text-white fw-bold'><i className='fa fa-eye'></i></Link>
                                    <Link to={`/Contacts/edit/${contact.id}`} className='btn btn-primary my-1 text-white fw-bold'><i className='fa fa-edit'></i></Link>
                                    <button
                                    onClick={()=>{
                                        clickDelete(contact.id)
                                    }}
                                    className='btn btn-danger my-1 text-white fw-bold'><i className='fa fa-trash'></i></button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        )

                     })
                }
                             
            </div>
        </div>
    </section>

        </React.Fragment>}
   
    </React.Fragment>
  )
}

export default Contactlist