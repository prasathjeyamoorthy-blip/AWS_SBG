import MagicBento from "./ui/MagicBento";
import SectionBlurEdges from "./ui/SectionBlurEdges";
import TextType from "./ui/TextType";
import { Gift, Star } from "lucide-react";

const prizes = [
  { rank: "Champion Tier", amount: "₹15,000" },
  { rank: "Elite Tier", amount: "₹10,000" },
  { rank: "Builder Tier", amount: "₹5,000" },
];

const prizesCardData = prizes.map((prize, idx) => ({
  color: "#0d0020",
  style: {
    background:
      idx === 0
        ? "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(88,28,135,0.4))"
        : "linear-gradient(135deg, rgba(40,40,40,0.3), rgba(20,20,20,0.5))",
    border:
      idx === 0
        ? "1px solid rgba(139,92,246,0.5)"
        : "1px solid rgba(80,80,80,0.4)",
    boxShadow:
      idx === 0
        ? "0 0 40px rgba(139,92,246,0.3)"
        : "0 0 40px rgba(100,100,100,0.1)",
    textAlign: "center",
    alignItems: "center",
  },
  content: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
        width: "100%",
      }}
    >
      <h3
        className="magic-bento-card__title"
        style={{ fontSize: "1.5em", textAlign: "center" }}
      >
        {prize.rank}
      </h3>
      <p style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5em)', fontWeight: "bold", textAlign: "center" }}>
        {prize.amount}
      </p>
    </div>
  ),
}));

export default function Prizes() {
  return (
    <section
      id="prizes"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#000000" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(88,28,135,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            The Ultimate Prize Pool
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold mixed-gradient-text">
            Prizes &amp; Rewards
          </h2>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* Prize cards with "coming soon" overlay */}
        <div style={{ position: "relative" }}>
          <MagicBento
            cardData={prizesCardData}
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />

          {/* Frosted glass overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "1rem",
              backdropFilter: "blur(14px) saturate(1.2)",
              WebkitBackdropFilter: "blur(14px) saturate(1.2)",
              background:
                "linear-gradient(135deg, rgba(10,0,30,0.55) 0%, rgba(88,28,135,0.35) 50%, rgba(10,0,30,0.55) 100%)",
              border: "1px solid rgba(139,92,246,0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
              zIndex: 10,
            }}
          >
            {/* Big transparent lock */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              fill="none"
              style={{
                width: "clamp(100px, 18vw, 180px)",
                height: "clamp(100px, 18vw, 180px)",
                opacity: 0.18,
                filter: "drop-shadow(0 0 32px rgba(192,132,252,0.5))",
              }}
            >
              {/* Shackle */}
              <path
                d="M20 28V20a12 12 0 0 1 24 0v8"
                stroke="#c084fc"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Body */}
              <rect
                x="10"
                y="28"
                width="44"
                height="30"
                rx="5"
                ry="5"
                stroke="#c084fc"
                strokeWidth="3.5"
                fill="rgba(192,132,252,0.07)"
              />
              {/* Keyhole circle */}
              <circle cx="32" cy="43" r="4" stroke="#c084fc" strokeWidth="3" fill="none" />
              {/* Keyhole stem */}
              <line x1="32" y1="47" x2="32" y2="53" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" />
            </svg>

            {/* Typing animation */}
            <TextType
              text={[
                "Will be revealed soon...",
                "Stay tuned for prizes!",
              ]}
              typingSpeed={65}
              deletingSpeed={35}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="|"
              loop={true}
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                fontWeight: 700,
                color: "#e9d5ff",
                letterSpacing: "0.04em",
                textAlign: "center",
                fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        {/* Additional Rewards */}
        <div className="mt-12 sm:mt-16 max-w-2xl mx-auto">

          {/* Swag highlight banner */}
          <div
            className="mb-5 rounded-2xl px-6 py-5 flex items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(109,40,217,0.1) 100%)',
              border: '1px solid rgba(139,92,246,0.45)',
              boxShadow: '0 0 32px rgba(139,92,246,0.15)',
            }}
          >
            <Gift size={28} className="text-purple-300 flex-shrink-0" />
            <div>
              <p className="text-purple-300 text-xs tracking-[0.25em] uppercase font-mono-bold mb-0.5">
                Exclusive Swags
              </p>
              <p className="text-white font-display-bold text-base sm:text-lg leading-snug">
                Top 10 shortlisted teams receive <span className="text-purple-300">exclusive event swags</span> at the Grand Finale.
              </p>
            </div>
          </div>

          <div className="prizes-rewards-card bg-gradient-to-r from-purple-900/20 via-transparent to-purple-900/20 border border-purple-500/30 rounded-lg p-5 sm:p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-display-bold text-white mb-6 text-center">
              Additional Rewards
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Star size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Top 10 Team Swags</span>
              </li>
              <li className="flex items-start gap-3">
                <Star size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Certificates for All Participants
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Star size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  Recognition, Networking & Opportunities
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
