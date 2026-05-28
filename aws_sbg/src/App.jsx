import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import Timeline  from './components/Timeline';
import CrewRoles from './components/CrewRoles';
import Guardians from './components/Guardians';
import Tracks    from './components/Tracks';
import WhyJoin   from './components/WhyJoin';
import Prizes    from './components/Prizes';
import FAQ       from './components/FAQ';
import { CinematicFooter } from './components/ui/motion-footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#08000f' }}>
      <Navbar />
      <Hero />
      <Tracks />
      <Timeline />
      <CrewRoles />
      <Guardians />
      <WhyJoin />
      <Prizes />
      <FAQ />
      <CinematicFooter />
    </div>
  );
}
