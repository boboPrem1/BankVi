import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <header className="header">
        <Link href="/" className="brand">
          BankVi
        </Link>
      </header>
      <h1 className="h1-title">Page introuvable</h1>
      <p className="helper-text">Cette page n’existe pas ou a été déplacée.</p>
      <Link href="/" className="link-btn">
        Retour à l’accueil
      </Link>
    </>
  );
}

