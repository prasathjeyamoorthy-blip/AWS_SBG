import SectionBlurEdges from './ui/SectionBlurEdges';
import StackedFAQCards from './ui/stacked-article-cards';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Who can participate?',
    answer: 'Students, developers, designers, creators, innovators, and dreamers from all backgrounds are welcome.',
  },
  {
    question: 'Can beginners join?',
    answer: 'Yes. Every legendary pirate once sailed for the first time.',
  },
  {
    question: 'Is this an online or offline event?',
    answer: 'The voyage may include online phases, mentor sessions, and final presentations depending on the event structure.',
  },
  {
    question: 'Can I participate solo?',
    answer: 'Pirates are strongest with a crew, but solo registrations may also be allowed based on event rules.',
  },
  {
    question: 'What technologies can we use?',
    answer: 'Participants are free to use modern technologies including AI, web frameworks, cloud platforms, mobile apps, blockchain, automation, and more.',
  },
  {
    question: 'Will mentors guide teams?',
    answer: 'Yes. Selected teams entering the Multiverse Alliance phase receive mentorship from Guardians of the Multiverse.',
  },
  {
    question: 'What should teams build?',
    answer: 'Teams should create innovative solutions that solve meaningful problems or introduce impactful experiences.',
  },
].map(item => ({ ...item, icon: <HelpCircle size={16} /> }));

export default function FAQ() {
  return (
    <section
      id="faq"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d0020 0%, #000000 50%, #0d0020 100%)' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            Frequently Asked Questions
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold white-gradient-text">
            Got Questions?
          </h2>
          <p className="text-gray-400 font-display-italic text-sm sm:text-base">
            Every sailor has doubts before the first voyage.
          </p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* Hint */}
        <p className="text-center text-white/30 text-xs font-mono-bold tracking-widest uppercase mb-10">
          Click to expand all questions
        </p>

        <StackedFAQCards items={faqs} />
      </div>
      <SectionBlurEdges />
    </section>
  );
}
