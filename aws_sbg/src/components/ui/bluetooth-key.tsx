import { cn } from "@/lib/utils";
import { useState } from "react";

interface BluetoothKeyProps {
  label: string;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export const BluetoothKey = ({
  label,
  href = "#",
  variant = "secondary",
  className,
}: BluetoothKeyProps) => {
  const [checked, setChecked] = useState(false);
  const id = `bt-key-${label.replace(/\s+/g, "-").toLowerCase()}`;

  const handleClick = () => {
    setChecked((v) => !v);
    if (href && href !== "#") {
      if (href.startsWith('http')) {
        // External URL — open in new tab
        setTimeout(() => window.open(href, '_blank', 'noopener,noreferrer'), 120);
      } else {
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    }
  };

  return (
    <div className={cn("bt-key-wrapper", className)}>
      <label
        htmlFor={id}
        className={cn("bt-wrap", variant === "primary" && "bt-wrap--primary")}
        onClick={handleClick}
      >
        <input
          id={id}
          aria-label={label}
          type="checkbox"
          checked={checked}
          onChange={() => {}}
        />

        {/* Outer shell — the raised surround */}
        <button className="bt-button" type="button" onClick={(e) => e.preventDefault()}>
          {/* Recessed inner face */}
          <div className="bt-inner-face">
            <span className="bt-label">{label}</span>
          </div>

          {/* Bottom edge glow strip */}
          <div className="bt-edge-glow" />
        </button>

        {/* LED dot below the key */}
        <div className="bt-led" />

        {/* Ripple bg */}
        <div className="bt-bg">
          <div className="bt-shine-1" />
        </div>
        <div className="bt-bg-glow" />
      </label>
    </div>
  );
};
