'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { enregistrerSession, formaterNumero, lireSession } from '@/lib/session';

const CODE_DEMO = '482913';
const MAX_ESSAIS = 5;
const DELAI_RENVOI = 60;

/** W-01 Connexion : rattacher l'achat au bon compte, avec le même numéro que dans l'app. */
export default function ConnexionPage() {
  const router = useRouter();
  const [numero, setNumero] = useState('');
  const [etape, setEtape] = useState<'numero' | 'code'>('numero');
  const [code, setCode] = useState('');
  const [essais, setEssais] = useState(0);
  const [restant, setRestant] = useState(DELAI_RENVOI);
  const saisi = useRef('');

  useEffect(() => {
    const existante = lireSession();
    if (existante?.numero) {
      router.replace('/offres');
    }
  }, [router]);

  useEffect(() => {
    if (etape !== 'code' || restant <= 0) return;
    const id = setTimeout(() => setRestant((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [etape, restant]);

  useEffect(() => {
    if (etape !== 'code') return;
    const id = setTimeout(() => {
      if (saisi.current === '') traiterCode(CODE_DEMO);
    }, 3500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etape]);

  const envoyerCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (numero.length !== 8) return;
    saisi.current = '';
    setCode('');
    setEssais(0);
    setRestant(DELAI_RENVOI);
    setEtape('code');
  };

  const traiterCode = (val: string) => {
    const propre = val.replace(/\D/g, '').slice(0, 6);
    saisi.current = propre;
    setCode(propre);
    if (propre.length < 6 || essais >= MAX_ESSAIS) return;
    if (propre === CODE_DEMO) {
      enregistrerSession({ numero, offre: '30j', reference: 'FP-482913' });
      router.push('/offres');
      return;
    }
    setEssais((n) => n + 1);
  };

  const bloque = essais >= MAX_ESSAIS;
  const erreurCode = !bloque && essais > 0 && code.length === 6;
  const formatNumero = numero.replace(/(\d{2})(?=\d)/g, '$1 ');

  return (
    <>
      <header className="header">
        <span className="brand">BankVi</span>
      </header>

      {etape === 'numero' ? (
        <form onSubmit={envoyerCode} noValidate>
          <h1 className="h1-title">Connecte-toi avec ton numéro</h1>
          <p className="helper-text">Le même que dans l’app.</p>

          <div className="field-group">
            <label htmlFor="tel" className="field-label">
              Ton numéro
            </label>
            <div className="phone-row">
              <span className="phone-prefix">+228</span>
              <input
                id="tel"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="90 12 34 56"
                value={formatNumero}
                onChange={(e) => setNumero(e.target.value.replace(/^\s*\+?228/, '').replace(/\D/g, '').slice(0, 8))}
                className="phone-input"
                autoFocus
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={numero.length !== 8}>
            Continuer
          </button>
        </form>
      ) : (
        <div className="otp-wrapper">
          <h1 className="h1-title">Entre le code reçu au {formaterNumero(numero)}</h1>
          <p className="helper-text">Vérification par SMS à 6 chiffres.</p>

          <div className="otp-grid">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const ch = code[i] ?? '';
              const active = i === code.length && !bloque;
              return (
                <div
                  key={i}
                  className={`otp-box${active ? ' active' : ''}${erreurCode || bloque ? ' error' : ''}`}
                  aria-hidden="true"
                >
                  {ch}
                </div>
              );
            })}
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={code}
              onChange={(e) => traiterCode(e.target.value)}
              disabled={bloque}
              aria-label={`Entre le code reçu au ${formaterNumero(numero)}`}
              className="otp-hidden-input"
              autoFocus
            />
          </div>

          <div role="status" aria-live="polite">
            {bloque ? (
              <p className="status-error">Trop d’essais. Réessaie dans 15 minutes.</p>
            ) : erreurCode ? (
              <p className="status-error">Ce code ne marche pas. Vérifie-le ou demande-en un autre.</p>
            ) : null}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start', marginTop: '12px' }}>
            {restant > 0 ? (
              <span className="helper-text" style={{ marginBottom: 0 }}>
                Renvoyer le code dans 0:{String(restant).padStart(2, '0')}
              </span>
            ) : (
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setRestant(DELAI_RENVOI);
                  setCode('');
                  saisi.current = '';
                }}
              >
                Renvoyer le code
              </button>
            )}
            <button
              type="button"
              className="link-btn"
              onClick={() => {
                setEtape('numero');
                setCode('');
                setEssais(0);
              }}
            >
              Modifier le numéro
            </button>
          </div>
        </div>
      )}
    </>
  );
}

