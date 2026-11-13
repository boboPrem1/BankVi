import Link from 'next/link';

export default function ConditionsPage() {
  return (
    <>
      <header className="header">
        <Link href="/" className="brand">
          BankVi
        </Link>
      </header>
      <h1 className="h1-title">Conditions d’utilisation</h1>
      <p className="helper-text">
        Pass Plus donne accès à l’horizon à 90 jours, aux simulations illimitées « Puis-je me permettre ça ? »,
        à plusieurs recettes et aux exports mis en forme. Aucun renouvellement automatique caché.
      </p>
      <Link href="/" className="link-btn">
        Retour
      </Link>
    </>
  );
}

