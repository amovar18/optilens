import React from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './components/MainRouter';
function App(){
      return (
          <BrowserRouter>
            <div className="App" style={{'minHeight':'100vh','height':'100%'}}>
                <Header />
                <MainRouter/>  		      
            </div>
          </BrowserRouter>
      );
  
}


export default App;
