import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-display-bold mb-3 purple-gradient-text">{title}</h2>
    {children}
  </div>
);

const rules = [
  'You will behave in a way that facilitates a safe and supportive environment for all AWS event and program participants, and across AWS blogs, online forums, and social media platforms.',
  'You will not engage in disruptive speech or behavior or otherwise interfere with other individuals\' participation in AWS events and programs, and across AWS blogs, online forums, and social media platforms.',
  'You will not interfere with the operation of AWS events, programs, blogs, online forums, and social media platforms.',
  'You will not attempt to receive benefits that you are not entitled to at AWS events and programs, and across AWS blogs, online forums, and social media platforms.',
  'You will not engage in any form of harassing, offensive, discriminatory, or threatening speech or behavior, including but not limited to relating to race, gender, gender identity and expression, national origin, religion, disability, marital status, age, sexual orientation, military or veteran status, or other protected category.',
  'You will comply with the instructions of AWS event and program staff, and AWS blog, online forum, and social media platform moderators.',
  'You will comply with all applicable laws and, in the context of AWS events, all of our event-specific requirements (including all health and safety requirements) and, in the context of AWS programs, all of our program-specific requirements.',
];

export default function CodeOfConduct() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: '#08000f' }}>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center h-14 px-4 sm:px-8"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(139,92,246,0.2)' }}>
        <Link to="/" className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors text-sm font-mono-bold">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <div className="flex-1 flex justify-center">
          <img src="/aws-sbg-icon.png" alt="AWS SBG" className="w-7 h-7 object-contain" />
        </div>
        <div style={{ width: 100 }} />
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 pt-28 pb-20">

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(88,28,135,0.15) 0%, transparent 70%)' }} />

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase font-mono-bold mb-3">AWS Student Builder Group</p>
          <h1 className="text-4xl sm:text-5xl font-display-bold white-gradient-text mb-3">Code of Conduct</h1>
          <p className="text-gray-500 text-sm font-display-italic">Last Updated: April 07, 2023</p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* Importance */}
        <Section title="Importance">
          <p className="text-gray-300 text-sm leading-relaxed font-display-regular">
            We firmly believe in the value and importance of an environment where all AWS community members feel welcome and safe.
            This Code of Conduct explains the behavior we expect from AWS community members interacting at AWS events and programs,
            and across AWS blogs, online forums, and social media platforms. The purpose of AWS events, programs, blogs, online forums,
            and social media platforms is to foster technical and professional education and encourage community discussion.
          </p>
        </Section>

        {/* Behavior */}
        <Section title="Behavior">
          <ol className="space-y-4">
            {rules.map((rule, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono-bold"
                  style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.35)', color: '#c084fc' }}>
                  {i + 1}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed font-display-regular pt-0.5">{rule}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Scope */}
        <Section title="Scope">
          <p className="text-gray-300 text-sm leading-relaxed font-display-regular">
            We expect all AWS community members (including but not limited to attendees, vendors, sponsors, speakers, volunteers,
            moderators, and AWS employees) to uphold the principles of this Code of Conduct. In the context of AWS events, this
            Code of Conduct covers the main event and all related events (social or otherwise). In the context of AWS programs,
            this Code of Conduct covers the main program and all related activities. AWS employees must continue to abide by all
            company policies at all times.
          </p>
        </Section>

        {/* Consequences */}
        <Section title="Consequences">
          <p className="text-gray-300 text-sm leading-relaxed font-display-regular">
            If we believe you breached this Code of Conduct, we may prohibit you from attending future AWS events and programs and
            interacting across AWS blogs, online forums, and social media platforms, and we may remove any content you created in
            violation of this Code of Conduct. Additionally, if we believe that you breached this Code of Conduct in the context of
            an AWS event or program, we may require you to leave the AWS event or program. If we require you to leave an AWS event,
            you will not be eligible to receive a refund of any fees paid to us related to the event. All determinations are at our
            sole discretion. We will involve law enforcement if we deem appropriate.
          </p>
        </Section>

        {/* Contact */}
        <Section title="Contact Us">
          <p className="text-gray-300 text-sm leading-relaxed font-display-regular mb-4">
            If you witness or are subjected to inappropriate behavior at an AWS event or program, or on an AWS blog, discussion forum,
            or social media platform, please promptly contact AWS at:
          </p>
          <a href="mailto:aws-events-security-concerns@amazon.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono-bold transition-all"
            style={{
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.35)',
              color: '#c084fc',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,92,246,0.15)'}
          >
            aws-events-security-concerns@amazon.com
          </a>
        </Section>

        {/* Divider + back */}
        <div className="section-divider w-full mt-12 mb-8" />
        <div className="text-center">
          <Link to="/"
            className="inline-flex items-center gap-2 text-sm font-mono-bold text-purple-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
