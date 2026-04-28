"use client";

import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <span className="site-footer__brand">Cosmic Flow</span>
      <span className="site-footer__copy">© {year} All rights reserved</span>
      <span className="site-footer__authors">Dawid Zwolak &amp; Mikołaj Sosiński</span>
    </footer>
  );
}
