import './App.css'
import FeatureProvider from './context/FeatureProvider.jsx'
import Feature from './pages/Feature.jsx'

function App() {
  

  return (
    <>
      <div>
      <FeatureProvider>
        <Feature />
      </FeatureProvider>
      </div>
    </>
  )
}

export default App
