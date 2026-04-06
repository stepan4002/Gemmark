export interface Service {
  id: string;
  name: string;
  nameHu: string;
  price: string;
  priceHu: string;
  image: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 'balik-start',
    name: 'ŠTART',
    nameHu: 'START',
    price: '5€/mes',
    priceHu: '5€/hó',
    image: '/images/branding/gemmark-icon.jpg',
    description: 'Balík ŠTART – 5€/mesiac\nPre tých, ktorí začínajú.\n\nIdealny pre remeselníkov, živnostníkov a malé projekty, ktoré potrebujú základnú vizuálnu prezentáciu.\n\nObsah balíka:\n• návrh loga\n• vizitka\n• leták A5/A4\n\nSpolupráca na 12 mesiacov. Výstupy sú vytvorené študentmi pod vedením mentorov.',
  },
  {
    id: 'balik-start-plus',
    name: 'ŠTART PLUS',
    nameHu: 'START PLUS',
    price: '10€/mes',
    priceHu: '10€/hó',
    image: '/images/branding/gemmark-icon.jpg',
    description: 'Balík ŠTART PLUS – 10€/mesiac\nRozšírená základná prezentácia.\n\nIdealny pre podnikateľov a organizácie, ktoré chcú byť viditeľné aj online.\n\nObsah balíka:\n• návrh loga\n• vizitka\n• plagát A5/A4\n• webová stránka\n\nSpolupráca na 12 mesiacov. Výstupy sú vytvorené študentmi pod vedením mentorov.',
  },
  {
    id: 'balik-standard',
    name: 'ŠTANDARD',
    nameHu: 'STANDARD',
    price: '15€/mes',
    priceHu: '15€/hó',
    image: '/images/branding/gemmark-icon.jpg',
    description: 'Balík ŠTANDARD – 15€/mesiac\nKomplexná základná prezentácia.\n\nPre podnikateľov a organizácie, ktoré chcú aktívne komunikovať na sociálnych sieťach.\n\nObsah balíka:\n• logo\n• vizitka\n• plagát\n• webová stránka\n• sociálne siete – 1 príspevok/mesiac\n\nSpolupráca na 12 mesiacov. Výstupy sú vytvorené študentmi pod vedením mentorov.',
  },
  {
    id: 'balik-standard-plus',
    name: 'ŠTANDARD PLUS',
    nameHu: 'STANDARD PLUS',
    price: '20€/mes',
    priceHu: '20€/hó',
    image: '/images/branding/gemmark-icon.jpg',
    description: 'Balík ŠTANDARD PLUS – 20€/mesiac\nPrezentácia s mediálnym dosahom.\n\nPre podnikateľov a projekty, ktoré chcú byť viditeľné aj v regionálnych médiách.\n\nObsah balíka:\n• logo\n• vizitka\n• plagát\n• webová stránka\n• sociálne siete – 2 príspevky/mesiac\n• článok v Gemer Times\n\nSpolupráca na 12 mesiacov. Výstupy sú vytvorené študentmi pod vedením mentorov.',
  },
  {
    id: 'balik-promo',
    name: 'PROMO',
    nameHu: 'PROMO',
    price: '30€/mes',
    priceHu: '30€/hó',
    image: '/images/branding/gemmark-icon.jpg',
    description: 'Balík PROMO – 30€/mesiac\nVizuálna a fotografická prezentácia.\n\nPre podnikateľov a remeselníkov, ktorí chcú ukázať svoju prácu prostredníctvom kvalitných fotografií.\n\nObsah balíka:\n• logo\n• vizitka\n• plagát\n• webová stránka\n• sociálne siete – 4 príspevky/mesiac\n• produktové fotografie\n• článok v Gemer Times\n\nSpolupráca na 12 mesiacov. Výstupy sú vytvorené študentmi pod vedením mentorov.',
  },
  {
    id: 'balik-promo-plus',
    name: 'PROMO PLUS',
    nameHu: 'PROMO PLUS',
    price: '40€/mes',
    priceHu: '40€/hó',
    image: '/images/branding/gemmark-icon.jpg',
    description: 'Balík PROMO PLUS – 40€/mesiac\nKomplexná vizuálna a audio-vizuálna prezentácia.\n\nPre podnikateľov, ktorí chcú oslóviť zákazníkov aj prostredníctvom videa a podcastu.\n\nObsah balíka:\n• logo\n• vizitka\n• plagát\n• webová stránka\n• sociálne siete – 6 príspevkov/mesiac\n• produktové fotografie\n• video (1/mesiac)\n• podcast/rozhovor\n• článok v Gemer Times\n\nSpolupráca na 12 mesiacov. Výstupy sú vytvorené študentmi pod vedením mentorov.',
  },
  {
    id: 'balik-premium',
    name: 'PREMIUM',
    nameHu: 'PRÉMIUM',
    price: '50€/mes',
    priceHu: '50€/hó',
    image: '/images/branding/gemmark-icon.jpg',
    description: 'Balík PREMIUM – 50€/mesiac\nKomplexná prezentácia značky.\n\nPre podnikateľov a organizácie, ktoré chcú mať kompletnú a profesionálnu prezentáciu vo všetkých kanáloch.\n\nObsah balíka:\n• kompletná vizuálna identita (logo, farby, fonty, brand manuál)\n• webová stránka\n• sociálne siete – 8 príspevkov/mesiac\n• produktové fotografie\n• video (2/mesiac)\n• podcast/rozhovor\n• tlačové materiály\n• článok v Gemer Times\n\nSpolupráca na 12 mesiacov. Výstupy sú vytvorené študentmi pod vedením mentorov.',
  },
  {
    id: 'balik-komplet',
    name: 'KOMPLET',
    nameHu: 'KOMPLETT',
    price: '100€/mes',
    priceHu: '100€/hó',
    image: '/images/branding/gemmark-icon.jpg',
    description: 'Balík KOMPLET – 100€/mesiac\nMarketingová stratégia na celý rok.\n\nPre podnikateľov a organizácie, ktoré chcú systematický a dlhodobý prístup k marketingu a budovaniu značky.\n\nObsah balíka:\n• kompletná vizuálna identita\n• webová stránka\n• sociálne siete – denná správa\n• produktové fotografie (mesačne)\n• video (4/mesiac)\n• podcast/rozhovor (mesačne)\n• tlačové materiály\n• PR články a mediálne výstupy\n• marketingová stratégia na rok\n• pravidelné konzultácie s mentorom\n\nSpolupráca na 12 mesiacov. Výstupy sú vytvorené študentmi pod vedením mentorov.',
  },
  {
    id: 'individualne',
    name: 'Individuálne',
    nameHu: 'Egyéni',
    price: 'dohodou',
    priceHu: 'megállapodás',
    image: '/images/branding/gemmark-icon.jpg',
    description: 'Individuálne služby – cena dohodou\n\nNemáš záujem o mesačnú spoluprácu? Vieme pomôcť aj s jednorazovými projektmi podľa tvojich konkrétnych potrieb.\n\nIndividuálne môžeme vytvoriť:\n• logo a vizuálna identita\n• webové stránky\n• fotografia (produktová, portréty, podujatia)\n• video (propagačné, dokumentárne, eventové)\n• sociálne siete (nastavenie, obsah, správa)\n• plagáty, letáky, brožúry\n• články a texty / copywriting\n• podcasty a rozhovory\n• marketingové poradenstvo a stratégia\n\nCena sa stanovuje individuálne podľa rozsahu a náročnosti projektu. Kontaktuj nás a dohodneme sa.',
  },
];
