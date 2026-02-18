import { useState } from 'react'
import './App.css'
import ITSList from './components/ITSList'
import RoadSegmentList from './components/RoadSegmentList'

type View = 'its' | 'segments';

function App() {
  const [currentView, setCurrentView] = useState<View>('its');

  return (
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
  )
}

export default App
