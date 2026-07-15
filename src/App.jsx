import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import ProjectArchitecture from './pages/ProjectArchitecture'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectDetails />} />
          <Route path="/project/:slug/architecture" element={<ProjectArchitecture />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
