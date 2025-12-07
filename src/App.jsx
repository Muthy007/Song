import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SwethaSong from './Components/SwethaSong'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SwethaSong/>
    </>
  )
}

export default App
