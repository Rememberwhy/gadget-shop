export default function Footer() {
  return (
    <footer className="bg-black text-lime-400 mt-auto shadow-inner relative z-20">
      {/* Matching green bar (7px) on top */}
      <div className="w-full h-[7px] bg-lime-400 shadow-[0_0_12px_#00FF88] animate-pulse" />

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm font-mono tracking-wide">
          &copy; {new Date().getFullYear()} <span className="text-white">HEX AMRIDI #1</span>. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/hex_amridi.1/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6 invert" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61575602764945"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6 invert" />
          </a>
        </div>
      </div>
    </footer>
  )
}
