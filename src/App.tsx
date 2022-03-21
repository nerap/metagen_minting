import './App.scss';
import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';


function App() {

  return (
      <div className='main-app'>
        <Header />
        <Body />
        <Footer />
      </div>
      );
}


export default App;