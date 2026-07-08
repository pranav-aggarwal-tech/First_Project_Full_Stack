import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './assets/Header';
import Form from './assets/Form';

function App() {
  const [formdata, setFormData] = useState({
  
  })

  return (
    <>
      <div className="container">
        <Header></Header>
        <Form></Form>
         {/* <HousePriceForm></HousePriceForm>  */}
       </div>
       </>
  )
}

export default App
