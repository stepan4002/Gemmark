'use client';

import { Html } from '@react-three/drei';
import WideFrame from './WideFrame';
import { WALL_A_Z, DIVIDER_X, WALL_HEIGHT } from './Room';
import { useTranslation } from '@/hooks/useTranslation';
import { useGalleryStore } from '@/store/useGalleryStore';

// "Naše Služby" — on the FRONT face of Wall A.
// Only 2 frames: "Naše služby" (individual services) and "Naše balíčky" (packages).

const T = 0.35;
const FACE_Z = WALL_A_Z + T / 2 + 0.05;
const WALL_ROT: [number, number, number] = [0, 0, 0];

// Two frames side by side, centred on Wall A — smaller with more space between
const FRAME_SPACING = 5.5;
const LEFT_X = DIVIDER_X - FRAME_SPACING / 2;
const RIGHT_X = DIVIDER_X + FRAME_SPACING / 2;
const FRAME_Y = WALL_HEIGHT * 0.52;

const INDIVIDUAL_SERVICES_DESC_SK =
  'Individuálne služby – cena dohodou\n\n' +
  'Ponúkame nasledujúce individuálne služby:\n' +
  '• Logá a vizuálna identita\n' +
  '• Webové stránky\n' +
  '• Fotografia (produktová, portréty, podujatia)\n' +
  '• Video (propagačné, dokumentárne, eventové)\n' +
  '• Správa sociálnych sietí (nastavenie, obsah, správa)\n' +
  '• Plagáty, letáky, brožúry\n' +
  '• Články a texty / Copywriting\n' +
  '• Podcasty a rozhovory\n' +
  '• Marketingové poradenstvo a stratégia\n\n' +
  'Cena sa stanovuje individuálne podľa rozsahu a náročnosti projektu. Kontaktuj nás a dohodneme sa.\n\n' +
  'Adresa: Akademika Hronca 11, Rožňava\nE-mail: info@gemmark.sk\nTelefón: 0917 974 801';

const PACKAGES_DESC_SK =
  'Naše balíčky – mesačná spolupráca\n\n' +
  '• ŠTART – 5 €/mes: logo, vizitka, leták A5/A4\n' +
  '• ŠTART PLUS – 10 €/mes: logo, vizitka, plagát, webová stránka\n' +
  '• ŠTANDARD – 15 €/mes: logo, vizitka, plagát, web, sociálne siete 1×/mes\n' +
  '• ŠTANDARD PLUS – 20 €/mes: logo, vizitka, plagát, web, sociálne siete 2×/mes, článok v Gemer Times\n' +
  '• PROMO – 30 €/mes: logo, vizitka, plagát, web, sociálne siete 4×/mes, fotografie, článok\n' +
  '• PROMO PLUS – 40 €/mes: logo, vizitka, plagát, web, sociálne siete 6×/mes, fotografie, video, podcast, článok\n' +
  '• PREMIUM – 50 €/mes: kompletná vizuálna identita, web, sociálne siete 8×/mes, fotografie, video 2×/mes, podcast, tlačové materiály, článok\n' +
  '• KOMPLET – 100 €/mes: kompletná vizuálna identita, web, sociálne siete denne, fotografie, video 4×/mes, podcast, PR články, marketingová stratégia na rok\n\n' +
  'Všetky balíčky sú na 12 mesiacov. Výstupy vytvárajú študenti pod vedením mentorov.\n\n' +
  'Viac informácií: info@gemmark.sk';

const INDIVIDUAL_SERVICES_DESC_HU =
  'Egyéni szolgáltatások – ár megállapodás szerint\n\n' +
  'A következő egyéni szolgáltatásokat kínáljuk:\n' +
  '• Logók és vizuális identitás\n' +
  '• Weboldalak\n' +
  '• Fotózás (termék, portré, rendezvény)\n' +
  '• Videó (promóciós, dokumentumfilm, esemény)\n' +
  '• Közösségi média kezelés (beállítás, tartalom, kezelés)\n' +
  '• Plakátok, szórólapok, brosúrák\n' +
  '• Szövegírás / Copywriting\n' +
  '• Podcastok és interjúk\n' +
  '• Marketing tanácsadás és stratégia\n\n' +
  'Az ár a projekt terjedelme és összetettsége alapján egyénileg kerül meghatározásra. Vedd fel velünk a kapcsolatot, és megállapodunk.\n\n' +
  'Cím: Akademika Hronca 11, Rozsnyó\nE-mail: info@gemmark.sk\nTelefon: 0917 974 801';

const PACKAGES_DESC_HU =
  'Csomagjaink – havi együttműködés\n\n' +
  '• START – 5 €/hó: logó, névjegykártya, szórólap A5/A4\n' +
  '• START PLUS – 10 €/hó: logó, névjegykártya, plakát, weboldal\n' +
  '• STANDARD – 15 €/hó: logó, névjegykártya, plakát, web, közösségi média 1×/hó\n' +
  '• STANDARD PLUS – 20 €/hó: logó, névjegykártya, plakát, web, közösségi média 2×/hó, cikk a Gemer Times-ban\n' +
  '• PROMO – 30 €/hó: logó, névjegykártya, plakát, web, közösségi média 4×/hó, termékfotók, cikk\n' +
  '• PROMO PLUS – 40 €/hó: logó, névjegykártya, plakát, web, közösségi média 6×/hó, fotók, videó, podcast, cikk\n' +
  '• PRÉMIUM – 50 €/hó: teljes vizuális identitás, web, közösségi média 8×/hó, fotók, videó 2×/hó, podcast, nyomtatott anyagok, cikk\n' +
  '• KOMPLETT – 100 €/hó: teljes vizuális identitás, web, napi közösségi média, fotók, videó 4×/hó, podcast, PR cikkek, éves marketingstratégia\n\n' +
  'Minden csomag 12 hónapra szól. Az eredményeket diákok készítik mentorok irányítása alatt.\n\n' +
  'Több információ: info@gemmark.sk';

const INDIVIDUAL_SERVICES_DESC_EN =
  'Individual services – price by arrangement\n\n' +
  'We offer the following individual services:\n' +
  '• Logos and visual identity\n' +
  '• Websites\n' +
  '• Photography (product, portraits, events)\n' +
  '• Video (promotional, documentary, events)\n' +
  '• Social media management (setup, content, management)\n' +
  '• Posters, leaflets, brochures\n' +
  '• Articles and copy / Copywriting\n' +
  '• Podcasts and interviews\n' +
  '• Marketing consulting and strategy\n\n' +
  'The price is set individually according to the scope and complexity of the project. Contact us and we will agree.\n\n' +
  'Address: Akademika Hronca 11, Rožňava\nEmail: info@gemmark.sk\nPhone: 0917 974 801';

const PACKAGES_DESC_EN =
  'Our packages – monthly collaboration\n\n' +
  '• START – 5 €/month: logo, business card, A5/A4 leaflet\n' +
  '• START PLUS – 10 €/month: logo, business card, poster, website\n' +
  '• STANDARD – 15 €/month: logo, business card, poster, website, social media 1×/month\n' +
  '• STANDARD PLUS – 20 €/month: logo, business card, poster, website, social media 2×/month, article in Gemer Times\n' +
  '• PROMO – 30 €/month: logo, business card, poster, website, social media 4×/month, product photos, article\n' +
  '• PROMO PLUS – 40 €/month: logo, business card, poster, website, social media 6×/month, photos, video, podcast, article\n' +
  '• PREMIUM – 50 €/month: complete visual identity, website, social media 8×/month, photos, video 2×/month, podcast, print materials, article\n' +
  '• COMPLETE – 100 €/month: complete visual identity, website, daily social media, photos, video 4×/month, podcast, PR articles, yearly marketing strategy\n\n' +
  'All packages are for 12 months. Outputs are created by students under mentor guidance.\n\n' +
  'More info: info@gemmark.sk';

export default function WallServices() {
  const { t, language } = useTranslation();
  const openPanel = useGalleryStore((s) => s.openPanel);

  const individualDesc = language === 'hu'
    ? INDIVIDUAL_SERVICES_DESC_HU
    : language === 'en'
    ? INDIVIDUAL_SERVICES_DESC_EN
    : INDIVIDUAL_SERVICES_DESC_SK;

  const packagesDesc = language === 'hu'
    ? PACKAGES_DESC_HU
    : language === 'en'
    ? PACKAGES_DESC_EN
    : PACKAGES_DESC_SK;

  const individualLabel = language === 'hu'
    ? 'Egyéni szolgáltatások'
    : language === 'en'
    ? 'Individual Services'
    : 'Naše služby';

  const packagesLabel = language === 'hu'
    ? 'Csomagjaink'
    : language === 'en'
    ? 'Our Packages'
    : 'Naše balíčky';

  return (
    <group>
      {/* Section label */}
      <Html
        position={[DIVIDER_X + 1.0, WALL_HEIGHT * 0.88, FACE_Z]}
        rotation={WALL_ROT}
        transform
        style={{ pointerEvents: 'none' }}
      >
        <span style={{
          color: '#222',
          fontSize: '20px',
          fontWeight: '900',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '1px',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
          maxWidth: '400px',
        }}>
          {t.sections['nase-sluzby']}
        </span>
      </Html>

      {/* Frame 1 — "Naše služby" (individual services) */}
      <WideFrame
        position={[LEFT_X, FRAME_Y, FACE_Z + 0.05]}
        rotation={WALL_ROT}
        size={[3.5, 3.0]}
        image="/images/services/graphic-design.jpg"
        label={individualLabel}
        onClickOverride={() =>
          openPanel({
            type: 'service',
            id: 'nase-sluzby',
            title: individualLabel,
            description: individualDesc,
            image: '/images/services/graphic-design.jpg',
          })
        }
      />

      {/* Frame 2 — "Naše balíčky" (packages) */}
      <WideFrame
        position={[RIGHT_X, FRAME_Y, FACE_Z + 0.05]}
        rotation={WALL_ROT}
        size={[3.5, 3.0]}
        image="/images/services/strategy.jpg"
        label={packagesLabel}
        onClickOverride={() =>
          openPanel({
            type: 'service',
            id: 'nase-balicky',
            title: packagesLabel,
            description: packagesDesc,
            image: '/images/services/strategy.jpg',
          })
        }
      />
    </group>
  );
}
