import { calculer, horizon, simuler, type Etat, type PointHorizon } from '@bankvi/moteur';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Keyboard, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampMontant, type RefSaisie } from '@/composants/Champs';
import { Puce, PuceMenu } from '@/composants/Choix';
import { BandeauEtat, Bulle } from '@/composants/Contenu';
import { Courbe } from '@/composants/Courbe';
import { Ecran } from '@/composants/Ecran';
import { FeuilleDate, FeuillePoche } from '@/composants/Feuilles';
import { dateCourte, dateLongue, jourDansPhrase } from '@/format/date';
import { fcfa } from '@/format/montant';
import { AUJOURDHUI, useParcours } from '@/parcours/store';
import { decaler, useEtat } from '@/registre/etat';
import { ESSAIS_OFFERTS, nouvelId, useRegistre, type PrevuSaisi } from '@/registre/store';
import { motion, size, space, type, useTheme } from '@/theme';

const LIMITE = decaler(AUJOURDHUI, 90);

interface Simulation {
  montant: number;
  date: string;
  poche: string;
}

/** EC-25 Puis-je me permettre ça ? Une simulation sur une copie : rien n'est enregistré. */
export default function PuisJe() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const etat = useEtat();
  const pass = useRegistre((r) => r.pass);
  const essais = useRegistre((r) => r.essais);
  const refMontant = useRef<RefSaisie>(null);

  // Sans pass, une fois les essais utilisés, l'écran décrit la fonction (décidé à l'ouverture).
  const [bloque] = useState(() => !pass && essais >= ESSAIS_OFFERTS);
  const [montant, setMontant] = useState<number | null>(null);
  const [date, setDate] = useState(AUJOURDHUI);
  const [poche, setPoche] = useState(() => etat.poches.find((p) => p.genre === 'perso')?.id ?? 'especes');
  const [feuille, setFeuille] = useState<'date' | 'poche' | null>(null);
  const [resultat, setResultat] = useState<Simulation | null>(null);

  if (bloque) return <Description />;

  const valide = montant !== null && montant > 0;
  const solde = calculer(etat).soldes;
  const poches = etat.poches.map((p) => ({ id: p.id, nom: p.nom, solde: solde[p.id] ?? 0 }));
  const nomPoche = poches.find((p) => p.id === poche)?.nom ?? '';
  const raccourcis = [
    { d: AUJOURDHUI, l: t('ec25.aujourdhui') },
    { d: decaler(AUJOURDHUI, 1), l: t('ec25.demain') },
  ];
  const autre = !raccourcis.some((r) => r.d === date);

  const voir = () => {
    if (!valide) return;
    // Un essai compte au toucher de « Voir la conséquence », même après « Modifier ».
    if (!pass) useRegistre.getState().modifier({ essais: useRegistre.getState().essais + 1 });
    Keyboard.dismiss();
    setResultat({ montant, date, poche });
  };

  if (resultat) {
    return (
      <Resultat
        simulation={resultat}
        etat={etat}
        pass={pass}
        onModifier={() => {
          setResultat(null);
          setTimeout(() => refMontant.current?.focus(), 100);
        }}
      />
    );
  }

  const restants = Math.max(0, ESSAIS_OFFERTS - essais);
  return (
    <>
      <Ecran
        titre={t('ec25.titre')}
        fermer
        marge={size.gutterList}
        pied={
          <>
            <BoutonPrincipal libelle={t('ec25.voir')} desactive={!valide} onPress={voir} />
            {!pass ? <Text style={[type.caption, styles.centre, { color: colors.text.secondary }]}>{t('ec23.essais', { count: restants })}</Text> : null}
          </>
        }
      >
        <ChampMontant ref={refMontant} libelle={t('ec25.montant')} unite={t('commun.fcfa')} valeur={montant} onValeur={setMontant} autoFocus />
        <View style={styles.rangee}>
          {raccourcis.map((r) => (
            <Puce key={r.d} role="radio" libelle={r.l} choisie={date === r.d} onPress={() => setDate(r.d)} />
          ))}
          {autre ? <Puce role="radio" libelle={dateCourte(date)} choisie onPress={() => setFeuille('date')} /> : null}
          <Puce libelle={t('ec25.autreDate')} onPress={() => setFeuille('date')} />
        </View>
        <View style={styles.rangee}>
          <PuceMenu libelle={nomPoche} icone={poche === 'especes' ? 'payments' : 'account_balance_wallet'} onPress={() => setFeuille('poche')} />
        </View>
      </Ecran>
      <FeuilleDate
        visible={feuille === 'date'}
        date={date}
        min={AUJOURDHUI}
        max={LIMITE}
        onChoix={(d) => {
          setDate(d);
          setFeuille(null);
        }}
        onFermer={() => setFeuille(null)}
      />
      <FeuillePoche
        visible={feuille === 'poche'}
        titre={t('ec25.poche')}
        poches={poches}
        actuelle={poche}
        onFermer={() => setFeuille(null)}
        onChoix={(id) => {
          setPoche(id);
          setFeuille(null);
        }}
      />
    </>
  );
}

function Resultat({ simulation, etat, pass, onModifier }: { simulation: Simulation; etat: Etat; pass: boolean; onModifier: () => void }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const parcours = useParcours();
  const essais = useRegistre((r) => r.essais);
  const { montant, date, poche } = simulation;

  const r = useMemo(() => {
    const activite = etat.poches.find((p) => p.id === poche)?.genre === 'activite';
    const copie: Etat = activite
      ? etat
      : { ...etat, prevus: [...etat.prevus, { id: '__simulation', nom: 'Simulation', montant, sens: 'sortie', rythme: 'une-fois', date }] };
    const n = date <= decaler(AUJOURDHUI, 30) ? 30 : 90;
    const sim = simuler(etat, { montant, date });
    const sans = horizon(etat, n).points;
    const avec = horizon(copie, n).points;
    const variable = parcours.typeRevenu === 'variable';

    let phrase: string;
    let manque = false;
    if (activite) phrase = t('ec25.activite');
    else if (sim.avantReferenceInchange && sim.ensuite) {
      const fin = jourDansPhrase(sim.ensuite.jusqua, AUJOURDHUI);
      phrase = `${t('ec25.inchange', { jour: jourDansPhrase(sim.jusqua, AUJOURDHUI) })} ${
        sim.ensuite.manque !== undefined
          ? t('ec25.ensuiteManque', { montant: fcfa(sim.ensuite.manque), fin })
          : t('ec25.ensuite', { montant: fcfa(sim.ensuite.chiffre), fin })
      }`;
      manque = sim.ensuite.manque !== undefined;
    } else if (sim.manque) {
      phrase = t('ec25.manquerait', { montant: fcfa(sim.manque.montant), jour: jourDansPhrase(sim.manque.date, AUJOURDHUI) });
      manque = true;
    } else {
      const valeurs = { montant: fcfa(sim.apres), jour: jourDansPhrase(sim.jusqua, AUJOURDHUI), plancher: fcfa(parcours.montantRevenu ?? 0) };
      phrase = variable ? t('ec25.resteraitVariable', valeurs) : t('ec25.resterait', valeurs);
    }
    return { phrase, manque, sans, avec };
  }, [etat, montant, date, poche, parcours, t]);

  // La réponse est annoncée dès qu'elle paraît.
  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(r.phrase);
  }, [r.phrase]);

  const quand =
    date === AUJOURDHUI ? t('ec25.quandAujourdhui') : date === decaler(AUJOURDHUI, 1) ? t('ec25.quandDemain') : t('ec25.quandLe', { jour: jourDansPhrase(date, AUJOURDHUI) });
  const restants = Math.max(0, ESSAIS_OFFERTS - essais);

  const ajouter = () => {
    const saisi: PrevuSaisi = {
      prevu: { id: nouvelId('p'), nom: t('ec25.nomPrevu'), montant, sens: 'sortie', rythme: 'une-fois', date },
      sens: 'depense',
      categorie: 'imprevus',
      poche,
      meta: { origine: 'toi' },
    };
    const reg = useRegistre.getState();
    reg.modifier({ prevus: [...reg.prevus, saisi] });
    router.back();
    annoncer(t('ec25.ajoute'), () => {
      const s = useRegistre.getState();
      s.modifier({ prevus: s.prevus.filter((p) => p.prevu.id !== saisi.prevu.id) });
    });
  };

  return (
    <Ecran
      titre={t('ec25.titre')}
      fermer
      marge={size.gutterList}
      pied={
        <>
          <BoutonPrincipal libelle={t('ec25.ajouter')} onPress={ajouter} />
          {!pass ? (
            <Text style={[type.caption, styles.centre, { color: colors.text.secondary }]}>
              {restants > 0 ? t('ec25.resteEssais', { count: restants }) : t('ec25.dernierEssai')}
            </Text>
          ) : null}
        </>
      }
    >
      <View style={styles.rappel}>
        <Text style={[type.bodyStrong, styles.tabulaire, styles.flex, { color: colors.text.primary }]}>{t('ec25.rappel', { montant: fcfa(montant), quand })}</Text>
        <View style={styles.modifier}>
          <BoutonTexte libelle={t('ec25.modifier')} onPress={onModifier} />
        </View>
      </View>
      <Animated.View entering={FadeIn.duration(motion.standard)} style={styles.reponse} accessibilityLiveRegion="polite">
        {r.manque ? <BandeauEtat variante="attention" texte={r.phrase} /> : <Bulle texte={r.phrase} />}
      </Animated.View>
      <Legende sans={t('ec25.sans')} avec={t('ec25.avec')} />
      <Courbe
        points={r.avec}
        comparaison={{ points: r.sans, nom: t('ec25.sans'), nomPrevu: t('ec25.avec') }}
        lecture={lecture(r.avec, r.sans, t)}
      />
      <Text style={[type.caption, styles.mention, { color: colors.text.secondary }]}>{t('ec25.mention')}</Text>
    </Ecran>
  );
}

/** Deux séries : un trait court et un nom ; jamais la seule couleur. */
function Legende({ sans, avec }: { sans: string; avec: string }) {
  const { colors } = useTheme();
  const echantillon = (pointille: boolean, couleur: string) => (
    <Svg width={20} height={8}>
      <Line x1={1} x2={19} y1={4} y2={4} stroke={couleur} strokeWidth={2} strokeLinecap="round" {...(pointille ? { strokeDasharray: '6 4' } : {})} />
    </Svg>
  );
  return (
    <View style={styles.legende} importantForAccessibility="no-hide-descendants">
      <View style={styles.serie}>
        {echantillon(false, colors.chart.zero)}
        <Text style={[type.caption, { color: colors.text.secondary }]}>{sans}</Text>
      </View>
      <View style={styles.serie}>
        {echantillon(true, colors.chart.line)}
        <Text style={[type.caption, { color: colors.text.secondary }]}>{avec}</Text>
      </View>
    </View>
  );
}

/** Sans pass, essais utilisés : la description de la fonction, sans lien ni bouton d'achat. */
function Description() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <Ecran
      fermer
      marge={size.gutterList}
      pied={
        <>
          <BoutonPrincipal libelle={t('ec25.fermer')} onPress={() => router.back()} />
          <BoutonTexte libelle={t('ec25.voirPass')} onPress={() => router.push('/pass-plus' as any)} />
        </>
      }
    >
      <View style={styles.description}>
        <Text style={[type.title, { color: colors.text.primary }]} accessibilityRole="header">
          {t('ec25.titre')}
        </Text>
        <Text style={[type.bodyLarge, { color: colors.text.secondary }]}>{t('ec25.description')}</Text>
        <View style={styles.exemple}>
          <Text style={[type.captionMedium, { color: colors.status.infoFg }]}>{t('ec25.exemple')}</Text>
          <Bulle texte={t('ec25.exempleTexte')} />
        </View>
        <Text style={[type.body, { color: colors.text.secondary }]}>{t('ec25.fonctionPass')}</Text>
      </View>
    </Ecran>
  );
}

function lecture(avec: PointHorizon[], sans: PointHorizon[], t: ReturnType<typeof useTranslation>['t']): string {
  const plusBas = (p: PointHorizon[]) => p.reduce((a, b) => (b.solde < a.solde ? b : a));
  const bas = plusBas(avec);
  return t('ec25.lecture', { debut: avec[0]!.solde, bas: bas.solde, dateBas: dateLongue(bas.date), basSans: plusBas(sans).solde });
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  centre: { textAlign: 'center' },
  rangee: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: space.s2, minHeight: 48 },
  rappel: { minHeight: 48, flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  modifier: { marginRight: -space.s3 },
  reponse: { marginTop: space.s2, marginBottom: space.s3 },
  legende: { flexDirection: 'row', flexWrap: 'wrap', columnGap: space.s4, rowGap: space.s1, marginBottom: space.s2 },
  serie: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2 },
  mention: { marginTop: space.s2 },
  description: { rowGap: space.s4, marginTop: space.s2 },
  exemple: { rowGap: space.s1 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
