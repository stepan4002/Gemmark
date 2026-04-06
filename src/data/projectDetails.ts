export interface GalleryCategory {
  category: string;
  categoryHu: string;
  images: string[];
}

export interface ProjectDetail {
  id: string;
  name: string;
  heroImage: string;
  description: string;
  descriptionHu: string;
  fullDescription: string;
  fullDescriptionHu: string;
  location: string;
  locationHu: string;
  clientType: string;
  clientTypeHu: string;
  deliverables: { name: string; nameHu: string; icon: string }[];
  gallery: GalleryCategory[];
  links: { label: string; labelHu: string; url: string; icon?: string }[];
  techDetails: { label: string; labelHu: string; value: string; valueHu: string }[];
  year: string;
}

export const projectDetails: Record<string, ProjectDetail> = {
  gemcraft: {
    id: 'gemcraft',
    name: 'GemCraft',
    heroImage: '/images/portfolio/gemcraft/screenshots/01_homepage_hero.png',
    description: 'Interaktívne remeselné centrum a múzeum v Štítniku',
    descriptionHu: 'Interaktív kézműves központ és múzeum Csetnek ben',
    fullDescription:
      'GemCraft je interaktívne remeselné centrum a múzeum v Štítniku, špecializujúce sa na ručne fúkané sklenené ozdoby, keramiku a drevené výrobky. Ponúka workshopy, prehliadky a teambuildingy, kde sa návštevníci učia tradičné remeslá.\n\nPre GemCraft sme navrhli a vytvorili webovú stránku, produktovú fotografiu a marketingové materiály.',
    fullDescriptionHu:
      'A GemCraft egy interaktív kézműves központ és múzeum Csetneken, amely kézzel fújt üvegdíszekre, kerámiára és faipari termékekre specializálódott. Workshopokat, körsétákat és csapatépítőket kínál, ahol a látogatók hagyományos kézművességet tanulhatnak.\n\nA GemCraft számára weboldalt, termékfotózást és marketinganyagokat terveztünk és készítettünk.',
    location: 'Štítnik, Gemer, Slovensko',
    locationHu: 'Csetnek, Gömör, Szlovákia',
    clientType: 'Remeselné centrum / Múzeum',
    clientTypeHu: 'Kézműves központ / Múzeum',
    deliverables: [
      { name: 'Webová stránka', nameHu: 'Weboldal', icon: '🌐' },
      { name: 'Produktová fotografia', nameHu: 'Termékfotózás', icon: '📸' },
      { name: 'Marketingové materiály', nameHu: 'Marketing anyagok', icon: '📄' },
      { name: 'Online prezentácia', nameHu: 'Online bemutató', icon: '💻' },
      { name: 'Správa sociálnych sietí', nameHu: 'Közösségi média kezelés', icon: '📱' },
    ],
    gallery: [
      {
        category: 'Webstránka',
        categoryHu: 'Weboldal',
        images: [
          '/images/portfolio/gemcraft/screenshots/01_homepage_hero.png',
          '/images/portfolio/gemcraft/screenshots/02_homepage_categories.png',
          '/images/portfolio/gemcraft/screenshots/03_homepage_products.png',
          '/images/portfolio/gemcraft/screenshots/04_glass_ornaments_page.png',
          '/images/portfolio/gemcraft/screenshots/05_workshops_page.png',
          '/images/portfolio/gemcraft/screenshots/06_ceramics_page.png',
        ],
      },
      {
        category: 'Sociálne siete',
        categoryHu: 'Közösségi média',
        images: [
          '/images/portfolio/gemcraft/social/campaign-01.jpg',
          '/images/portfolio/gemcraft/social/campaign-03.jpg',
          '/images/portfolio/gemcraft/social/cover.jpg',
        ],
      },
      {
        category: 'Marketingové materiály',
        categoryHu: 'Marketinganyagok',
        images: [
          '/images/portfolio/gemcraft/materials/banner.jpg',
          '/images/portfolio/gemcraft/materials/pricing.jpg',
          '/images/portfolio/gemcraft/materials/hours.jpg',
          '/images/portfolio/gemcraft/materials/workshop-xmas.jpg',
          '/images/portfolio/gemcraft/materials/green-design.jpg',
        ],
      },
    ],
    links: [
      { label: 'Webová stránka', labelHu: 'Weboldal', url: 'https://www.gemcraft.sk/', icon: '🌐' },
    ],
    techDetails: [
      { label: 'Platforma', labelHu: 'Platform', value: 'UpGates CMS', valueHu: 'UpGates CMS' },
      { label: 'Rok', labelHu: 'Év', value: '2024–2025', valueHu: '2024–2025' },
      { label: 'Jazyk', labelHu: 'Nyelv', value: 'Slovenčina, Maďarčina', valueHu: 'Szlovák, Magyar' },
      { label: 'Typ', labelHu: 'Típus', value: 'E-commerce + Prezentácia', valueHu: 'E-commerce + Bemutató' },
    ],
    year: '2024',
  },
  nahrade: {
    id: 'nahrade',
    name: 'Na Hrade',
    heroImage: '/images/portfolio/nahrade/screenshots/01_homepage_hero.png',
    description: 'Život na Vodnom hrade v Štítniku — kultúrne a zážitkové centrum',
    descriptionHu: 'Élet a csetneki Vízivárban — kulturális és élményközpont',
    fullDescription:
      'Na Hrade — Život na Vodnom hrade v Štítniku. Kultúrne a zážitkové centrum v historickom hrade zo 14. storočia. Ponúka zvieratá, ihriská, šport, relax, kino, podujatia a umenie.\n\nPre Na Hrade sme vytvorili webovú stránku s moderným dizajnom v prírodných farbách.',
    fullDescriptionHu:
      'Na Hrade — Élet a csetneki Vízivárban. Kulturális és élményközpont egy 14. századi történelmi várban. Állatokat, játszótereket, sportot, pihenést, mozit, rendezvényeket és művészetet kínál.\n\nA Na Hrade számára modern dizájnú, természetes színvilágú weboldalt készítettünk.',
    location: 'Štítnik, Gemer, Slovensko',
    locationHu: 'Csetnek, Gömör, Szlovákia',
    clientType: 'Kultúrne centrum / Turistická atrakcia',
    clientTypeHu: 'Kulturális központ / Turisztikai látványosság',
    deliverables: [
      { name: 'Webová stránka', nameHu: 'Weboldal', icon: '🌐' },
      { name: 'Vizuálny dizajn', nameHu: 'Vizuális dizájn', icon: '🎨' },
      { name: 'Obsahová stratégia', nameHu: 'Tartalomstratégia', icon: '📝' },
      { name: 'Fotografia', nameHu: 'Fotózás', icon: '📸' },
      { name: 'Mediálny obsah', nameHu: 'Médiatartalom', icon: '🎬' },
    ],
    gallery: [
      {
        category: 'Webstránka',
        categoryHu: 'Weboldal',
        images: [
          '/images/portfolio/nahrade/screenshots/01_homepage_hero.png',
          '/images/portfolio/nahrade/screenshots/02_zvieratka_page.png',
          '/images/portfolio/nahrade/screenshots/03_detske_ihrisko_page.png',
          '/images/portfolio/nahrade/screenshots/04_akcie_page.png',
          '/images/portfolio/nahrade/screenshots/05_o_projektu_page.png',
          '/images/portfolio/nahrade/screenshots/06_kontakt_page.png',
        ],
      },
      {
        category: 'Fotografie',
        categoryHu: 'Fotók',
        images: [
          '/images/portfolio/nahrade/photos/castle-1.jpg',
          '/images/portfolio/nahrade/photos/castle-2.jpg',
          '/images/portfolio/nahrade/photos/castle-3.jpg',
          '/images/portfolio/nahrade/photos/castle-4.jpg',
        ],
      },
      {
        category: 'Marketingové materiály',
        categoryHu: 'Marketinganyagok',
        images: [
          '/images/portfolio/nahrade/materials/playground-poster.jpg',
          '/images/portfolio/nahrade/signs/wood-sign-01.jpg',
          '/images/portfolio/nahrade/signs/wood-sign-02.jpg',
        ],
      },
    ],
    links: [
      { label: 'Webová stránka', labelHu: 'Weboldal', url: 'https://www.nahrade.sk/', icon: '🌐' },
    ],
    techDetails: [
      { label: 'Platforma', labelHu: 'Platform', value: 'Wix', valueHu: 'Wix' },
      { label: 'Rok', labelHu: 'Év', value: '2024–2025', valueHu: '2024–2025' },
      { label: 'Jazyk', labelHu: 'Nyelv', value: 'Slovenčina', valueHu: 'Szlovák' },
      { label: 'Typ', labelHu: 'Típus', value: 'Informačný portál', valueHu: 'Információs portál' },
    ],
    year: '2024',
  },
};
