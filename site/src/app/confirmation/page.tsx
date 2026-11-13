'use client';

import { useEffect, useState } from 'react';
import { formaterFcfa, formaterNumero, lireSession, OFFRES, type OffreId } from '@/lib/session';

/** W-04 Confirmation : confirmer le paiement sans ambiguïté, fournir un reçu, et ramener à l'app. */
export default function ConfirmationPage() {
  const [numero, setNumero] = useState('90123456');
  const [offreId, setOffreId] = useState<OffreId>('30j');
  const [reference, setReference] = useState('FP-482913');

  useEffect(() => {
    const s = lireSession();
    if (s) {
      setNumero(s.numero);
      setOffreId(s.offre);
      setReference(s.reference);
    }
  }, []);

  const offre = OFFRES[offreId];

  const telechargerRecu = () => {
    const contenu = [
      'BANKVI — REÇU DE PAIEMENT',
      `Offre : ${offre.libelle}`,
      `Montant : ${formaterFcfa(offre.prix)}`,
      'Date : Vendredi 6 novembre 2026',
      `Référence : ${reference}`,
      `Compte : ${formaterNumero(numero)}`,
      `Actif jusqu'au : ${offre.expiration}`,
    ].join('\n');

    const blob = new Blob([contenu], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recu-bankvi-${reference}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fade-in">
      <header className="header">
        <span className="brand">BankVi</span>
      </header>

      <div aria-hidden="true" style={{ fontSize: '40px', color: 'var(--text-link)', marginTop: '16px', lineHeight: 1 }}>
        ✓
      </div>

      <h1 className="h1-title">Ton Pass Plus est actif jusqu’au {offre.expiration}.</h1>
      <p style={{ fontSize: '16px', lineHeight: '24px', color: 'var(--text-secondary)', margin: '0 0 24px' }}>
        Retourne dans l’app.
      </p>

      <section className="receipt-card" aria-label="Reçu">
        <h2 className="receipt-title">Reçu</h2>
        <div className="receipt-row">
          <span>{offre.libelle}</span>
          <span>{formaterFcfa(offre.prix)}</span>
        </div>
        <div className="receipt-row">
          <span>Vendredi 6 novembre 2026</span>
        </div>
        <div className="receipt-row">
          <span>Référence : {reference}</span>
        </div>
        <div className="receipt-row">
          <span>{formaterNumero(numero)}</span>
        </div>
      </section>

      <div style={{ textAlign: 'center' }}>
        <button type="button" className="link-btn" onClick={telechargerRecu}>
          Télécharger le reçu
        </button>
      </div>
    </div>
  );
}

