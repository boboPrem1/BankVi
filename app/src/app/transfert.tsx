import { calculer, fraisSuggeres } from '@bankvi/moteur';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AccessibilityInfo, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';

import { annoncer } from '@/composants/BandeauBas';
import { BoutonPrincipal, BoutonTexte } from '@/composants/Boutons';
import { ChampCompact, ChampMontant, lireMontant, type RefSaisie } from '@/composants/Champs';
import { Puce } from '@/composants/Choix';
import { Ecran } from '@/composants/Ecran';
import { AvatarPoche, FeuillePoche } from '@/composants/Feuilles';
import { fcfa, nombre } from '@/format/montant';
import { Icone } from '@/icones/Icone';
import { maintenant, useEtat } from '@/registre/etat';
import { useRegistre } from '@/registre/store';
import { size, space, type, useTheme } from '@/theme';

/** EC-22 Transfert entre poches : l'argent change de poche, seuls les frais sont une dépense. */
export default function Transfert() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{ de?: string }>();
  const etat = useEtat();
  const registre = useRegistre();
  const soldes = calculer(etat).soldes;
  const poches = etat.poches.map((p) => ({ id: p.id, nom: p.nom, solde: soldes[p.id] ?? 0, genre: p.genre }));
  const refFrais = useRef<RefSaisie>(null);

  // Arrivée depuis un solde : cette poche en De ; Vers est la dernière autre poche utilisée.
  const deDepart = poches.find((p) => p.id === params.de)?.id ?? poches[0]?.id ?? 'especes';
  const derniereAutre = [...registre.ecritures].reverse().find((e) => (e.type === 'depense' || e.type === 'revenu') && e.poche !== deDepart);
  const versDepart =
    (derniereAutre && 'poche' in derniereAutre ? derniereAutre.poche : undefined) ?? poches.find((p) => p.id !== deDepart)?.id ?? deDepart;
  const [de, setDe] = useState(deDepart);
  const [vers, setVers] = useState(versDepart);
  const [montant, setMontant] = useState<number | null>(null);
  const [frais, setFrais] = useState<number | null>(null);
  const [feuille, setFeuille] = useState<'de' | 'vers' | null>(null);

  const p = (id: string) => poches.find((x) => x.id === id);
  const soldeDe = p(de)?.solde ?? 0;
  const suggestion = montant ? fraisSuggeres(etat.ecritures, de, vers, montant) : undefined;
  const activite = p(de)?.genre === 'activite' || p(vers)?.genre === 'activite';

  if (poches.length < 2) {
    return (
      <Ecran titre={t('ec22.titre')} marge={size.gutterList}>
        <Text style={[type.bodyLarge, { color: colors.text.secondary }]}>{t('ec22.seule')}</Text>
        <View style={styles.lien}>
          <BoutonTexte libelle={t('ec22.mesPoches')} onPress={() => router.push('/poches' as any)} />
        </View>
      </Ecran>
    );
  }

  const choisir = (cote: 'de' | 'vers', id: string) => {
    // La poche déjà prise de l'autre côté est échangée.
    if (cote === 'de') {
      if (id === vers) setVers(de);
      setDe(id);
    } else {
      if (id === de) setDe(vers);
      setVers(id);
    }
    setFeuille(null);
  };

  const inverser = () => {
    setDe(vers);
    setVers(de);
    AccessibilityInfo.announceForAccessibility(t('ec22.inverse', { de: p(vers)?.nom, vers: p(de)?.nom }));
  };

  const transferer = () => {
    if (!montant) return;
    const [id] = useRegistre.getState().ecrire([{ ecriture: { at: maintenant(), type: 'transfert', de, vers, montant, frais: frais ?? 0 }, meta: { origine: 'toi' } }]);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
    annoncer(t('ec22.note'), () => id && useRegistre.getState().annuler([id]));
  };

  return (
    <>
      <Ecran
        titre={t('ec22.titre')}
        marge={size.gutterList}
        pied={<BoutonPrincipal libelle={t('ec22.transferer')} desactive={!montant} onPress={transferer} />}
      >
        <View>
          <LignePoche sens={t('ec22.de')} id={de} nom={p(de)?.nom ?? ''} solde={soldeDe} onPress={() => setFeuille('de')} />
          <View style={styles.inverser}>
            <Pressable
              onPress={inverser}
              accessibilityRole="button"
              accessibilityLabel={t('ec22.inverser')}
              android_ripple={{ color: colors.action.ripple, borderless: true, radius: 24 }}
              style={styles.zoneInverser}
            >
              <Icone nom="swap_vert" couleur={colors.text.link} />
            </Pressable>
          </View>
          <LignePoche sens={t('ec22.vers')} id={vers} nom={p(vers)?.nom ?? ''} solde={p(vers)?.solde ?? 0} onPress={() => setFeuille('vers')} />
        </View>

        <View style={styles.montant}>
          <ChampMontant
            libelle={t('ec22.montant')}
            unite={t('commun.fcfa')}
            valeur={montant}
            onValeur={setMontant}
            autoFocus
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => refFrais.current?.focus()}
          />
          {montant && montant > soldeDe ? (
            <View style={styles.avertissement} accessibilityLiveRegion="polite">
              <Icone nom="warning" couleur={colors.status.warnFg} taille={16} />
              <Text style={[type.caption, { color: colors.status.warnFg, flexShrink: 1 }]}>{t('ec22.trop', { montant: fcfa(soldeDe) })}</Text>
            </View>
          ) : null}
        </View>

        <ChampCompact
          ref={refFrais}
          libelle={t('ec22.frais')}
          keyboardType="number-pad"
          value={frais === null ? '' : nombre(frais)}
          onChangeText={(v) => setFrais(lireMontant(v))}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        {suggestion && frais === null ? (
          <View style={styles.suggestion}>
            <Puce libelle={t('ec22.fraisConnus', { montant: fcfa(suggestion) })} onPress={() => setFrais(suggestion)} />
          </View>
        ) : null}
        <Text style={[type.body, styles.aide, { color: colors.text.secondary }]}>{activite ? t('ec22.aideActivite') : t('ec22.aide')}</Text>
      </Ecran>

      <FeuillePoche
        visible={feuille !== null}
        titre={t('ec22.choisirPoche')}
        poches={poches}
        actuelle={feuille === 'de' ? de : vers}
        onFermer={() => setFeuille(null)}
        onChoix={(id) => feuille && choisir(feuille, id)}
      />
    </>
  );
}

function LignePoche({ sens, id, nom, solde, onPress }: { sens: string; id: string; nom: string; solde: number; onPress: () => void }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('ec22.ligne', { sens, poche: nom, montant: solde })}
      android_ripple={{ color: colors.action.ripple }}
      style={styles.ligne}
    >
      <AvatarPoche id={id} nom={nom} />
      <View style={styles.flex}>
        <Text style={[type.caption, { color: colors.text.secondary }]}>{sens}</Text>
        <Text style={[type.bodyStrong, styles.tabulaire, { color: colors.text.primary }]}>{`${nom} · ${fcfa(solde)}`}</Text>
      </View>
      <Icone nom="chevron_right" couleur={colors.text.secondary} taille={size.iconSmall} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  ligne: { minHeight: size.rowOne, flexDirection: 'row', alignItems: 'center', columnGap: space.s4 },
  inverser: { height: 24, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  zoneInverser: { width: size.touchMin, height: size.touchMin, alignItems: 'center', justifyContent: 'center' },
  montant: { marginTop: space.s3, marginBottom: space.s2 },
  avertissement: { flexDirection: 'row', alignItems: 'center', columnGap: space.s1, marginTop: space.s1 },
  suggestion: { marginTop: space.s2, alignItems: 'flex-start' },
  aide: { marginTop: space.s2 },
  lien: { alignItems: 'flex-start', marginLeft: -space.s3, marginTop: space.s2 },
  tabulaire: { fontVariant: ['tabular-nums'] },
});
