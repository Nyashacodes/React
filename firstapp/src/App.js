import React from "react";
import { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";




function App() {
    
  const[mode, setMode] = useState('light'); //weather dark mode is enabled or not
  const[alert, setAlert] = useState(null);


  const showAlert=(message, type)=>{

    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },3000)
  }
  
//  const CustomMode=(mode = 'black')=>{
//   switch()
//  }
  // const backgroundRemove=()=>{
  //   document.body.backgroundColor.remove('bg-light')
  //   document.body.backgroundColor.remove('bg-dark')
  //   document.body.backgroundColor.remove('bg-primary')
  //   document.body.backgroundColor.remove('bg-yellow')
  //   document.body.backgroundColor.remove('bg-success')

  // }
  
    const toggleMode=(cls)=>{
    console.log(cls)
    // document.body.classList.add('bg-'+cls)
    if(mode === 'light'){
      setMode('dark')
      document.body.style.backgroundColor = '#113e7e'
      showAlert("Dark mode has been enabled", "success")
      document.title='TextUtils-Dark mode enabled!'

      // setInterval(()=>{
      //   document.title='TextUtils is great!'
      // },2000)

      // setInterval(()=>{
      //   document.title='Download Now!'
      // },1500)

    }else{
      setMode('light')
      document.body.style.backgroundColor = 'white'
      showAlert("Light mode has been enabled", "success")
      document.title='TextUtils-Dark mode enabled!'

    }
  }
  return (
    <>
    <Router>     
      <Navbar title = "TextUtilsviaProps" mode={mode} toggleMode={toggleMode} ></Navbar>
      <Alert alert={alert}/>
      <div className="container my-3">
        <Routes>
          {/* <About /> */}
          <Route path="/about" element={<About />} />
        </Routes>
        <TextForm heading = "Enter a text to Analyzer" mode={mode} showAlert={showAlert} />
     </div>
    </Router>
    </>
  );
}

export default App;
