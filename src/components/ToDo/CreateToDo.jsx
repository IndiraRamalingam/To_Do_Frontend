import React from 'react'
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import instance from '../../services/instance';
import { useParams } from 'react-router-dom';

function CreateToDo() {

  const [task, setTask] = useState('');
  const [msg, setMsg] = useState('');
  const [msgg, setMsgg] = useState('');
  const params = useParams();
  //console.log("PARAMS  " + params.id)

  const handleCreate = (event) => {
    event.preventDefault();
    createTask({ task })
  }

  // API REQUEST
  const createTask = async ({ task }) => {
    if (task !="") {
      try {
        const response = await instance.protectedInstance.post(`/todos/addTask/${params.id}`, { task });
        setMsg('New Task has been added succesfully !!!')
        setTimeout(() => {
          setMsg('')
        }, 1500);
        setMsgg(''), setTask('');
      }
      catch (error) {
        setMsgg("Please fill the fields to add new task");
      }
    }
    else {
      setMsgg('Please fill the fields')
    }
  }

  return (
    <>
    <div className='p-1' style={{'background':'white'}}>
      <div className='container w-50'>
        <Form onSubmit={handleCreate}>
          <div className='mt-3 mb-3 row ms-auto'>
            <div className="form-outline col-sm-8">
              <input type="text" className="form-control form-control-lg"
                value={task}
                placeholder='Add a new task...'
                onChange={(event) => setTask(event.target.value)}
              />
            </div>
            <div className='col-sm-4'>
              <button type='submit' className='btn btn-success btn-lg' >Add Task</button>
            </div>
          </div>
        </Form>

        <div>
          <p style={{ color: "#2fe62f", "fontSize": '20px' }}>{msg}</p>
          <p style={{ color: "red" }}>{msgg}</p>
        </div>

      </div>
      </div>
    </>
  )
}

export default CreateToDo;