import React from 'react'
import '../src/App.css'
import { BrowserRouter, Routes ,Route,Navigate } from 'react-router-dom'
import SignIn from './components/Pages/SignIn'
import SignUp from './components/Pages/SignUp'
import ForgotPassword from './components/Pages/ForgotPassword'
import ResetPassword from './components/Pages/ResetPassword'
import CreateToDo from './components/ToDo/CreateToDo';
import ViewToDo from './components/ToDo/ViewToDo';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/reset_password/:token' element={<ResetPassword />} />
          <Route path='/view_to_do/:id' element={<ViewToDo />} />
          <Route path='/create_to_do/:id' element={<CreateToDo />} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App