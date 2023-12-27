import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Users from './Components/User/Users';
import Posts from './Components/Post/Posts';
import Photos from './Components/Photo/Photos';
import Todos from './Components/Todo/Todos';
import NavBar from './Components/NavBar'
import { configureStore } from '@reduxjs/toolkit';
import postSlice from './Store/postSlice';
import todoSlice from './Store/todoSlice';
import userSlice from './Store/userSlice';
import { Provider } from 'react-redux';
import { useState } from 'react';

  const myStore = configureStore({
    reducer: {
      postSlice,
      todoSlice,
      userSlice
    }
  })


function App() {
  
  const [find, setFind] = useState("")
  
  return (
    <Provider store={myStore}>
      <div className="App">
        <NavBar setFind={setFind} />
        <Routes>
          <Route path="/" element={<Home find={find} />} />
          <Route path="/Users" element={<Users find={find} />} />
          <Route path="/Posts" element={<Posts find={find} />} />
          <Route path="/Photos" element={<Photos find={find} />} />
          <Route path="/Todos" element={<Todos find={find} />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
