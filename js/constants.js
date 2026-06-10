// ============================================================
// constants.js — Données statiques du jeu PokéQuest
// Sprites · Variantes · Classes · Moves · Zones · Pokémon
// ============================================================

// ── Types doubles par id Pokémon ──────────────────────────
const DUAL_TYPES = {
  1:'Plante/Poison', 2:'Plante/Poison', 3:'Plante/Poison',
  6:'Feu/Vol', 12:'Insecte/Vol', 13:'Insecte/Poison', 14:'Insecte/Poison',
  15:'Insecte/Poison', 16:'Normal/Vol', 17:'Normal/Vol', 18:'Normal/Vol',
  21:'Normal/Vol', 22:'Normal/Vol', 29:'Poison', 30:'Poison', 31:'Poison/Sol',
  32:'Poison', 33:'Poison', 34:'Poison/Sol', 41:'Poison/Vol', 42:'Poison/Vol',
  43:'Plante/Poison', 44:'Plante/Poison', 45:'Plante/Poison', 46:'Insecte/Plante',
  47:'Insecte/Plante', 48:'Insecte/Poison', 49:'Insecte/Poison', 56:'Combat',
  57:'Combat', 60:'Eau', 61:'Eau/Psy', 62:'Eau/Combat', 66:'Combat',
  67:'Combat', 68:'Combat', 69:'Plante/Poison', 70:'Plante/Poison', 71:'Plante/Poison',
  72:'Eau/Poison', 73:'Eau/Poison', 79:'Eau/Psy', 80:'Eau/Psy',
  81:'Électrik/Acier', 82:'Électrik/Acier', 83:'Normal/Vol', 84:'Normal/Vol',
  85:'Normal/Vol', 90:'Eau', 91:'Eau/Glace', 92:'Spectre/Poison',
  93:'Spectre/Poison', 94:'Spectre/Poison', 95:'Roche/Sol', 98:'Eau',
  99:'Eau', 109:'Poison', 110:'Poison', 111:'Sol/Roche', 112:'Sol/Roche',
  114:'Plante', 116:'Eau', 117:'Eau', 118:'Eau', 119:'Eau', 120:'Eau',
  121:'Eau/Psy', 122:'Psy', 123:'Insecte/Vol', 124:'Glace/Psy',
  127:'Insecte', 129:'Eau', 130:'Eau/Vol', 131:'Eau/Glace',
  137:'Normal', 138:'Roche/Eau', 139:'Roche/Eau', 140:'Roche/Eau', 141:'Roche/Eau',
  142:'Roche/Vol', 147:'Dragon', 148:'Dragon', 149:'Dragon/Vol',
};

function getPokeType(id, baseType) { return DUAL_TYPES[id] || baseType; }
function getPokeType1(id, baseType) { const t = DUAL_TYPES[id] || baseType; return t.includes('/') ? t.split('/')[0] : t; }
function getPokeType2(id, baseType) { const t = DUAL_TYPES[id] || baseType; return t.includes('/') ? t.split('/')[1] : null; }

// ── Sprites PokeAPI ───────────────────────────────────────
const SPRITE_BASE  = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const SPRITE_FRONT = id => `${SPRITE_BASE}${id}.png`;
const SPRITE_BACK  = id => `${SPRITE_BASE}back/${id}.png`;
const SPRITE_SHINY = id => `${SPRITE_BASE}shiny/${id}.png`;

// ── Shiny ─────────────────────────────────────────────────
const SHINY_ODDS = 256; // 1/256 avant multiplicateurs

function rollShiny() {
  return Math.floor(Math.random() * getEffectiveShinyOdds()) === 0;
}
function applyShinyBoost(poke) {
  const B = 1.15;
  poke.atk   = Math.round(poke.atk   * B);
  poke.def   = Math.round(poke.def   * B);
  poke.spd   = Math.round(poke.spd   * B);
  poke.magic = Math.round(poke.magic * B);
  poke.maxHp = Math.round(poke.maxHp * B);
  poke.hp    = poke.maxHp;
  if (poke.spAtk) poke.spAtk = Math.round(poke.spAtk * B);
  if (poke.spDef) poke.spDef = Math.round(poke.spDef * B);
}

// ── Variantes de taille ───────────────────────────────────
const SIZE_VARIANTS = [
  { id:'lilliputien', label:'Lilliputien', emoji:'🔬', mult:0.80, color:'#a0c4ff' },
  { id:'petit',       label:'Petit',       emoji:'🔹', mult:0.92, color:'#bde0fe' },
  { id:'normal',      label:'Normal',      emoji:'⬜', mult:1.00, color:'#ffffff'  },
  { id:'grand',       label:'Grand',       emoji:'🔷', mult:1.10, color:'#ffd166' },
  { id:'géant',       label:'Géant',       emoji:'🔶', mult:1.25, color:'#ef9b20' },
  { id:'colossal',    label:'Colossal',    emoji:'🔴', mult:1.50, color:'#e63946' },
];
function rollSizeVariant() {
  const r = Math.random() * 100;
  if (r < 2)  return SIZE_VARIANTS[0];
  if (r < 15) return SIZE_VARIANTS[1];
  if (r < 65) return SIZE_VARIANTS[2];
  if (r < 90) return SIZE_VARIANTS[3];
  if (r < 98) return SIZE_VARIANTS[4];
  return SIZE_VARIANTS[5];
}
function applySizeVariant(poke, variant) {
  if (!variant || variant.id === 'normal') return;
  const m = variant.mult;
  poke.maxHp = Math.round(poke.maxHp * m);
  poke.hp    = poke.maxHp;
  poke.atk   = Math.round(poke.atk   * m);
  poke.def   = Math.round(poke.def   * m);
  poke.spd   = Math.round(poke.spd   * m);
  poke.magic = Math.round(poke.magic * m);
  if (poke.spAtk) poke.spAtk = Math.round(poke.spAtk * m);
  if (poke.spDef) poke.spDef = Math.round(poke.spDef * m);
}

// ── Classes (starters jouables) ───────────────────────────
const CLASSES = {
  'Évoli':     { id:133, evoId:136, evoName:'Pyroli',    evoLevel:36, sprite:133, type:'Normal',  hp:100, mp:60, atk:14, def:11, spd:14, magic:12, move:'Morsure',     mMove:'Vive-Attaque', moveElem:'Normal',  mMoveElem:'Normal',  moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}],                              animType:'normal' },
  'Carapuce':  { id:7,   evoId:8,   evoName:'Carabaffe', evoLevel:16, sprite:7,   type:'Eau',     hp:115, mp:55, atk:13, def:16, spd:8,  magic:10, move:'Pistolet-O',  mMove:'Écume',        moveElem:'Eau',     mMoveElem:'Eau',     moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}],                              animType:'water'  },
  'Salamèche': { id:4,   evoId:5,   evoName:'Reptincel', evoLevel:16, sprite:4,   type:'Feu',     hp:85,  mp:65, atk:19, def:8,  spd:16, magic:16, move:'Griffe',      mMove:'Flammèche',    moveElem:'Normal',  mMoveElem:'Feu',     moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:1},{n:'SuperPotion',img:'super-potion',q:1}], animType:'fire' },
  'Bulbizarre':{ id:1,   evoId:2,   evoName:'Herbizarre',evoLevel:16, sprite:1,   type:'Plante',  hp:105, mp:80, atk:12, def:12, spd:9,  magic:18, move:'Fouet-Liane', mMove:'Poudre Toxik', moveElem:'Plante',  mMoveElem:'Poison',  moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:3}],                              animType:'leaf'   },
};

// ── Chaînes d'évolution ───────────────────────────────────
const EVO_CHAINS = {
  133:{next:136,name:'Pyroli',    level:36},
  136:{next:197,name:'Noctali',   level:50},
  7:  {next:8,  name:'Carabaffe', level:16},
  8:  {next:9,  name:'Tortank',   level:36},
  4:  {next:5,  name:'Reptincel', level:16},
  5:  {next:6,  name:'Dracaufeu', level:36},
  1:  {next:2,  name:'Herbizarre',level:16},
  2:  {next:3,  name:'Florizarre',level:32},
};

// ── Ennemis génériques (zones libres) ─────────────────────
const ENEMIES = [
  { name:'Rattata',   id:19,  hp:35,  atk:7,  def:2, xp:18, gold:10, type:'Normal'   },
  { name:'Tentacool', id:72,  hp:40,  atk:9,  def:3, xp:22, gold:14, type:'Eau'      },
  { name:'Magnéti',   id:81,  hp:50,  atk:12, def:5, xp:30, gold:20, type:'Électrik' },
  { name:'Dracolosse',id:149, hp:95,  atk:22, def:9, xp:65, gold:55, type:'Dragon'   },
  { name:'Mentali',   id:96,  hp:45,  atk:10, def:4, xp:25, gold:18, type:'Psy'      },
  { name:'Lokhlass',  id:131, hp:70,  atk:15, def:8, xp:42, gold:35, type:'Eau'      },
  { name:'Salamèche', id:4,   hp:30,  atk:6,  def:3, xp:15, gold:8,  type:'Feu'      },
  { name:'Pikachu',   id:25,  hp:38,  atk:9,  def:3, xp:20, gold:12, type:'Électrik' },
  { name:'Psykokwak', id:54,  hp:45,  atk:8,  def:4, xp:23, gold:16, type:'Eau'      },
  { name:'Goupix',    id:37,  hp:38,  atk:8,  def:3, xp:18, gold:11, type:'Feu'      },
];

// ── Messages d'ambiance lors des explorations ─────────────
const EVENTS = [
  "Vous longez la plage… des empreintes de Pokémon mènent vers la mer.",
  "Un vieux Professeur Pokémon vous offre un Pokédex abîmé mais fonctionnel !",
  "Un Ronflex bloque le chemin et ronfle bruyamment. Il faut contourner.",
  "Vous trouvez une CT mystérieuse à moitié enfouie dans le sable.",
  "Une lumière bleue pulse au large… un Pokémon Légendaire ?",
  "Des ruines anciennes émergent des eaux peu profondes. Des hiéroglyphes Pokémon !",
  "Une Lougaroc hurle à la lune depuis la falaise voisine.",
  "Un Hypocéan semble vous observer depuis les profondeurs translucides.",
];

// ── Boutique ──────────────────────────────────────────────
const SHOP_ITEMS = [
  { id:'pokeball',    name:'Poké Ball',    desc:'Taux de capture: 1×',    price:200,   catchRate:1,   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',    type:'ball' },
  { id:'superball',   name:'Super Ball',   desc:'Taux de capture: 1.5×',  price:600,   catchRate:1.5, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',  type:'ball' },
  { id:'hyperball',   name:'Hyper Ball',   desc:'Taux de capture: 2×',    price:1200,  catchRate:2,   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',  type:'ball' },
  { id:'masterball',  name:'Master Ball',  desc:'Capture garantie !',     price:150000,catchRate:999, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png', type:'ball' },
  { id:'potion',      name:'Potion',       desc:'Restaure 25% des PV max', price:200,   healPct:0.25,  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',     type:'heal' },
  { id:'superpotion', name:'Super Potion', desc:'Restaure 50% des PV max', price:500,   healPct:0.50,  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png',type:'heal' },
  { id:'hyperpotion', name:'Hyper Potion', desc:'Restaure 100% des PV max',price:900,   healPct:1.00,  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png',type:'heal' },
];

// ── Taux de capture officiels (1-255, 3=légendaire) ───────
const POKE_CATCH_RATES = {
  1:45,2:45,3:45,4:45,5:45,6:45,7:45,8:45,9:45,
  10:255,11:120,12:45,13:255,14:120,15:45,
  16:255,17:120,18:45,19:255,20:127,21:255,22:90,23:255,24:90,
  25:190,26:75,27:255,28:90,29:235,30:120,31:45,32:235,33:120,34:45,
  35:150,36:75,37:190,38:75,39:170,40:75,
  41:255,42:90,43:255,44:120,45:45,46:190,47:75,48:255,49:75,
  50:255,51:100,52:255,53:90,54:190,55:75,56:190,57:75,58:190,59:75,
  60:255,61:120,62:45,63:200,64:100,65:45,
  66:180,67:90,68:45,69:255,70:120,71:45,72:190,73:60,74:255,75:120,76:45,
  77:190,78:75,79:190,80:75,81:190,82:60,83:45,84:190,85:75,
  86:190,87:75,88:190,89:75,90:190,91:60,92:190,93:90,94:45,
  95:30,96:190,97:75,98:190,99:60,100:190,101:60,102:190,103:45,
  104:190,105:75,106:45,107:45,108:45,109:190,110:60,111:120,112:60,
  113:30,114:45,115:45,116:225,117:75,118:225,119:60,120:225,121:60,
  122:45,123:45,124:45,125:45,126:45,127:45,128:45,129:255,130:45,
  131:45,132:35,133:45,134:45,135:45,136:45,137:45,138:45,139:45,
  140:45,141:45,142:45,143:25,144:3,145:3,146:3,147:45,148:15,149:45,150:3,151:45,
  152:45,153:45,154:45,155:45,156:45,157:45,158:45,159:45,160:45,
  161:255,162:127,163:255,164:100,165:255,166:120,167:255,168:90,
  170:190,171:75,172:190,175:190,176:75,177:190,178:75,
  179:235,180:120,181:45,183:250,184:150,187:255,188:120,189:45,
  194:255,195:75,196:45,197:45,204:120,209:190,210:75,
  216:120,217:60,218:190,219:75,220:225,221:60,223:225,224:75,
  228:120,229:45,231:190,232:60,236:180,237:45,246:45,247:15,248:45,
  249:3,250:3,251:45,243:3,244:3,245:3,
  252:45,253:45,254:45,255:45,256:45,257:45,258:45,259:45,260:45,
  261:255,262:127,263:255,264:90,280:235,281:120,282:45,285:190,286:75,
  290:255,291:75,296:180,297:90,304:235,305:120,306:45,307:190,308:75,
  309:235,310:120,318:225,319:60,322:190,323:75,328:255,329:120,330:45,
  333:190,334:45,349:255,350:60,361:190,362:75,363:225,364:60,365:45,
  371:45,372:45,373:45,374:235,375:120,376:30,
  377:3,378:3,379:3,380:3,381:3,382:3,383:3,384:3,385:45,386:3,
  387:45,390:45,393:45,495:45,498:45,501:45,650:45,653:45,656:45,
  722:45,725:45,728:45,810:45,813:45,816:45,906:45,909:45,912:45,
};
function getEnemyCatchRate(id) {
  if (POKE_CATCH_RATES[id] !== undefined) return POKE_CATCH_RATES[id];
  if (typeof LEGENDARIES_IDS !== 'undefined' && LEGENDARIES_IDS.includes(id)) return 3;
  return 90;
}

// ── Affichage des items (icônes + noms) ───────────────────
const ITEM_DISPLAY = {
  potion:       { name:'Potion',        img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png'        },
  superpotion:  { name:'Super Potion',  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png'  },
  hyperpotion:  { name:'Hyper Potion',  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png'  },
  pokeball:     { name:'Poké Ball',     img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'     },
  superball:    { name:'Super Ball',    img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png'    },
  hyperball:    { name:'Hyper Ball',    img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png'    },
  masterball:   { name:'Master Ball',   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'   },
  ct:           { name:'CT Mystère',    img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png'     },
  'shiny-gem':  { name:'Gemme Éclat',   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/shiny-stone.png'  },
  'orb-bird':   { name:'Orbe Oiseau',   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/fire-stone.png'   },
  'orb-beast':  { name:'Orbe Bête',     img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/thunder-stone.png'},
  'orb-golem':  { name:'Orbe Golem',    img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/water-stone.png'  },
  'orb-dragon': { name:'Orbe Dragon',   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dragon-scale.png' },
  'orb-space':  { name:'Orbe Espace',   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dawn-stone.png'   },
  'orb-mega':   { name:'Orbe Méga',     img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dusk-stone.png'   },
  'orb-ancient':{ name:'Orbe Ancestral',img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/sun-stone.png'    },
  'orb-ultra':  { name:'Orbe Ultime',   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oval-stone.png'   },
};

// ── Base de données des attaques ──────────────────────────
// cat: 'phy'=Physique · 'spe'=Spéciale · 'sta'=Statut
const MOVES_DB = {
  // Normal
  'Charge'              :{type:'Normal',   cat:'phy',pow:40,  acc:100,pp:35,desc:'Attaque normale de base.'},
  'Morsure'             :{type:'Normal',   cat:'phy',pow:60,  acc:100,pp:25,desc:'Peut faire reculer.'},
  'Coup d\'Suif'        :{type:'Normal',   cat:'phy',pow:35,  acc:85, pp:10,desc:'Charge sauvage. Peut rater.'},
  'Tranche'             :{type:'Normal',   cat:'phy',pow:70,  acc:100,pp:20,desc:'Taux de critique élevé.'},
  'Jackpot'             :{type:'Normal',   cat:'phy',pow:18,  acc:100,pp:10,desc:'Frappe 2 à 5 fois.'},
  'Griffe'              :{type:'Normal',   cat:'phy',pow:40,  acc:100,pp:35,desc:'Griffe l\'ennemi.'},
  'Coup d\'Boule'       :{type:'Normal',   cat:'phy',pow:70,  acc:100,pp:15,desc:'Choc frontal puissant.'},
  'Koud\'Korne'         :{type:'Normal',   cat:'phy',pow:65,  acc:100,pp:25,desc:'Frappe avec des cornes.'},
  'Écrasement'          :{type:'Normal',   cat:'phy',pow:65,  acc:100,pp:20,desc:'Peut baisser la Défense.'},
  'Ultimapoing'         :{type:'Normal',   cat:'phy',pow:80,  acc:100,pp:5, desc:'Peut infliger n\'importe quel statut.'},
  'Vive-Attaque'        :{type:'Normal',   cat:'phy',pow:40,  acc:100,pp:30,desc:'Toujours en premier.'},
  'Rugissement'         :{type:'Normal',   cat:'sta',pow:0,   acc:100,pp:40,desc:'Baisse l\'Attaque ennemi.'},
  'Rugissement de Guerre':{type:'Normal',  cat:'sta',pow:0,   acc:100,pp:20,desc:'Monte l\'Attaque du lanceur.'},
  'Méga-Sangsue'        :{type:'Normal',   cat:'spe',pow:20,  acc:100,pp:10,desc:'Absorbe 1/2 des dégâts infligés.'},
  'Berceuse'            :{type:'Normal',   cat:'sta',pow:0,   acc:55, pp:15,desc:'Endort l\'adversaire.'},
  'Cyclone'             :{type:'Normal',   cat:'spe',pow:40,  acc:85, pp:20,desc:'Tempête d\'air.'},
  'Coupe'               :{type:'Normal',   cat:'phy',pow:50,  acc:95, pp:30,desc:'Taux de critique élevé. HM01.'},
  'Force'               :{type:'Normal',   cat:'phy',pow:80,  acc:100,pp:15,desc:'Frappe puissante. HM04.'},
  'Éclate-Roc'          :{type:'Normal',   cat:'phy',pow:40,  acc:100,pp:15,desc:'HM06. Réduit la Défense.'},
  'Double-Pied'         :{type:'Normal',   cat:'phy',pow:30,  acc:100,pp:30,desc:'Frappe 2 fois.'},
  'Grobisou'            :{type:'Normal',   cat:'sta',pow:0,   acc:75, pp:20,desc:'Peut paralyser ou endormir.'},
  'Metronome'           :{type:'Normal',   cat:'sta',pow:0,   acc:100,pp:10,desc:'Utilise une attaque aléatoire.'},
  'Bomb-Oeuf'           :{type:'Normal',   cat:'phy',pow:100, acc:75, pp:10,desc:'Très puissant mais peu précis.'},
  'Damoclès'            :{type:'Normal',   cat:'phy',pow:120, acc:100,pp:10,desc:'L\'utilisateur perd 1/2 de ses PV.'},
  'Explosion'           :{type:'Normal',   cat:'phy',pow:250, acc:100,pp:5, desc:'L\'utilisateur s\'évanouit.'},
  'Amnésie'             :{type:'Normal',   cat:'sta',pow:0,   acc:100,pp:20,desc:'Monte massivement la Défense Spéciale.'},
  'Triplé-Pied'         :{type:'Normal',   cat:'phy',pow:10,  acc:90, pp:10,desc:'Frappe 3 fois, puissance croissante.'},
  'Tranche-Nuit'        :{type:'Normal',   cat:'phy',pow:70,  acc:100,pp:15,desc:'Taux de critique élevé.'},
  // Feu
  'Flammèche'           :{type:'Feu',      cat:'spe',pow:40,  acc:100,pp:25,desc:'Peut brûler l\'ennemi.'},
  'Lance-Flammes'       :{type:'Feu',      cat:'spe',pow:90,  acc:100,pp:15,desc:'Peut brûler. CT38.'},
  'Déflagration'        :{type:'Feu',      cat:'spe',pow:110, acc:85, pp:5, desc:'Très puissant. Peut brûler. CT38.'},
  'Jet de Feu'          :{type:'Feu',      cat:'spe',pow:95,  acc:100,pp:15,desc:'Puissant. Peut brûler.'},
  'Roue de Feu'         :{type:'Feu',      cat:'spe',pow:60,  acc:100,pp:25,desc:'Peut brûler.'},
  'Feu Follet'          :{type:'Feu',      cat:'sta',pow:0,   acc:85, pp:15,desc:'Brûle l\'adversaire.'},
  'Plénitude'           :{type:'Feu',      cat:'sta',pow:0,   acc:100,pp:5, desc:'Restaure les PV du lanceur.'},
  // Eau
  'Pistolet-O'          :{type:'Eau',      cat:'spe',pow:65,  acc:100,pp:25,desc:'Jet d\'eau puissant.'},
  'Écume'               :{type:'Eau',      cat:'spe',pow:20,  acc:100,pp:30,desc:'Peut baisser la Vitesse ennemi.'},
  'Hydrocanon'          :{type:'Eau',      cat:'spe',pow:110, acc:80, pp:5, desc:'Attaque d\'eau maximale. CT12.'},
  'Surf'                :{type:'Eau',      cat:'spe',pow:90,  acc:100,pp:15,desc:'HM03. Frappe tous les ennemis.'},
  'Cascade'             :{type:'Eau',      cat:'phy',pow:80,  acc:100,pp:15,desc:'HM07. Peut faire reculer.'},
  'Bulles d\'O'         :{type:'Eau',      cat:'spe',pow:65,  acc:100,pp:20,desc:'Peut baisser la Vitesse ennemi.'},
  'Jackbulles'          :{type:'Eau',      cat:'spe',pow:25,  acc:100,pp:30,desc:'Frappe 2 à 5 fois.'},
  'Aqua-Jet'            :{type:'Eau',      cat:'phy',pow:40,  acc:100,pp:20,desc:'Toujours en premier.'},
  'Nappe-O'             :{type:'Eau',      cat:'spe',pow:60,  acc:100,pp:20,desc:'Peut baisser la Défense.'},
  'Blizzard'            :{type:'Glace',    cat:'spe',pow:110, acc:70, pp:5, desc:'Peut geler. CT14.'},
  // Plante
  'Fouet-Liane'         :{type:'Plante',   cat:'phy',pow:45,  acc:100,pp:25,desc:'Frappe avec des lianes.'},
  'Tranch\'Herbe'       :{type:'Plante',   cat:'phy',pow:55,  acc:95, pp:25,desc:'Taux de critique élevé.'},
  'Lance-Soleil'        :{type:'Plante',   cat:'spe',pow:120, acc:100,pp:10,desc:'Charge 1 tour, frappe le 2e.'},
  'Végé-Attak'          :{type:'Plante',   cat:'spe',pow:65,  acc:100,pp:20,desc:'Peut paralyser.'},
  'Méga-Drain'          :{type:'Plante',   cat:'spe',pow:40,  acc:100,pp:15,desc:'Absorbe des PV. CT21.'},
  'Poudre Toxik'        :{type:'Poison',   cat:'sta',pow:0,   acc:75, pp:35,desc:'Empoisonne l\'adversaire.'},
  'Spore'               :{type:'Plante',   cat:'sta',pow:0,   acc:100,pp:15,desc:'Endort l\'adversaire. 100% précis.'},
  // Électrik
  'Tonnerre'            :{type:'Électrik', cat:'spe',pow:90,  acc:100,pp:15,desc:'Peut paralyser. CT24.'},
  'Foudre'              :{type:'Électrik', cat:'spe',pow:110, acc:70, pp:10,desc:'Peut paralyser. CT25.'},
  'Cage-Éclair'         :{type:'Électrik', cat:'spe',pow:40,  acc:100,pp:30,desc:'Paralyse l\'adversaire.'},
  'Éclair'              :{type:'Électrik', cat:'sta',pow:0,   acc:100,pp:20,desc:'Paralyse toujours.'},
  'Champ-Élec'          :{type:'Électrik', cat:'sta',pow:0,   acc:100,pp:10,desc:'Booste les att. Élec.'},
  // Psy
  'Psyko'               :{type:'Psy',      cat:'spe',pow:90,  acc:100,pp:10,desc:'Peut baisser la Défense Spé. CT29.'},
  'Télékinésie'         :{type:'Psy',      cat:'spe',pow:50,  acc:100,pp:25,desc:'Peut baisser la Défense Spé.'},
  'Hypnose'             :{type:'Psy',      cat:'sta',pow:0,   acc:60, pp:20,desc:'Endort l\'adversaire.'},
  'Regard Médusant'     :{type:'Psy',      cat:'sta',pow:0,   acc:100,pp:30,desc:'Paralyse l\'adversaire.'},
  'Détection'           :{type:'Psy',      cat:'sta',pow:0,   acc:100,pp:5, desc:'Esquive toute attaque.'},
  'Amnesie'             :{type:'Psy',      cat:'sta',pow:0,   acc:100,pp:20,desc:'Monte fortement la Défense Spé.'},
  'Rayon Récup'         :{type:'Psy',      cat:'sta',pow:0,   acc:100,pp:20,desc:'Soigne un allié.'},
  // Glace
  'Blizzard2'           :{type:'Glace',    cat:'spe',pow:110, acc:70, pp:5, desc:'Peut geler.'},
  'Vent Glace'          :{type:'Glace',    cat:'spe',pow:55,  acc:95, pp:15,desc:'Baisse la Vitesse ennemi.'},
  'Laser Glace'         :{type:'Glace',    cat:'spe',pow:90,  acc:100,pp:10,desc:'Peut geler. CT13.'},
  'Jackfrost'           :{type:'Glace',    cat:'spe',pow:40,  acc:100,pp:30,desc:'Peut geler.'},
  'Avalanche'           :{type:'Glace',    cat:'phy',pow:60,  acc:100,pp:10,desc:'Double si touché ce tour.'},
  // Combat
  'Poing de Feu'        :{type:'Combat',   cat:'phy',pow:75,  acc:100,pp:15,desc:'Peut brûler.'},
  'Coup de Boule'       :{type:'Combat',   cat:'phy',pow:70,  acc:100,pp:15,desc:'Frappe la tête.'},
  'Uppercut'            :{type:'Combat',   cat:'phy',pow:70,  acc:100,pp:15,desc:'Peut faire reculer.'},
  'Frappe Atlas'        :{type:'Combat',   cat:'phy',pow:80,  acc:100,pp:5, desc:'Recharge au tour suivant.'},
  'Soumission'          :{type:'Combat',   cat:'phy',pow:80,  acc:80, pp:20,desc:'Utilisateur perd 1/4 des dégâts.'},
  'Pied Karaté'         :{type:'Combat',   cat:'phy',pow:50,  acc:90, pp:10,desc:'Toujours critique.'},
  'Mégaphone'           :{type:'Combat',   cat:'sta',pow:0,   acc:100,pp:10,desc:'Monte fortement l\'Attaque.'},
  'Close Combat'        :{type:'Combat',   cat:'phy',pow:120, acc:100,pp:5, desc:'Baisse Déf et Déf Spé.'},
  // Poison
  'Dard-Venin'          :{type:'Poison',   cat:'phy',pow:15,  acc:100,pp:35,desc:'Peut empoisonner.'},
  'Smog'                :{type:'Poison',   cat:'spe',pow:30,  acc:70, pp:20,desc:'Peut empoisonner.'},
  'Souplesse'           :{type:'Poison',   cat:'phy',pow:80,  acc:100,pp:20,desc:'Toujours frappe l\'adversaire.'},
  'Toxik'               :{type:'Poison',   cat:'sta',pow:0,   acc:90, pp:10,desc:'Empoisonnement sévère. CT06.'},
  'Acide'               :{type:'Poison',   cat:'spe',pow:40,  acc:100,pp:30,desc:'Peut baisser la Défense Spé.'},
  // Sol
  'Séisme'              :{type:'Sol',      cat:'phy',pow:100, acc:100,pp:10,desc:'Frappe tout le monde. CT26.'},
  'Tremblement'         :{type:'Sol',      cat:'phy',pow:60,  acc:100,pp:20,desc:'Frappe les proies enracinées.'},
  'Digger'              :{type:'Sol',      cat:'phy',pow:80,  acc:100,pp:10,desc:'Se cache, frappe au tour suivant.'},
  'Sablé-Tempête'       :{type:'Sol',      cat:'spe',pow:60,  acc:70, pp:10,desc:'Baisse la précision.'},
  // Roche
  'Éboulement'          :{type:'Roche',    cat:'phy',pow:75,  acc:90, pp:10,desc:'Peut faire reculer.'},
  'Lancer-Rocher'       :{type:'Roche',    cat:'phy',pow:50,  acc:90, pp:15,desc:'Peut faire reculer.'},
  'Tête de Roc'         :{type:'Roche',    cat:'phy',pow:100, acc:80, pp:5, desc:'Très puissant.'},
  'Joyau de Pierre'     :{type:'Roche',    cat:'phy',pow:60,  acc:95, pp:15,desc:'Peut baisser la Défense Spé.'},
  // Spectre
  'Lèche-Langue'        :{type:'Spectre',  cat:'phy',pow:30,  acc:100,pp:30,desc:'Peut paralyser.'},
  'Ball\'Ombre'         :{type:'Spectre',  cat:'spe',pow:80,  acc:100,pp:15,desc:'Peut baisser la Défense Spé.'},
  'Malédiction'         :{type:'Spectre',  cat:'sta',pow:0,   acc:100,pp:10,desc:'Spectre: inflige dégâts/tour.'},
  // Dragon
  'Drakkarion'          :{type:'Dragon',   cat:'spe',pow:60,  acc:100,pp:20,desc:'Peut paralyser.'},
  'Comète Poing'        :{type:'Dragon',   cat:'phy',pow:100, acc:50, pp:5, desc:'Très puissant mais peu précis.'},
  'Draco-Météore'       :{type:'Dragon',   cat:'spe',pow:130, acc:90, pp:5, desc:'Baisse l\'Attaque Spé.'},
  'Colère'              :{type:'Dragon',   cat:'spe',pow:120, acc:100,pp:10,desc:'Recharge le tour suivant.'},
  // Vol
  'Tranche-Aile'        :{type:'Vol',      cat:'phy',pow:60,  acc:100,pp:35,desc:'Toujours en premier.'},
  'Tornade'             :{type:'Vol',      cat:'spe',pow:40,  acc:70, pp:35,desc:'Peut faire reculer.'},
  'Aéropique'           :{type:'Vol',      cat:'phy',pow:80,  acc:100,pp:15,desc:'CT19. Toujours en premier.'},
  'Envol'               :{type:'Vol',      cat:'phy',pow:90,  acc:95, pp:15,desc:'S\'envole, frappe au tour suivant.'},
  'Danse-Plume'         :{type:'Vol',      cat:'sta',pow:0,   acc:100,pp:15,desc:'Baisse l\'Attaque ennemi.'},
  // Insecte
  'Coupe-Vent'          :{type:'Insecte',  cat:'spe',pow:60,  acc:100,pp:25,desc:'Taux de critique élevé.'},
  'Dard-Nuée'           :{type:'Insecte',  cat:'phy',pow:25,  acc:100,pp:30,desc:'Frappe 2 à 5 fois.'},
  'Vibraqua'            :{type:'Insecte',  cat:'spe',pow:90,  acc:100,pp:10,desc:'Peut paralyser.'},
  'Piqûre'              :{type:'Insecte',  cat:'phy',pow:45,  acc:100,pp:20,desc:'Peut baisser Déf Spé.'},
  // Acier
  'Tranche-Métal'       :{type:'Acier',    cat:'phy',pow:80,  acc:100,pp:15,desc:'Taux de critique élevé.'},
  'Coup d\'Acier'       :{type:'Acier',    cat:'phy',pow:50,  acc:100,pp:40,desc:'Monte la Défense.'},
  'Météores'            :{type:'Acier',    cat:'phy',pow:90,  acc:100,pp:10,desc:'Toujours critique.'},
  // Ténèbres
  'Mâchouille'          :{type:'Ténèbres', cat:'phy',pow:60,  acc:100,pp:25,desc:'Peut baisser la Défense Spé.'},
  'Jackpot Nuit'        :{type:'Ténèbres', cat:'phy',pow:60,  acc:100,pp:20,desc:'Peut faire reculer.'},
  'Faux Chage'          :{type:'Ténèbres', cat:'phy',pow:40,  acc:100,pp:40,desc:'Laisse 1 PV à l\'ennemi.'},
  'Tranche Nuit'        :{type:'Ténèbres', cat:'phy',pow:70,  acc:100,pp:15,desc:'Taux de critique élevé.'},
  // Fée
  'Éclat Magique'       :{type:'Fée',      cat:'spe',pow:80,  acc:100,pp:10,desc:'Peut modifier les stats.'},
  'Lumière Lune'        :{type:'Fée',      cat:'sta',pow:0,   acc:100,pp:5, desc:'Restaure les PV.'},
  // Statuts généraux
  'Hâte'                :{type:'Normal',   cat:'sta',pow:0,   acc:100,pp:30,desc:'Double la Vitesse.'},
  'Abri'                :{type:'Normal',   cat:'sta',pow:0,   acc:100,pp:10,desc:'Réduit les dégâts reçus.'},
  'Armure'              :{type:'Normal',   cat:'sta',pow:0,   acc:100,pp:30,desc:'Monte la Défense.'},
  'Trempette'           :{type:'Normal',   cat:'sta',pow:0,   acc:100,pp:20,desc:'Monte l\'Attaque et la Défense.'},
  'Danse Lame'          :{type:'Normal',   cat:'sta',pow:0,   acc:100,pp:20,desc:'Monte fortement l\'Attaque.'},
  'Jackpot Soin'        :{type:'Normal',   cat:'sta',pow:0,   acc:100,pp:10,desc:'Restaure les PV du lanceur.'},
};

// ── CTs (Capsules Techniques) ─────────────────────────────
const CT_LIST = [
  { id:'ct01', name:'CT01 – Tranche',      move:'Tranche',       price:800,  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png'   },
  { id:'ct06', name:'CT06 – Toxik',         move:'Toxik',         price:900,  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-poison.png'  },
  { id:'ct10', name:'CT10 – Jackpot',       move:'Jackpot',       price:700,  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png'  },
  { id:'ct12', name:'CT12 – Hydrocanon',    move:'Hydrocanon',    price:2000, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-water.png'   },
  { id:'ct13', name:'CT13 – Laser Glace',   move:'Laser Glace',   price:1800, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-ice.png'    },
  { id:'ct14', name:'CT14 – Blizzard',      move:'Blizzard',      price:2200, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-ice.png'    },
  { id:'ct15', name:'CT15 – Damoclès',      move:'Damoclès',      price:3000, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png'  },
  { id:'ct19', name:'CT19 – Aéropique',     move:'Aéropique',     price:1200, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-flying.png' },
  { id:'ct21', name:'CT21 – Méga-Drain',    move:'Méga-Drain',    price:1400, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-grass.png'  },
  { id:'ct24', name:'CT24 – Tonnerre',      move:'Tonnerre',      price:1600, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-electric.png'},
  { id:'ct25', name:'CT25 – Foudre',        move:'Foudre',        price:2400, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-electric.png'},
  { id:'ct26', name:'CT26 – Séisme',        move:'Séisme',        price:2000, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-ground.png' },
  { id:'ct29', name:'CT29 – Psyko',         move:'Psyko',         price:1800, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-psychic.png'},
  { id:'ct38', name:'CT38 – Lance-Flammes', move:'Lance-Flammes', price:1800, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fire.png'   },
  { id:'ct50', name:'CT50 – Déflagration',  move:'Déflagration',  price:2800, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fire.png'   },
  { id:'ct51', name:'CT51 – Close Combat',  move:'Close Combat',  price:2500, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fighting.png'},
  { id:'ct52', name:'CT52 – Draco-Météore', move:'Draco-Météore', price:3500, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-dragon.png' },
  { id:'ct53', name:'CT53 – Ball\'Ombre',   move:'Ball\'Ombre',   price:1600, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-ghost.png'  },
  { id:'ct54', name:'CT54 – Danse Lame',    move:'Danse Lame',    price:1200, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-normal.png'  },
  { id:'ct55', name:'CT55 – Surf',          move:'Surf',          price:2000, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-water.png'  },
];

// ── Attaques apprises par niveau par type ─────────────────
const LEVEL_UP_MOVES = {
  'Normal':    [{lv:1,move:'Charge'},{lv:5,move:'Rugissement'},{lv:9,move:'Morsure'},{lv:13,move:'Vive-Attaque'},{lv:17,move:'Rugissement de Guerre'},{lv:21,move:'Tranche'},{lv:25,move:'Coup d\'Boule'},{lv:29,move:'Damoclès'},{lv:33,move:'Explosion'},{lv:40,move:'Tranche-Nuit'}],
  'Feu':       [{lv:1,move:'Griffe'},{lv:5,move:'Flammèche'},{lv:9,move:'Rugissement'},{lv:13,move:'Lance-Flammes'},{lv:17,move:'Danse Lame'},{lv:21,move:'Roue de Feu'},{lv:25,move:'Jet de Feu'},{lv:30,move:'Déflagration'},{lv:36,move:'Feu Follet'},{lv:42,move:'Damoclès'}],
  'Eau':       [{lv:1,move:'Pistolet-O'},{lv:5,move:'Écume'},{lv:9,move:'Rugissement'},{lv:13,move:'Bulles d\'O'},{lv:17,move:'Surf'},{lv:21,move:'Hydrocanon'},{lv:25,move:'Aqua-Jet'},{lv:30,move:'Cascade'},{lv:36,move:'Blizzard'}],
  'Plante':    [{lv:1,move:'Fouet-Liane'},{lv:5,move:'Rugissement'},{lv:9,move:'Poudre Toxik'},{lv:13,move:'Végé-Attak'},{lv:17,move:'Tranch\'Herbe'},{lv:21,move:'Méga-Drain'},{lv:25,move:'Spore'},{lv:30,move:'Lance-Soleil'}],
  'Électrik':  [{lv:1,move:'Cage-Éclair'},{lv:5,move:'Éclair'},{lv:9,move:'Rugissement de Guerre'},{lv:13,move:'Tonnerre'},{lv:17,move:'Hâte'},{lv:21,move:'Foudre'},{lv:28,move:'Champ-Élec'}],
  'Psy':       [{lv:1,move:'Télékinésie'},{lv:5,move:'Hypnose'},{lv:9,move:'Regard Médusant'},{lv:13,move:'Psyko'},{lv:17,move:'Amnesie'},{lv:21,move:'Détection'},{lv:28,move:'Rayon Récup'}],
  'Dragon':    [{lv:1,move:'Drakkarion'},{lv:7,move:'Rugissement de Guerre'},{lv:14,move:'Colère'},{lv:21,move:'Hâte'},{lv:28,move:'Comète Poing'},{lv:35,move:'Draco-Météore'}],
  'Vol':       [{lv:1,move:'Tornade'},{lv:5,move:'Tranche-Aile'},{lv:9,move:'Rugissement'},{lv:13,move:'Aéropique'},{lv:17,move:'Danse-Plume'},{lv:21,move:'Envol'}],
  'Roche':     [{lv:1,move:'Lancer-Rocher'},{lv:6,move:'Armure'},{lv:11,move:'Éboulement'},{lv:16,move:'Tête de Roc'},{lv:22,move:'Séisme'}],
  'Sol':       [{lv:1,move:'Séisme'},{lv:5,move:'Sablé-Tempête'},{lv:10,move:'Tremblement'},{lv:15,move:'Digger'},{lv:22,move:'Éclate-Roc'}],
  'Spectre':   [{lv:1,move:'Lèche-Langue'},{lv:5,move:'Malédiction'},{lv:9,move:'Hypnose'},{lv:13,move:'Ball\'Ombre'},{lv:19,move:'Psyko'}],
  'Poison':    [{lv:1,move:'Dard-Venin'},{lv:5,move:'Acide'},{lv:9,move:'Poudre Toxik'},{lv:13,move:'Toxik'},{lv:17,move:'Smog'},{lv:22,move:'Souplesse'}],
  'Combat':    [{lv:1,move:'Pied Karaté'},{lv:5,move:'Mégaphone'},{lv:9,move:'Uppercut'},{lv:13,move:'Frappe Atlas'},{lv:17,move:'Soumission'},{lv:22,move:'Close Combat'}],
  'Insecte':   [{lv:1,move:'Dard-Nuée'},{lv:5,move:'Piqûre'},{lv:9,move:'Coupe-Vent'},{lv:14,move:'Vibraqua'}],
  'Glace':     [{lv:1,move:'Jackfrost'},{lv:5,move:'Vent Glace'},{lv:10,move:'Laser Glace'},{lv:15,move:'Avalanche'},{lv:21,move:'Blizzard'}],
  'Acier':     [{lv:1,move:'Coup d\'Acier'},{lv:6,move:'Tranche-Métal'},{lv:12,move:'Météores'}],
  'Ténèbres':  [{lv:1,move:'Mâchouille'},{lv:5,move:'Jackpot Nuit'},{lv:9,move:'Faux Chage'},{lv:14,move:'Tranche Nuit'}],
  'Fée':       [{lv:1,move:'Éclat Magique'},{lv:7,move:'Lumière Lune'},{lv:13,move:'Rugissement'}],
};

/** Attaques disponibles pour un Pokémon donné selon son niveau et type */
function getLearnableMoves(poke) {
  const moves = LEVEL_UP_MOVES[poke.type] || LEVEL_UP_MOVES['Normal'];
  return moves.filter(m => m.lv <= poke.level && MOVES_DB[m.move]);
}

/** Convertit un type en animation de combat */
function typeToAnim(type) {
  const map = { Feu:'fire', Eau:'water', Plante:'leaf', Électrik:'thunder' };
  return map[type] || 'normal';
}

// ── Niveaux min/max par zone ───────────────────────────────
const ZONE_LEVELS = {
  // Kanto principal
  'bourg-palette': [1,  10], 'route-3':       [8,  18], 'foret-jade':    [14, 24],
  'mt-lune':       [20, 32], 'argenta':        [28, 40], 'brindibourg':   [36, 48],
  'route-5-6':     [43, 55], 'celadopole':     [50, 62], 'route-9-10':    [56, 68],
  'tour-pokemon':  [62, 74], 'lavanville':     [68, 80], 'grotte-azuria': [73, 84],
  'safrania':      [77, 88], 'route-13-15':    [80, 91], 'parmanie':      [83, 93],
  'safari-zone':   [86, 95], 'carmin-sur-mer': [88, 97], 'route-19-20':   [90, 99],
  'iles-ecume':    [92,101], 'ligue-pokemon':  [95,105],
  // Johto
  'ecorce':      [100,112], 'noeudpin':    [105,118], 'azalee':      [110,124],
  'doublonville':[115,130], 'ecoraille':   [120,136], 'acajou':      [126,142],
  'sapin':       [132,148], 'cascade':     [138,154], 'volcrystal':  [144,160],
  'ligue-johto': [148,165],
  // Hoenn
  'littleroot':  [155,170], 'pierreferite':[160,175], 'mardeborg':   [165,180],
  'laberganta':  [170,185], 'lavaplage':   [175,190], 'sylvemont':   [180,196],
  'lilycove':    [185,202], 'sootopolis':  [190,208], 'ever-grande': [195,215],
  // Routes annexes
  'route-1':      [2,   8], 'jadielle':     [3,  10], 'route-2':      [5,  14],
  'route-4':      [30, 44], 'route-24':     [28, 40], 'route-25':     [26, 38],
  'route-5':      [40, 54], 'route-6':      [42, 56], 'cramois-ile':  [40, 55],
  'route-7':      [46, 60], 'route-8':      [46, 60], 'route-12':     [52, 65],
  'azuria':       [48, 62], 'route-9':      [55, 70], 'route-10':     [58, 72],
  'route-11':     [50, 65], 'route-21':     [66, 80], 'route-13':     [62, 76],
  'route-14':     [66, 80], 'route-15':     [62, 76], 'route-16':     [50, 65],
  'route-19':     [70, 86], 'route-20':     [72, 88], 'route-22':     [58, 74],
  'jadielle-nord':[8,  18],
};

// ── Vitesse originale Gen 1 par id ────────────────────────
const GEN1_SPD = {
  1:45,2:60,3:80,4:65,5:80,6:100,7:43,8:58,9:78,10:45,11:30,12:70,
  13:35,14:25,15:75,16:56,17:71,18:101,19:72,20:97,21:71,22:100,
  23:55,24:80,25:90,26:110,27:75,28:90,29:41,30:56,31:76,32:40,33:55,
  34:85,35:60,36:50,37:65,38:76,39:20,40:50,41:55,42:85,43:40,44:55,
  45:75,46:25,47:30,48:60,49:90,50:95,51:120,52:90,53:115,54:55,55:85,
  56:74,57:105,58:60,59:95,60:25,61:65,62:70,63:90,64:105,65:120,
  66:35,67:45,68:55,69:35,70:50,71:70,72:70,73:100,74:20,75:30,76:45,
  77:85,78:105,79:15,80:30,81:70,82:70,83:61,84:75,85:110,86:45,87:65,
  88:25,89:35,90:40,91:55,92:95,93:100,94:80,95:70,96:42,97:67,98:50,
  99:75,100:100,101:150,102:40,103:55,104:35,105:45,106:87,107:76,108:30,
  109:35,110:60,111:25,112:40,113:60,114:55,115:90,116:60,117:82,118:68,
  119:80,120:85,121:100,122:90,123:110,124:95,125:105,126:93,127:85,
  128:110,129:80,130:81,131:60,132:48,133:55,134:65,135:110,136:65,
  137:40,138:35,139:45,140:55,141:80,142:130,143:30,144:85,145:100,
  146:90,147:50,148:70,149:80,150:130,151:100,
};

// ── Pokémon Gen 1 (stats simplifiées ~÷5) ────────────────
const GEN1 = [
  {id:1,n:'Bulbizarre',t:'Plante',hp:45,atk:9,def:7,xp:16,g:8},
  {id:2,n:'Herbizarre',t:'Plante',hp:60,atk:12,def:9,xp:22,g:12},
  {id:3,n:'Florizarre',t:'Plante',hp:80,atk:16,def:13,xp:40,g:30},
  {id:4,n:'Salamèche',t:'Feu',hp:39,atk:10,def:6,xp:14,g:7},
  {id:5,n:'Reptincel',t:'Feu',hp:58,atk:14,def:9,xp:20,g:12},
  {id:6,n:'Dracaufeu',t:'Feu',hp:78,atk:19,def:12,xp:45,g:35},
  {id:7,n:'Carapuce',t:'Eau',hp:44,atk:9,def:11,xp:16,g:8},
  {id:8,n:'Carabaffe',t:'Eau',hp:59,atk:13,def:14,xp:22,g:14},
  {id:9,n:'Tortank',t:'Eau',hp:79,atk:18,def:18,xp:42,g:32},
  {id:10,n:'Chenipan',t:'Insecte',hp:45,atk:5,def:4,xp:10,g:4},
  {id:11,n:'Chrysacier',t:'Insecte',hp:50,atk:3,def:15,xp:12,g:5},
  {id:12,n:'Papilusion',t:'Insecte',hp:60,atk:9,def:8,xp:28,g:18},
  {id:13,n:'Aspicot',t:'Insecte',hp:40,atk:6,def:5,xp:10,g:4},
  {id:14,n:'Coconfort',t:'Insecte',hp:45,atk:4,def:14,xp:12,g:5},
  {id:15,n:'Dardargnan',t:'Insecte',hp:65,atk:16,def:9,xp:30,g:20},
  {id:16,n:'Roucool',t:'Normal',hp:40,atk:7,def:5,xp:12,g:5},
  {id:17,n:'Roucoups',t:'Normal',hp:63,atk:12,def:8,xp:20,g:11},
  {id:18,n:'Roucarnage',t:'Normal',hp:83,atk:18,def:11,xp:38,g:28},
  {id:19,n:'Rattata',t:'Normal',hp:30,atk:7,def:4,xp:10,g:5},
  {id:20,n:'Rattatac',t:'Normal',hp:55,atk:13,def:7,xp:18,g:10},
  {id:21,n:'Piafabec',t:'Normal',hp:40,atk:10,def:4,xp:12,g:6},
  {id:22,n:'Rapasdepic',t:'Normal',hp:65,atk:17,def:7,xp:22,g:14},
  {id:23,n:'Abo',t:'Poison',hp:35,atk:8,def:6,xp:12,g:6},
  {id:24,n:'Arbok',t:'Poison',hp:60,atk:15,def:9,xp:24,g:16},
  {id:25,n:'Pikachu',t:'Électrik',hp:35,atk:9,def:4,xp:18,g:10},
  {id:26,n:'Raichu',t:'Électrik',hp:60,atk:17,def:7,xp:32,g:22},
  {id:27,n:'Sabelette',t:'Normal',hp:50,atk:10,def:6,xp:14,g:7},
  {id:28,n:'Sablaireau',t:'Normal',hp:75,atk:17,def:9,xp:26,g:18},
  {id:29,n:'Nidoran♀',t:'Poison',hp:55,atk:7,def:6,xp:13,g:6},
  {id:30,n:'Nidorina',t:'Poison',hp:70,atk:11,def:9,xp:20,g:12},
  {id:31,n:'Nidoqueen',t:'Poison',hp:90,atk:16,def:13,xp:40,g:30},
  {id:32,n:'Nidoran♂',t:'Poison',hp:46,atk:8,def:5,xp:13,g:6},
  {id:33,n:'Nidorino',t:'Poison',hp:61,atk:12,def:8,xp:20,g:12},
  {id:34,n:'Nidoking',t:'Poison',hp:81,atk:17,def:11,xp:40,g:30},
  {id:35,n:'Mélodelfe',t:'Normal',hp:70,atk:7,def:8,xp:20,g:12},
  {id:36,n:'Méloféé',t:'Normal',hp:95,atk:11,def:13,xp:35,g:25},
  {id:37,n:'Goupix',t:'Feu',hp:38,atk:8,def:5,xp:14,g:8},
  {id:38,n:'Feunard',t:'Feu',hp:73,atk:13,def:9,xp:30,g:22},
  {id:39,n:'Rondoudou',t:'Normal',hp:115,atk:7,def:3,xp:18,g:10},
  {id:40,n:'Grodoudou',t:'Normal',hp:140,atk:10,def:5,xp:32,g:20},
  {id:41,n:'Nosferapti',t:'Poison',hp:40,atk:8,def:4,xp:12,g:6},
  {id:42,n:'Nosféralto',t:'Poison',hp:75,atk:14,def:8,xp:26,g:16},
  {id:43,n:'Mystherbe',t:'Plante',hp:45,atk:8,def:7,xp:14,g:7},
  {id:44,n:'Ortide',t:'Plante',hp:60,atk:11,def:9,xp:20,g:12},
  {id:45,n:'Rafflesia',t:'Plante',hp:75,atk:15,def:11,xp:36,g:26},
  {id:46,n:'Paras',t:'Insecte',hp:35,atk:9,def:5,xp:12,g:6},
  {id:47,n:'Parasect',t:'Insecte',hp:60,atk:14,def:10,xp:24,g:16},
  {id:48,n:'Mimitoss',t:'Insecte',hp:60,atk:8,def:6,xp:16,g:8},
  {id:49,n:'Aéromite',t:'Insecte',hp:70,atk:12,def:8,xp:28,g:18},
  {id:50,n:'Taupiqueur',t:'Sol',hp:10,atk:7,def:3,xp:10,g:5},
  {id:51,n:'Triopikeur',t:'Sol',hp:35,atk:13,def:6,xp:20,g:12},
  {id:52,n:'Miaouss',t:'Normal',hp:40,atk:8,def:5,xp:14,g:7},
  {id:53,n:'Persian',t:'Normal',hp:65,atk:13,def:8,xp:25,g:16},
  {id:54,n:'Psykokwak',t:'Eau',hp:50,atk:9,def:5,xp:15,g:8},
  {id:55,n:'Akwakwak',t:'Eau',hp:80,atk:15,def:8,xp:28,g:18},
  {id:56,n:'Férosinge',t:'Combat',hp:40,atk:11,def:4,xp:14,g:7},
  {id:57,n:'Colossinge',t:'Combat',hp:65,atk:18,def:7,xp:26,g:18},
  {id:58,n:'Caninos',t:'Feu',hp:55,atk:12,def:5,xp:18,g:10},
  {id:59,n:'Arcanin',t:'Feu',hp:90,atk:19,def:9,xp:38,g:28},
  {id:60,n:'Ptitard',t:'Eau',hp:40,atk:7,def:8,xp:12,g:6},
  {id:61,n:'Têtarte',t:'Eau',hp:65,atk:12,def:11,xp:22,g:14},
  {id:62,n:'Tartard',t:'Eau',hp:90,atk:18,def:14,xp:40,g:30},
  {id:63,n:'Abra',t:'Psy',hp:25,atk:4,def:2,xp:12,g:7},
  {id:64,n:'Kadabra',t:'Psy',hp:40,atk:6,def:3,xp:22,g:14},
  {id:65,n:'Alakazam',t:'Psy',hp:55,atk:8,def:4,xp:38,g:28},
  {id:66,n:'Machoc',t:'Combat',hp:70,atk:14,def:6,xp:16,g:9},
  {id:67,n:'Machopeur',t:'Combat',hp:80,atk:18,def:8,xp:25,g:16},
  {id:68,n:'Mackogneur',t:'Combat',hp:90,atk:22,def:10,xp:38,g:28},
  {id:69,n:'Chétiflor',t:'Plante',hp:44,atk:9,def:7,xp:14,g:7},
  {id:70,n:'Boustiflor',t:'Plante',hp:59,atk:13,def:9,xp:20,g:12},
  {id:71,n:'Empiflor',t:'Plante',hp:80,atk:17,def:12,xp:36,g:26},
  {id:72,n:'Tentacool',t:'Eau',hp:40,atk:7,def:4,xp:14,g:7},
  {id:73,n:'Tentacruel',t:'Eau',hp:80,atk:14,def:9,xp:30,g:22},
  {id:74,n:'Racaillou',t:'Roche',hp:40,atk:12,def:13,xp:12,g:7},
  {id:75,n:'Gravalanch',t:'Roche',hp:55,atk:16,def:16,xp:22,g:14},
  {id:76,n:'Grolem',t:'Roche',hp:80,atk:20,def:20,xp:38,g:28},
  {id:77,n:'Ponyta',t:'Feu',hp:50,atk:15,def:5,xp:18,g:10},
  {id:78,n:'Galopa',t:'Feu',hp:65,atk:18,def:7,xp:28,g:20},
  {id:79,n:'Ramoloss',t:'Eau',hp:90,atk:7,def:8,xp:20,g:12},
  {id:80,n:'Flagadoss',t:'Eau',hp:95,atk:11,def:10,xp:32,g:22},
  {id:81,n:'Magnéti',t:'Électrik',hp:25,atk:8,def:11,xp:16,g:9},
  {id:82,n:'Magnéton',t:'Électrik',hp:50,atk:13,def:15,xp:28,g:20},
  {id:83,n:'Canarticho',t:'Normal',hp:52,atk:12,def:6,xp:18,g:10},
  {id:84,n:'Doduo',t:'Normal',hp:35,atk:14,def:3,xp:14,g:7},
  {id:85,n:'Dodrio',t:'Normal',hp:60,atk:19,def:6,xp:26,g:18},
  {id:86,n:'Otaria',t:'Eau',hp:65,atk:10,def:9,xp:18,g:10},
  {id:87,n:'Lamantine',t:'Eau',hp:90,atk:14,def:12,xp:30,g:22},
  {id:88,n:'Tadmorv',t:'Poison',hp:80,atk:12,def:5,xp:20,g:12},
  {id:89,n:'Grotadmorv',t:'Poison',hp:105,atk:17,def:8,xp:36,g:26},
  {id:90,n:'Kokiyas',t:'Eau',hp:30,atk:6,def:14,xp:12,g:6},
  {id:91,n:'Crustabri',t:'Eau',hp:50,atk:10,def:20,xp:24,g:16},
  {id:92,n:'Fantominus',t:'Spectre',hp:30,atk:6,def:3,xp:14,g:8},
  {id:93,n:'Spectrum',t:'Spectre',hp:45,atk:9,def:5,xp:22,g:14},
  {id:94,n:'Ectoplasma',t:'Spectre',hp:60,atk:12,def:7,xp:40,g:30},
  {id:95,n:'Onix',t:'Roche',hp:35,atk:7,def:25,xp:22,g:14},
  {id:96,n:'Soporifik',t:'Psy',hp:60,atk:8,def:6,xp:14,g:8},
  {id:97,n:'Hypnomade',t:'Psy',hp:85,atk:13,def:9,xp:28,g:20},
  {id:98,n:'Krabby',t:'Eau',hp:30,atk:16,def:14,xp:12,g:7},
  {id:99,n:'Krabboss',t:'Eau',hp:55,atk:22,def:18,xp:24,g:16},
  {id:100,n:'Voltorbe',t:'Électrik',hp:40,atk:8,def:6,xp:14,g:8},
  {id:101,n:'Électrode',t:'Électrik',hp:60,atk:12,def:9,xp:26,g:18},
  {id:102,n:'Noeunoeuf',t:'Plante',hp:60,atk:8,def:8,xp:18,g:10},
  {id:103,n:'Noadkoko',t:'Plante',hp:95,atk:14,def:12,xp:36,g:26},
  {id:104,n:'Osselait',t:'Sol',hp:50,atk:13,def:9,xp:16,g:9},
  {id:105,n:'Ossatueur',t:'Sol',hp:60,atk:18,def:12,xp:28,g:20},
  {id:106,n:'Kicklee',t:'Combat',hp:50,atk:18,def:5,xp:28,g:18},
  {id:107,n:'Tygnon',t:'Combat',hp:50,atk:18,def:5,xp:28,g:18},
  {id:108,n:'Excelangue',t:'Normal',hp:90,atk:8,def:8,xp:24,g:16},
  {id:109,n:'Smogo',t:'Poison',hp:40,atk:7,def:5,xp:14,g:7},
  {id:110,n:'Smogogo',t:'Poison',hp:65,atk:11,def:8,xp:26,g:18},
  {id:111,n:'Rhinocorne',t:'Sol',hp:80,atk:17,def:12,xp:24,g:16},
  {id:112,n:'Rhinoféros',t:'Sol',hp:105,atk:22,def:15,xp:42,g:32},
  {id:113,n:'Leveinard',t:'Normal',hp:250,atk:4,def:3,xp:40,g:30},
  {id:114,n:'Saquedeneu',t:'Plante',hp:65,atk:9,def:9,xp:20,g:12},
  {id:115,n:'Kangourex',t:'Normal',hp:105,atk:17,def:10,xp:40,g:30},
  {id:116,n:'Hypotrempe',t:'Eau',hp:45,atk:7,def:6,xp:14,g:7},
  {id:117,n:'Hypocéan',t:'Eau',hp:55,atk:11,def:9,xp:22,g:14},
  {id:118,n:'Poisson-R',t:'Eau',hp:45,atk:10,def:5,xp:14,g:7},
  {id:119,n:'Poissoroy',t:'Eau',hp:80,atk:16,def:8,xp:28,g:20},
  {id:120,n:'Stari',t:'Eau',hp:30,atk:6,def:3,xp:12,g:6},
  {id:121,n:'Staross',t:'Eau',hp:60,atk:11,def:5,xp:26,g:18},
  {id:122,n:'M. Mime',t:'Psy',hp:40,atk:6,def:8,xp:22,g:14},
  {id:123,n:'Insécateur',t:'Insecte',hp:70,atk:19,def:8,xp:32,g:22},
  {id:124,n:'Lippoutou',t:'Glace',hp:65,atk:10,def:7,xp:28,g:18},
  {id:125,n:'Élektek',t:'Électrik',hp:65,atk:19,def:6,xp:32,g:22},
  {id:126,n:'Magmar',t:'Feu',hp:65,atk:18,def:6,xp:32,g:22},
  {id:127,n:'Scarabrute',t:'Insecte',hp:65,atk:22,def:10,xp:34,g:24},
  {id:128,n:'Tauros',t:'Normal',hp:75,atk:18,def:10,xp:34,g:24},
  {id:129,n:'Magicarpe',t:'Eau',hp:20,atk:2,def:3,xp:6,g:3},
  {id:130,n:'Léviator',t:'Eau',hp:95,atk:22,def:11,xp:50,g:40},
  {id:131,n:'Lokhlass',t:'Eau',hp:130,atk:14,def:14,xp:48,g:38},
  {id:132,n:'Métamorph',t:'Normal',hp:48,atk:9,def:9,xp:20,g:12},
  {id:133,n:'Évoli',t:'Normal',hp:55,atk:10,def:7,xp:16,g:9},
  {id:134,n:'Aquali',t:'Eau',hp:130,atk:12,def:13,xp:40,g:30},
  {id:135,n:'Voltali',t:'Électrik',hp:65,atk:16,def:7,xp:40,g:30},
  {id:136,n:'Pyroli',t:'Feu',hp:65,atk:18,def:7,xp:40,g:30},
  {id:137,n:'Porygon',t:'Normal',hp:65,atk:11,def:11,xp:28,g:20},
  {id:138,n:'Amonita',t:'Roche',hp:35,atk:9,def:14,xp:16,g:9},
  {id:139,n:'Amonistar',t:'Roche',hp:60,atk:14,def:17,xp:28,g:20},
  {id:140,n:'Kabuto',t:'Roche',hp:30,atk:12,def:14,xp:16,g:9},
  {id:141,n:'Kabutops',t:'Roche',hp:60,atk:19,def:15,xp:30,g:22},
  {id:142,n:'Ptéra',t:'Vol',hp:80,atk:20,def:8,xp:45,g:35},
  {id:143,n:'Ronflex',t:'Normal',hp:160,atk:18,def:8,xp:50,g:40},
  {id:144,n:'Artikodin',t:'Glace',hp:90,atk:19,def:14,xp:65,g:55},
  {id:145,n:'Électhor',t:'Électrik',hp:90,atk:20,def:12,xp:65,g:55},
  {id:146,n:'Sulfura',t:'Feu',hp:90,atk:20,def:12,xp:65,g:55},
  {id:147,n:'Minidraco',t:'Dragon',hp:41,atk:9,def:6,xp:18,g:10},
  {id:148,n:'Draco',t:'Dragon',hp:61,atk:13,def:9,xp:32,g:22},
  {id:149,n:'Dracolosse',t:'Dragon',hp:91,atk:22,def:12,xp:60,g:50},
  {id:150,n:'Mewtwo',t:'Psy',hp:106,atk:28,def:15,xp:80,g:80},
  {id:151,n:'Mew',t:'Normal',hp:100,atk:22,def:14,xp:80,g:80},
];

// ── Zones de Kanto ────────────────────────────────────────
const ZONES = {
  'bourg-palette': {
    name:'Bourg-Palette', color:'#44bb44', x:50, y:88, type:'ville',
    desc:'Votre village natal. Herbes hautes calmes pour débuter.',
    connexions:['argenta'], gymLeader:null,
    pokemon:[16,19,10,13,25,27,21,161,162,163,263,264,265,399,401,403,504,505,506,659,660,664,734,735,736,819,820,824,915,916,917],
  },
  'argenta': {
    name:'Argenta City', color:'#aaaaff', x:50, y:75, type:'ville',
    desc:'1ère Arène — Badge Pierre. Leader : Pierre, spécialiste Roche.',
    connexions:['bourg-palette','brindibourg'],
    pokemon:[74,75,76,95,138,140,27,19,185,207,231,328,408,409,438,524,525,526,744,745,749,830,831,861,932,933,934],
    gymLeader: {
      name:'Pierre', title:'Champion Roche', badge:'Badge Pierre', badgeIcon:'🪨',
      badgeImg:'https://archives.bulbagarden.net/media/upload/d/dd/Boulder_Badge.png',
      sprite:95, quote:"Mes Pokémon Roche écrasent tout !", reward:500,
      team:[
        {id:74,n:'Racaillou',lv:12,hp:80,atk:14,def:16,spd:25,type:'Roche',xp:0,gold:0},
        {id:95,n:'Onix',lv:14,hp:90,atk:12,def:30,spd:35,type:'Roche',xp:0,gold:0},
      ],
    },
  },
  'brindibourg': {
    name:'Brindibourg', color:'#4499ee', x:50, y:62, type:'ville',
    desc:'2ème Arène — Badge Cascade. Leader : Ondine, spécialiste Eau.',
    connexions:['argenta','lavanville'],
    pokemon:[54,55,60,61,72,90,98,116,129,158,159,160,258,259,260,393,394,418,501,502,503,656,657,688,728,729,746,816,817,818,912,914,960],
    gymLeader: {
      name:'Ondine', title:'Champion Eau', badge:'Badge Cascade', badgeIcon:'💧',
      badgeImg:'https://archives.bulbagarden.net/media/upload/0/00/Cascade_Badge.png',
      sprite:121, quote:"L'eau est plus forte que tout !", reward:800,
      team:[
        {id:120,n:'Stari',lv:18,hp:90,atk:10,def:7,spd:60,type:'Eau',xp:0,gold:0},
        {id:121,n:'Staross',lv:18,hp:100,atk:14,def:10,spd:70,type:'Eau',xp:0,gold:0},
        {id:117,n:'Hypocéan',lv:21,hp:110,atk:14,def:12,spd:55,type:'Eau',xp:0,gold:0},
      ],
    },
  },
  'lavanville': {
    name:'Lavanville', color:'#ffcc00', x:50, y:49, type:'ville',
    desc:'3ème Arène — Badge Foudre. Leader : Surge, spécialiste Électrik.',
    connexions:['brindibourg','celadopole'],
    pokemon:[25,26,81,82,100,101,125,41,42,172,179,180,309,310,403,404,405,522,523,602,824,825,858,921,938,939],
    gymLeader: {
      name:'Surge', title:'Champion Électrik', badge:'Badge Foudre', badgeIcon:'⚡',
      badgeImg:'https://archives.bulbagarden.net/media/upload/e/e9/Thunder_Badge.png',
      sprite:26, quote:"L'électricité ne pardonne pas !", reward:1200,
      team:[
        {id:100,n:'Voltorbe',lv:21,hp:95,atk:12,def:9,spd:80,type:'Électrik',xp:0,gold:0},
        {id:81,n:'Magnéti',lv:21,hp:90,atk:14,def:14,spd:50,type:'Électrik',xp:0,gold:0},
        {id:26,n:'Raichu',lv:24,hp:110,atk:20,def:10,spd:85,type:'Électrik',xp:0,gold:0},
      ],
    },
  },
  'celadopole': {
    name:'Céladon City', color:'#88cc44', x:50, y:36, type:'ville',
    desc:'4ème Arène — Badge Arc-en-Ciel. Leader : Erika, spécialiste Plante.',
    connexions:['lavanville','carmin-sur-mer'],
    pokemon:[43,44,45,69,70,71,52,103,114,152,153,154,252,253,254,387,388,420,495,496,497,650,651,672,753,754,763,810,822,823,906,907,951],
    gymLeader: {
      name:'Erika', title:'Champion Plante', badge:'Badge Arc-en-Ciel', badgeIcon:'🌿',
      badgeImg:'https://archives.bulbagarden.net/media/upload/b/b5/Rainbow_Badge.png',
      sprite:45, quote:"Mes fleurs vous endormiront…", reward:1800,
      team:[
        {id:43,n:'Chétiflor',lv:29,hp:120,atk:12,def:11,spd:40,type:'Plante',xp:0,gold:0},
        {id:70,n:'Boustiflor',lv:29,hp:130,atk:16,def:13,spd:50,type:'Plante',xp:0,gold:0},
        {id:45,n:'Rosélia',lv:32,hp:150,atk:18,def:14,spd:55,type:'Plante',xp:0,gold:0},
      ],
    },
  },
  'carmin-sur-mer': {
    name:'Carmin-sur-Mer', color:'#cc4422', x:50, y:23, type:'ville',
    desc:'5ème Arène — Badge Âme. Leader : Aya, spécialiste Poison.',
    connexions:['celadopole','parmanie'],
    pokemon:[23,24,29,32,88,89,109,110,92,169,211,316,317,434,451,453,568,569,590,690,691,747,757,848,944,945],
    gymLeader: {
      name:'Aya', title:'Champion Poison', badge:'Badge Âme', badgeIcon:'💜',
      badgeImg:'https://archives.bulbagarden.net/media/upload/8/8f/Soul_Badge.png',
      sprite:89, quote:"Le Poison ronge tout, même votre espoir !", reward:2500,
      team:[
        {id:23,n:'Abo',lv:37,hp:150,atk:16,def:12,spd:60,type:'Poison',xp:0,gold:0},
        {id:88,n:'Tadmorv',lv:37,hp:180,atk:18,def:10,spd:40,type:'Poison',xp:0,gold:0},
        {id:89,n:'Grotadmorv',lv:40,hp:200,atk:22,def:14,spd:55,type:'Poison',xp:0,gold:0},
      ],
    },
  },
  'parmanie': {
    name:'Parmanie City', color:'#dddd22', x:50, y:10, type:'ville',
    desc:'6ème Arène — Badge Marais. Leader : Koga, spécialiste Poison ninja.',
    connexions:['carmin-sur-mer','safrania'],
    pokemon:[96,97,49,88,109,110,132,169,177,178,280,281,282,429,433,439,517,518,568,677,678,709,843,844,955,956],
    gymLeader: {
      name:'Koga', title:'Champion Poison Ninja', badge:'Badge Marais', badgeIcon:'🌿',
      badgeImg:'https://archives.bulbagarden.net/media/upload/6/6e/Marsh_Badge.png',
      sprite:110, quote:"Rapidité et venin — voilà mon art !", reward:3500,
      team:[
        {id:109,n:'Smogo',lv:44,hp:165,atk:18,def:12,spd:45,type:'Poison',xp:0,gold:0},
        {id:110,n:'Smogogo',lv:44,hp:185,atk:22,def:16,spd:65,type:'Poison',xp:0,gold:0},
        {id:49,n:'Aéromite',lv:46,hp:170,atk:19,def:13,spd:90,type:'Insecte',xp:0,gold:0},
        {id:97,n:'Hypnomade',lv:48,hp:200,atk:18,def:14,spd:65,type:'Psy',xp:0,gold:0},
      ],
    },
  },
  'safrania': {
    name:'Safrania City', color:'#ff4499', x:50, y:-3, type:'ville',
    desc:'7ème Arène — Badge Marche. Leader : Sabrina, spécialiste Psy.',
    connexions:['parmanie','iles-ecume'],
    pokemon:[63,64,65,96,97,122,124,177,178,196,280,281,282,429,433,439,517,518,576,677,678,709,843,844,955,956],
    gymLeader: {
      name:'Sabrina', title:'Champion Psy', badge:'Badge Marche', badgeIcon:'🔮',
      badgeImg:'https://archives.bulbagarden.net/media/upload/3/3e/Volcano_Badge.png',
      sprite:65, quote:"J'ai vu votre défaite dans votre esprit…", reward:5000,
      team:[
        {id:64,n:'Kadabra',lv:50,hp:185,atk:18,def:10,spd:100,type:'Psy',xp:0,gold:0},
        {id:122,n:'M. Mime',lv:50,hp:175,atk:14,def:16,spd:90,type:'Psy',xp:0,gold:0},
        {id:97,n:'Hypnomade',lv:52,hp:210,atk:20,def:16,spd:70,type:'Psy',xp:0,gold:0},
        {id:65,n:'Alakazam',lv:55,hp:195,atk:22,def:12,spd:130,type:'Psy',xp:0,gold:0},
      ],
    },
  },
  'iles-ecume': {
    name:'Îles Écume', color:'#ff6600', x:50, y:-16, type:'ville',
    desc:'8ème Arène — Badge Volcan. Leader : Blaine, spécialiste Feu.',
    connexions:['safrania','ligue-pokemon'],
    pokemon:[58,59,77,78,126,37,38,136,155,156,157,255,256,257,390,467,498,513,515,653,725,726,813,814,909,935],
    gymLeader: {
      name:'Blaine', title:'Champion Feu', badge:'Badge Volcan', badgeIcon:'🔥',
      badgeImg:'https://archives.bulbagarden.net/media/upload/1/1e/Volcano_Badge.png',
      sprite:6, quote:"Mon feu consumera votre âme !", reward:7000,
      team:[
        {id:77,n:'Ponyta',lv:54,hp:190,atk:22,def:11,spd:85,type:'Feu',xp:0,gold:0},
        {id:126,n:'Magmar',lv:54,hp:195,atk:26,def:12,spd:80,type:'Feu',xp:0,gold:0},
        {id:59,n:'Arcanin',lv:58,hp:220,atk:28,def:14,spd:110,type:'Feu',xp:0,gold:0},
        {id:6,n:'Dracaufeu',lv:60,hp:230,atk:32,def:18,spd:100,type:'Feu',xp:0,gold:0},
      ],
    },
  },
  'ligue-pokemon': {
    name:'Ligue Pokémon', color:'#ff2200', x:50, y:-29, type:'elite',
    desc:'⚠ Plateau Indigo — Élite 4 & Champion. Les 8 badges sont requis !',
    connexions:['iles-ecume'],
    pokemon:[142,143,144,145,146,147,148,149,150,329,330,334,443,444,610,611,612,690,691,692,782,783,881],
    gymLeader: {
      name:'Champion Sacha', title:'Champion Pokémon', badge:'Titre de Champion', badgeIcon:'🏆',
      badgeImg:'https://archives.bulbagarden.net/media/upload/d/d8/Earth_Badge.png',
      sprite:150, quote:"Je suis le sommet. Aucun dresseur ne m'a jamais vaincu.", reward:20000, isLeague:true,
      team:[
        {id:147,n:'Minidraco',lv:58,hp:200,atk:20,def:16,spd:60,type:'Dragon',xp:0,gold:0},
        {id:148,n:'Draco',lv:60,hp:220,atk:24,def:19,spd:70,type:'Dragon',xp:0,gold:0},
        {id:130,n:'Léviator',lv:62,hp:250,atk:30,def:18,spd:90,type:'Eau',xp:0,gold:0},
        {id:149,n:'Dracolosse',lv:64,hp:280,atk:34,def:22,spd:90,type:'Dragon',xp:0,gold:0},
        {id:150,n:'Mewtwo',lv:70,hp:350,atk:40,def:25,spd:130,type:'Psy',xp:0,gold:0},
      ],
    },
  },
  'foret-jade': {
    name:'Forêt de Jade', color:'#228822', type:'foret',
    desc:'Forêt obscure — Insectes et Pokémon Plante.',
    connexions:['argenta','brindibourg'], gymLeader:null,
    pokemon:[11,12,14,15,46,47,48,102,123,127,152,153,154,252,253,254,387,388,412,495,496,497,650,651,664,736,753,754,810,822,823,906,907,917],
  },
  'route-3': {
    name:'Route 3', color:'#55bb55', type:'route',
    desc:'Entre Argenta et la Forêt de Jade.',
    connexions:['argenta','foret-jade'], gymLeader:null,
    pokemon:[17,18,20,22,28,35,36,39,40,84,161,162,163,263,264,274,399,401,424,504,505,506,659,660,676,734,735,759,819,820,826,915,916,924],
  },
  'mt-lune': {
    name:'Mt. Lune', color:'#8877bb', type:'grotte',
    desc:'Grotte sombre — fossiles et roches.',
    connexions:['foret-jade','brindibourg'], gymLeader:null,
    pokemon:[50,51,56,57,66,67,68,104,105,139,185,207,208,304,305,306,408,409,438,524,525,526,744,745,749,830,831,850,932,933,934],
  },
  'route-5-6': {
    name:'Routes 5-6-7', color:'#55bb55', type:'route',
    desc:'Plaines entre Brindibourg et Céladon.',
    connexions:['brindibourg','celadopole'], gymLeader:null,
    pokemon:[30,31,33,34,53,79,80,108,113,115,158,159,160,258,259,260,393,394,399,501,502,503,656,657,659,728,729,734,816,817,818,912,914,915],
  },
  'tour-pokemon': {
    name:'Tour Pokémon', color:'#664466', type:'grotte',
    desc:'Tour hantée de Lavanville — Spectres.',
    connexions:['lavanville','celadopole'], gymLeader:null,
    pokemon:[93,94,128,130,131,133,134,135,137,151,197,198,200,261,262,359,477,509,510,562,563,841,842,851,942,943,971],
  },
  'route-9-10': {
    name:'Routes 9-10', color:'#55bb55', type:'route',
    desc:'Chemin rocheux entre Brindibourg et Lavanville.',
    connexions:['brindibourg','lavanville'], gymLeader:null,
    pokemon:[2,3,5,6,8,9,73,83,85,99,161,162,163,263,264,274,399,401,408,504,505,506,659,660,676,734,735,744,819,820,830,915,916,924],
  },
  'grotte-azuria': {
    name:'Grotte Azurée', color:'#445588', type:'grotte',
    desc:'Grotte mystérieuse — Pokémon rares.',
    connexions:['brindibourg','safrania'], gymLeader:null,
    pokemon:[1,4,7,62,87,91,106,107,111,112,177,178,185,280,281,282,402,408,409,517,518,524,677,678,709,739,744,745,839,843,844,932,933,934],
  },
  'safari-zone': {
    name:'Safari Zone', color:'#44aa44', type:'foret',
    desc:'Zone Safari — Pokémon exotiques !',
    connexions:['parmanie','carmin-sur-mer'], gymLeader:null,
    pokemon:[86,117,118,119,120,121,141,87,99,152,153,154,252,253,254,387,388,393,495,496,497,650,651,656,728,729,734,810,816,817,906,907,912],
  },
  'route-13-15': {
    name:'Routes 13-14-15', color:'#55bb55', type:'route',
    desc:'Routes venteuses au sud de Parmanie.',
    connexions:['parmanie','carmin-sur-mer'], gymLeader:null,
    pokemon:[83,84,85,115,118,119,120,128,139,141,158,159,160,258,259,260,393,394,399,501,502,503,656,657,659,728,729,734,816,817,818,912,914,915],
  },
  'route-19-20': {
    name:'Routes 19-20', color:'#4488ff', type:'eau',
    desc:'Mer entre Parmanie et les Îles Écume.',
    connexions:['parmanie','iles-ecume'], gymLeader:null,
    pokemon:[73,80,86,87,91,99,117,130,131,158,159,160,258,259,260,393,394,418,501,502,503,656,657,688,728,729,746,816,817,818,912,914,960],
  },
};

const ZONE_KILL_NEEDED = 10;
