import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ToastError, ToastSuccess } from '../../middleware/ToastModel';
import { CreateZoom_services, edit_Zoom_services, edit_Zoom_status_services, Get_Zoom_services } from '../../services/Zoom_services';
import moment from 'moment';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from '../header/Header';
function CreateMeeting() {


  const [id,data]=useSearchParams();
  console.log(id.get("id"),'id')
  const history=useNavigate();
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [meetings,setMeetings]=useState([]);
  const [inviteuser,setInviteUsers]=useState([]);
  const [selectAll,setSelectAll]=useState(false)
  const [statusChange,setStatusChange]=useState(true)

  const [meeting,setMeeting]=useState({
    name:"",
    Duration:"",
    Users:"",
    MeetingDate:"",
  });
  const {name,Duration,Users,MeetingDate}=meeting;
  const handleChange=(e)=>{
    setMeeting({...meeting,[e.target.name]:e.target.value});
  }
  const CreateMeet=async()=>{
    try {


      if(id.get("id"))
      {
        if(!name || !Duration || !Users || !MeetingDate)
          {
              ToastError("Please Enter All Fileds")
          }
          if(name && Duration  && Users && MeetingDate)
          {
              const datas={
                name,
                Duration,
                Users,
                MeetingDate,
                invitedUsers:inviteuser,
                selectAllStatus:selectAll
              }
              const {data,error}=await edit_Zoom_services(id?.get("id"),datas);
              if(data)
              {
                ToastSuccess("All User Access")
              handleClose();
              GetMethod();
              }
          }
      }
      else{
        if(!name || !Duration || !Users || !MeetingDate)
          {
              ToastError("Please Enter All Fileds")
          }
          if(name && Duration  && Users && MeetingDate)
          {
              const datas={
                name,
                Duration,
                Users,
                MeetingDate,
                invitedUsers:inviteuser,
                selectAllStatus:selectAll
              }
              const {data,error}=await CreateZoom_services(datas);
              if(data)
              {
                ToastSuccess("All User Access")
              handleClose();
              GetMethod();
              }
          }
      }
        
        
    } catch (error) {
        
    }
  }

  const GetMethod=async()=>
  {
    try {
      const {data,error}=await Get_Zoom_services();

if(data)
{
  setMeetings(data)
}
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    GetMethod();
  },[selectAll])

  const JoinMeeting=(params,name)=>{
    history(`/join?roomID=${params}?roomName=${name}`)
  }

const mailIds=["kalaimca685@gmail.com","thala@gmail.com","kalairoman70@gmail.com","kalai@cdp360.in"];


const handleChangeSelectall=()=>{
  setSelectAll((pre)=>!pre);
    if(!selectAll)
      {
        setInviteUsers(mailIds);
      }
      else{
      setInviteUsers([]);
      }
}

const handleInviter=(params)=>{
  if(inviteuser?.includes(params))
  {
    const filerData=inviteuser?.filter((item)=>item!==params);
    setInviteUsers(filerData);
  }
  else{
    setInviteUsers([...inviteuser,params]);
  }


    

}

const edit_Meeting_Data=async(id)=>{
  try {
    const {data}=await Get_Zoom_services(id);
    if(data)
    {
      setMeeting(data[0]);
      setSelectAll(data[0]?.selectAllStatus);
      setInviteUsers(data[0]?.invitedUsers)
      setStatusChange(data[0]?.status)
      handleShow();
      history(`/create-meeting?id=${data[0]?._id}`)
    }
    
  } catch (error) {
  }
}


useEffect(()=>{
if(selectAll)
{
  setInviteUsers(mailIds);
}
if(inviteuser?.length===mailIds?.length)
  {
    setInviteUsers(mailIds);
    setSelectAll(true);
  }
  else{
    setSelectAll(false);

  }
},[selectAll])


useEffect(()=>{

},[inviteuser]);

const handleStatusChange=async(e)=>{
  setStatusChange((pre)=>!pre);
try {
  const update={
    status:statusChange
  }
  const {data}=await edit_Zoom_status_services(e,update);
  if(data)
  {
    GetMethod();
  }

  
} catch (error) {
  
}
}
  return (
    <div>
      <section>
        <Header/>
      </section>
         <div className='table-section'>
           <div className='mb-5 mt-3 flex-end text-end'>
                <button className='submit-btn' onClick={handleShow}>+ Create Meeting</button>
            </div>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Meeting Name</th>
          <th>Day</th>
          <th>Meeting Date</th>
          <th>Users</th>
          <th>Status</th>
          <th>Duration</th>
          <th>Actions</th>
          <th>Meeting Cancel</th>
          <th>Send</th>
          <th>Join</th>
        </tr>
      </thead>
      <tbody>

        {meetings?.map((item,index)=>{
          return(
            <tr key={index}>
          <td>{index+1}</td>
          <td>{item?.name}</td>
          <td>{moment(item?.MeetingDate).format('dddd')}</td>
          <td>{moment(item?.MeetingDate).format('LLLL')}</td>
          <td>{item?.Users}</td>
          <td>{item?.status?"Active":"InActive"}</td>
          <td>{item?.Duration} Mins</td>
          <td><div className='d-flex gap-4'>
            <div onClick={()=>edit_Meeting_Data(item?._id)}><i className="fa-regular fa-pen-to-square"></i></div>
            <div>
            <i className="fa-solid fa-trash"></i>
            </div>

            </div></td>
          <td>
          <div className="checkbox-wrapper-7">
  <input className="tgl tgl-ios" id="cb2-7" type="checkbox" onChange={()=>handleStatusChange(item?._id)} checked={item?.status?true:false}/>
  <label className="tgl-btn" for="cb2-7"/>
</div>
          </td>
          <td>
          <button className='cancel-btn'>Send</button>
          </td>
          <td><button className='submit-btn' onClick={()=>JoinMeeting(item?.MeetingId,item?.name)}>Join</button></td>
        </tr>
          )
        })}
        
        
        
       
       
      </tbody>
    </Table>
         </div>

         <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
            <Row>
                <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Meeting Name"
        name="name"
        value={name}
        onChange={handleChange}
        />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Duration Time</Form.Label>
        <Form.Control type="number" placeholder="Enter Meeting Duration Time"
         name="Duration"
         value={Duration}
         onChange={handleChange}
        />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
                </Col>
            </Row>
            <Row>
               
                <Col>

                <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Meeting Date</Form.Label>
        <Form.Control type="Date" placeholder="Enter Meeting Start Date"
           name="MeetingDate"
           value={MeetingDate}
           onChange={handleChange}
        />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
              
                </Col>

                <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User</Form.Label>
        <Form.Control type="Number" placeholder="Enter Meeting Users"
           name="Users"
           value={Users}
           onChange={handleChange}
        />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
              </Col>
            </Row>

            <Row>

              <div>
                <input type="checkbox" onChange={handleChangeSelectall} checked={selectAll}/>
                <label>Select All</label>
              </div>
              {mailIds?.map((item,index)=>{
                return(
                  <div key={index} className='col-lg-3 d-flex gap-1' onClick={()=>handleInviter(item)} >
                    {inviteuser?.includes(item)?<>
                    <input type="checkbox" checked={true} id={index+1}/>
                    </>:<>
                    <input type="checkbox" id={index+1}/>
                    
                    </>}
                  
                  <div className='mt-1'>
                  <label htmlFor={index+1}>{item}</label>
                  </div>

                  </div>
                )
              })}
              
            </Row>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='submit-btn' onClick={handleClose}>
            Cancel
          </button>
          <button className='submit-btn' onClick={CreateMeet}>
            {id?.get("id")?"Update":"Create"}
            </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateMeeting