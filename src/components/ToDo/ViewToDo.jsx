import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import CreateToDo from './CreateToDo'
import instance from '../../services/instance';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";

function ViewToDo() {
  const [tasks, setTasks] = useState([]);
  const[task,setTask]=useState('');
  const[taskId,setTaskId]=useState('')
  const params = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [errormsg, setErrorMsg] = useState('')
  const [msg, setMsg] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllTasks();
  }, [tasks])

  //To get the list of all Tasks
  const getAllTasks = async () => {
    try {
      const response = await instance.protectedInstance.get(`todos/getAll/${params.id}`)
      setTasks(response.data);      
    }
    catch (error) {
      console.log(error)
    }
  }


  //To change Status
  const completeStatus = async (id) => {
    try {
      let response = await instance.protectedInstance.put(`/todos/editStatus/${id}`)
      if (response.status == 200) {
        getAllTasks();
        window.location.reload(false);
      }
    }
    catch (error) {
      console.log("Error in updating Status ", error)
    }
  }

  //To get the particular task using ID
    const getTask = async(id) =>{
    handleShow()
    try{
      const response = await instance.protectedInstance.get(`todos/getTask/${id}`)
      setTask(response.data.TodoItems.task)
      setTaskId(response.data.TodoItems._id)
    }
    catch(error)
    {
      console.log("Error in getting task using ID ",error)
    }
  }

  //To Edit Task
  const handleUpdate = (event) => {
    event.preventDefault();
    if(task !='')
    {
      editTask({task})
    }
    else{
      setErrorMsg('Please fill the above field')
    }
  }

  const editTask = async(details)=>{
    try{
      const response = await instance.protectedInstance.put(`/todos/editTask/${taskId}`,details);
      if (response.status === 200) {
        setMsg("Task Updated")   
        setErrorMsg('')
        window.location.reload(false); 
      }
    }
    catch(error)
    {
      console.log("Error in updating"+error)
    }
  }

  //To delete a task using ID
  const deleteTask = async (id) => {
    try {
      let response = await instance.protectedInstance.delete(`/todos/deleteTask/${id}`)
      if (response.status == 200) {
        getAllTasks();
        window.location.reload(false);
      }
    }
    catch (error) {
      console.log("Error in deleting Tasks ", error)
    }
  }

  return (
    <>
      <NavBar />
      <CreateToDo />
      <div className='container w-55 p-2' style={{'background':'white'}}>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead align='middle'>
              <tr className="table-info" >
                <th scope="col" >Tasks</th>
                <th scope='col'>Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {tasks.map((p, i) => {
              var color, dis;
              if (p.status == 'Completed') {
                color = 'success'
                dis = 'none'
              }
              else {
                color = 'danger'
              }
              return (
                <tbody key={p._id} align='middle'>
                  <tr scope="row">
                    <td>
                      <div className='m-3'>{p.task}</div>
                    </td>
                    <td>
                      <div style={{ 'width': '1px', 'display': 'inline-flex', 'justifyContent': 'center' }} className='m-3'>
                        <span className={`badge bg-${color}`}>
                          {p.status}
                        </span>
                      </div>
                    </td>
                    <td>


                      <div style={{ 'width': '1px', 'display': 'inline-flex', 'justifyContent': 'center' }}>
                        <button className='btn btn-success m-2' style={{ 'display': `${dis}` }} onClick={() => {
                          completeStatus(p._id);
                        }}>
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                        <button className='btn btn-warning m-2' style={{ 'display': `${dis}` }}
                          onClick={()=>{getTask(p._id)}}>
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button className='btn btn-danger m-2'
                          onClick={() => {
                            deleteTask(p._id);
                          }}>
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>

      {/* Modal - To Edit the Task */}

      <div className='modal-dialog modal-dialog-centered'>
        <Modal show={show} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form >
              <div className="form-outline mb-4">
                <input type="textarea" className="form-control form-control-lg"
                  placeholder='Add a task...'
                  value={task}
                  onChange={(event) => setTask(event.target.value) }
                />
              </div>
            </Form>
          </Modal.Body>
          <p style={{ color: "green",'textAlign':'center' }}>{msg}</p>
        <p style={{ color: "red" ,'textAlign':'center'}}>{errormsg}</p>
          <Modal.Footer>
            <Button variant="success" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>


    </>
  )
}

export default ViewToDo