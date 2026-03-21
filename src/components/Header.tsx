import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef(null);

  useEffect(() => {
    // Solo en desktop
    if (window.innerWidth >= 1024) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
      });

      if (headerRef.current) {
        observer.observe(headerRef.current);
      }

      return () => observer.disconnect();
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className={`z-40 fixed top-0 w-screen h-14 flex items-center justify-between px-4 lg:px-8 transition-all ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <div className="font-bold text-xl">Logo</div>

      {/* Nav Desktop */}
      <nav className="hidden lg:flex gap-8">{/* Items del nav */}</nav>

      {/* Burger Menu Mobile */}
      <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>

      {/* CTA Desktop */}
      <a href="#" className="hidden lg:block">
        Cotizar
      </a>

      {/* Nav Mobile Colapsado */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-14 left-0 w-full bg-white flex flex-col gap-4 p-4">
          <a href="#">Cotizar</a>
        </nav>
      )}
    </header>
  );
}
