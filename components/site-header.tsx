import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-mark">
          <span className="brand-orb" />
          <span>NeuroBalance</span>
        </Link>

        <nav className="header-nav" aria-label="Principal">
          <Link href="#tomos">Tomos</Link>
          <Link href="#compra">Compra</Link>
          <Link href="#faq">FAQ</Link>
          <a
            className="button-secondary header-whatsapp"
            href="https://wa.me/5490000000000"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
