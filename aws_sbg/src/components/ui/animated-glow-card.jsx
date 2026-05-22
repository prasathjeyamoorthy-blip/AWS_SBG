import React from 'react';
import './animated-glow-card.css';

const CardCanvas = ({ children, className = '' }) => {
  return (
    <div
      className={`card-canvas ${className}`}
      style={{
        border: '1px solid rgba(255,255,255,0.6)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.15)',
      }}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter width="3000%" x="-1000%" height="3000%" y="-1000%" id="unopaq">
          <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 3 0" />
        </filter>
      </svg>
      <div className="card-backdrop" />
      {/* Canvas corner dots */}
      <span className="canvas-dot canvas-dot-tl" />
      <span className="canvas-dot canvas-dot-tr" />
      <span className="canvas-dot canvas-dot-bl" />
      <span className="canvas-dot canvas-dot-br" />
      {children}
    </div>
  );
};

const Card = ({ children, className = '' }) => {
  return (
    <div className={`glow-card ${className}`}>
      <div className="border-element border-left" />
      <div className="border-element border-right" />
      <div className="border-element border-top" />
      <div className="border-element border-bottom" />
      <div
        className="card-content"
        style={{ border: '1px solid rgba(255,255,255,0.18)' }}
      >
        {children}
      </div>
    </div>
  );
};

export { CardCanvas, Card };
