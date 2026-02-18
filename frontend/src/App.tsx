import { useState } from 'react'
import './App.css'
import ITSList from './components/ITSList'
import RoadSegmentList from './components/RoadSegmentList'

type View = 'its' | 'segments';

function App() {
  const [currentView, setCurrentView] = useState<View>('its');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    // Increment refresh key to force remount and reload data
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1 className="app-title">🚦 Sistema de Gestión de Tráfico - Yunex</h1>
        <nav className="app-navigation">
          <button 
            className={`nav-tab ${currentView === 'its' ? 'active' : ''}`}
            onClick={() => handleViewChange('its')}
          >
            🚦 Equipos ITS
          </button>
          <button 
            className={`nav-tab ${currentView === 'segments' ? 'active' : ''}`}
            onClick={() => handleViewChange('segments')}
          >
            🛣️ Segmentos Viales
          </button>
        </nav>
      </div>

      <div className="app-content">
        {currentView === 'its' && <ITSList key={`its-${refreshKey}`} />}
        {currentView === 'segments' && <RoadSegmentList key={`segments-${refreshKey}`} />}
      </div>
    </div>
  )
}

export default App
