const footerLinks = {
  Voyage: ["About", "Timeline", "Tracks", "Prizes"],
  Community: ["Discord", "GitHub", "LinkedIn", "Twitter"],
  Resources: ["Blog", "Code of Conduct", "Contact"],
};

export default function Footer() {
  return (
    <footer
      className="py-12 sm:py-16 px-4 sm:px-6"
      style={{
        background: "#000000",
        borderTop: "1px solid rgba(139,92,246,0.3)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/aws-sbg-icon.png"
                alt="AWS SBG"
                className="w-8 h-8 object-contain"
              />
              <span className="text-white text-sm tracking-widest uppercase font-display-bold">
                AWS SBG
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-body-bold">
              Where Pirates Become Legends.
            </p>
            <p className="text-purple-500 text-xs mt-3 font-display-italic">
              Code the Seas. Conquer the Multiverse.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-xs tracking-widest uppercase mb-4 font-mono-bold">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-purple-300 text-sm transition-colors duration-200 font-body-bold"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-mono-bold text-center md:text-left">
            The Grand Pirate Voyage © 2026 · Where Pirates Become Legends.
          </p>
        </div>
      </div>
    </footer>
  );
}
