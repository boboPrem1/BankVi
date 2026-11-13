import Link from 'next/link';

export function Pied() {
  return (
    <footer className="footer">
      <span>BankVi</span>
      <span aria-hidden="true">·</span>
      <Link href="/conditions">Conditions</Link>
      <span aria-hidden="true">·</span>
      <Link href="/confidentialite">Confidentialité</Link>
      <span aria-hidden="true">·</span>
      <Link href="/contact">Contact</Link>
    </footer>
  );
}

