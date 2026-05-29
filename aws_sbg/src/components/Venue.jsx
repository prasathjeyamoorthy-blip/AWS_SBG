import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Navigation, Building2, Trophy } from 'lucide-react';
import L from 'leaflet';
import SectionBlurEdges from './ui/SectionBlurEdges';

// Leaflet default icon fix for bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon   from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl:       markerIcon,
  shadowUrl:     markerShadow,
});

// ── SMVEC verified coordinates (NH-45A, Madagadipet, Puducherry) ────────────
// Source: OpenStreetMap node for Sri Manakula Vinayagar Engineering College
const LAT = 11.9352;
const LNG = 79.8174;

// Google Maps links — use place name so Google resolves the exact listing
const GMAPS_LINK   = `https://www.google.com/maps/search/Sri+Manakula+Vinayagar+Engineering+College,+Madagadipet,+Puducherry/@${LAT},${LNG},17z`;
const DIRECTIONS   = `https://www.google.com/maps/dir/?api=1&destination=Sri+Manakula+Vinayagar+Engineering+College+Madagadipet+Puducherry`;

// Custom purple pin icon
const purpleIcon = new L.DivIcon({
  className: '',
  html: `
    <div style="
      width:36px; height:36px;
      background: linear-gradient(135deg,#7c3aed,#9333ea);
      border: 2px solid rgba(196,181,253,0.8);
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 0 18px rgba(139,92,246,0.7);
    ">
      <div style="
        position:absolute; inset:0;
        display:flex; align-items:center; justify-content:center;
        transform:rotate(45deg);
      ">
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'
          fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'>
          <path d='M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z'/>
          <circle cx='12' cy='10' r='3'/>
        </svg>
      </div>
    </div>`,
  iconSize:   [36, 36],
  iconAnchor: [18, 36],
  popupAnchor:[0, -38],
});

// Force map to re-render tiles after mount (fixes grey tiles in some bundlers)
function InvalidateOnMount() {
  const map = useMap();
  useEffect(() => { setTimeout(() => map.invalidateSize(), 100); }, [map]);
  return null;
}

const DETAILS = [
  { icon: Building2,  label: 'Institution', value: 'SMVEC — Est. 1999' },
  { icon: MapPin,     label: 'Location',    value: 'Madagadipet, Puducherry' },
  { icon: Navigation, label: 'Highway',     value: 'NH-45A, Puducherry–Villupuram' },
  { icon: Trophy,     label: 'Event',       value: 'Grand Finale — Offline' },
];

export default function Venue() {
  return (
    <>
      {/* Leaflet CSS — loaded once globally */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <section
        id="venue"
        className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #000000 0%, #0a0018 50%, #000000 100%)' }}
      >
        <div className="max-w-5xl mx-auto">

          {/* ── Header ── */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-purple-400 text-xs tracking-[0.35em] uppercase mb-3 font-mono-bold">
              Grand Finale
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 font-display-bold white-gradient-text">
              Venue
            </h2>
            <p className="text-gray-400 font-display-italic text-sm sm:text-base">
              The final battle takes place here.
            </p>
            <div className="section-divider w-48 mx-auto mt-6" />
          </div>

          {/* ── Main card ── */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              border: '1px solid rgba(139,92,246,0.25)',
              boxShadow: '0 0 60px rgba(139,92,246,0.12)',
            }}
          >
            {/* ── Leaflet Map ── */}
            <div
              className="relative w-full cursor-pointer"
              style={{ height: '340px' }}
              onClick={() => window.open(GMAPS_LINK, '_blank', 'noopener,noreferrer')}
            >
              {/* Hide Leaflet attribution bar */}
              <style>{`.leaflet-control-attribution { display: none !important; }`}</style>
              <MapContainer
                center={[LAT, LNG]}
                zoom={17}
                scrollWheelZoom={false}
                zoomControl={true}
                style={{ width: '100%', height: '100%' }}
                onClick={undefined}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={19}
                />
                <InvalidateOnMount />
                <Marker
                  position={[LAT, LNG]}
                  icon={purpleIcon}
                  eventHandlers={{
                    click: (e) => {
                      e.originalEvent.stopPropagation();
                      window.open(GMAPS_LINK, '_blank', 'noopener,noreferrer');
                    },
                  }}
                >
                  <Popup>
                    <div style={{ fontFamily: 'sans-serif', minWidth: 180 }}>
                      <strong style={{ fontSize: 13 }}>SMVEC</strong><br />
                      <span style={{ fontSize: 11, color: '#555' }}>
                        Sri Manakula Vinayagar Engineering College<br />
                        Madagadipet, Puducherry
                      </span><br />
                      <a
                        href={GMAPS_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 11, color: '#7c3aed', marginTop: 4, display: 'inline-block' }}
                      >
                        Open in Google Maps ↗
                      </a>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>

              {/* Dark overlay tint to match site palette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'rgba(10,0,24,0.18)', mixBlendMode: 'multiply' }}
              />

              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, transparent, #0a0018)', zIndex: 500 }}
              />
            </div>

            {/* ── Info panel ── */}
            <div
              className="px-6 sm:px-10 py-7 sm:py-9"
              style={{ background: 'rgba(10,0,24,0.97)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={14} className="text-purple-400 flex-shrink-0" />
                    <span className="text-purple-400 text-xs tracking-[0.25em] uppercase font-mono-bold">
                      Finals Venue
                    </span>
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl font-display-bold leading-snug">
                    Sri Manakula Vinayagar Engineering College
                  </h3>
                  <p className="text-white/40 text-sm font-mono-bold mt-1">
                    Madagadipet, Puducherry – 605 107
                  </p>
                </div>

                <a
                  href={DIRECTIONS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-2 self-start px-5 py-2.5 rounded-full text-xs font-mono-bold tracking-widest uppercase transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(109,40,217,0.6), rgba(139,92,246,0.4))',
                    border: '1px solid rgba(139,92,246,0.55)',
                    color: '#e9d5ff',
                    boxShadow: '0 0 20px rgba(139,92,246,0.3)',
                    textDecoration: 'none',
                  }}
                >
                  <Navigation size={12} />
                  Get Directions
                </a>
              </div>

              <div className="section-divider mb-7" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DETAILS.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl px-4 py-3 flex flex-col gap-1"
                    style={{
                      background: 'rgba(139,92,246,0.06)',
                      border: '1px solid rgba(139,92,246,0.15)',
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon size={11} className="text-purple-400 flex-shrink-0" />
                      <span className="text-purple-400/70 text-[10px] tracking-widest uppercase font-mono-bold">
                        {label}
                      </span>
                    </div>
                    <p className="text-white/80 text-xs font-display-bold leading-snug">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        <SectionBlurEdges />
      </section>
    </>
  );
}
