'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import {
  enregistrerSession,
  formaterFcfa,
  formaterNumero,
  lireSession,
  OFFRES,
  type OffreId,
} from '@/lib/session';

const AVANTAGES = [
  'Horizon à 90 jours',
  '« Puis-je me permettre ça ? »',
  'Plusieurs recettes',
  'Exports mis en forme',
];

function OffresContenu() {
  const router = useRouter();
  const params = useSearchParams();
  const erreur = params.get('erreur');
  const statut = params.get('statut');

  const [numero, setNumero] = useState('90123456');
  const [offre, setOffre] = useState<OffreId>('30j');

  useEffect(() => {
    const s = lireSession();
    if (s?.numero) {
      setNumero(s.numero);
      if (s.offre) setOffre(s.offre);
    }
  }, []);

  const choisie = OFFRES[offre];
  const enAttente = statut === 'attente';

  const payer = () => {
    if (enAttente) return;
    enregistrerSession({ numero, offre });
    router.push('/paiement');
  };

  return (
    <>
      <header className="header">
        <span className="brand">BankVi</span>
        <span className="header-phone">{formaterNumero(numero)}</span>
      </header>

      <h1 className="h1-title">Choisis ton Pass Plus</h1>

      <div role="status" aria-live="polite">
        {erreur === 'interrompu' && (
          <p className="status-error">Paiement interrompu. Rien n’a été débité.</p>
        )}
        {erreur === 'echoue' && (
          <p className="status-error">Le paiement n’a pas abouti. Rien n’a été débité.</p>
        )}
        {enAttente && (
          <p className="status-info">Ton paiement est en cours de vérification. Ne paie pas une deuxième fois.</p>
        )}
      </div>

      <div role="radiogroup" aria-label="Durée du Pass Plus" className="offer-list">
        {(Object.keys(OFFRES) as OffreId[]).map((id) => {
          const item = OFFRES[id];
          const selected = offre === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={selected}
              className="offer-card"
              onClick={() => setOffre(id)}
            >
              <span className="offer-left">
                <span aria-hidden="true">{selected ? '◉' : '○'}</span>
                <span>{item.duree}</span>
              </span>
              <span className="offer-price">{formaterFcfa(item.prix)}</span>
            </button>
          );
        })}
      </div>

      <ul className="feature-list">
        {AVANTAGES.map((texte) => (
          <li key={texte} className="feature-item">
            <span className="check-icon" aria-hidden="true">
              ✓
            </span>
            <span>{texte}</span>
          </li>
        ))}
      </ul>

      <p className="helper-text" style={{ marginBottom: '12px' }}>
        Paiement sécurisé par FedaPay, avec Mixx, Flooz ou une carte.
      </p>

      <button type="button" className="btn-primary" disabled={enAttente} onClick={payer}>
        Payer {formaterFcfa(choisie.prix)}
      </button>
    </>
  );
}

/** W-02 Offres : choisir sa durée et voir le prix exact, sans mécanisme de pression. */
export default function OffresPage() {
  return (
    <Suspense fallback={null}>
      <OffresContenu />
    </Suspense>
  );
}

