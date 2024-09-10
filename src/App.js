import React, { useEffect, useState } from 'react'
import Routings from './Routing/Routings';
import './App.scss';
import { useDispatch } from 'react-redux';
import { DropdownShow } from './redux/reducers/Login_Reducer';
import Header from './components/header/Header';
import { io } from 'socket.io-client';
import { addSocket } from './redux/reducers/socket_reducer';
function App() {

//   const [show,setShow]=useState(false);
//   const dispatch=useDispatch();

//   const state=useSelector((state)=>state?.login?.dropdownshow);


//   const handleClick=()=>{
//     if(state)
//     {
//       setShow((pre)=>!pre)
//     dispatch(DropdownShow(show));

//     }
    
//   }

//   useEffect(()=>{
// window.addEventListener("click",handleClick)

// return()=>{
//   window.removeEventListener("click",handleClick)
// }

//   },[show,state])

const pathNames=window.location.pathname;

useEffect(()=>{

},[pathNames])



const dispatch=useDispatch();

const socketConnection = io('http://localhost:8004',{
  transports: ['websocket'], 
  withCredentials: true,  
}); 

console.log(socketConnection,'socketConnection')

const [socket, setSocket] = useState(null);

useEffect(() => {
 

  setSocket(socketConnection);

  socketConnection.on('connect', () => {
    console.log('Connected with Socket ID:', socketConnection.id); 
  });

 
  socketConnection.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  dispatch(addSocket(socketConnection))

  return () => {
    socketConnection.disconnect();
    console.log('Socket disconnected on component unmount');
  };

}, []); 


  return (
    <div>

      <section>
     
      </section>
      <main>
      <Routings/>   

      </main>
      <section>

      </section>
  </div>
  )
}

export default App