export interface Section {
  id: string;
  menuLabel: string;
  wallLabel?: string;
  /** cameraTarget: {x, y} maps to panX and panZ in the camera controller */
  cameraTarget: { x: number; y: number };
}

// Room layout reference (updated architecture):
// Room: 20 wide × 60 deep
// Left wall: X = -10  |  NO right wall (open view)
// Back wall: Z = -30  |  Front opening: Z = +30
// Wall A (Naše Služby front face): Z = 12, spans X = -4 to X = +10 (right-connected)
// Wall C (O projekte): Z = 3, freestanding, runs along Z axis, X = 0, length = 9
// Wall B split: Z = -8, LEFT half centre X ≈ -0.5, RIGHT half centre X ≈ 6.5
// HOW_WALL left only: Z = -16, left segment X = -7 (width = 7)
// Connecting wall: X = -4, runs from Z=12 backward 8 units to Z=4
// Events wall: X = 2, Z = 22, runs along Z axis
// Section 1 (front):    Z = 30 → 12
// Section 2 (mid):      Z = 12 → 3
// Section 3 (mid-back): Z = 3 → -8
// Section 4 (back):     Z = -8 → -30

export const sections: Section[] = [
  {
    id: 'o-projekte',
    menuLabel: 'Čo je GemMARK?',
    wallLabel: 'O projekte',
    // Wall C (freestanding rotated wall) at Z = 3, X = 0
    cameraTarget: { x: 2, y: 3 },
  },
  {
    id: 'preco-nazov-gemmark',
    menuLabel: 'Prečo názov GemMARK?',
    wallLabel: 'Prečo názov GemMARK?',
    // Left wall surface, back-left area at Z = -24
    cameraTarget: { x: -5, y: -24 },
  },
  {
    id: 'nasa-misia',
    menuLabel: 'Aká je naša misia?',
    wallLabel: 'Aká je naša misia?',
    // HOW_WALL left segment (Z = -16), X = -7
    cameraTarget: { x: -5, y: -16 },
  },
  {
    id: 'nase-sluzby',
    menuLabel: 'Čo tvoríme a za koľko?',
    wallLabel: 'Naše Služby',
    // Front face of Wall A (Z = 12), centre X = 3
    cameraTarget: { x: 3, y: 14 },
  },
  {
    id: 'portfolio',
    menuLabel: 'Pre koho sme už tvorili?',
    wallLabel: 'Portfólio',
    // Left wall, roughly mid-depth
    cameraTarget: { x: -8, y: 0 },
  },
  {
    id: 'kto-za-tym',
    menuLabel: 'Kto stojí za GemMARK?',
    wallLabel: 'Kto za tým',
    // Right half of back wall (Z = -30), X = 5
    cameraTarget: { x: 4, y: -26 },
  },
  {
    id: 'ako-to-funguje',
    menuLabel: 'Ako to funguje?',
    wallLabel: 'Ako to funguje?',
    // Wall B LEFT half front face (Z = -8), centre X ≈ -0.5
    cameraTarget: { x: -0.5, y: -6 },
  },
  {
    id: 'ako-sa-spojis',
    menuLabel: 'Ako sa s nami spojíš?',
    wallLabel: 'Ako sa s nami spojíš?',
    // Wall B RIGHT half front face (Z = -8), centre X ≈ 6.5
    cameraTarget: { x: 6.5, y: -6 },
  },
  {
    id: 'co-kedy-kde',
    menuLabel: 'Čo, kedy a kde sa u nás deje?',
    wallLabel: 'Čo, kedy a kde?',
    // Connecting wall from Wall A, X = -4, Z center = 16
    cameraTarget: { x: -2, y: 16 },
  },
];
