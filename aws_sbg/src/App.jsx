import Navbar    from './components/Navbar';
import Hero      from './components/Hero';
import About     from './components/About';
import Timeline  from './components/Timeline';
import CrewRoles from './components/CrewRoles';
import Guardians from './components/Guardians';
import Tracks    from './components/Tracks';
import WhyJoin   from './components/WhyJoin';
import Prizes    from './components/Prizes';
import FAQ       from './components/FAQ';
import FinalCTA  from './components/FinalCTA';
import { CinematicFooter } from './components/ui/motion-footer';
import { ContainerScroll } from './components/ui/container-scroll-animation';

export default function App() {
  return (
    <div className="min-h-screen pb-24 lg:pb-0 overflow-x-hidden" style={{ background: '#08000f' }}>
      <Navbar />

      {/* Hero — no scroll wrap, it's the entry point */}
      <Hero />

      <ContainerScroll>
        <About />
      </ContainerScroll>

      <ContainerScroll>
        <Timeline />
      </ContainerScroll>

      <ContainerScroll>
        <CrewRoles />
      </ContainerScroll>

      <ContainerScroll>
        <Guardians />
      </ContainerScroll>

      <ContainerScroll>
        <Tracks />
      </ContainerScroll>

      <ContainerScroll>
        <WhyJoin />
      </ContainerScroll>

      <ContainerScroll>
        <Prizes />
      </ContainerScroll>

      <ContainerScroll>
        <FAQ />
      </ContainerScroll>

      <ContainerScroll>
        <FinalCTA />
      </ContainerScroll>

      <CinematicFooter />
    </div>
  );
}
