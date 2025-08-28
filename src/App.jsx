import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FeatureShowcase from './components/Features'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <FeatureShowcase />
      </div>
    </>
  )
}

export default App
