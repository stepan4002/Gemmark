export interface PortfolioProject {
  id: string;
  name: string;
  logo: string;
  screenshot?: string;
  description: string;
  descriptionHu?: string;
  deliverables: string[];
  deliverablesHu?: string[];
  location?: string;
  locationHu?: string;
  link?: string;
  socialLinks?: { platform: string; url: string }[];
  isPlaceholder?: boolean;
  inProgress?: boolean;
  isContact?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'gemcraft',
    name: 'GemCraft',
    logo: '/images/portfolio/gemcraft/screenshots/01_homepage_hero.png',
    description: 'GemCraft je interaktívne remeselné centrum a múzeum v Štítniku, špecializujúce sa na ručne fúkané sklenené ozdoby, keramiku a drevené výrobky. Ponúka workshopy, prehliadky a teambuildingy.',
    descriptionHu: 'A GemCraft egy interaktív kézműves központ és múzeum Csetnek községben, amely kézzel fújt üvegdíszekre, kerámiára és fatermékekre specializálódott. Műhelyeket, túrákat és csapatépítő programokat kínál.',
    deliverables: ['Webová stránka', 'Produktová fotografia', 'Marketingové materiály', 'Online prezentácia', 'Správa sociálnych sietí'],
    deliverablesHu: ['Weboldal', 'Termékfotózás', 'Marketinganyagok', 'Online prezentáció', 'Közösségi média kezelés'],
    location: 'Štítnik, Gemer, Slovensko',
    locationHu: 'Csetnek, Gömör, Szlovákia',
    link: '/projekt/gemcraft',
    socialLinks: [
      { platform: 'Web', url: 'https://www.gemcraft.sk/' },
    ],
  },
  {
    id: 'nahrade',
    name: 'Na Hrade',
    logo: '/images/portfolio/nahrade/screenshots/01_homepage_hero.png',
    description: 'Na Hrade — Život na Vodnom hrade v Štítniku. Kultúrne a zážitkové centrum v historickom hrade zo 14. storočia. Zvieratá, ihriská, šport, relax, kino, podujatia a umenie.',
    descriptionHu: 'Na Hrade — Élet a csetneki Vízi váron. Kulturális és élményközpont egy 14. századi történelmi várban. Állatok, játszóterek, sport, pihenés, mozi, rendezvények és művészet.',
    deliverables: ['Webová stránka', 'Vizuálny dizajn', 'Obsahová stratégia', 'Fotografia', 'Mediálny obsah'],
    deliverablesHu: ['Weboldal', 'Vizuális dizájn', 'Tartalomstratégia', 'Fotózás', 'Médiatartalom'],
    location: 'Štítnik, Gemer, Slovensko',
    locationHu: 'Csetnek, Gömör, Szlovákia',
    link: '/projekt/nahrade',
    socialLinks: [
      { platform: 'Web', url: 'https://www.nahrade.sk/' },
    ],
  },
  {
    id: 'sportova-skola',
    name: 'Športová škola Inga a Miloša',
    logo: '/images/branding/gemmark-icon.jpg',
    description: '',
    deliverables: [],
    isPlaceholder: true,
    inProgress: true,
  },
  {
    id: 'gemerom-inak',
    name: 'Gemerom inak',
    logo: '/images/branding/gemmark-icon.jpg',
    description: '',
    deliverables: [],
    isPlaceholder: true,
    inProgress: true,
  },
  {
    id: 'cesta-lacka-bebeka',
    name: 'Cesta Lacka Bebeka',
    logo: '/images/branding/gemmark-icon.jpg',
    description: '',
    deliverables: [],
    isPlaceholder: true,
    inProgress: true,
  },
  {
    id: 'placeholder-6',
    name: '6',
    logo: '/images/branding/gemmark-icon.jpg',
    description: '',
    deliverables: [],
    isPlaceholder: true,
  },
  {
    id: 'placeholder-7',
    name: '7',
    logo: '/images/branding/gemmark-icon.jpg',
    description: '',
    deliverables: [],
    isPlaceholder: true,
  },
  {
    id: 'placeholder-8',
    name: '8',
    logo: '/images/branding/gemmark-icon.jpg',
    description: '',
    deliverables: [],
    isPlaceholder: true,
  },
  {
    id: 'placeholder-9',
    name: '9',
    logo: '/images/branding/gemmark-icon.jpg',
    description: '',
    deliverables: [],
    isPlaceholder: true,
  },
  {
    id: 'placeholder-10',
    name: '10',
    logo: '/images/branding/gemmark-icon.jpg',
    description: '',
    deliverables: [],
    isPlaceholder: true,
  },
];
