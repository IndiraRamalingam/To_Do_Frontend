import React from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import '../../App.css'
// import logo from "../../assets/Logo.avif"

function NavBar() {
  return (
    <> 
    <div className='p-2' style={{'background':'white'}}>
      <Container>
        <div  className="mt-4 mb-5" style={{'display':'flex',}} >
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDnoTCTIhBvv-vf6GC88ifojQEbbaZkNGNegnUoZCsGCWUgPcWMLllei2r02dGW7wl03k&usqp=CAU' width={50} height={50} />
            <h1 style={{color:"rgb(92 209 39)",'fontWeight':'bolder','textAlign':'center',fontStyle:'italic','margin':'auto'}}>To-Do App <span style={{fontSize:'18px',fontStyle:'italic',color:'#2cdbcb'}}>- Let's plan your day</span></h1>
            <button className='btn btn-danger' onClick={()=>
                    {
                      localStorage.clear();
                      window.location.href = '/';
                    }}>LOGOUT</button>
          </div>
      </Container>
      </div>
    <hr style={{'marginTop':'-20px'}}/>
    </>
  )
}

export default NavBar