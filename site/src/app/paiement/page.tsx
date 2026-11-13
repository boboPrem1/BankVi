'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { enregistrerSession, formaterFcfa, lireSession, OFFRES, type OffreId } from '@/lib/session';

/** W-03 Paiement : redirection et vérification via FedaPay sans toucher aux données sensibles. */
export default function PaiementPage() {
  const router = useRouter();
  const [offreId, setOffreId] = useState<OffreId>('30j');
  const [etape, setEtape] = useState<'envoi' | 'fedapay' | 'verification'>('envoi');

  useEffect(() => {
    const s = lireSession();
    if (s?.offre) setOffreId(s.offre);
    const t = setTimeout(() => setEtape('fedapay'), 1200);
    return () => clearTimeout(t);
  }, []);

  const offre = OFFRES[offreId];

  const simulerSucces = () => {
    setEtape('verification');
    enregistrerSession({
      offre: offreId,
      reference: `FP-${Math.floor(100000 + Math.random() * 900000)}`,
    });
    setTimeout(() => router.replace('/confirmation'), 900);
  };

  return (
    <>
      <header className="header">
        <span className="brand">BankVi</span>
      </header>

      {etape === 'envoi' || etape === 'verification' ? (
        <div style={{ textAlign: 'center' }} role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          <p style={{ fontSize: '16px', lineHeight: '24px', margin: '0 0 4px' }}>
            {etape === 'envoi' ? 'On t’envoie vers FedaPay.' : 'On vérifie ton paiement. Cela peut prendre quelques instants.'}
          </p>
          <p className="helper-text" style={{ marginBottom: '24px', fontVariantNumeric: 'tabular-nums' }}>
            {formaterFcfa(offre.prix)} · {offre.libelle}
          </p>
          <p style={{ fontSize: '12px', lineHeight: '16px', color: 'var(--text-secondary)' }}>
            Ne ferme pas cette page.
          </p>
        </div>
      ) : (
        <div className="fade-in" style={{ marginTop: '16px' }}>
          <h1 className="h1-title">FedaPay · Paiement sécurisé</h1>
          <p className="helper-text">
            {offre.libelle} · {formaterFcfa(offre.prix)} (Mixx, Flooz ou carte)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button type="button" className="btn-primary" onClick={simulerSucces}>
              Confirmer le paiement ({formaterFcfa(offre.prix)})
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => router.replace('/offres?erreur=interrompu')}
            >
              Annuler et revenir
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => router.replace('/offres?erreur=echoue')}
            >
              Simuler un échec
            </button>
          </div>
        </div>
      )}
    </>
  );
}

