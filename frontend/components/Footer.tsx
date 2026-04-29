"use client";

import Link from "next/link";
import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <span className="site-footer__brand">Cosmic Flow</span>
      <span className="site-footer__copy">&copy; {year} All rights reserved</span>
      <Link className="site-footer__link" href="/inner-solar-system-model">
        Inner Solar System Model
      </Link>
      <span className="site-footer__authors">Dawid Zwolak &amp; Miko&#322;aj Sosi&#324;ski</span>
    </footer>
  );
}
