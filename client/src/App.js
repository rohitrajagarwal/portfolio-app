
import './styles/base.css';
import Container from './components/HomeComponents/Container.js'; 
import IllegalURLMsg from './components/IllegalURLMsg.js';
import { Routes, Route } from 'react-router-dom';
import ProjectMain from './components/ProjectComponents/ProjectMain.js';
import ContactMain from './components/ContactComponents/ContactMain.js';
import EduContainer from './components/EducationSkillsComponents/EduContainer.js';


function App() {
  //const isAuthenticated = true; // Replace with your actual authentication logic

  return (
    <Routes>
      <Route path="/" element={<Container />} />
      <Route path="/home" element={<Container />} />
      <Route path="/project" element={<ProjectMain />} />
      <Route path="/contact" element={<ContactMain />} />
      <Route path="/education" element={<EduContainer />} />
      <Route path="*" element={<IllegalURLMsg />} /> {/* Catch-all for undefined routes */}
    </Routes>
  );
}

export default App;
