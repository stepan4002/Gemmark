'use client';

import { Html } from '@react-three/drei';
import Frame from './Frame';
import { ROOM_DEPTH, WALL_HEIGHT } from './Room';
import { useTranslation } from '@/hooks/useTranslation';

// Team member frames — ALL 5 in a single row on the RIGHT half of the back wall (X = 0 to +10).
// Back wall: Z = -ROOM_DEPTH/2 = -30, faces +Z toward the entrance.
// Frames sit in front of the back wall surface.

const BACK_Z = -ROOM_DEPTH / 2 + 0.2; // clear protrusion from back wall
const WALL_ROT: [number, number, number] = [0, 0, 0]; // back wall faces +Z, no rotation needed

// Frame dimensions — taller to better fit portrait photos
const FRAME_W = 1.4;
const FRAME_H = 2.2;

// Horizontal spacing between frames
const SPACING_X = 3.5;

// Full back wall centre: X range -10 to +10, centre at 0
const CENTRE_X = 0;

// Single row: 5 frames centred at CENTRE_X
// Total span = (5-1) * 3.5 = 14.0, start at CENTRE_X - 7.0 = -7.0
const ROW_Y = WALL_HEIGHT * 0.52;
const ROW_START_X = CENTRE_X - (SPACING_X * 2);

interface TeamMember {
  id: string;
  name: string;
  roleSk: string;
  roleHu: string;
  descriptionSk: string;
  descriptionHu: string;
  image: string;
}

const ALL_MEMBERS: TeamMember[] = [
  {
    id: 'gregor-gallo',
    name: 'Gregor Gallo',
    roleSk: 'Patrón projektu',
    roleHu: 'A projekt védnöke',
    descriptionSk: 'Gregor Gallo – patrón projektu, ktorý dlhodobo podporuje rozvoj kultúrnych, komunitných a vzdelávacích aktivít v Rožňave a regióne Gemer. Pre fungovanie projektu GemMARK poskytuje:\npriestor pre fungovanie labu,\ntechnické vybavenie,\nsoftvérové vybavenie (napr. Adobe Creative Cloud),\nmateriálne zázemie,\nfinančnú podporu rozvoja projektu,\nprávny servis a právne poradenstvo pre potreby projektu,\nzabezpečenie prípadných registrácií ochranných známok a súvisiacich administratívnych úkonov.\n\nBez Gregora a jeho zdrojov by projekt nemal šancu vzniknúť. Vďaka nemu má projekt od začiatku vytvorené stabilné materiálne, technické aj právne podmienky pre svoje fungovanie a rozvoj.',
    descriptionHu: 'Gregor Gallo a GemMARK projekt védnöke és fő kezdeményezője.\n\nMint régóta aktív regionális vezető, vállalkozó és kulturális szervező, aktívan részt vesz Gömör régió fejlesztésében, a helyi kezdeményezések támogatásában és az emberek, ötletek és projektek összekapcsolásában a régióban.\n\nVíziója egy olyan tér létrehozása, ahol a fiatalok fejlődhetnek, kibontakoztathatják tehetségüket, és egyúttal hozzájárulnak Gömör régió láthatóságának növeléséhez. Hiszi, hogy a tanulás, a gyakorlat és a közösség kombinációja megváltoztathatja, hogyan látják a régiót belülről és kívülről.\n\nGregor Gallo áll a GemCraft, a Na Hrade és más regionális kezdeményezések mögött, amelyek összekapcsolják a kultúrát, a kézművességet és az idegenforgalmat Gömörben.',
    image: '/images/people/gregor-gallo.jpg',
  },
  {
    id: 'gemart',
    name: 'GemArt',
    roleSk: 'Odborný garant projektu',
    roleHu: 'A projekt szakmai garantja',
    descriptionSk: 'GemArt – občianske združenie, ktoré dlhodobo pôsobí v oblasti kultúry, umenia a komunitných aktivít v regióne Gemer, prináša do projektu:\nodborné know-how v oblasti gemerského prostredia a jeho rozvoja\ngrafického tvorcu a webového tvorcu,\nskúsenosti s organizovaním kultúrnych a spoločenských podujatí,\nkontakty na odborníkov z rôznych oblastí,\nkontakty na remeselníkov, podnikateľov a obce v regióne,\nzázemie regionálnych novín Gemer Times a tým aj silný mediálny priestor,\nskúsenosti s prácou s mládežou a organizovaním vzdelávacích aktivít.\n\nVďaka GemArtu projekt stojí na ľuďoch, ktorí majú skúsenosti, kontakty a dlhodobý vzťah k regiónu. Bez tohto zázemia by mal projekt len veľmi ťažkú východiskovú pozíciu.',
    descriptionHu: 'A GemArt (civil szervezet) a GemMARK projekt szakmai garantja.\n\nA szervezet hosszú ideje foglalkozik kultúrával, művészettel, a kreatív ipar fejlesztésével és a tehetségek támogatásával Gömör régióban. Kulturális rendezvényeket, workshopokat, rezidenciákat és a régió kreatív gazdaságának fejlesztésére irányuló projekteket valósít meg.\n\nA GemMARK projekten belül a GemArt szakmai hátteret, módszertani útmutatást, kapcsolati hálót és teret biztosít a projekt megvalósításához. Gondoskodik a kultúra, a művészet és a kreatív ágazatok világával való összekapcsolódásról, és segít közösséget építeni a projekt köré.\n\nA GemArt hosszú ideje azon dolgozik, hogy Gömör olyan hely legyen, ahol a tehetségek kibontakozhatnak, és ahol a kreatív munkának megvan a maga helye és értéke.',
    image: '/images/people/gemart-logo.jpg',
  },
  {
    id: 'zuzana-imreova',
    name: 'Zuzana Imreová',
    roleSk: 'Koordinátor mládeže',
    roleHu: 'Ifjúsági koordinátor',
    descriptionSk: 'Zuzana Imreová – Rožňavčanka a absolventka Gymnázia P.J. Šafárika v Rožňave, aktuálne študentka druhého ročníka Univerzity Mateja Bela v Banskej Bystrici (história a anglický jazyk), ktorá v projekte zabezpečuje:\nkoordináciu študentov,\norganizáciu stretnutí a aktivít\nkomunikáciu so študentmi,\nplánovanie harmonogramu,\norganizačné zabezpečenie workshopov, prednášok a podujatí\npodporu v oblasti copywritingu a podcastov.\n\nBez Zuzky, ktorá veľmi dobre pozná prostredie mladých ľudí v Rožňave a má zároveň blízky vzťah k hovorenému aj písanému slovu, by bolo veľmi náročné zabezpečiť pravidelné fungovanie aktivít, koordináciu študentov, organizáciu workshopov, oslovovanie odborných prednášajúcich a celkové fungovanie komunity mladých ľudí v projekte.',
    descriptionHu: 'Zuzana Imreová ifjúsági koordinátorként tevékenykedik a GemMARK projektben.\n\nFelelős a fiatal résztvevők toborzásáért és motiválásáért, workshopok, tréningek és mentorprogram szervezéséért. Közvetlenül a fiatalokkal dolgozik, segít nekik eligazodni a projektben, megtalálni szerepüket a csapatban és fejleszteni készségeiket.\n\nFeladata annak biztosítása, hogy a fiatalok maximális támogatást kapjanak a projekt teljes időtartama alatt — a GemMARK-kal való első kapcsolatfelvételtől egészen munkájuk eredményeinek bemutatásáig.\n\nZuzana hosszú ideje dolgozik a régió fiataljaival, és érti azokat az igényeket és kihívásokat, amelyekkel a gömöri fiatalok szembesülnek.',
    image: '/images/people/zuzana-imreova.jpg',
  },
  {
    id: 'diana-spisiakova',
    name: 'Diana Spišiaková',
    roleSk: 'Koordinácia projektov',
    roleHu: 'Projektkoordináció',
    descriptionSk: 'Diana Spišiaková – Šestnásťročná študentka Gymnázia P. J. Šafárika v Rožňave, ktorá v projekte zabezpečuje najmä:\nkomunikáciu s klientmi (remeselníci, podnikatelia, obce, organizácie),\nprijímanie a evidovanie nových projektov a zákaziek,\ndohodnutie zadania projektu (logo, web, fotografie, video, plagát a pod.),\nkoordináciu priebehu jednotlivých projektov,\nkomunikáciu medzi študentmi a klientom počas realizácie projektu.\n\nBez Diany, ktorá od svojich 15 rokov funguje ako dobrovoľníčka v GemArte, kde postupne zastávala zodpovedné úlohy pri organizovaní rôznych podujatí, komunikácii s účinkujúcimi, partnermi a návštevníkmi, by bolo veľmi náročné udržať v projekte poriadok, termíny a plynulý priebeh zákaziek.',
    descriptionHu: 'Diana Spišiaková felelős a projektek koordinációjáért a GemMARK keretein belül.\n\nGondoskodik a régióból érkező ügyfelek és a diákcsapatok közötti együttműködés zökkenőmentes lebonyolításáról. Felügyeli a határidőket, az eredmények minőségét és az összes érintett fél közötti kommunikációt.\n\nFeladata annak biztosítása, hogy minden projekt zökkenőmentesen menjen végbe — az ügyféllel való első találkozótól, a feladatmeghatározáson és megvalósításon át az eredmények átadásáig és a visszajelzésig.\n\nDiana projektmenedzsment és koordinációs tapasztalatot hoz a projektbe, ami kulcsfontosságú ahhoz, hogy a GemMARK megbízhatóan és professzionálisan működjön.',
    image: '/images/people/diana-spisiakova.png',
  },
  {
    id: 'nikolas-stepan',
    name: 'Nikolas Štěpán',
    roleSk: 'Odborný garant pre komunikáciu',
    roleHu: 'Kommunikációs szakmai garant',
    descriptionSk: 'Nikolas Štěpán – študent posledného ročníka magisterského štúdia odbor Health and Clinical Psychology (MSc) na University of London.\nV projekte sa venuje najmä:\nrozvoju komunikačných zručností študentov,\ntímovej spolupráci,\nprezentačným schopnostiam,\nzvládaniu stresu pri práci s klientom,\nbudovaniu bezpečného a podporného prostredia pre mladých ľudí,\nrozvoju tzv. mäkkých zručností (soft skills), ktoré sú nevyhnutné pre prácu v marketingu, médiách a kreatívnom priemysle\npodpore pri tvorbe webových stránok\nzabezpečeniu technického fungovania centra – správe techniky\n\nBez Nikolasa, ktorý do projektu prináša odborné vedenie v oblasti komunikácie, psychológie a práce s ľuďmi, by bolo veľmi náročné vytvoriť v projekte bezpečné a podporné prostredie, v ktorom sa budú mladí ľudia cítiť dobre, budú vedieť spolupracovať, komunikovať a zvládať aj stresové situácie spojené s prácou na reálnych projektoch a rásť odborne aj ľudsky.',
    descriptionHu: 'Nikolas Štěpán a kommunikáció szakmai garantja a GemMARK projektben.\n\nFelelős a projekt médiabemutatásáért, az online kommunikációért, a GemMARK márkaépítéséért és a projekt digitális infrastruktúrájáért. A digitális marketing, tartalomkészítés, webes technológiák és kommunikációs stratégiák területén vezeti a diákokat.\n\nEmellett koordinálja a projekt technikai aspektusait — a weboldalakat, rendszereket, eszközöket és digitális folyamatokat, amelyeket a GemMARK mindennapi munkájában használ.\n\nNikolas technikai készségek, kreatív gondolkodás és a regionális projektek és szervezetek digitális jelenlétének kiépítésével kapcsolatos tapasztalatok kombinációját hozza a projektbe.',
    image: '/images/people/nikolas-stepan.jpg',
  },
];

export default function WallTeam() {
  const { t, language } = useTranslation();

  return (
    <group>
      {/* Section label above the single row */}
      <Html
        position={[CENTRE_X, WALL_HEIGHT * 0.9, -ROOM_DEPTH / 2 + 0.25]}
        transform
        style={{ pointerEvents: 'none' }}
      >
        <span style={{
          color: '#1a1a1a',
          fontSize: '22px',
          fontWeight: '900',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '2px',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}>
          {t.sections['kto-za-tym']}
        </span>
      </Html>

      {/* Single row — all 5 members */}
      {ALL_MEMBERS.map((member, i) => {
        const role = language === 'hu' ? member.roleHu : member.roleSk;
        const description = language === 'hu' ? member.descriptionHu : member.descriptionSk;
        return (
          <Frame
            key={member.id}
            position={[ROW_START_X + i * SPACING_X, ROW_Y, BACK_Z]}
            rotation={WALL_ROT}
            size={[FRAME_W, FRAME_H]}
            image={member.image}
            label={member.name}
            panelData={{
              type: 'info',
              id: member.id,
              title: member.name,
              description: `${role}\n\n${description}`,
              image: member.image,
            }}
          />
        );
      })}
    </group>
  );
}
