import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import Timeline  from './components/Timeline';
import Guardians from './components/Guardians';
import Tracks    from './components/Tracks';
import WhyJoin   from './components/WhyJoin';
import Prizes    from './components/Prizes';
import FAQ       from './components/FAQ';
import { CinematicFooter } from './components/ui/motion-footer';
import CodeOfConduct from './pages/CodeOfConduct';

function MainPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#08000f' }}>
      <Navbar />
      <Hero />
      <Tracks />
      <Timeline />
      <Guardians />
      <WhyJoin />
      <Prizes />
      <FAQ />
      <CinematicFooter />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/code-of-conduct" element={<CodeOfConduct />} />
      </Routes>
    </BrowserRouter>
  );
}
