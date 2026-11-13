import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampMontant } from '@/composants/Champs';
import { RangeePuces } from '@/composants/Choix';
import { Bulle, BulleUtilisateur } from '@/composants/Contenu';
import { Ecran } from '@/composants/Ecran';
import { FeuilleBasse } from '@/composants/FeuilleBasse';
import { cleSuggestion, FeuillePourquoiSuggestion, type SuggestionInfo } from '@/composants/Partages';
import { nomJour } from '@/format/date';
import { fcfa, nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { AUJOURDHUI } from '@/parcours/store';
import { dejaNote, dernierComptage, ecartActuel } from '@/registre/bilan';
import { categorie, natureDe } from '@/registre/categories';
import { minuteAvant, suggestions, useEtat } from '@/registre/etat';
import { nouvelId, useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

interface PuceEcart {
  cle: string;
  categorie: string;
  description?: string;
  montant: number | null;
  choisie: boolean;
}

/** Catégories courantes, sans montant, quand il n'y a pas encore d'habitudes. */
const COURANTES = ['transport', 'dejeuner', 'credit'];
const PLUS = ['revenuNonNote', 'depenseEnTrop', 'nonDetaille'] as const;

/** EC-20 Bilan : écart. L'app propose, l'utilisateur touche, le reste peut rester « Non détaillé ». */
export default function Ecart() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const etat = useEtat();
  const registre = useRegistre();
  const bilan = registre.bilan;

  const ecart = bilan ? ecartActuel(etat, bilan) : 0;
  const note = bilan ? dejaNote(etat, bilan) : 0;
  const especesComptees = bilan?.compte.especes ?? 0;
  const depuis = bilan ? dernierComptage(etat, 'especes', bilan.at) : undefined;
  const plusieursJours = !!depuis && depuis.slice(0, 10) < AUJOURDHUI && bilan !== null;

  // Les puces se calculent une fois, à l'arrivée.
  const [habitudes] = useState(() => (bilan ? suggestions(registre.ecritures, registre.meta, 'depense', bilan.at) : []));
  const [puces, setPuces] = useState<PuceEcart[]>(() => {
    // Présélection de 0,7 à 0,95, seulement tant que leur somme tient dans l'écart.
    let somme = 0;
    return habitudes.length > 0
      ? habitudes
          .filter((s) => s.montant <= Math.max(0, ecart))
          .map((s, i) => {
            const choisie = s.confiance >= 0.7 && somme + s.montant <= ecart;
            if (choisie) somme += s.montant;
            return { cle: `h${i}`, categorie: s.categorie, ...(s.description ? { description: s.description } : {}), montant: s.montant, choisie };
          })
      : COURANTES.map((c) => ({ cle: c, categorie: c, montant: null, choisie: false }));
  });
  const [plus, setPlus] = useState<(typeof PLUS)[number] | null>(null);
  const [ajuster, setAjuster] = useState<{ cle: string; montant: number | null } | null>(null);
  const [pourquoi, setPourquoi] = useState<SuggestionInfo | null>(null);

  const detaille = puces.filter((p) => p.choisie && p.montant).reduce((s, p) => s + (p.montant ?? 0), 0);
  const reste = ecart - detaille;
  const depasse = ecart > 0 && reste < 0;

  useEffect(() => {
    if (ecart > 0) AccessibilityInfo.announceForAccessibility(depasse ? t('ec20.depasse', { montant: fcfa(-reste) }) : t('ec20.reste', { montant: fcfa(reste) }));
  }, [reste, depasse, ecart, t]);

  if (!bilan) return null;

  const message =
    ecart === 0
      ? t('ec20.nul')
      : ecart < 0
        ? t('ec20.plus', { montant: fcfa(-ecart) })
        : plusieursJours
          ? t('ec20.depuis', { jour: nomJour(depuis!.slice(0, 10)), reste: fcfa(ecart) })
          : habitudes.length === 0
            ? t('ec20.sansHabitude', { reste: fcfa(ecart) })
            : note > 0
              ? t('ec20.moins', { note: fcfa(note), reste: fcfa(ecart) })
              : t('ec20.moinsSansNote', { reste: fcfa(ecart) });

  const toucher = (p: PuceEcart) => {
    // Une catégorie sans montant demande d'abord le montant.
    if (!p.montant) {
      setAjuster({ cle: p.cle, montant: null });
      return;
    }
    setPuces(puces.map((x) => (x.cle === p.cle ? { ...x, choisie: !x.choisie } : x)));
  };

  const valider = (toutLaisser: boolean) => {
    const r = useRegistre.getState();
    const at = minuteAvant(bilan.at);
    const choisies = toutLaisser || ecart <= 0 ? [] : puces.filter((p) => p.choisie && p.montant);
    // Ces dépenses se placent juste avant le comptage : elles détaillent l'écart sans changer le solde compté.
    r.ecrire(
      choisies.map((p) => ({
        ecriture: { at, type: 'depense' as const, poche: 'especes', montant: p.montant ?? 0, categorie: p.categorie, ...(natureDe(p.categorie) ? { nature: natureDe(p.categorie) } : {}) },
        meta: { origine: 'bilan' as const, ...(p.description ? { description: p.description } : {}) },
      })),
    );
    const nonDetaille = ecart > 0 ? (toutLaisser ? ecart : reste) : 0;
    r.modifier({
      bilan: { ...bilan, ecart, termine: true },
      statutVu: false,
      nonDetailles: nonDetaille > 0 ? [...r.nonDetailles, { id: nouvelId('nd'), at: bilan.at, montant: nonDetaille, depuis: (depuis ?? bilan.at).slice(0, 10) }] : r.nonDetailles,
    });
    router.push('/bilan/resultat');
  };

  return (
    <>
      <Ecran
        titre={t('ec19.titre')}
        marge={size.gutterList}
        pied={
          <>
            <BoutonPrincipal libelle={t('ec20.valider')} desactive={depasse} onPress={() => valider(false)} />
            {ecart > 0 ? <BoutonTexte libelle={t('ec20.toutLaisser')} onPress={() => valider(true)} /> : null}
          </>
        }
      >
        <View style={styles.conversation}>
          <Animated.View entering={FadeIn.duration(200)}>
            <BulleUtilisateur texte={t('ec20.reponse', { montant: fcfa(especesComptees) })} />
          </Animated.View>
          <Animated.View entering={FadeIn.duration(200).delay(100)} style={styles.bulleApp}>
            <Bulle texte={message} />
          </Animated.View>
        </View>

        {ecart > 0 ? (
          <>
            <View accessibilityRole="list">
              <RangeePuces>
                {puces.map((p) => {
                  const nom = p.description || categorie(p.categorie)?.nom || '';
                  return (
                    <PuceEcartVue
                      key={p.cle}
                      libelle={p.montant ? t('ec20.puce', { nom, montant: nombre(p.montant) }) : nom}
                      lecture={`${nom}${p.montant ? `, ${p.montant} francs CFA` : ''}`}
                      choisie={p.choisie}
                      onPress={() => toucher(p)}
                      onLongPress={() =>
                        p.choisie
                          ? setAjuster({ cle: p.cle, montant: p.montant })
                          : setPourquoi({ cle: cleSuggestion(p.categorie, p.montant ?? 0, p.description), libelle: nom })
                      }
                    />
                  );
                })}
              </RangeePuces>
            </View>
            <View style={styles.reste} accessibilityLiveRegion="polite">
              {depasse ? (
                <>
                  <Icone nom="warning" couleur={colors.status.warnFg} />
                  <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.status.warnFg, flexShrink: 1 }]}>{t('ec20.depasse', { montant: fcfa(-reste) })}</Text>
                </>
              ) : (
                <Text style={[type.bodyLarge, styles.tabulaire, { color: colors.text.primary }]}>{t('ec20.reste', { montant: fcfa(reste) })}</Text>
              )}
            </View>
            <View style={styles.ajouter}>
              <BoutonTexte libelle={t('ec20.ajouter')} onPress={() => router.push({ pathname: '/noter', params: { retour: 'bilan' } })} />
            </View>
          </>
        ) : ecart < 0 ? (
          <View accessibilityRole="radiogroup">
            <RangeePuces>
              {PLUS.map((k) => (
                <PuceEcartVue key={k} libelle={t(`ec20.${k}`)} lecture={t(`ec20.${k}`)} choisie={plus === k} onPress={() => setPlus(k)} />
              ))}
            </RangeePuces>
          </View>
        ) : null}
      </Ecran>

      <FeuilleBasse
        visible={ajuster !== null}
        titre={t('ec20.ajuster')}
        onFermer={() => setAjuster(null)}
        pied={
          <BoutonPrincipal
            libelle={t('ec13.enregistrer')}
            desactive={!ajuster?.montant}
            onPress={() => {
              if (!ajuster?.montant) return;
              setPuces(puces.map((x) => (x.cle === ajuster.cle ? { ...x, montant: ajuster.montant, choisie: true } : x)));
              setAjuster(null);
            }}
          />
        }
      >
        <ChampMontant
          libelle={t('ec13.montant')}
          unite={t('commun.fcfa')}
          valeur={ajuster?.montant ?? null}
          onValeur={(montant) => ajuster && setAjuster({ ...ajuster, montant })}
          autoFocus
        />
      </FeuilleBasse>
      <FeuillePourquoiSuggestion visible={pourquoi !== null} suggestion={pourquoi} onFermer={() => setPourquoi(null)} />
    </>
  );
}

function PuceEcartVue({ libelle, lecture, choisie, onPress, onLongPress }: { libelle: string; lecture: string; choisie: boolean; onPress: () => void; onLongPress?: () => void }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const couleur = choisie ? colors.text.onSelected : colors.text.primary;
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      hitSlop={8}
      accessibilityRole="checkbox"
      accessibilityLabel={lecture}
      accessibilityState={{ checked: choisie }}
      accessibilityActions={onLongPress ? [{ name: 'longpress', label: t('ec20.ajuster') }] : undefined}
      onAccessibilityAction={() => onLongPress?.()}
      android_ripple={{ color: colors.action.ripple }}
      style={[styles.puce, choisie ? { backgroundColor: colors.bg.selected, borderColor: colors.bg.selected } : { borderColor: colors.border.control }]}
    >
      {choisie ? <Icone nom="check" couleur={couleur} taille={size.iconSmall} /> : null}
      <Text style={[type.bodyMedium, styles.tabulaire, { color: couleur }]}>{libelle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  conversation: { rowGap: space.s2, marginTop: space.s2, marginBottom: space.s4 },
  bulleApp: { maxWidth: '85%' },
  reste: { flexDirection: 'row', alignItems: 'center', columnGap: space.s2, marginTop: space.s4 },
  ajouter: { alignItems: 'flex-start', marginLeft: -space.s3, marginTop: space.s1 },
  puce: {
    height: size.chip,
    borderRadius: 9999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: space.s2,
    paddingHorizontal: space.s3,
    overflow: 'hidden',
  },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
