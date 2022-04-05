import React from 'react';
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainRouter from './components/MainRouter';
function App(){
      return (
          <div className="App" style={{'minHeight':'100vh','height':'100%'}}>
              <Header/>
              <MainRouter/>  		      
          </div>
      );
  
}


export default App;
