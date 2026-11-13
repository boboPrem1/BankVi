import Link from 'next/link';

export default function ConfidentialitePage() {
  return (
    <>
      <header className="header">
        <Link href="/" className="brand">
          BankVi
        </Link>
      </header>
      <h1 className="h1-title">Politique de confidentialité</h1>
      <p className="helper-text">
        Le numéro saisi sert uniquement à rattacher ton Pass Plus à ton compte et à établir ton reçu.
        BankVi ne reçoit ni numéro de carte ni code mobile money.
      </p>
      <Link href="/" className="link-btn">
        Retour
      </Link>
    </>
  );
}

