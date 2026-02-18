import { useState } from 'react'
import './App.css'
import ITSList from './components/ITSList'
import RoadSegmentList from './components/RoadSegmentList'

type View = 'its' | 'segments';

function App() {
  const [currentView, setCurrentView] = useState<View>('its');

  return (
<<<<<<< Updated upstream
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
=======
    <div className="App">
      <div className="app-header">
        <h1 className="app-title">🚦 Sistema de Gestión de Tráfico - Yunex</h1>
        <nav className="app-navigation">
          <button 
            className={`nav-tab ${currentView === 'its' ? 'active' : ''}`}
            onClick={() => setCurrentView('its')}
          >
            🚦 Equipos ITS
          </button>
          <button 
            className={`nav-tab ${currentView === 'segments' ? 'active' : ''}`}
            onClick={() => setCurrentView('segments')}
          >
            🛣️ Segmentos Viales
          </button>
        </nav>
      </div>

      <div className="app-content">
        {currentView === 'its' && <ITSList />}
        {currentView === 'segments' && <RoadSegmentList />}
      </div>
    </div>
>>>>>>> Stashed changes
  )
}

export default App
