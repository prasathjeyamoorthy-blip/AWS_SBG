import SectionBlurEdges from './ui/SectionBlurEdges';
import StackedFAQCards from './ui/stacked-article-cards';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Is there a registration fee to participate?',
    answer: 'No, participation is completely free.',
  },
  {
    question: 'What is the maximum size of a team?',
    answer: 'Teams must consist of 3–4 members, and each team must include at least one female participant.',
  },
  {
    question: 'Can I change my team members or track after registration?',
    answer: 'No, changes to team members or selected tracks are not allowed after registration.',
  },
  {
    question: 'Is the certificate mandatory to participate in the final hackathon?',
    answer: 'No, possessing a certificate is not mandatory for participation in the final hackathon.',
  },
  {
    question: 'Is the Grand Finale an in-person event or virtual?',
    answer: 'The Grand Finale will be conducted offline at the Sri Manakula Vinayagar Engineering College campus.',
  },
  {
    question: 'Will AWS credits be provided?',
    answer: 'No, AWS credits will not be provided.',
  },
  {
    question: 'What are the system requirements for the Grand Finale?',
    answer: 'The Top 10 shortlisted teams participating in the Grand Finale are required to bring their own laptops. Power supply junction boxes and Wi-Fi connectivity will be provided at the venue, but participants are advised to keep backup arrangements if needed.',
  },
  {
    question: 'Will food be provided during the event?',
    answer: 'Yes, refreshments and lunch will be provided for the Top 10 shortlisted teams during the Grand Finale.',
  },
  {
    question: 'Will participants receive certificates?',
    answer: 'Yes, all participants will receive an E-Certificate of participation.',
  },
  {
    question: 'Will there be any swags for finalists?',
    answer: 'Yes, the Top 10 shortlisted teams will receive exclusive event swags.',
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
            Every builder has questions before the first sprint.
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
