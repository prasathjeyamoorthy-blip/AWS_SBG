import SectionBlurEdges from "./ui/SectionBlurEdges";

const STEPS = [
  { n: 1, title: "Assemble Your Troop",      desc: "Build a pirate crew of 2–4 members." },
  { n: 2, title: "Choose Your Route",         desc: "Select your technology track and begin the journey." },
  { n: 3, title: "Create Your Treasure Map",  desc: "Plan your idea and submit your proposal." },
  { n: 4, title: "Build Your Ship",           desc: "Develop your prototypes and survive the storms." },
  { n: 5, title: "Earn a Royal Guard",        desc: "Selected crews unlock a Guardian Mentor who guides them through the dangerous waters ahead." },
  { n: 6, title: "Reach the Final Island",    desc: "Top 10 crews battle in the offline finale for treasure and glory." },
];

export default function CrewRoles() {
  return (
    <section
      id="crew"
      className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "#000000" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(88,28,135,0.2) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
            Crew Roles
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold mixed-gradient-text">
            Assemble Your Pirate Crew
          </h2>
          <p className="text-gray-400 font-display-italic text-sm sm:text-base">
            Every legendary voyage needs the right crew.
          </p>
          <div className="section-divider w-48 mx-auto mt-6" />
        </div>

        {/* Characters image */}
        <div className="relative w-full mb-14 sm:mb-20" style={{ background: "transparent" }}>
          <img
            src="/pirate_characters.png"
            alt="Pirate Crew Characters"
            className="w-full h-auto block"
            draggable={false}
          />
        </div>

        {/* ── Voyage Steps ── */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical connector line */}
          <div
            className="absolute left-[22px] top-4 bottom-4 w-px pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(139,92,246,0.6), rgba(139,92,246,0.1))" }}
          />

          <ol className="flex flex-col gap-7 sm:gap-9">
            {STEPS.map(({ n, title, desc }) => (
              <li key={n} className="flex items-start gap-5">
                {/* Step badge */}
                <div
                  className="relative z-10 flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-mono-bold text-sm"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4c1d95)",
                    boxShadow: "0 0 18px rgba(139,92,246,0.55)",
                    border: "1px solid rgba(168,85,247,0.5)",
                  }}
                >
                  <span className="text-white">{n}</span>
                </div>

                {/* Text */}
                <div className="pt-1.5">
                  <p className="text-white font-display-bold text-base sm:text-lg leading-snug mb-1">
                    {title}
                  </p>
                  <p className="text-gray-400 font-body-bold text-sm sm:text-base leading-relaxed">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <SectionBlurEdges />
    </section>
  );
}
