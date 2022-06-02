import React from 'react'; 
import './App.css';
import {Routes,Route, Navigate} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Addcontact from "./Components/Contacts/AddContact/Addcontact";
import Editcontact from "./Components/Contacts/EditContact/Editcontact";
import Contactlist from "./Components/Contacts/ContactList/Contactlist"; 
import Viewcontact from "./Components/Contacts/ViewContact/Viewcontact";
import Spinner from './Components/Spinner'
let  App=()=> {
  return (
    <React.Fragment>     
       <Navbar/>   
       <Routes>
         <Route path={'/'} element={<Navigate to={'/Contacts/list'}/>}/>
         <Route path={'/Contacts/list'} element={<Contactlist/>}/>
         <Route path={'/Contacts/add'} element={<Addcontact/>}/>
         <Route path={'/Contacts/edit/:contactid'} element={<Editcontact/>}/>
         <Route path={'/Contacts/view/:contactid'} element={<Viewcontact/>}/>
       </Routes>
       </React.Fragment>
  );
}

export default App;
