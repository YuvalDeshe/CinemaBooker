"use client";

const posters = [
  // put images in /public/posters/ (or use external URLs you control)
  "/posters/inception.jpg",
  "/posters/getout.jpg",
  "/posters/superbad.jpg",
  "/posters/fightclub.jpeg",
  "/posters/lalaland.jpg",
  "/posters/interstellar.jpg",
  "/posters/spiritedaway.jpg",
  "/posters/oppenheimer.jpg",
];

function ReelRow({ reverse }: { reverse?: boolean }) {
  // duplicate for seamless loop
  const imgs = [...posters, ...posters];
  return (
    <div className={`reel-row ${reverse ? "reverse" : ""}`}>
      {imgs.map((src, i) => (
        <div key={src + i} className="reel-item">
          <img src={src} alt="" />
        </div>
      ))}

      <style jsx>{`
        .reel-row {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: scroll 40s linear infinite;
          opacity: 0.50; /* subtle */
          filter: grayscale(30%) blur(0.3px);
        }
        .reel-row.reverse {
          animation-direction: reverse;
        }
        .reel-item img {
          height: 180px;
          width: 120px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reel-row {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default function BackgroundReel() {
  return (
    <div className="reel-wrap">
      <div className="lane">
        <ReelRow />
      </div>
      <div className="lane">
        <ReelRow reverse />
      </div>

      {/* darken/blur overlay so text pops */}
      <div className="overlay" />

      <style jsx>{`
        .reel-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0; /* sits above page bg, below card */
          background: radial-gradient(
            ellipse at center,
            #0b1221 10%,
            #0b1221 60%,
            #0a0f1b 100%
          );
        }
        .lane {
          position: absolute;
          left: 0;
          right: 0;
          display: flex;
        }
        .lane:nth-child(1) {
          top: 18%;
        }
        .lane:nth-child(2) {
          top: 58%;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
              180deg,
              rgba(10, 14, 27, 0.9) 0%,
              rgba(10, 14, 27, 0.7) 40%,
              rgba(10, 14, 27, 0.92) 100%
            ),
            radial-gradient(1200px 400px at 50% 15%, rgba(0, 0, 0, 0.3), transparent 60%);
          backdrop-filter: blur(1px);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}