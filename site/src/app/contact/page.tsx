import Link from 'next/link';

export default function ContactPage() {
  return (
    <>
      <header className="header">
        <Link href="/" className="brand">
          BankVi
        </Link>
      </header>
      <h1 className="h1-title">Contact</h1>
      <p className="helper-text">
        Une question sur un paiement ou un reçu ? Écris-nous à aide@bankvi.tg avec ta référence FedaPay.
      </p>
      <Link href="/" className="link-btn">
        Retour
      </Link>
    </>
  );
}

