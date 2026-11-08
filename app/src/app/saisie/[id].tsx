import { calculer, ecrituresActives } from '@bankvi/moteur';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonDestructif, BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampMontant } from '@/composants/Champs';
import { Ecran } from '@/composants/Ecran';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { FeuilleCategorie, FeuilleDate, FeuillePoche } from '@/composants/Feuilles';
import { dateCourteJour, dateLongueJour, heure } from '@/format/date';
import { fcfa } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import type { NomIcone } from '@/icones/chemins';
import { AUJOURDHUI } from '@/parcours/store';
import { defaire, defaireRemplacement, noter, remplacer } from '@/registre/actions';
import { categorie } from '@/registre/categories';
import { heureDe, pocheDansPhrase, useEtat } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

/** EC-18 Détail d'une saisie : tout reste modifiable, une suppression s'annule. */
export default function DetailSaisie() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const registre = useRegistre();
  const etat = useEtat();

  // L'état complet : il contient aussi les comptages du premier lancement, qui ne sont pas au registre.
  const ecriture = ecrituresActives(etat.ecritures).find((e) => e.id === id);
  const prevu = registre.prevus.find((p) => p.prevu.id === id);
  const nonDetaille = registre.nonDetailles.find((n) => n.id === id);
  const nomPoche = (p: string) => etat.poches.find((x) => x.id === p)?.nom ?? p;

  if (nonDetaille) {
    return (
      <Ecran
        titre={t('ec18.nonDetailleTitre')}
        marge={size.gutterList}
        pied={<BoutonPrincipal libelle={t('ec18.detailler')} onPress={() => router.replace({ pathname: '/noter', params: { date: nonDetaille.at.slice(0, 10) } })} />}
      >
        <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>
          {t('ec18.nonDetaille', { montant: fcfa(nonDetaille.montant), depuis: dateLongueJour(nonDetaille.depuis).toLowerCase() })}
        </Text>
      </Ecran>
    );
  }

  if (ecriture?.type === 'comptage') {
    return (
      <Ecran
        titre={t('ec18.comptageTitre')}
        marge={size.gutterList}
        pied={<BoutonPrincipal libelle={t('ec18.compterNouveau')} onPress={() => router.replace('/bilan/compter')} />}
      >
        <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>
          {t('ec18.comptage', { montant: fcfa(ecriture.montant), poche: pocheDansPhrase(ecriture.poche, nomPoche(ecriture.poche)), date: dateLongueJour(ecriture.at.slice(0, 10)).toLowerCase() })}
        </Text>
      </Ecran>
    );
  }

  if (ecriture?.type === 'transfert') return <DetailTransfert id={ecriture.id} />;

  if (ecriture && (ecriture.type === 'depense' || ecriture.type === 'revenu')) {
    return (
      <Formulaire
        key={ecriture.id}
        id={ecriture.id}
        sens={ecriture.type}
        depart={{
          montant: ecriture.montant,
          date: ecriture.at.slice(0, 10),
          poche: ecriture.poche,
          categorie: ecriture.categorie ?? '',
          description: registre.meta[ecriture.id]?.description ?? '',
        }}
        at={ecriture.at}
      />
    );
  }

  if (prevu) {
    return (
      <Formulaire
        key={prevu.prevu.id}
        id={prevu.prevu.id}
        sens={prevu.sens}
        prevu
        depart={{
          montant: prevu.prevu.montant,
          date: prevu.prevu.rythme === 'une-fois' ? prevu.prevu.date : AUJOURDHUI,
          poche: prevu.poche,
          categorie: prevu.categorie,
          description: prevu.meta.description ?? '',
        }}
      />
    );
  }

  return (
    <Ecran titre="" marge={size.gutterList}>
      <Text style={[type.bodyLarge, { color: colors.text.secondary }]}>{t('ec18.introuvable')}</Text>
    </Ecran>
  );
}

interface Valeurs {
  montant: number | null;
  date: string;
  poche: string;
  categorie: string;
  description: string;
}

function Formulaire({ id, sens, depart, at, prevu = false }: { id: string; sens: 'depense' | 'revenu'; depart: Valeurs; at?: string; prevu?: boolean }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const registre = useRegistre();
  const etat = useEtat();
  const [v, setV] = useState<Valeurs>(depart);
  const [feuille, setFeuille] = useState<'date' | 'poche' | 'categorie' | 'groupe' | null>(null);
  const [action, setAction] = useState<'enregistrer' | 'supprimer'>('enregistrer');
  const meta = prevu ? registre.prevus.find((p) => p.prevu.id === id)?.meta : registre.meta[id];
  const groupe = meta?.groupe
    ? ecrituresActives(registre.ecritures).filter((e) => registre.meta[e.id]?.groupe === meta.groupe).map((e) => e.id)
    : [];
  const prevusDuGroupe = meta?.groupe ? registre.prevus.filter((p) => p.meta.groupe === meta.groupe).map((p) => p.prevu.id) : [];
  const tailleGroupe = groupe.length + prevusDuGroupe.length;

  const change = JSON.stringify(v) !== JSON.stringify(depart);
  const montantVide = v.montant === null || v.montant === 0;
  const soldes = calculer(etat).soldes;
  const poches = etat.poches.map((p) => ({ id: p.id, nom: p.nom, solde: soldes[p.id] ?? 0 }));
  const c = categorie(v.categorie);
  const { h, m } = heureDe(at ?? `${AUJOURDHUI}T00:00`);
  const origine = meta?.origine === 'suggestion' ? 'ec18.origineSuggestion' : meta?.origine === 'bilan' ? 'ec18.origineBilan' : 'ec18.origineToi';

  /** Applique à une écriture réelle ; une date future la transforme en ligne prévue. */
  const appliquerA = (cible: string): (() => void) | undefined => {
    if (v.date > AUJOURDHUI) {
      const trace = noter({ sens, montant: v.montant ?? 0, categorie: v.categorie, poche: v.poche, description: v.description, dates: [v.date], origine: meta?.origine ?? 'toi' });
      useRegistre.getState().annuler([cible]);
      return () => {
        defaire(trace);
        useRegistre.getState().retablir([cible]);
      };
    }
    const memeJour = v.date === depart.date && at;
    const nouvelle = remplacer(
      cible,
      { montant: v.montant ?? 0, poche: v.poche, categorie: v.categorie, at: memeJour ? at : `${v.date}T12:00` },
      { description: v.description },
    );
    return nouvelle ? () => defaireRemplacement(cible, nouvelle) : undefined;
  };

  const enregistrer = (tous: boolean) => {
    if (prevu) {
      // Une ligne prévue passée à une date d'aujourd'hui ou d'avant devient réelle.
      const r = useRegistre.getState();
      if (v.date <= AUJOURDHUI) {
        realiser(v.date);
        return;
      }
      r.modifier({
        prevus: r.prevus.map((p) =>
          p.prevu.id === id
            ? { ...p, prevu: { ...p.prevu, montant: v.montant ?? 0, date: v.date, nom: v.description || categorie(v.categorie)?.nom || '' } as typeof p.prevu, categorie: v.categorie, poche: v.poche, meta: { ...p.meta, description: v.description } }
            : p,
        ),
      });
      router.back();
      annoncer(t('saisie.modifiee'));
      return;
    }
    const cibles = tous ? groupe : [id];
    const defaires = cibles.map((x) => appliquerA(x)).filter((f): f is () => void => !!f);
    router.back();
    annoncer(t('saisie.modifiee'), () => defaires.forEach((f) => f()));
  };

  const supprimer = (tous: boolean) => {
    const r = useRegistre.getState();
    if (prevu) {
      const ids = tous ? prevusDuGroupe : [id];
      const retires = r.prevus.filter((p) => ids.includes(p.prevu.id));
      r.modifier({ prevus: r.prevus.filter((p) => !ids.includes(p.prevu.id)) });
      router.back();
      annoncer(t('saisie.supprimee'), () => useRegistre.getState().modifier({ prevus: [...useRegistre.getState().prevus, ...retires] }));
      return;
    }
    const ids = tous ? groupe : [id];
    r.annuler(ids);
    router.back();
    // Immédiat, sans confirmation : « Annuler » pendant 10 s.
    annoncer(t('saisie.supprimee'), () => useRegistre.getState().retablir(ids));
  };

  /** « C'est fait » : la ligne prévue devient réelle, à la date d'aujourd'hui. */
  const realiser = (date: string) => {
    const r = useRegistre.getState();
    const p = r.prevus.find((x) => x.prevu.id === id);
    r.modifier({ prevus: r.prevus.filter((x) => x.prevu.id !== id) });
    const trace = noter({ sens, montant: v.montant ?? 0, categorie: v.categorie, poche: v.poche, description: v.description, dates: [date], origine: 'toi' });
    router.back();
    annoncer(t(sens === 'depense' ? 'saisie.notee' : 'saisie.noteeRevenu'), () => {
      defaire(trace);
      if (p) useRegistre.getState().modifier({ prevus: [...useRegistre.getState().prevus, p] });
    });
  };

  const demander = (a: 'enregistrer' | 'supprimer') => {
    if (tailleGroupe > 1) {
      setAction(a);
      setFeuille('groupe');
    } else if (a === 'enregistrer') enregistrer(false);
    else supprimer(false);
  };

  return (
    <>
      <Ecran
        titre={sens === 'depense' ? t('saisie.depense') : t('saisie.revenu')}
        marge={size.gutterList}
        pied={
          <>
            <BoutonPrincipal libelle={t('ec18.enregistrer')} desactive={!change || montantVide} onPress={() => demander('enregistrer')} />
            <BoutonDestructif libelle={t('ec18.supprimer')} onPress={() => demander('supprimer')} />
          </>
        }
      >
        <ChampMontant
          libelle={t('ec18.montant')}
          unite={t('commun.fcfa')}
          valeur={v.montant}
          onValeur={(montant) => setV({ ...v, montant })}
          message={montantVide ? { texte: t('ec18.montantVide'), erreur: true } : undefined}
        />
        <View style={styles.lignes}>
          <Ligne icone="calendar_month" nom={t('ec18.date')} valeur={dateCourteJour(v.date)} onPress={() => setFeuille('date')} />
          <Ligne icone="account_balance_wallet" nom={t('ec18.poche')} valeur={poches.find((p) => p.id === v.poche)?.nom ?? v.poche} onPress={() => setFeuille('poche')} />
          <Ligne icone={c?.icone ?? 'receipt_long'} nom={t('ec18.categorie')} valeur={c?.nom ?? ''} onPress={() => setFeuille('categorie')} />
          <View style={styles.ligne}>
            <Icone nom="edit" couleur={colors.text.secondary} />
            <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{t('ec18.description')}</Text>
            <TextInput
              value={v.description}
              onChangeText={(description) => setV({ ...v, description })}
              accessibilityLabel={t('ec18.description')}
              maxLength={40}
              cursorColor={colors.border.focus}
              style={[type.bodyLarge, styles.saisieDescription, { color: colors.text.secondary }]}
            />
          </View>
        </View>
        {prevu ? (
          <View style={styles.prevu}>
            <Text style={[type.caption, { color: colors.text.secondary }]}>{t('saisie.prevu')}</Text>
            <BoutonTexte libelle={t('ec18.cEstFait')} onPress={() => realiser(AUJOURDHUI)} />
          </View>
        ) : (
          <Text style={[type.caption, styles.origine, { color: colors.text.secondary }]}>{t(origine, { heure: heure(h, m) })}</Text>
        )}
        {tailleGroupe > 1 ? (
          <View style={styles.groupe}>
            <Icone nom="link" couleur={colors.text.secondary} taille={16} />
            <Text style={[type.caption, { color: colors.text.secondary }]}>{t('ec18.groupe', { count: tailleGroupe })}</Text>
          </View>
        ) : null}
      </Ecran>

      <FeuilleDate visible={feuille === 'date'} date={v.date} onFermer={() => setFeuille(null)} onChoix={(date) => { setV({ ...v, date }); setFeuille(null); }} />
      <FeuillePoche
        visible={feuille === 'poche'}
        titre={t('ec18.poche')}
        poches={poches}
        actuelle={v.poche}
        onFermer={() => setFeuille(null)}
        onChoix={(poche) => {
          setV({ ...v, poche });
          setFeuille(null);
        }}
      />
      <FeuilleCategorie
        visible={feuille === 'categorie'}
        sens={sens}
        actuelle={v.categorie}
        onFermer={() => setFeuille(null)}
        onChoix={(cat) => {
          setV({ ...v, categorie: cat });
          setFeuille(null);
        }}
      />
      <FeuilleBasse visible={feuille === 'groupe'} titre={t('ec18.quoi')} onFermer={() => setFeuille(null)}>
        <View style={styles.choixGroupe}>
          <BoutonTexte
            libelle={t('ec18.seulement')}
            onPress={() => {
              setFeuille(null);
              if (action === 'enregistrer') enregistrer(false);
              else supprimer(false);
            }}
          />
          <BoutonTexte
            libelle={t('ec18.toutes', { count: tailleGroupe })}
            onPress={() => {
              setFeuille(null);
              if (action === 'enregistrer') enregistrer(true);
              else supprimer(true);
            }}
          />
        </View>
      </FeuilleBasse>
    </>
  );
}

function Ligne({ icone, nom, valeur, onPress }: { icone: NomIcone; nom: string; valeur: string; onPress: () => void }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('ec18.ligne', { nom, valeur })}
      android_ripple={{ color: colors.action.ripple }}
      style={styles.ligne}
    >
      <Icone nom={icone} couleur={colors.text.secondary} />
      <Text style={[type.bodyLarge, { color: colors.text.primary }]}>{nom}</Text>
      <Text style={[type.bodyLarge, styles.valeur, { color: colors.text.secondary }]} numberOfLines={1}>
        {valeur}
      </Text>
      <Icone nom="chevron_right" couleur={colors.text.secondary} taille={size.iconSmall} />
    </Pressable>
  );
}

/** Un transfert se corrige comme une saisie : montant et frais. */
function DetailTransfert({ id }: { id: string }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const registre = useRegistre();
  const etat = useEtat();
  const e = registre.ecritures.find((x) => x.id === id);
  const [montant, setMontant] = useState<number | null>(e?.type === 'transfert' ? e.montant : null);
  const [frais, setFrais] = useState<number | null>(e?.type === 'transfert' ? e.frais : null);
  if (e?.type !== 'transfert') return null;
  const nom = (p: string) => etat.poches.find((x) => x.id === p)?.nom ?? p;
  const change = montant !== e.montant || (frais ?? 0) !== e.frais;
  const vide = !montant;

  return (
    <Ecran
      titre={t('ec18.transfertTitre')}
      marge={size.gutterList}
      pied={
        <>
          <BoutonPrincipal
            libelle={t('ec18.enregistrer')}
            desactive={!change || vide}
            onPress={() => {
              const nouvelle = remplacer(id, { montant: montant ?? 0, frais: frais ?? 0 });
              router.back();
              if (nouvelle) annoncer(t('saisie.modifiee'), () => defaireRemplacement(id, nouvelle));
            }}
          />
          <BoutonDestructif
            libelle={t('ec18.supprimer')}
            onPress={() => {
              useRegistre.getState().annuler([id]);
              router.back();
              annoncer(t('saisie.supprimee'), () => useRegistre.getState().retablir([id]));
            }}
          />
        </>
      }
    >
      <Text style={[type.bodyLarge, styles.ligneTexte, { color: colors.text.primary }]}>{t('ec22.inverse', { de: nom(e.de), vers: nom(e.vers) })}</Text>
      <ChampMontant libelle={t('ec22.montant')} unite={t('commun.fcfa')} valeur={montant} onValeur={setMontant} message={vide ? { texte: t('ec18.montantVide'), erreur: true } : undefined} />
      <View style={styles.espace} />
      <ChampMontant libelle={t('ec22.frais')} unite={t('commun.fcfa')} valeur={frais} onValeur={setFrais} />
    </Ecran>
  );
}

const styles = StyleSheet.create({
  lignes: { marginTop: space.s3 },
  ligne: { minHeight: size.rowOne, flexDirection: 'row', alignItems: 'center', columnGap: space.s4 },
  valeur: { flex: 1, textAlign: 'right' },
  saisieDescription: { flex: 1, textAlign: 'right', paddingVertical: 0 },
  origine: { marginTop: space.s1 },
  prevu: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  groupe: { flexDirection: 'row', alignItems: 'center', columnGap: space.s1, marginTop: space.s2 },
  choixGroupe: { rowGap: space.s1 },
  ligneTexte: { marginBottom: space.s4 },
  espace: { height: space.s4 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
