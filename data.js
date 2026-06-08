// ═══════════════════════════════════════════════════════════════
//  POKEWAVE — EXTENSION DATA : Générations 2 & 3
//  Chargé APRÈS game.js — étend les structures existantes
// ═══════════════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────────────
// GEN 2 — JOHTO (#152-251)  Format : {id,n,t,hp,atk,def,xp,g}
// atk ≈ base_atk/5  |  def ≈ base_def/5  |  xp ≈ yield/5
// ──────────────────────────────────────────────────────────────
const GEN2 = [
  {id:152,n:'Germignon',   t:'Plante',  hp:45,  atk:10, def:13, xp:16, g:8 },
  {id:153,n:'Macronium',   t:'Plante',  hp:60,  atk:12, def:16, xp:22, g:12},
  {id:154,n:'Méganium',    t:'Plante',  hp:80,  atk:16, def:20, xp:40, g:30},
  {id:155,n:'Héricendre',  t:'Feu',     hp:39,  atk:11, def:9,  xp:14, g:7 },
  {id:156,n:'Feurisson',   t:'Feu',     hp:58,  atk:13, def:12, xp:20, g:12},
  {id:157,n:'Typhlosion',  t:'Feu',     hp:78,  atk:17, def:16, xp:44, g:34},
  {id:158,n:'Kaiminus',    t:'Eau',     hp:50,  atk:13, def:13, xp:17, g:9 },
  {id:159,n:'Crocrodil',   t:'Eau',     hp:65,  atk:16, def:16, xp:23, g:14},
  {id:160,n:'Aligatueur',  t:'Eau',     hp:85,  atk:21, def:20, xp:44, g:34},
  {id:161,n:'Fouinette',   t:'Normal',  hp:35,  atk:9,  def:7,  xp:11, g:5 },
  {id:162,n:'Fouinar',     t:'Normal',  hp:85,  atk:15, def:13, xp:28, g:18},
  {id:163,n:'Hoothoot',    t:'Normal',  hp:60,  atk:6,  def:6,  xp:12, g:6 },
  {id:164,n:'Noarfang',    t:'Normal',  hp:100, atk:10, def:10, xp:32, g:22},
  {id:165,n:'Lutin',       t:'Insecte', hp:40,  atk:4,  def:6,  xp:10, g:4 },
  {id:166,n:'Coxy',        t:'Insecte', hp:55,  atk:7,  def:10, xp:18, g:10},
  {id:167,n:'Mimigal',     t:'Insecte', hp:40,  atk:12, def:8,  xp:11, g:5 },
  {id:168,n:'Migalos',     t:'Insecte', hp:70,  atk:18, def:14, xp:24, g:16},
  {id:169,n:'Nostenfer',   t:'Poison',  hp:85,  atk:18, def:16, xp:38, g:28},
  {id:170,n:'Loupio',      t:'Eau',     hp:75,  atk:8,  def:8,  xp:14, g:7 },
  {id:171,n:'Lanturn',     t:'Eau',     hp:125, atk:12, def:12, xp:30, g:20},
  {id:172,n:'Pichu',       t:'Électrik',hp:20,  atk:8,  def:3,  xp:8,  g:4 },
  {id:173,n:'Mélo',        t:'Fée',     hp:50,  atk:5,  def:6,  xp:8,  g:4 },
  {id:174,n:'Toudoudou',   t:'Normal',  hp:90,  atk:6,  def:3,  xp:8,  g:4 },
  {id:175,n:'Togepi',      t:'Fée',     hp:35,  atk:4,  def:13, xp:10, g:5 },
  {id:176,n:'Togetic',     t:'Fée',     hp:55,  atk:8,  def:17, xp:22, g:14},
  {id:177,n:'Natu',        t:'Psy',     hp:40,  atk:10, def:9,  xp:14, g:7 },
  {id:178,n:'Xatu',        t:'Psy',     hp:65,  atk:15, def:14, xp:28, g:18},
  {id:179,n:'Wattouat',    t:'Électrik',hp:55,  atk:8,  def:8,  xp:14, g:7 },
  {id:180,n:'Lainergie',   t:'Électrik',hp:70,  atk:11, def:11, xp:20, g:12},
  {id:181,n:'Pharamp',     t:'Électrik',hp:90,  atk:15, def:17, xp:38, g:28},
  {id:182,n:'Joliflor',    t:'Plante',  hp:75,  atk:16, def:19, xp:30, g:22},
  {id:183,n:'Marill',      t:'Eau',     hp:70,  atk:4,  def:10, xp:12, g:6 },
  {id:184,n:'Azumarill',   t:'Eau',     hp:100, atk:10, def:16, xp:28, g:18},
  {id:185,n:'Tronci',      t:'Roche',   hp:70,  atk:20, def:23, xp:28, g:18},
  {id:186,n:'Tarpaud',     t:'Eau',     hp:90,  atk:15, def:15, xp:32, g:22},
  {id:187,n:'Hericolas',   t:'Plante',  hp:35,  atk:7,  def:8,  xp:10, g:5 },
  {id:188,n:'Floravol',    t:'Plante',  hp:55,  atk:9,  def:10, xp:16, g:8 },
  {id:189,n:'Cotovol',     t:'Plante',  hp:75,  atk:11, def:14, xp:22, g:14},
  {id:190,n:'Capumain',    t:'Normal',  hp:55,  atk:14, def:11, xp:18, g:10},
  {id:191,n:'Tournegrin',  t:'Plante',  hp:30,  atk:6,  def:6,  xp:10, g:4 },
  {id:192,n:'Héliatronc',  t:'Plante',  hp:75,  atk:15, def:11, xp:24, g:16},
  {id:193,n:'Yanma',       t:'Insecte', hp:65,  atk:13, def:9,  xp:18, g:10},
  {id:194,n:'Axoloto',     t:'Eau',     hp:55,  atk:9,  def:9,  xp:12, g:6 },
  {id:195,n:'Maraiste',    t:'Eau',     hp:95,  atk:17, def:17, xp:28, g:18},
  {id:196,n:'Mentali',     t:'Psy',     hp:65,  atk:13, def:12, xp:32, g:24},
  {id:197,n:'Noctali',     t:'Ténèbres',hp:95,  atk:13, def:22, xp:32, g:24},
  {id:198,n:'Cornèbre',    t:'Ténèbres',hp:60,  atk:17, def:8,  xp:16, g:10},
  {id:199,n:'Roigada',     t:'Eau',     hp:95,  atk:15, def:16, xp:32, g:22},
  {id:200,n:'Mimigel',     t:'Spectre', hp:60,  atk:12, def:12, xp:20, g:14},
  {id:201,n:'Zarbi',       t:'Psy',     hp:48,  atk:14, def:10, xp:14, g:8 },
  {id:202,n:'Qulbutoké',   t:'Psy',     hp:190, atk:7,  def:12, xp:24, g:14},
  {id:203,n:'Girafarig',   t:'Normal',  hp:70,  atk:16, def:13, xp:24, g:14},
  {id:204,n:'Pomdepik',    t:'Insecte', hp:50,  atk:13, def:18, xp:12, g:6 },
  {id:205,n:'Foretress',   t:'Insecte', hp:75,  atk:18, def:28, xp:30, g:20},
  {id:206,n:'Insolourdo',  t:'Normal',  hp:100, atk:14, def:14, xp:18, g:10},
  {id:207,n:'Scorplane',   t:'Sol',     hp:65,  atk:15, def:21, xp:20, g:12},
  {id:208,n:'Steelix',     t:'Acier',   hp:75,  atk:17, def:40, xp:40, g:30},
  {id:209,n:'Snubbull',    t:'Fée',     hp:60,  atk:16, def:10, xp:14, g:8 },
  {id:210,n:'Granbull',    t:'Fée',     hp:90,  atk:24, def:15, xp:28, g:18},
  {id:211,n:'Qwilfish',    t:'Poison',  hp:65,  atk:19, def:17, xp:18, g:10},
  {id:212,n:'Cizayox',     t:'Insecte', hp:70,  atk:26, def:20, xp:40, g:30},
  {id:213,n:'Caratroc',    t:'Insecte', hp:20,  atk:2,  def:46, xp:14, g:8 },
  {id:214,n:'Scarhino',    t:'Insecte', hp:80,  atk:25, def:15, xp:34, g:24},
  {id:215,n:'Farfurex',    t:'Ténèbres',hp:55,  atk:19, def:11, xp:20, g:12},
  {id:216,n:'Teddiursa',   t:'Normal',  hp:60,  atk:16, def:10, xp:16, g:8 },
  {id:217,n:'Ursaring',    t:'Normal',  hp:90,  atk:26, def:15, xp:34, g:24},
  {id:218,n:'Limagma',     t:'Feu',     hp:40,  atk:8,  def:8,  xp:12, g:6 },
  {id:219,n:'Magcargo',    t:'Feu',     hp:50,  atk:10, def:24, xp:24, g:14},
  {id:220,n:'Marcacrin',   t:'Glace',   hp:50,  atk:10, def:8,  xp:12, g:6 },
  {id:221,n:'Cochignon',   t:'Glace',   hp:100, atk:20, def:16, xp:30, g:20},
  {id:222,n:'Corayon',     t:'Eau',     hp:55,  atk:11, def:17, xp:16, g:10},
  {id:223,n:'Rémoraid',    t:'Eau',     hp:35,  atk:13, def:7,  xp:12, g:6 },
  {id:224,n:'Octillery',   t:'Eau',     hp:75,  atk:21, def:15, xp:28, g:18},
  {id:225,n:'Cadoizo',     t:'Glace',   hp:45,  atk:11, def:9,  xp:14, g:8 },
  {id:226,n:'Démanta',     t:'Eau',     hp:65,  atk:8,  def:14, xp:20, g:12},
  {id:227,n:'Airmure',     t:'Acier',   hp:65,  atk:16, def:28, xp:26, g:18},
  {id:228,n:'Malosse',     t:'Feu',     hp:45,  atk:12, def:6,  xp:14, g:8 },
  {id:229,n:'Démolosse',   t:'Feu',     hp:75,  atk:18, def:10, xp:30, g:20},
  {id:230,n:'Hyporoi',     t:'Eau',     hp:75,  atk:19, def:19, xp:40, g:30},
  {id:231,n:'Phanpy',      t:'Sol',     hp:90,  atk:12, def:12, xp:16, g:8 },
  {id:232,n:'Donphan',     t:'Sol',     hp:90,  atk:24, def:24, xp:36, g:26},
  {id:233,n:'Porygon2',    t:'Normal',  hp:85,  atk:16, def:18, xp:32, g:22},
  {id:234,n:'Cerfrousse',  t:'Normal',  hp:73,  atk:19, def:12, xp:24, g:14},
  {id:235,n:'Queulorior',  t:'Normal',  hp:55,  atk:4,  def:7,  xp:12, g:6 },
  {id:236,n:'Debugant',    t:'Combat',  hp:35,  atk:7,  def:7,  xp:10, g:5 },
  {id:237,n:'Kapoera',     t:'Combat',  hp:50,  atk:19, def:19, xp:24, g:16},
  {id:238,n:'Lippouti',    t:'Glace',   hp:45,  atk:6,  def:3,  xp:10, g:5 },
  {id:239,n:'Élekid',      t:'Électrik',hp:45,  atk:13, def:7,  xp:10, g:5 },
  {id:240,n:'Magby',       t:'Feu',     hp:45,  atk:15, def:7,  xp:10, g:5 },
  {id:241,n:'Écrémeuh',    t:'Normal',  hp:95,  atk:16, def:21, xp:28, g:18},
  {id:242,n:'Leuphorie',   t:'Normal',  hp:255, atk:2,  def:2,  xp:50, g:38},
  {id:243,n:'Raikou',      t:'Électrik',hp:90,  atk:17, def:15, xp:55, g:48},
  {id:244,n:'Entei',       t:'Feu',     hp:115, atk:23, def:17, xp:60, g:52},
  {id:245,n:'Suicune',     t:'Eau',     hp:100, atk:15, def:23, xp:60, g:52},
  {id:246,n:'Embrylex',    t:'Roche',   hp:50,  atk:13, def:10, xp:14, g:8 },
  {id:247,n:'Ymphect',     t:'Roche',   hp:70,  atk:17, def:14, xp:22, g:14},
  {id:248,n:'Tyranocif',   t:'Roche',   hp:100, atk:27, def:22, xp:55, g:48},
  {id:249,n:'Lugia',       t:'Psy',     hp:106, atk:18, def:26, xp:80, g:72},
  {id:250,n:'Ho-Oh',       t:'Feu',     hp:106, atk:26, def:18, xp:80, g:72},
  {id:251,n:'Celebi',      t:'Psy',     hp:100, atk:20, def:20, xp:70, g:62},
];

const GEN2_SPD = {
  152:45,153:60,154:80,155:65,156:80,157:100,158:43,159:58,160:78,
  161:20,162:90,163:50,164:70,165:55,166:85,167:30,168:40,169:130,
  170:67,171:67,172:60,173:35,174:15,175:20,176:40,177:70,178:95,
  179:35,180:45,181:55,182:50,183:40,184:50,185:30,186:70,187:50,
  188:65,189:110,190:85,191:30,192:30,193:95,194:15,195:35,196:110,
  197:65,198:91,199:30,200:85,201:48,202:33,203:85,204:15,205:40,
  206:45,207:85,208:30,209:30,210:45,211:85,212:65,213:5,214:85,
  215:115,216:40,217:55,218:20,219:30,220:50,221:50,222:35,223:65,
  224:45,225:75,226:70,227:70,228:65,229:95,230:85,231:40,232:50,
  233:60,234:85,235:75,236:35,237:90,238:65,239:95,240:83,241:100,
  242:55,243:115,244:100,245:85,246:41,247:51,248:61,249:110,250:90,251:100,
};

// ──────────────────────────────────────────────────────────────
// GEN 3 — HOENN (#252-386)  Pokémon clés + tous les starters
// ──────────────────────────────────────────────────────────────
const GEN3 = [
  // Starters & évolutions
  {id:252,n:'Arcko',       t:'Plante',  hp:40,  atk:9,  def:7,  xp:14, g:7 },
  {id:253,n:'Massko',      t:'Plante',  hp:50,  atk:13, def:9,  xp:20, g:12},
  {id:254,n:'Jungko',      t:'Plante',  hp:70,  atk:17, def:13, xp:40, g:30},
  {id:255,n:'Poussifeu',   t:'Feu',     hp:45,  atk:12, def:8,  xp:14, g:7 },
  {id:256,n:'Galifeu',     t:'Feu',     hp:60,  atk:17, def:12, xp:20, g:12},
  {id:257,n:'Braségali',   t:'Feu',     hp:80,  atk:24, def:14, xp:42, g:32},
  {id:258,n:'Gobou',       t:'Eau',     hp:50,  atk:14, def:10, xp:17, g:8 },
  {id:259,n:'Flobio',      t:'Eau',     hp:70,  atk:17, def:14, xp:23, g:14},
  {id:260,n:'Laggron',     t:'Eau',     hp:100, atk:22, def:18, xp:44, g:34},
  // Péochiens / Zigzaton
  {id:261,n:'Medhyèna',    t:'Ténèbres',hp:35,  atk:11, def:7,  xp:10, g:5 },
  {id:262,n:'Mightyena',   t:'Ténèbres',hp:70,  atk:19, def:13, xp:24, g:14},
  {id:263,n:'Zigzaton',    t:'Normal',  hp:38,  atk:6,  def:8,  xp:10, g:5 },
  {id:264,n:'Linéon',      t:'Normal',  hp:78,  atk:14, def:12, xp:24, g:14},
  {id:265,n:'Cheniti',     t:'Insecte', hp:45,  atk:9,  def:7,  xp:10, g:4 },
  {id:267,n:'Papinox',     t:'Insecte', hp:60,  atk:14, def:10, xp:24, g:14},
  {id:269,n:'Dustox',      t:'Insecte', hp:60,  atk:10, def:14, xp:24, g:14},
  {id:270,n:'Grainipiot',  t:'Eau',     hp:40,  atk:6,  def:6,  xp:10, g:5 },
  {id:272,n:'Ludicolo',    t:'Eau',     hp:80,  atk:14, def:14, xp:28, g:18},
  {id:274,n:'Nirondelle',  t:'Normal',  hp:40,  atk:11, def:6,  xp:12, g:6 },
  {id:275,n:'Swellow',     t:'Normal',  hp:60,  atk:17, def:12, xp:24, g:14},
  {id:276,n:'Wingull',     t:'Eau',     hp:40,  atk:6,  def:6,  xp:10, g:5 },
  {id:277,n:'Goélise',     t:'Eau',     hp:60,  atk:10, def:20, xp:22, g:14},
  // Ralts line — très populaire
  {id:280,n:'Tarsal',      t:'Psy',     hp:28,  atk:5,  def:5,  xp:10, g:5 },
  {id:281,n:'Kirlia',      t:'Psy',     hp:38,  atk:9,  def:9,  xp:16, g:9 },
  {id:282,n:'Gardevoir',   t:'Psy',     hp:68,  atk:13, def:13, xp:40, g:30},
  // Shroomish line
  {id:285,n:'Balignon',    t:'Plante',  hp:60,  atk:10, def:12, xp:14, g:7 },
  {id:286,n:'Chapignon',   t:'Plante',  hp:60,  atk:23, def:16, xp:28, g:20},
  // Slaking line
  {id:289,n:'Monaflemu',   t:'Normal',  hp:150, atk:30, def:20, xp:48, g:38},
  // Nincada line
  {id:290,n:'Ningale',     t:'Insecte', hp:31,  atk:9,  def:14, xp:10, g:5 },
  {id:291,n:'Ninjask',     t:'Insecte', hp:61,  atk:16, def:9,  xp:24, g:16},
  // Makuhita line
  {id:296,n:'Makuhita',    t:'Combat',  hp:72,  atk:12, def:8,  xp:12, g:6 },
  {id:297,n:'Hariyama',    t:'Combat',  hp:144, atk:22, def:12, xp:30, g:22},
  // Aron line
  {id:304,n:'Coqueline',   t:'Acier',   hp:50,  atk:11, def:22, xp:12, g:6 },
  {id:305,n:'Golithe',     t:'Acier',   hp:60,  atk:16, def:28, xp:22, g:14},
  {id:306,n:'Galeking',    t:'Acier',   hp:70,  atk:22, def:36, xp:40, g:30},
  // Meditite line
  {id:307,n:'Méditikka',   t:'Psy',     hp:30,  atk:8,  def:8,  xp:12, g:6 },
  {id:308,n:'Charmina',    t:'Psy',     hp:60,  atk:16, def:16, xp:26, g:18},
  // Electrike line
  {id:309,n:'Dynavolt',    t:'Électrik',hp:40,  atk:11, def:7,  xp:12, g:6 },
  {id:310,n:'Élecsprint',  t:'Électrik',hp:70,  atk:17, def:11, xp:26, g:18},
  // Roselia
  {id:315,n:'Rosélia',     t:'Plante',  hp:50,  atk:13, def:11, xp:18, g:10},
  // Carvanha / Sharpedo
  {id:318,n:'Carvanha',    t:'Eau',     hp:45,  atk:20, def:4,  xp:14, g:7 },
  {id:319,n:'Sharpedo',    t:'Eau',     hp:70,  atk:24, def:8,  xp:30, g:22},
  // Numel / Camerupt
  {id:322,n:'Chamallot',   t:'Feu',     hp:60,  atk:11, def:9,  xp:14, g:7 },
  {id:323,n:'Camérupt',    t:'Feu',     hp:70,  atk:22, def:15, xp:30, g:22},
  // Trapinch / Vibrava / Flygon
  {id:328,n:'Kraknoix',    t:'Sol',     hp:45,  atk:20, def:11, xp:12, g:6 },
  {id:329,n:'Vibraninf',   t:'Dragon',  hp:50,  atk:14, def:10, xp:20, g:12},
  {id:330,n:'Libégon',     t:'Dragon',  hp:80,  atk:18, def:16, xp:38, g:28},
  // Swablu / Altaria
  {id:333,n:'Tylton',      t:'Normal',  hp:45,  atk:7,  def:9,  xp:12, g:6 },
  {id:334,n:'Altaria',     t:'Dragon',  hp:75,  atk:14, def:17, xp:30, g:22},
  // Absol
  {id:359,n:'Absol',       t:'Ténèbres',hp:65,  atk:25, def:11, xp:32, g:24},
  // Snorunt / Glalie
  {id:361,n:'Stalgamin',   t:'Glace',   hp:50,  atk:8,  def:8,  xp:12, g:6 },
  {id:362,n:'Oniglali',    t:'Glace',   hp:80,  atk:16, def:16, xp:26, g:18},
  // Spheal line
  {id:363,n:'Obalie',      t:'Glace',   hp:70,  atk:8,  def:10, xp:12, g:6 },
  {id:364,n:'Phogleur',    t:'Glace',   hp:90,  atk:12, def:14, xp:20, g:12},
  {id:365,n:'Kaimorse',    t:'Glace',   hp:110, atk:18, def:18, xp:30, g:22},
  // Feebas / Milotic
  {id:349,n:'Lançargot',   t:'Eau',     hp:20,  atk:3,  def:3,  xp:8,  g:4 },
  {id:350,n:'Milobellus',  t:'Eau',     hp:95,  atk:15, def:19, xp:44, g:36},
  // Bagon line — très populaire
  {id:371,n:'Draby',       t:'Dragon',  hp:45,  atk:15, def:10, xp:14, g:7 },
  {id:372,n:'Drackhaus',   t:'Dragon',  hp:65,  atk:18, def:16, xp:22, g:14},
  {id:373,n:'Drattack',    t:'Dragon',  hp:95,  atk:24, def:20, xp:50, g:42},
  // Beldum line
  {id:374,n:'Terhal',      t:'Acier',   hp:40,  atk:11, def:22, xp:12, g:6 },
  {id:375,n:'Métang',      t:'Acier',   hp:60,  atk:16, def:26, xp:22, g:14},
  {id:376,n:'Métalosse',   t:'Acier',   hp:80,  atk:25, def:30, xp:55, g:48},
  // Légendaires
  {id:377,n:'Regirock',    t:'Roche',   hp:80,  atk:20, def:40, xp:55, g:48},
  {id:378,n:'Regice',      t:'Glace',   hp:80,  atk:10, def:40, xp:55, g:48},
  {id:379,n:'Registeel',   t:'Acier',   hp:80,  atk:15, def:40, xp:55, g:48},
  {id:380,n:'Latias',      t:'Dragon',  hp:80,  atk:16, def:16, xp:65, g:58},
  {id:381,n:'Latios',      t:'Dragon',  hp:80,  atk:18, def:14, xp:65, g:58},
  {id:382,n:'Kyogre',      t:'Eau',     hp:100, atk:20, def:20, xp:90, g:82},
  {id:383,n:'Groudon',     t:'Sol',     hp:100, atk:25, def:20, xp:90, g:82},
  {id:384,n:'Rayquaza',    t:'Dragon',  hp:105, atk:28, def:18, xp:95, g:88},
  {id:385,n:'Jirachi',     t:'Acier',   hp:100, atk:20, def:20, xp:80, g:72},
  {id:386,n:'Deoxys',      t:'Psy',     hp:50,  atk:30, def:10, xp:85, g:76},
];

const GEN3_SPD = {
  252:70,253:95,254:120,255:45,256:55,257:80,258:40,259:60,260:60,
  261:35,262:70,263:60,264:100,265:45,267:65,269:65,270:30,272:70,
  274:85,275:125,276:85,277:65,280:40,281:50,282:80,285:35,286:70,
  289:100,290:40,291:160,296:25,297:50,304:30,305:40,306:50,307:60,
  308:60,309:65,310:105,315:65,318:65,319:95,322:35,323:55,328:10,
  329:70,330:100,333:50,334:80,359:75,361:50,362:80,363:25,364:45,
  365:65,349:80,350:81,371:50,372:50,373:100,374:40,375:50,376:70,
  377:50,378:50,379:50,380:110,381:110,382:90,383:90,384:95,385:100,386:150,
};

// ══ GEN 4 — Sinnoh (387-493) ══
const GEN4 = [
  {id:387, n:'Tortipouss', t:'Plante', hp:55, atk:9, def:9, xp:16, g:7},
  {id:388, n:'Tortiflame', t:'Plante', hp:75, atk:15, def:14, xp:22, g:10},
  {id:389, n:'Torterra', t:'Plante/Sol', hp:95, atk:23, def:20, xp:35, g:16},
  {id:390, n:'Ouisticram', t:'Feu', hp:44, atk:11, def:7, xp:16, g:7},
  {id:391, n:'Chimpenfeu', t:'Feu/Combat', hp:64, atk:17, def:10, xp:22, g:10},
  {id:392, n:'Simiabraz', t:'Feu/Combat', hp:76, atk:23, def:11, xp:35, g:16},
  {id:393, n:'Tiplouf', t:'Eau', hp:53, atk:9, def:9, xp:16, g:7},
  {id:394, n:'Prinplouf', t:'Eau', hp:64, atk:14, def:15, xp:22, g:10},
  {id:395, n:'Pingoléon', t:'Eau/Acier', hp:84, atk:20, def:20, xp:35, g:16},
  {id:396, n:'Étourmi', t:'Normal/Vol', hp:40, atk:7, def:5, xp:10, g:5},
  {id:397, n:'Étourvol', t:'Normal/Vol', hp:55, atk:12, def:8, xp:15, g:7},
  {id:398, n:'Étouraptor', t:'Normal/Vol', hp:83, atk:23, def:15, xp:27, g:12},
  {id:399, n:'Keunotor', t:'Normal', hp:59, atk:7, def:7, xp:14, g:6},
  {id:400, n:'Biberon', t:'Normal/Eau', hp:79, atk:11, def:13, xp:22, g:10},
  {id:401, n:'Criquette', t:'Normal', hp:37, atk:7, def:5, xp:11, g:5},
  {id:402, n:'Mélokrik', t:'Combat', hp:77, atk:22, def:14, xp:24, g:11},
  {id:403, n:'Lixy', t:'Électrik', hp:45, atk:11, def:7, xp:11, g:5},
  {id:404, n:'Luxio', t:'Électrik', hp:60, atk:17, def:10, xp:17, g:8},
  {id:405, n:'Luxray', t:'Électrik', hp:80, atk:24, def:16, xp:30, g:14},
  {id:406, n:'Rozbouton', t:'Plante/Poison', hp:60, atk:10, def:11, xp:16, g:7},
  {id:407, n:'Roserade', t:'Plante/Poison', hp:60, atk:14, def:13, xp:29, g:13},
  {id:408, n:'Kranidos', t:'Roche', hp:67, atk:30, def:6, xp:23, g:10},
  {id:409, n:'Rampardos', t:'Roche', hp:97, atk:48, def:10, xp:30, g:14},
  {id:410, n:'Mustébouclier', t:'Roche/Acier', hp:30, atk:9, def:27, xp:23, g:10},
  {id:411, n:'Bastiodon', t:'Roche/Acier', hp:60, atk:6, def:56, xp:30, g:14},
  {id:412, n:'Cheniti', t:'Insecte', hp:45, atk:7, def:9, xp:10, g:5},
  {id:413, n:'Papilord', t:'Insecte/Acier', hp:60, atk:8, def:30, xp:26, g:12},
  {id:414, n:'Papilusion', t:'Insecte/Vol', hp:60, atk:7, def:11, xp:24, g:11},
  {id:415, n:'Apitrini', t:'Insecte/Vol', hp:35, atk:9, def:7, xp:11, g:5},
  {id:416, n:'Apireine', t:'Insecte/Vol', hp:70, atk:10, def:10, xp:28, g:13},
  {id:417, n:'Pachirisu', t:'Électrik', hp:60, atk:7, def:11, xp:19, g:9},
  {id:418, n:'Boustiflor', t:'Eau', hp:65, atk:14, def:8, xp:18, g:8},
  {id:419, n:'Crocrodil', t:'Eau', hp:85, atk:20, def:14, xp:28, g:13},
  {id:420, n:'Ceriz', t:'Plante', hp:45, atk:7, def:7, xp:13, g:6},
  {id:421, n:'Chétiflor', t:'Plante', hp:70, atk:12, def:10, xp:24, g:11},
  {id:422, n:'Coquiperl', t:'Eau', hp:76, atk:8, def:9, xp:12, g:5},
  {id:423, n:'Gastrodon', t:'Eau/Sol', hp:111, atk:14, def:13, xp:28, g:13},
  {id:424, n:'Brichnou', t:'Normal', hp:85, atk:12, def:11, xp:29, g:13},
  {id:425, n:'Balignon', t:'Glace/Spectre', hp:45, atk:9, def:9, xp:18, g:8},
  {id:426, n:'Momartik', t:'Glace/Spectre', hp:60, atk:12, def:12, xp:28, g:13},
  {id:427, n:'Grouin', t:'Normal', hp:55, atk:8, def:8, xp:14, g:6},
  {id:428, n:'Lockpin', t:'Normal', hp:60, atk:11, def:11, xp:24, g:11},
  {id:429, n:'Banspackle', t:'Psy', hp:60, atk:10, def:10, xp:26, g:12},
  {id:430, n:'Noctunoir', t:'Normal', hp:100, atk:13, def:11, xp:30, g:14},
  {id:431, n:'Chaglam', t:'Normal', hp:49, atk:9, def:7, xp:14, g:6},
  {id:432, n:'Chaffreux', t:'Normal', hp:63, atk:12, def:10, xp:23, g:10},
  {id:433, n:'Cascoon', t:'Psy', hp:45, atk:6, def:11, xp:14, g:6},
  {id:434, n:'Moufouine', t:'Normal/Poison', hp:60, atk:10, def:8, xp:16, g:7},
  {id:435, n:'Moufflair', t:'Normal/Poison', hp:80, atk:14, def:11, xp:27, g:12},
  {id:436, n:'Brozor', t:'Acier/Psy', hp:57, atk:9, def:18, xp:16, g:7},
  {id:437, n:'Bronzong', t:'Acier/Psy', hp:67, atk:11, def:23, xp:27, g:12},
  {id:438, n:'Bonsly', t:'Roche', hp:50, atk:10, def:17, xp:14, g:6},
  {id:439, n:'Mime Junior', t:'Psy', hp:20, atk:7, def:7, xp:14, g:6},
  {id:440, n:'Letichin', t:'Normal', hp:100, atk:6, def:11, xp:14, g:6},
  {id:441, n:'Diablotin', t:'Normal/Vol', hp:63, atk:10, def:7, xp:17, g:8},
  {id:442, n:'Spiritomb', t:'Spectre/Ténèbres', hp:50, atk:14, def:23, xp:26, g:12},
  {id:443, n:'Griknot', t:'Dragon', hp:58, atk:11, def:8, xp:14, g:6},
  {id:444, n:'Carmache', t:'Dragon/Sol', hp:68, atk:16, def:12, xp:22, g:10},
  {id:445, n:'Carchacrok', t:'Dragon/Sol', hp:108, atk:26, def:19, xp:40, g:18},
  {id:446, n:'Goinfrex', t:'Normal', hp:135, atk:14, def:11, xp:18, g:8},
  {id:447, n:'Riolu', t:'Combat', hp:40, atk:14, def:7, xp:18, g:8},
  {id:448, n:'Lucario', t:'Combat/Acier', hp:70, atk:24, def:14, xp:30, g:14},
  {id:449, n:'Hippopotas', t:'Sol', hp:68, atk:14, def:14, xp:18, g:8},
  {id:450, n:'Hippodocus', t:'Sol', hp:108, atk:22, def:22, xp:30, g:14},
  {id:451, n:'Scopeon', t:'Poison/Insecte', hp:40, atk:9, def:8, xp:14, g:6},
  {id:452, n:'Dardargnan', t:'Poison/Insecte', hp:70, atk:19, def:14, xp:29, g:13},
  {id:453, n:'Têtarte', t:'Eau/Sol', hp:48, atk:12, def:8, xp:15, g:7},
  {id:454, n:'Crapustule', t:'Eau/Sol', hp:83, atk:21, def:14, xp:28, g:13},
  {id:455, n:'Captigel', t:'Plante', hp:66, atk:16, def:12, xp:24, g:11},
  {id:456, n:'Poissoroy', t:'Eau', hp:49, atk:9, def:9, xp:16, g:7},
  {id:457, n:'Luminéon', t:'Eau', hp:69, atk:14, def:14, xp:26, g:12},
  {id:458, n:'Mantax', t:'Eau/Vol', hp:45, atk:10, def:11, xp:14, g:6},
  {id:459, n:'Blizaroi', t:'Plante/Glace', hp:90, atk:13, def:15, xp:22, g:10},
  {id:460, n:'Blizzaroi', t:'Plante/Glace', hp:110, atk:18, def:20, xp:35, g:16},
  {id:461, n:'Dimoret', t:'Ténèbres/Glace', hp:70, atk:22, def:11, xp:29, g:13},
  {id:462, n:'Magnézone', t:'Électrik/Acier', hp:70, atk:15, def:25, xp:29, g:13},
  {id:463, n:'Leuphorie', t:'Normal', hp:110, atk:13, def:13, xp:25, g:11},
  {id:464, n:'Rhinastoc', t:'Sol/Roche', hp:115, atk:28, def:25, xp:35, g:16},
  {id:465, n:'Méganium', t:'Plante/Sol', hp:95, atk:11, def:11, xp:35, g:16},
  {id:466, n:'Élekross', t:'Électrik', hp:85, atk:23, def:13, xp:35, g:16},
  {id:467, n:'Maglard', t:'Feu', hp:110, atk:25, def:16, xp:35, g:16},
  {id:468, n:'Togekiss', t:'Normal/Vol', hp:85, atk:11, def:17, xp:35, g:16},
  {id:469, n:'Yanmega', t:'Insecte/Vol', hp:86, atk:17, def:14, xp:27, g:12},
  {id:470, n:'Phyllali', t:'Plante', hp:65, atk:11, def:17, xp:26, g:12},
  {id:471, n:'Givrali', t:'Glace', hp:65, atk:11, def:17, xp:26, g:12},
  {id:472, n:'Glissors', t:'Sol/Vol', hp:75, atk:21, def:15, xp:27, g:12},
  {id:473, n:'Mamoswine', t:'Glace/Sol', hp:110, atk:24, def:14, xp:35, g:16},
  {id:474, n:'Porygon-Z', t:'Normal', hp:85, atk:20, def:14, xp:29, g:13},
  {id:475, n:'Gallame', t:'Psy/Combat', hp:68, atk:20, def:16, xp:29, g:13},
  {id:476, n:'Tarinorme', t:'Roche/Acier', hp:60, atk:8, def:35, xp:29, g:13},
  {id:477, n:'Feucroc', t:'Spectre', hp:45, atk:14, def:14, xp:30, g:14},
  {id:478, n:'Frysndef', t:'Glace/Spectre', hp:70, atk:15, def:14, xp:26, g:12},
  {id:479, n:'Motisma', t:'Électrik/Spectre', hp:50, atk:12, def:12, xp:24, g:11},
  {id:480, n:'Créfadet', t:'Psy', hp:75, atk:10, def:10, xp:37, g:17},
  {id:481, n:'Mémoira', t:'Psy', hp:80, atk:10, def:10, xp:37, g:17},
  {id:482, n:'Axolfée', t:'Psy', hp:80, atk:10, def:10, xp:37, g:17},
  {id:483, n:'Dialga', t:'Acier/Dragon', hp:100, atk:24, def:24, xp:60, g:27},
  {id:484, n:'Palkia', t:'Eau/Dragon', hp:90, atk:24, def:20, xp:60, g:27},
  {id:485, n:'Heatran', t:'Feu/Acier', hp:91, atk:20, def:20, xp:50, g:23},
  {id:486, n:'Regigigas', t:'Normal', hp:110, atk:20, def:20, xp:55, g:25},
  {id:487, n:'Giratina', t:'Spectre/Dragon', hp:150, atk:20, def:20, xp:60, g:27},
  {id:488, n:'Cresselia', t:'Psy', hp:120, atk:11, def:21, xp:50, g:23},
  {id:489, n:'Phione', t:'Eau', hp:80, atk:10, def:10, xp:40, g:18},
  {id:490, n:'Manaphy', t:'Eau', hp:100, atk:20, def:20, xp:55, g:25},
  {id:491, n:'Darkrai', t:'Ténèbres', hp:70, atk:24, def:14, xp:60, g:27},
  {id:492, n:'Shaymin', t:'Plante', hp:100, atk:20, def:20, xp:60, g:27},
  {id:493, n:'Arceus', t:'Normal', hp:120, atk:24, def:24, xp:80, g:36},
];
const GEN4_SPD = {387:31,388:47,389:56,390:45,391:58,392:80,393:40,394:51,395:60,396:60,397:71,398:101,399:31,400:55,401:65,402:68,403:60,404:70,405:70,406:55,407:90,408:58,409:58,410:30,411:30,412:29,413:40,414:51,415:85,416:85,417:95,418:65,419:91,420:35,421:60,422:34,423:39,424:50,425:55,426:65,427:57,428:72,429:95,430:45,431:70,432:86,433:45,434:90,435:120,436:24,437:33,438:10,439:60,440:30,441:91,442:35,443:42,444:82,445:102,446:30,447:60,448:90,449:32,450:47,451:65,452:81,453:50,454:74,455:91,456:66,457:91,458:50,459:40,460:60,461:95,462:60,463:50,464:40,465:50,466:95,467:95,468:80,469:95,470:65,471:65,472:95,473:80,474:90,475:80,476:20,477:140,478:110,479:86,480:80,481:80,482:80,483:90,484:100,485:77,486:100,487:90,488:85,489:80,490:100,491:125,492:100,493:120};

// ══ GEN 5 — Unova (494-649) ══
const GEN5 = [
  {id:494, n:'Victini', t:'Psy/Feu', hp:100, atk:20, def:20, xp:60, g:27},
  {id:495, n:'Vipélierre', t:'Plante', hp:45, atk:9, def:9, xp:16, g:7},
  {id:496, n:'Lianaja', t:'Plante', hp:60, atk:14, def:14, xp:22, g:10},
  {id:497, n:'Majaspic', t:'Plante', hp:75, atk:20, def:20, xp:34, g:15},
  {id:498, n:'Gruikui', t:'Feu', hp:65, atk:14, def:9, xp:16, g:7},
  {id:499, n:'Grotichon', t:'Feu/Combat', hp:90, atk:22, def:14, xp:22, g:10},
  {id:500, n:'Roigada', t:'Feu/Combat', hp:110, atk:30, def:18, xp:34, g:15},
  {id:501, n:'Moustillon', t:'Eau', hp:55, atk:9, def:9, xp:16, g:7},
  {id:502, n:'Maousse', t:'Eau', hp:75, atk:14, def:14, xp:22, g:10},
  {id:503, n:'Pirassou', t:'Eau', hp:95, atk:20, def:20, xp:34, g:15},
  {id:504, n:'Fouinette', t:'Normal', hp:56, atk:10, def:9, xp:13, g:6},
  {id:505, n:'Fouinar', t:'Normal', hp:71, atk:14, def:12, xp:22, g:10},
  {id:506, n:'Ronflex', t:'Normal', hp:65, atk:8, def:10, xp:15, g:7},
  {id:507, n:'Barking', t:'Normal', hp:65, atk:8, def:12, xp:19, g:9},
  {id:508, n:'Stoutland', t:'Normal', hp:85, atk:22, def:16, xp:30, g:14},
  {id:509, n:'Méroméla', t:'Ténèbres', hp:41, atk:9, def:7, xp:14, g:6},
  {id:510, n:'Farfuret', t:'Ténèbres', hp:56, atk:16, def:11, xp:22, g:10},
  {id:511, n:'Leuphorie', t:'Plante', hp:63, atk:12, def:11, xp:17, g:8},
  {id:512, n:'Serperior', t:'Plante', hp:63, atk:12, def:12, xp:27, g:12},
  {id:513, n:'Simiabraz', t:'Feu', hp:65, atk:14, def:9, xp:17, g:8},
  {id:514, n:'Pignite', t:'Feu/Combat', hp:90, atk:22, def:12, xp:27, g:12},
  {id:515, n:'Darumacho', t:'Feu', hp:55, atk:16, def:8, xp:14, g:6},
  {id:516, n:'Maractus', t:'Plante', hp:75, atk:14, def:13, xp:22, g:10},
  {id:517, n:'Munna', t:'Psy', hp:76, atk:7, def:11, xp:14, g:6},
  {id:518, n:'Musharna', t:'Psy', hp:116, atk:11, def:16, xp:26, g:12},
  {id:519, n:'Poichigeon', t:'Normal/Vol', hp:33, atk:7, def:6, xp:11, g:5},
  {id:520, n:'Trombine', t:'Normal/Vol', hp:43, atk:10, def:8, xp:15, g:7},
  {id:521, n:'Éfflèche', t:'Normal/Vol', hp:63, atk:15, def:10, xp:25, g:11},
  {id:522, n:'Zébibron', t:'Électrik', hp:55, atk:11, def:7, xp:14, g:6},
  {id:523, n:'Zéfora', t:'Électrik', hp:75, atk:17, def:11, xp:26, g:12},
  {id:524, n:'Nénupiot', t:'Roche', hp:45, atk:7, def:7, xp:14, g:6},
  {id:525, n:'Racaillou', t:'Roche', hp:70, atk:14, def:14, xp:22, g:10},
  {id:526, n:'Gigantamax', t:'Roche', hp:95, atk:21, def:21, xp:33, g:15},
  {id:527, n:'Trompignon', t:'Sol', hp:50, atk:9, def:9, xp:14, g:6},
  {id:528, n:'Rhinolove', t:'Sol', hp:65, atk:13, def:13, xp:26, g:12},
  {id:529, n:'Couâteau', t:'Normal/Vol', hp:38, atk:8, def:8, xp:11, g:5},
  {id:530, n:'Excavarène', t:'Sol/Acier', hp:110, atk:25, def:22, xp:35, g:16},
  {id:531, n:'Fleurdoux', t:'Normal/Vol', hp:52, atk:8, def:10, xp:17, g:8},
  {id:532, n:'Cougnorit', t:'Combat', hp:75, atk:20, def:11, xp:18, g:8},
  {id:533, n:'Machopeur', t:'Combat', hp:95, atk:26, def:14, xp:27, g:12},
  {id:534, n:'Mastro', t:'Combat', hp:105, atk:30, def:18, xp:35, g:16},
  {id:535, n:'Carapagos', t:'Eau', hp:45, atk:8, def:8, xp:12, g:5},
  {id:536, n:'Crapote', t:'Eau/Combat', hp:65, atk:14, def:12, xp:19, g:9},
  {id:537, n:'Amonetop', t:'Eau/Combat', hp:75, atk:15, def:15, xp:28, g:13},
  {id:538, n:'Judokrak', t:'Combat', hp:70, atk:24, def:14, xp:24, g:11},
  {id:539, n:'Karaclée', t:'Combat', hp:55, atk:26, def:9, xp:24, g:11},
  {id:540, n:'Ceurolei', t:'Insecte', hp:40, atk:10, def:8, xp:14, g:6},
  {id:541, n:'Livreur', t:'Insecte', hp:55, atk:13, def:11, xp:21, g:9},
  {id:542, n:'Papilord', t:'Insecte/Plante', hp:70, atk:14, def:14, xp:27, g:12},
  {id:543, n:'Venipède', t:'Poison/Insecte', hp:30, atk:9, def:9, xp:14, g:6},
  {id:544, n:'Scolipède', t:'Poison/Insecte', hp:100, atk:20, def:17, xp:30, g:14},
  {id:545, n:'Cotovol', t:'Plante', hp:45, atk:9, def:7, xp:14, g:6},
  {id:546, n:'Maracudi', t:'Plante', hp:75, atk:14, def:11, xp:25, g:11},
  {id:547, n:'Amonita', t:'Eau/Sol', hp:60, atk:9, def:11, xp:12, g:5},
  {id:548, n:'Joltan', t:'Plante', hp:49, atk:7, def:7, xp:14, g:6},
  {id:549, n:'Fragilady', t:'Plante', hp:86, atk:14, def:12, xp:27, g:12},
  {id:550, n:'Barloche', t:'Eau/Normal', hp:70, atk:14, def:12, xp:20, g:9},
  {id:551, n:'Krobalid', t:'Sol/Ténèbres', hp:60, atk:15, def:9, xp:16, g:7},
  {id:552, n:'Frygel', t:'Sol/Ténèbres', hp:65, atk:20, def:12, xp:22, g:10},
  {id:553, n:'Kraborpion', t:'Sol/Ténèbres', hp:95, atk:28, def:18, xp:33, g:15},
  {id:554, n:'Darumagma', t:'Feu', hp:90, atk:28, def:8, xp:24, g:11},
  {id:555, n:'Broceleur', t:'Feu', hp:105, atk:30, def:10, xp:30, g:14},
  {id:556, n:'Maractus', t:'Plante', hp:75, atk:14, def:13, xp:22, g:10},
  {id:557, n:'Carapagos', t:'Roche/Insecte', hp:50, atk:9, def:15, xp:15, g:7},
  {id:558, n:'Filiaiguille', t:'Roche/Insecte', hp:70, atk:14, def:20, xp:26, g:12},
  {id:559, n:'Scraggy', t:'Ténèbres/Combat', hp:50, atk:15, def:12, xp:17, g:8},
  {id:560, n:'Scarhino', t:'Ténèbres/Combat', hp:65, atk:20, def:18, xp:27, g:12},
  {id:561, n:'Oibird', t:'Psy/Vol', hp:62, atk:11, def:9, xp:23, g:10},
  {id:562, n:'Mélancolux', t:'Spectre', hp:55, atk:11, def:10, xp:17, g:8},
  {id:563, n:'Phadra', t:'Spectre', hp:70, atk:13, def:13, xp:27, g:12},
  {id:564, n:'Plumajou', t:'Eau/Roche', hp:56, atk:9, def:13, xp:18, g:8},
  {id:565, n:'Carracosta', t:'Eau/Roche', hp:74, atk:16, def:19, xp:27, g:12},
  {id:566, n:'Aéroptéryx', t:'Vol/Roche', hp:80, atk:16, def:9, xp:18, g:8},
  {id:567, n:'Aéroptéryx', t:'Vol/Roche', hp:95, atk:21, def:12, xp:28, g:13},
  {id:568, n:'Dégueulasse', t:'Poison', hp:75, atk:10, def:7, xp:15, g:7},
  {id:569, n:'Garbodor', t:'Poison', hp:80, atk:17, def:16, xp:27, g:12},
  {id:570, n:'Zorua', t:'Ténèbres', hp:40, atk:13, def:7, xp:18, g:8},
  {id:571, n:'Zoroark', t:'Ténèbres', hp:60, atk:22, def:12, xp:30, g:14},
  {id:572, n:'Chinchidou', t:'Normal', hp:44, atk:9, def:9, xp:14, g:6},
  {id:573, n:'Farfuret', t:'Normal', hp:55, atk:11, def:11, xp:23, g:10},
  {id:574, n:'Togépi', t:'Normal/Fée', hp:70, atk:7, def:9, xp:17, g:8},
  {id:575, n:'Tiboudet', t:'Normal/Psy', hp:85, atk:10, def:12, xp:25, g:11},
  {id:576, n:'Méphistia', t:'Psy', hp:95, atk:14, def:14, xp:30, g:14},
  {id:577, n:'Solasis', t:'Psy', hp:40, atk:11, def:6, xp:17, g:8},
  {id:578, n:'Duosion', t:'Psy', hp:65, atk:13, def:9, xp:22, g:10},
  {id:579, n:'Réunidus', t:'Psy', hp:110, atk:17, def:13, xp:30, g:14},
  {id:580, n:'Couaneton', t:'Eau/Vol', hp:44, atk:9, def:8, xp:14, g:6},
  {id:581, n:'Swanna', t:'Eau/Vol', hp:75, atk:16, def:11, xp:26, g:12},
  {id:582, n:'Frissonnade', t:'Glace', hp:36, atk:7, def:7, xp:14, g:6},
  {id:583, n:'Bouléglaçon', t:'Glace', hp:65, atk:12, def:14, xp:21, g:9},
  {id:584, n:'Blizzaroi', t:'Glace', hp:95, atk:16, def:20, xp:30, g:14},
  {id:585, n:'Vivaldaim', t:'Normal/Plante', hp:60, atk:11, def:10, xp:17, g:8},
  {id:586, n:'Haydaim', t:'Normal/Plante', hp:80, atk:16, def:14, xp:26, g:12},
  {id:587, n:'Maracachi', t:'Électrik/Vol', hp:55, atk:12, def:9, xp:19, g:9},
  {id:588, n:'Karrablast', t:'Insecte', hp:50, atk:14, def:13, xp:14, g:6},
  {id:589, n:'Escavalier', t:'Insecte/Acier', hp:70, atk:25, def:26, xp:27, g:12},
  {id:590, n:'Painchamp', t:'Plante/Poison', hp:69, atk:10, def:10, xp:16, g:7},
  {id:591, n:'Chapignon', t:'Plante/Poison', hp:114, atk:13, def:13, xp:27, g:12},
  {id:592, n:'Galekid', t:'Eau/Spectre', hp:55, atk:9, def:9, xp:15, g:7},
  {id:593, n:'Lamantine', t:'Eau/Spectre', hp:85, atk:15, def:15, xp:28, g:13},
  {id:594, n:'Ambigolf', t:'Eau', hp:165, atk:9, def:9, xp:27, g:12},
  {id:595, n:'Vibraninf', t:'Insecte/Électrik', hp:37, atk:10, def:6, xp:14, g:6},
  {id:596, n:'Galvantula', t:'Insecte/Électrik', hp:70, atk:17, def:12, xp:26, g:12},
  {id:597, n:'Ferroseed', t:'Plante/Acier', hp:44, atk:9, def:20, xp:17, g:8},
  {id:598, n:'Ferrothorn', t:'Plante/Acier', hp:74, atk:15, def:31, xp:30, g:14},
  {id:599, n:'Klidoof', t:'Acier', hp:40, atk:9, def:9, xp:14, g:6},
  {id:600, n:'Métang', t:'Acier', hp:60, atk:13, def:13, xp:20, g:9},
  {id:601, n:'Métagross', t:'Acier/Psy', hp:80, atk:23, def:23, xp:33, g:15},
  {id:602, n:'Électrozéroc', t:'Électrik', hp:35, atk:10, def:5, xp:14, g:6},
  {id:603, n:'Ampéroce', t:'Électrik', hp:65, atk:14, def:9, xp:21, g:9},
  {id:604, n:'Électrodraco', t:'Électrik/Dragon', hp:85, atk:18, def:13, xp:30, g:14},
  {id:605, n:'Elgyem', t:'Psy', hp:55, atk:10, def:10, xp:17, g:8},
  {id:606, n:'Méthysta', t:'Psy', hp:75, atk:16, def:14, xp:28, g:13},
  {id:607, n:'Lugulabre', t:'Spectre/Feu', hp:45, atk:10, def:7, xp:14, g:6},
  {id:608, n:'Lampentiger', t:'Spectre/Feu', hp:60, atk:14, def:11, xp:21, g:9},
  {id:609, n:'Phénomètre', t:'Spectre/Feu', hp:60, atk:14, def:14, xp:30, g:14},
  {id:610, n:'Axon', t:'Dragon', hp:46, atk:14, def:9, xp:17, g:8},
  {id:611, n:'Fréaxon', t:'Dragon', hp:79, atk:21, def:14, xp:26, g:12},
  {id:612, n:'Fraxure', t:'Dragon', hp:97, atk:28, def:20, xp:35, g:16},
  {id:613, n:'Polarhume', t:'Glace', hp:90, atk:13, def:15, xp:19, g:9},
  {id:614, n:'Ursaluna', t:'Glace', hp:110, atk:26, def:20, xp:29, g:13},
  {id:615, n:'Cryogonal', t:'Glace', hp:70, atk:15, def:15, xp:24, g:11},
  {id:616, n:'Caratroc', t:'Insecte', hp:20, atk:6, def:22, xp:14, g:6},
  {id:617, n:'Kaïlèse', t:'Insecte/Glace', hp:70, atk:13, def:28, xp:27, g:12},
  {id:618, n:'Limonde', t:'Sol/Eau', hp:109, atk:10, def:9, xp:22, g:10},
  {id:619, n:'Mustéflott', t:'Sol/Eau', hp:76, atk:15, def:12, xp:27, g:12},
  {id:620, n:'Coatox', t:'Combat', hp:65, atk:17, def:12, xp:24, g:11},
  {id:621, n:'Drakkarmin', t:'Dragon/Feu', hp:50, atk:11, def:9, xp:18, g:8},
  {id:622, n:'Golett', t:'Sol/Spectre', hp:55, atk:15, def:15, xp:18, g:8},
  {id:623, n:'Golurk', t:'Sol/Spectre', hp:89, atk:24, def:24, xp:28, g:13},
  {id:624, n:'Couperet', t:'Ténèbres/Acier', hp:50, atk:19, def:14, xp:17, g:8},
  {id:625, n:'Tranchevent', t:'Ténèbres/Acier', hp:70, atk:25, def:19, xp:27, g:12},
  {id:626, n:'Tauros', t:'Normal', hp:75, atk:23, def:20, xp:22, g:10},
  {id:627, n:'Virmoin', t:'Normal/Vol', hp:45, atk:14, def:8, xp:14, g:6},
  {id:628, n:'Gueriaigle', t:'Normal/Vol', hp:79, atk:22, def:13, xp:26, g:12},
  {id:629, n:'Vultrobek', t:'Ténèbres/Vol', hp:45, atk:15, def:8, xp:15, g:7},
  {id:630, n:'Mandrillon', t:'Ténèbres/Vol', hp:65, atk:21, def:12, xp:27, g:12},
  {id:631, n:'Aflamanette', t:'Feu', hp:74, atk:12, def:10, xp:19, g:9},
  {id:632, n:'Mélokrok', t:'Combat/Acier', hp:84, atk:20, def:20, xp:27, g:12},
  {id:633, n:'Déïno', t:'Dragon/Ténèbres', hp:52, atk:13, def:11, xp:17, g:8},
  {id:634, n:'Zweilous', t:'Dragon/Ténèbres', hp:72, atk:18, def:16, xp:24, g:11},
  {id:635, n:'Hydragon', t:'Dragon/Ténèbres', hp:92, atk:24, def:20, xp:40, g:18},
  {id:636, n:'Larveyette', t:'Insecte/Feu', hp:55, atk:15, def:9, xp:17, g:8},
  {id:637, n:'Pyrax', t:'Insecte/Feu', hp:85, atk:24, def:14, xp:30, g:14},
  {id:638, n:'Cobaltium', t:'Combat/Acier', hp:91, atk:22, def:22, xp:50, g:23},
  {id:639, n:'Terrakium', t:'Combat/Roche', hp:91, atk:29, def:18, xp:50, g:23},
  {id:640, n:'Viridium', t:'Combat/Plante', hp:91, atk:22, def:22, xp:50, g:23},
  {id:641, n:'Zekrom', t:'Dragon/Électrik', hp:100, atk:28, def:22, xp:60, g:27},
  {id:642, n:'Reshiram', t:'Dragon/Feu', hp:100, atk:24, def:22, xp:60, g:27},
  {id:643, n:'Kyurem', t:'Dragon/Glace', hp:125, atk:24, def:20, xp:60, g:27},
  {id:644, n:'Spiritomb', t:'Psy', hp:100, atk:20, def:20, xp:50, g:23},
  {id:645, n:'Landorus', t:'Sol/Vol', hp:89, atk:28, def:15, xp:50, g:23},
  {id:646, n:'Kyurem', t:'Dragon/Glace', hp:125, atk:26, def:22, xp:65, g:29},
  {id:647, n:'Keldeo', t:'Eau/Combat', hp:91, atk:20, def:20, xp:50, g:23},
  {id:648, n:'Méloetta', t:'Normal/Psy', hp:100, atk:20, def:20, xp:50, g:23},
  {id:649, n:'Génesect', t:'Insecte/Acier', hp:71, atk:24, def:17, xp:50, g:23},
];
const GEN5_SPD = {494:100,495:45,496:60,497:75,498:65,499:65,500:65,501:63,502:76,503:91,504:75,505:116,506:45,507:55,508:80,509:71,510:111,511:72,512:102,513:72,514:55,515:65,516:60,517:24,518:29,519:43,520:58,521:93,522:76,523:116,524:30,525:45,526:55,527:58,528:98,529:57,530:45,531:77,532:40,533:55,534:45,535:71,536:91,537:75,538:45,539:85,540:55,541:60,542:29,543:40,544:112,545:95,546:95,547:55,548:50,549:75,550:71,551:85,552:90,553:121,554:50,555:55,556:60,557:55,558:85,559:48,560:58,561:71,562:30,563:45,564:35,565:32,566:70,567:110,568:60,569:75,570:65,571:105,572:58,573:88,574:40,575:45,576:75,577:30,578:30,579:30,580:50,581:98,582:50,583:55,584:75,585:95,586:111,587:91,588:60,589:20,590:52,591:30,592:40,593:45,594:29,595:85,596:108,597:10,598:20,599:40,600:60,601:70,602:45,603:85,604:115,605:30,606:50,607:55,608:55,609:55,610:97,611:109,612:97,613:40,614:50,615:105,616:5,617:25,618:45,619:77,620:91,621:80,622:30,623:55,624:70,625:83,626:110,627:60,628:100,629:60,630:90,631:61,632:68,633:38,634:58,635:98,636:60,637:100,638:90,639:70,640:108,641:90,642:90,643:95,644:91,645:101,646:95,647:108,648:90,649:99};

// ══ GEN 6 — Kalos (650-721) ══
const GEN6 = [
  {id:650, n:'Marisson', t:'Plante', hp:45, atk:9, def:9, xp:16, g:7},
  {id:651, n:'Sonistrelle', t:'Plante', hp:62, atk:14, def:14, xp:22, g:10},
  {id:652, n:'Blindépique', t:'Plante/Combat', hp:88, atk:22, def:22, xp:34, g:15},
  {id:653, n:'Feunnec', t:'Feu', hp:40, atk:8, def:7, xp:16, g:7},
  {id:654, n:'Roussil', t:'Feu/Psy', hp:59, atk:12, def:10, xp:22, g:10},
  {id:655, n:'Goupelin', t:'Feu/Psy', hp:75, atk:16, def:14, xp:34, g:15},
  {id:656, n:'Grenousse', t:'Eau', hp:41, atk:8, def:6, xp:16, g:7},
  {id:657, n:'Croâporal', t:'Eau', hp:54, atk:13, def:9, xp:22, g:10},
  {id:658, n:'Amphinobi', t:'Eau/Ténèbres', hp:72, atk:20, def:11, xp:34, g:15},
  {id:659, n:'Frilloselle', t:'Normal', hp:45, atk:10, def:6, xp:14, g:6},
  {id:660, n:'Mucuscule', t:'Normal', hp:71, atk:15, def:12, xp:23, g:10},
  {id:661, n:'Passerouge', t:'Normal/Vol', hp:35, atk:10, def:7, xp:14, g:6},
  {id:662, n:'Flambusard', t:'Normal/Vol', hp:52, atk:15, def:10, xp:21, g:9},
  {id:663, n:'Guériaigle', t:'Feu/Vol', hp:78, atk:21, def:13, xp:29, g:13},
  {id:664, n:'Lépidonille', t:'Insecte', hp:45, atk:9, def:9, xp:14, g:6},
  {id:665, n:'Chrysapile', t:'Insecte', hp:50, atk:9, def:12, xp:19, g:9},
  {id:666, n:'Prismillon', t:'Insecte/Vol', hp:80, atk:13, def:13, xp:27, g:12},
  {id:667, n:'Litleo', t:'Feu/Normal', hp:62, atk:13, def:8, xp:18, g:8},
  {id:668, n:'Pyroar', t:'Feu/Normal', hp:86, atk:16, def:12, xp:28, g:13},
  {id:669, n:'Floette', t:'Fée', hp:54, atk:7, def:7, xp:16, g:7},
  {id:670, n:'Flabébé', t:'Fée', hp:51, atk:8, def:11, xp:21, g:9},
  {id:671, n:'Florges', t:'Fée', hp:78, atk:9, def:14, xp:30, g:14},
  {id:672, n:'Skiddo', t:'Plante', hp:66, atk:13, def:11, xp:19, g:9},
  {id:673, n:'Gogoat', t:'Plante', hp:123, atk:17, def:15, xp:28, g:13},
  {id:674, n:'Pandespiègle', t:'Normal/Combat', hp:62, atk:13, def:9, xp:17, g:8},
  {id:675, n:'Pandarbare', t:'Normal/Combat', hp:82, atk:21, def:15, xp:28, g:13},
  {id:676, n:'Couafarel', t:'Normal', hp:75, atk:16, def:16, xp:24, g:11},
  {id:677, n:'Soniagali', t:'Psy', hp:44, atk:8, def:8, xp:15, g:7},
  {id:678, n:'Mistigrix', t:'Psy', hp:74, atk:13, def:13, xp:25, g:11},
  {id:679, n:'Couapête', t:'Acier/Spectre', hp:45, atk:11, def:11, xp:14, g:6},
  {id:680, n:'Doubléfaux', t:'Acier/Spectre', hp:85, atk:22, def:22, xp:23, g:10},
  {id:681, n:'Aegislash', t:'Acier/Spectre', hp:60, atk:15, def:30, xp:30, g:14},
  {id:682, n:'Sucroquin', t:'Fée', hp:62, atk:9, def:12, xp:18, g:8},
  {id:683, n:'Arômarisson', t:'Fée', hp:101, atk:14, def:18, xp:28, g:13},
  {id:684, n:'Sorbébé', t:'Glace/Fée', hp:45, atk:9, def:9, xp:15, g:7},
  {id:685, n:'Sorboubou', t:'Glace/Fée', hp:78, atk:14, def:14, xp:26, g:12},
  {id:686, n:'Sepiatroce', t:'Ténèbres/Psy', hp:50, atk:15, def:9, xp:17, g:8},
  {id:687, n:'Calmegon', t:'Ténèbres/Psy', hp:68, atk:21, def:13, xp:26, g:12},
  {id:688, n:'Clauncher', t:'Eau', hp:50, atk:14, def:13, xp:17, g:8},
  {id:689, n:'Crabominable', t:'Eau/Glace', hp:63, atk:21, def:17, xp:27, g:12},
  {id:690, n:'Goomy', t:'Dragon', hp:45, atk:7, def:7, xp:17, g:8},
  {id:691, n:'Sliggoo', t:'Dragon', hp:68, atk:11, def:14, xp:26, g:12},
  {id:692, n:'Goodra', t:'Dragon', hp:90, atk:19, def:19, xp:35, g:16},
  {id:693, n:'Phantump', t:'Spectre/Plante', hp:43, atk:11, def:10, xp:18, g:8},
  {id:694, n:'Trevenant', t:'Spectre/Plante', hp:85, atk:17, def:14, xp:27, g:12},
  {id:695, n:'Pumpkaboo', t:'Spectre/Plante', hp:49, atk:11, def:13, xp:16, g:7},
  {id:696, n:'Gourgeist', t:'Spectre/Plante', hp:65, atk:14, def:18, xp:26, g:12},
  {id:697, n:'Bergmite', t:'Glace', hp:55, atk:11, def:17, xp:17, g:8},
  {id:698, n:'Avalugg', t:'Glace', hp:95, atk:20, def:30, xp:27, g:12},
  {id:699, n:'Noibat', t:'Vol/Dragon', hp:40, atk:8, def:6, xp:17, g:8},
  {id:700, n:'Noivern', t:'Vol/Dragon', hp:85, atk:16, def:14, xp:30, g:14},
  {id:701, n:'Xerneas', t:'Fée', hp:126, atk:23, def:21, xp:60, g:27},
  {id:702, n:'Yveltal', t:'Ténèbres/Vol', hp:126, atk:23, def:21, xp:60, g:27},
  {id:703, n:'Zygarde', t:'Dragon/Sol', hp:108, atk:21, def:21, xp:55, g:25},
  {id:704, n:'Diancie', t:'Roche/Fée', hp:50, atk:20, def:30, xp:50, g:23},
  {id:705, n:'Hoopa', t:'Psy/Spectre', hp:80, atk:24, def:15, xp:50, g:23},
  {id:706, n:'Volcanion', t:'Feu/Eau', hp:80, atk:22, def:22, xp:50, g:23},
  {id:707, n:'Zygarde', t:'Dragon/Sol', hp:108, atk:21, def:21, xp:58, g:26},
  {id:708, n:'Diancie', t:'Roche/Fée', hp:50, atk:30, def:30, xp:55, g:25},
  {id:709, n:'Hoopa', t:'Psy', hp:80, atk:30, def:15, xp:55, g:25},
  {id:710, n:'Pumpkaboo', t:'Spectre/Plante', hp:59, atk:13, def:16, xp:16, g:7},
  {id:711, n:'Gourgeist', t:'Spectre/Plante', hp:75, atk:16, def:21, xp:27, g:12},
  {id:712, n:'Amagara', t:'Roche/Glace', hp:80, atk:10, def:19, xp:19, g:9},
  {id:713, n:'Dragalonge', t:'Roche/Glace', hp:100, atk:15, def:28, xp:28, g:13},
  {id:714, n:'Noibat', t:'Vol/Dragon', hp:40, atk:8, def:6, xp:17, g:8},
  {id:715, n:'Noivern', t:'Vol/Dragon', hp:85, atk:16, def:14, xp:30, g:14},
  {id:716, n:'Xerneas', t:'Fée', hp:126, atk:23, def:21, xp:60, g:27},
  {id:717, n:'Yveltal', t:'Ténèbres/Vol', hp:126, atk:23, def:21, xp:60, g:27},
  {id:718, n:'Zygarde', t:'Dragon/Sol', hp:108, atk:21, def:21, xp:55, g:25},
  {id:719, n:'Diancie', t:'Roche/Fée', hp:50, atk:20, def:30, xp:50, g:23},
  {id:720, n:'Hoopa', t:'Psy/Spectre', hp:80, atk:24, def:15, xp:50, g:23},
  {id:721, n:'Volcanion', t:'Feu/Eau', hp:80, atk:22, def:22, xp:50, g:23},
];
const GEN6_SPD = {650:43,651:65,652:88,653:42,654:59,655:88,656:71,657:77,658:122,659:75,660:101,661:56,662:84,663:126,664:55,665:35,666:89,667:72,668:106,669:52,670:60,671:75,672:52,673:68,674:60,675:58,676:91,677:104,678:109,679:30,680:35,681:60,682:52,683:52,684:62,685:92,686:82,687:86,688:44,689:55,690:40,691:60,692:80,693:38,694:56,695:51,696:84,697:28,698:28,699:55,700:123,701:99,702:99,703:95,704:50,705:70,706:70,707:95,708:110,709:70,710:51,711:84,712:42,713:30,714:55,715:123,716:99,717:99,718:95,719:50,720:70,721:70};

// ══ GEN 7 — Alola (722-809) ══
const GEN7 = [
  {id:722, n:'Brindibou', t:'Plante/Vol', hp:45, atk:10, def:8, xp:16, g:7},
  {id:723, n:'Efflèche', t:'Plante/Vol', hp:62, atk:14, def:11, xp:22, g:10},
  {id:724, n:'Archéduc', t:'Plante/Spectre', hp:78, atk:21, def:15, xp:34, g:15},
  {id:725, n:'Flamiaou', t:'Feu', hp:39, atk:10, def:8, xp:16, g:7},
  {id:726, n:'Matignon', t:'Feu', hp:58, atk:14, def:11, xp:22, g:10},
  {id:727, n:'Félinferno', t:'Feu/Ténèbres', hp:78, atk:24, def:14, xp:34, g:15},
  {id:728, n:'Otaquin', t:'Eau', hp:47, atk:7, def:7, xp:16, g:7},
  {id:729, n:'Otarlette', t:'Eau', hp:55, atk:11, def:11, xp:22, g:10},
  {id:730, n:'Tokotoro', t:'Eau/Fée', hp:79, atk:14, def:14, xp:34, g:15},
  {id:731, n:'Picochard', t:'Normal/Vol', hp:35, atk:8, def:6, xp:11, g:5},
  {id:732, n:'Pétrosinge', t:'Normal/Vol', hp:55, atk:13, def:10, xp:16, g:7},
  {id:733, n:'Toucanto', t:'Normal/Vol', hp:80, atk:19, def:14, xp:24, g:11},
  {id:734, n:'Fouinette', t:'Normal', hp:38, atk:10, def:9, xp:11, g:5},
  {id:735, n:'Fouinar', t:'Normal', hp:78, atk:19, def:15, xp:24, g:11},
  {id:736, n:'Larvibule', t:'Insecte', hp:45, atk:11, def:9, xp:14, g:6},
  {id:737, n:'Larvibulbe', t:'Insecte/Électrik', hp:55, atk:13, def:11, xp:21, g:9},
  {id:738, n:'Lucanon', t:'Insecte/Électrik', hp:70, atk:21, def:14, xp:26, g:12},
  {id:739, n:'Crabicoque', t:'Combat', hp:57, atk:14, def:13, xp:17, g:8},
  {id:740, n:'Crabominable', t:'Combat/Glace', hp:97, atk:23, def:18, xp:29, g:13},
  {id:741, n:'Plumeline', t:'Feu/Vol', hp:75, atk:16, def:12, xp:28, g:13},
  {id:742, n:'Mimicutie', t:'Insecte/Fée', hp:40, atk:7, def:7, xp:14, g:6},
  {id:743, n:'Lumivole', t:'Insecte/Fée', hp:55, atk:11, def:11, xp:22, g:10},
  {id:744, n:'Rocabot', t:'Roche', hp:45, atk:14, def:9, xp:17, g:8},
  {id:745, n:'Lougaroc', t:'Roche', hp:75, atk:25, def:11, xp:28, g:13},
  {id:746, n:'Froussardine', t:'Eau', hp:25, atk:5, def:4, xp:10, g:5},
  {id:747, n:'Morfente', t:'Poison/Eau', hp:65, atk:9, def:14, xp:21, g:9},
  {id:748, n:'Mélécorégon', t:'Poison/Eau', hp:80, atk:14, def:18, xp:27, g:12},
  {id:749, n:'Salmèche', t:'Sol', hp:50, atk:11, def:11, xp:17, g:8},
  {id:750, n:'Donostica', t:'Sol', hp:100, atk:21, def:21, xp:29, g:13},
  {id:751, n:'Dewpider', t:'Eau/Insecte', hp:38, atk:7, def:12, xp:14, g:6},
  {id:752, n:'Araquanide', t:'Eau/Insecte', hp:68, atk:9, def:20, xp:27, g:12},
  {id:753, n:'Amiagre', t:'Plante', hp:41, atk:9, def:7, xp:14, g:6},
  {id:754, n:'Lurantis', t:'Plante', hp:70, atk:21, def:18, xp:25, g:11},
  {id:755, n:'Morelull', t:'Plante/Fée', hp:51, atk:7, def:10, xp:14, g:6},
  {id:756, n:'Shiinotic', t:'Plante/Fée', hp:60, atk:8, def:13, xp:24, g:11},
  {id:757, n:'Salandit', t:'Poison/Feu', hp:48, atk:12, def:7, xp:16, g:7},
  {id:758, n:'Salazzle', t:'Poison/Feu', hp:68, atk:15, def:9, xp:28, g:13},
  {id:759, n:'Bouledogla', t:'Normal', hp:55, atk:15, def:11, xp:18, g:8},
  {id:760, n:'Bélénum', t:'Normal', hp:90, atk:20, def:19, xp:29, g:13},
  {id:761, n:'Bougeoisie', t:'Fée', hp:42, atk:6, def:8, xp:14, g:6},
  {id:762, n:'Doliv', t:'Fée', hp:55, atk:7, def:12, xp:21, g:9},
  {id:763, n:'Tsareena', t:'Plante', hp:72, atk:22, def:17, xp:29, g:13},
  {id:764, n:'Comfey', t:'Fée', hp:51, atk:6, def:14, xp:24, g:11},
  {id:765, n:'Oranguru', t:'Normal/Psy', hp:90, atk:13, def:16, xp:28, g:13},
  {id:766, n:'Passimian', t:'Combat', hp:100, atk:25, def:17, xp:28, g:13},
  {id:767, n:'Crabicoque', t:'Combat', hp:57, atk:14, def:13, xp:17, g:8},
  {id:768, n:'Golisopod', t:'Insecte/Eau', hp:75, atk:25, def:27, xp:30, g:14},
  {id:769, n:'Sablaireau', t:'Sol', hp:55, atk:10, def:10, xp:15, g:7},
  {id:770, n:'Palossand', t:'Sol/Spectre', hp:85, atk:17, def:23, xp:27, g:12},
  {id:771, n:'Pyukumuku', t:'Eau', hp:55, atk:6, def:25, xp:24, g:11},
  {id:772, n:'Type:Null', t:'Normal', hp:95, atk:20, def:20, xp:30, g:14},
  {id:773, n:'Silvallié', t:'Normal', hp:95, atk:21, def:21, xp:40, g:18},
  {id:774, n:'Météno', t:'Roche/Vol', hp:48, atk:8, def:10, xp:16, g:7},
  {id:775, n:'Tokorico', t:'Normal', hp:137, atk:13, def:13, xp:17, g:8},
  {id:776, n:'Turtonator', t:'Feu/Dragon', hp:60, atk:18, def:28, xp:28, g:13},
  {id:777, n:'Togedemaru', t:'Électrik/Acier', hp:65, atk:16, def:13, xp:22, g:10},
  {id:778, n:'Momartik', t:'Psy/Spectre', hp:53, atk:11, def:11, xp:22, g:10},
  {id:779, n:'Bruxish', t:'Eau/Psy', hp:68, atk:20, def:12, xp:22, g:10},
  {id:780, n:'Drampa', t:'Normal/Dragon', hp:78, atk:19, def:11, xp:27, g:12},
  {id:781, n:'Dhelmise', t:'Spectre/Plante', hp:70, atk:22, def:21, xp:28, g:13},
  {id:782, n:'Jangmo-o', t:'Dragon', hp:45, atk:14, def:14, xp:17, g:8},
  {id:783, n:'Hakamo-o', t:'Dragon/Combat', hp:55, atk:18, def:18, xp:22, g:10},
  {id:784, n:'Kommoo', t:'Dragon/Combat', hp:75, atk:22, def:24, xp:37, g:17},
  {id:785, n:'Tapu Koko', t:'Électrik/Fée', hp:70, atk:21, def:16, xp:50, g:23},
  {id:786, n:'Tapu Lele', t:'Psy/Fée', hp:70, atk:19, def:16, xp:50, g:23},
  {id:787, n:'Tapu Bulu', t:'Plante/Fée', hp:70, atk:25, def:21, xp:50, g:23},
  {id:788, n:'Tapu Fini', t:'Eau/Fée', hp:70, atk:16, def:21, xp:50, g:23},
  {id:789, n:'Cosmog', t:'Psy', hp:43, atk:4, def:4, xp:20, g:9},
  {id:790, n:'Cosmovum', t:'Psy', hp:43, atk:4, def:4, xp:20, g:9},
  {id:791, n:'Solgaleo', t:'Psy/Acier', hp:137, atk:23, def:21, xp:60, g:27},
  {id:792, n:'Lunala', t:'Psy/Spectre', hp:137, atk:21, def:18, xp:60, g:27},
  {id:793, n:'Nihilego', t:'Roche/Poison', hp:109, atk:16, def:13, xp:55, g:25},
  {id:794, n:'Béheyem', t:'Électrik', hp:107, atk:19, def:24, xp:55, g:25},
  {id:795, n:'Phytatac', t:'Feu/Poison', hp:138, atk:22, def:15, xp:55, g:25},
  {id:796, n:'Électrozéroc', t:'Électrik/Combat', hp:88, atk:21, def:15, xp:55, g:25},
  {id:797, n:'Célébronze', t:'Acier', hp:59, atk:25, def:26, xp:55, g:25},
  {id:798, n:'Guéperfolio', t:'Insecte/Vol', hp:129, atk:19, def:19, xp:55, g:25},
  {id:799, n:'Gobou', t:'Dragon', hp:169, atk:19, def:19, xp:55, g:25},
  {id:800, n:'Necrozma', t:'Psy', hp:97, atk:21, def:21, xp:60, g:27},
  {id:801, n:'Magearna', t:'Acier/Fée', hp:80, atk:20, def:22, xp:55, g:25},
  {id:802, n:'Marshadow', t:'Combat/Spectre', hp:90, atk:25, def:16, xp:55, g:25},
  {id:803, n:'Poipole', t:'Poison', hp:67, atk:16, def:13, xp:30, g:14},
  {id:804, n:'Naganadel', t:'Poison/Dragon', hp:73, atk:19, def:13, xp:50, g:23},
  {id:805, n:'Stakataka', t:'Roche/Acier', hp:61, atk:15, def:55, xp:55, g:25},
  {id:806, n:'Blacephalon', t:'Feu/Spectre', hp:53, atk:27, def:11, xp:55, g:25},
  {id:807, n:'Zeraora', t:'Électrik', hp:88, atk:25, def:16, xp:55, g:25},
  {id:808, n:'Meltan', t:'Acier', hp:46, atk:11, def:11, xp:35, g:16},
  {id:809, n:'Melmetal', t:'Acier', hp:135, atk:28, def:28, xp:50, g:23},
];
const GEN7_SPD = {722:42,723:65,724:91,725:65,726:60,727:109,728:50,729:58,730:74,731:61,732:81,733:91,734:42,735:109,736:50,737:45,738:84,739:55,740:43,741:93,742:80,743:95,744:55,745:110,746:80,747:35,748:45,749:28,750:35,751:27,752:42,753:60,754:45,755:30,756:30,757:77,758:117,759:52,760:70,761:50,762:50,763:72,764:100,765:60,766:80,767:55,768:40,769:42,770:35,771:5,772:59,773:95,774:60,775:10,776:36,777:96,778:72,779:92,780:36,781:40,782:45,783:65,784:85,785:130,786:95,787:75,788:85,789:37,790:37,791:97,792:97,793:103,794:43,795:99,796:100,797:90,798:100,799:71,800:79,801:65,802:125,803:73,804:121,805:13,806:107,807:143,808:48,809:34};

// ══ GEN 8 — Galar (810-891) ══
const GEN8 = [
  {id:810, n:'Ouistiaou', t:'Plante', hp:50, atk:10, def:8, xp:16, g:7},
  {id:811, n:'Éfflèche', t:'Plante/Dragon', hp:65, atk:16, def:12, xp:22, g:10},
  {id:812, n:'Gorythmic', t:'Plante/Dragon', hp:90, atk:22, def:18, xp:35, g:16},
  {id:813, n:'Scorbunny', t:'Feu', hp:50, atk:12, def:9, xp:16, g:7},
  {id:814, n:'Raboot', t:'Feu', hp:65, atk:17, def:12, xp:22, g:10},
  {id:815, n:'Lapin', t:'Feu/Combat', hp:80, atk:23, def:14, xp:35, g:16},
  {id:816, n:'Larméléon', t:'Eau', hp:50, atk:9, def:9, xp:16, g:7},
  {id:817, n:'Chlabrador', t:'Eau', hp:65, atk:13, def:13, xp:22, g:10},
  {id:818, n:'Lézargus', t:'Eau', hp:80, atk:19, def:19, xp:35, g:16},
  {id:819, n:'Skwovet', t:'Normal', hp:70, atk:10, def:8, xp:14, g:6},
  {id:820, n:'Greedent', t:'Normal', hp:120, atk:14, def:14, xp:24, g:11},
  {id:821, n:'Corviknight', t:'Vol/Acier', hp:98, atk:17, def:21, xp:30, g:14},
  {id:822, n:'Gossifleur', t:'Plante', hp:40, atk:8, def:9, xp:14, g:6},
  {id:823, n:'Eldegoss', t:'Plante', hp:60, atk:9, def:13, xp:24, g:11},
  {id:824, n:'Yamper', t:'Électrik', hp:59, atk:13, def:14, xp:14, g:6},
  {id:825, n:'Boltund', t:'Électrik', hp:69, atk:17, def:14, xp:24, g:11},
  {id:826, n:'Rookidee', t:'Vol', hp:38, atk:9, def:8, xp:11, g:5},
  {id:827, n:'Corvisquire', t:'Vol', hp:68, atk:15, def:12, xp:17, g:8},
  {id:828, n:'Applin', t:'Dragon/Plante', hp:40, atk:8, def:10, xp:14, g:6},
  {id:829, n:'Flapple', t:'Dragon/Plante', hp:70, atk:22, def:11, xp:27, g:12},
  {id:830, n:'Silicobra', t:'Sol', hp:52, atk:10, def:12, xp:15, g:7},
  {id:831, n:'Sandaconda', t:'Sol', hp:72, atk:17, def:20, xp:26, g:12},
  {id:832, n:'Cramorant', t:'Eau/Vol', hp:70, atk:15, def:12, xp:21, g:9},
  {id:833, n:'Arrokuda', t:'Eau', hp:41, atk:15, def:7, xp:14, g:6},
  {id:834, n:'Barraskewda', t:'Eau', hp:61, atk:23, def:10, xp:25, g:11},
  {id:835, n:'Toxel', t:'Électrik/Poison', hp:40, atk:4, def:8, xp:14, g:6},
  {id:836, n:'Toxtricity', t:'Électrik/Poison', hp:75, atk:21, def:14, xp:28, g:13},
  {id:837, n:'Sizzlipede', t:'Feu/Insecte', hp:50, atk:16, def:9, xp:15, g:7},
  {id:838, n:'Centiskorch', t:'Feu/Insecte', hp:100, atk:24, def:15, xp:28, g:13},
  {id:839, n:'Clobbopus', t:'Combat', hp:50, atk:14, def:9, xp:14, g:6},
  {id:840, n:'Grapploct', t:'Combat/Eau', hp:80, atk:23, def:16, xp:27, g:12},
  {id:841, n:'Sinistea', t:'Spectre', hp:40, atk:10, def:10, xp:14, g:6},
  {id:842, n:'Polteageist', t:'Spectre', hp:60, atk:14, def:14, xp:24, g:11},
  {id:843, n:'Hatenna', t:'Psy', hp:42, atk:6, def:8, xp:14, g:6},
  {id:844, n:'Hattrem', t:'Psy', hp:57, atk:9, def:11, xp:21, g:9},
  {id:845, n:'Hatterene', t:'Psy/Fée', hp:57, atk:19, def:15, xp:28, g:13},
  {id:846, n:'Impidimp', t:'Ténèbres/Fée', hp:45, atk:10, def:8, xp:14, g:6},
  {id:847, n:'Morgrem', t:'Ténèbres/Fée', hp:55, atk:13, def:10, xp:19, g:9},
  {id:848, n:'Grimmsnarl', t:'Ténèbres/Fée', hp:95, atk:25, def:16, xp:29, g:13},
  {id:849, n:'Obstagoon', t:'Ténèbres/Normal', hp:93, atk:20, def:19, xp:28, g:13},
  {id:850, n:'Perrserker', t:'Acier', hp:70, atk:25, def:21, xp:24, g:11},
  {id:851, n:'Cursola', t:'Spectre', hp:60, atk:19, def:22, xp:22, g:10},
  {id:852, n:'Sirfetch\'d', t:'Combat', hp:62, atk:29, def:18, xp:27, g:12},
  {id:853, n:'Mr Mime', t:'Glace/Psy', hp:50, atk:13, def:13, xp:25, g:11},
  {id:854, n:'Runerigus', t:'Sol/Spectre', hp:58, atk:18, def:25, xp:26, g:12},
  {id:855, n:'Milcery', t:'Fée', hp:45, atk:6, def:9, xp:14, g:6},
  {id:856, n:'Alcremie', t:'Fée', hp:65, atk:11, def:14, xp:26, g:12},
  {id:857, n:'Falinks', t:'Combat', hp:65, atk:22, def:18, xp:24, g:11},
  {id:858, n:'Pincurchin', t:'Électrik', hp:48, atk:15, def:18, xp:18, g:8},
  {id:859, n:'Snom', t:'Glace/Insecte', hp:30, atk:6, def:6, xp:14, g:6},
  {id:860, n:'Frosmoth', t:'Glace/Insecte', hp:70, atk:12, def:12, xp:24, g:11},
  {id:861, n:'Stonjourner', t:'Roche', hp:100, atk:22, def:22, xp:22, g:10},
  {id:862, n:'Eiscue', t:'Glace', hp:75, atk:16, def:21, xp:22, g:10},
  {id:863, n:'Indeedee', t:'Psy/Normal', hp:60, atk:10, def:11, xp:25, g:11},
  {id:864, n:'Morpeko', t:'Électrik/Ténèbres', hp:58, atk:18, def:12, xp:22, g:10},
  {id:865, n:'Copperajah', t:'Acier', hp:122, atk:23, def:18, xp:28, g:13},
  {id:866, n:'Dracozolt', t:'Électrik/Dragon', hp:90, atk:24, def:18, xp:28, g:13},
  {id:867, n:'Arctozolt', t:'Électrik/Glace', hp:90, atk:19, def:19, xp:28, g:13},
  {id:868, n:'Dracovish', t:'Eau/Dragon', hp:90, atk:24, def:18, xp:28, g:13},
  {id:869, n:'Arctovish', t:'Eau/Glace', hp:90, atk:19, def:22, xp:28, g:13},
  {id:870, n:'Duraludon', t:'Acier/Dragon', hp:70, atk:19, def:19, xp:28, g:13},
  {id:871, n:'Dreepy', t:'Dragon/Spectre', hp:28, atk:9, def:6, xp:18, g:8},
  {id:872, n:'Drakloak', t:'Dragon/Spectre', hp:68, atk:14, def:10, xp:24, g:11},
  {id:873, n:'Dragapult', t:'Dragon/Spectre', hp:88, atk:22, def:14, xp:35, g:16},
  {id:874, n:'Zacian', t:'Fée', hp:92, atk:29, def:21, xp:60, g:27},
  {id:875, n:'Zamazenta', t:'Combat', hp:92, atk:21, def:29, xp:60, g:27},
  {id:876, n:'Eternatus', t:'Poison/Dragon', hp:140, atk:23, def:18, xp:60, g:27},
  {id:877, n:'Kubfu', t:'Combat', hp:60, atk:19, def:12, xp:35, g:16},
  {id:878, n:'Urshifu', t:'Combat/Ténèbres', hp:100, atk:30, def:18, xp:50, g:23},
  {id:879, n:'Zarude', t:'Ténèbres/Plante', hp:105, atk:25, def:21, xp:50, g:23},
  {id:880, n:'Regieleki', t:'Électrik', hp:80, atk:22, def:16, xp:50, g:23},
  {id:881, n:'Regidrago', t:'Dragon', hp:200, atk:20, def:20, xp:50, g:23},
  {id:882, n:'Glastrier', t:'Glace', hp:100, atk:30, def:30, xp:50, g:23},
  {id:883, n:'Spectrier', t:'Spectre', hp:100, atk:23, def:15, xp:50, g:23},
  {id:884, n:'Calyrex', t:'Psy/Plante', hp:100, atk:16, def:16, xp:50, g:23},
  {id:885, n:'Wyrdeer', t:'Normal/Psy', hp:103, atk:20, def:16, xp:28, g:13},
  {id:886, n:'Kleavor', t:'Insecte/Roche', hp:70, atk:24, def:18, xp:28, g:13},
  {id:887, n:'Ursaluna', t:'Sol/Normal', hp:130, atk:27, def:21, xp:28, g:13},
  {id:888, n:'Basculegion', t:'Eau/Spectre', hp:120, atk:20, def:13, xp:28, g:13},
  {id:889, n:'Sneasler', t:'Combat/Poison', hp:80, atk:25, def:12, xp:28, g:13},
  {id:890, n:'Overqwil', t:'Poison/Ténèbres', hp:85, atk:22, def:17, xp:28, g:13},
  {id:891, n:'Enamorus', t:'Fée/Vol', hp:74, atk:19, def:15, xp:50, g:23},
];
const GEN8_SPD = {810:50,811:60,812:85,813:69,814:94,815:119,816:40,817:55,818:65,819:42,820:45,821:85,822:40,823:60,824:57,825:121,826:60,827:77,828:40,829:95,830:40,831:55,832:85,833:91,834:136,835:40,836:83,837:45,838:65,839:35,840:72,841:45,842:70,843:30,844:55,845:29,846:55,847:70,848:60,849:94,850:60,851:30,852:60,853:80,854:30,855:39,856:64,857:85,858:15,859:20,860:65,861:70,862:50,863:88,864:97,865:30,866:75,867:55,868:75,869:44,870:85,871:82,872:112,873:142,874:138,875:138,876:130,877:72,878:97,879:105,880:200,881:80,882:30,883:130,884:100,885:65,886:90,887:50,888:78,889:120,890:90,891:107};

// ══ GEN 9 — Paldea (906-1010) ══
const GEN9 = [
  {id:906, n:'Poussacha', t:'Plante', hp:40, atk:9, def:9, xp:16, g:7},
  {id:907, n:'Miaouss', t:'Plante', hp:61, atk:14, def:13, xp:22, g:10},
  {id:908, n:'Meowscarada', t:'Plante/Ténèbres', hp:76, atk:22, def:15, xp:34, g:15},
  {id:909, n:'Chochodile', t:'Feu', hp:71, atk:14, def:11, xp:16, g:7},
  {id:910, n:'Crocubot', t:'Feu/Normal', hp:81, atk:19, def:14, xp:22, g:10},
  {id:911, n:'Skeledirge', t:'Feu/Spectre', hp:104, atk:20, def:21, xp:34, g:15},
  {id:912, n:'Coiffeton', t:'Eau', hp:70, atk:11, def:9, xp:16, g:7},
  {id:913, n:'Canards', t:'Eau/Combat', hp:80, atk:15, def:14, xp:22, g:10},
  {id:914, n:'Palafin', t:'Eau', hp:100, atk:24, def:16, xp:34, g:15},
  {id:915, n:'Lechonk', t:'Normal', hp:54, atk:8, def:8, xp:14, g:6},
  {id:916, n:'Oinkologne', t:'Normal', hp:110, atk:17, def:16, xp:23, g:10},
  {id:917, n:'Tarountula', t:'Insecte', hp:35, atk:11, def:11, xp:12, g:5},
  {id:918, n:'Spidops', t:'Insecte', hp:60, atk:15, def:15, xp:22, g:10},
  {id:919, n:'Nymble', t:'Insecte', hp:33, atk:13, def:7, xp:12, g:5},
  {id:920, n:'Lokix', t:'Insecte/Ténèbres', hp:71, atk:22, def:12, xp:23, g:10},
  {id:921, n:'Pawmi', t:'Électrik', hp:45, atk:10, def:7, xp:14, g:6},
  {id:922, n:'Pawmo', t:'Électrik/Combat', hp:60, atk:14, def:11, xp:21, g:9},
  {id:923, n:'Pawmot', t:'Électrik/Combat', hp:70, atk:20, def:14, xp:28, g:13},
  {id:924, n:'Tandemaus', t:'Normal', hp:50, atk:11, def:11, xp:14, g:6},
  {id:925, n:'Maushold', t:'Normal', hp:74, atk:16, def:14, xp:24, g:11},
  {id:926, n:'Fidough', t:'Fée', hp:37, atk:9, def:11, xp:14, g:6},
  {id:927, n:'Dachsbun', t:'Fée', hp:57, atk:13, def:18, xp:24, g:11},
  {id:928, n:'Smoliv', t:'Plante/Normal', hp:41, atk:8, def:9, xp:14, g:6},
  {id:929, n:'Dolliv', t:'Plante/Normal', hp:52, atk:11, def:12, xp:21, g:9},
  {id:930, n:'Arboliva', t:'Plante/Normal', hp:78, atk:16, def:17, xp:29, g:13},
  {id:931, n:'Squawkabilly', t:'Normal/Vol', hp:82, atk:19, def:11, xp:22, g:10},
  {id:932, n:'Nacli', t:'Roche', hp:55, atk:10, def:14, xp:14, g:6},
  {id:933, n:'Naclstack', t:'Roche', hp:75, atk:14, def:20, xp:21, g:9},
  {id:934, n:'Garganacl', t:'Roche', hp:100, atk:18, def:25, xp:30, g:14},
  {id:935, n:'Charcadet', t:'Feu', hp:40, atk:13, def:7, xp:17, g:8},
  {id:936, n:'Armarouge', t:'Feu/Psy', hp:85, atk:19, def:22, xp:28, g:13},
  {id:937, n:'Ceruledge', t:'Feu/Spectre', hp:75, atk:25, def:18, xp:28, g:13},
  {id:938, n:'Tadbulb', t:'Électrik', hp:45, atk:6, def:8, xp:14, g:6},
  {id:939, n:'Bellibolt', t:'Électrik', hp:109, atk:12, def:14, xp:26, g:12},
  {id:940, n:'Wattrel', t:'Électrik/Vol', hp:40, atk:12, def:6, xp:15, g:7},
  {id:941, n:'Kilowattrel', t:'Électrik/Vol', hp:70, atk:19, def:11, xp:27, g:12},
  {id:942, n:'Maschiff', t:'Ténèbres', hp:60, atk:14, def:10, xp:17, g:8},
  {id:943, n:'Mabosstiff', t:'Ténèbres', hp:80, atk:22, def:15, xp:27, g:12},
  {id:944, n:'Shroodle', t:'Poison/Normal', hp:40, atk:13, def:6, xp:14, g:6},
  {id:945, n:'Grafaiai', t:'Poison/Normal', hp:63, atk:18, def:12, xp:24, g:11},
  {id:946, n:'Bramblin', t:'Plante/Spectre', hp:40, atk:10, def:7, xp:14, g:6},
  {id:947, n:'Brambleghast', t:'Plante/Spectre', hp:55, atk:20, def:12, xp:24, g:11},
  {id:948, n:'Toedscool', t:'Plante/Sol', hp:40, atk:8, def:8, xp:14, g:6},
  {id:949, n:'Toedscruel', t:'Plante/Sol', hp:80, atk:12, def:12, xp:24, g:11},
  {id:950, n:'Klawf', t:'Roche', hp:70, atk:20, def:15, xp:22, g:10},
  {id:951, n:'Capsakid', t:'Plante', hp:50, atk:14, def:8, xp:14, g:6},
  {id:952, n:'Scovillain', t:'Plante/Feu', hp:65, atk:22, def:12, xp:24, g:11},
  {id:953, n:'Rellor', t:'Insecte', hp:41, atk:11, def:11, xp:14, g:6},
  {id:954, n:'Rabsca', t:'Insecte/Psy', hp:85, atk:11, def:11, xp:24, g:11},
  {id:955, n:'Flittle', t:'Psy', hp:30, atk:7, def:7, xp:14, g:6},
  {id:956, n:'Espathra', t:'Psy', hp:95, atk:16, def:11, xp:26, g:12},
  {id:957, n:'Tinkatink', t:'Fée/Acier', hp:50, atk:9, def:12, xp:14, g:6},
  {id:958, n:'Tinkatuff', t:'Fée/Acier', hp:65, atk:14, def:17, xp:21, g:9},
  {id:959, n:'Tinkaton', t:'Fée/Acier', hp:85, atk:17, def:24, xp:30, g:14},
  {id:960, n:'Wiglett', t:'Eau', hp:10, atk:14, def:6, xp:14, g:6},
  {id:961, n:'Wugtrio', t:'Eau', hp:35, atk:22, def:9, xp:24, g:11},
  {id:962, n:'Bombirdier', t:'Vol/Ténèbres', hp:70, atk:21, def:12, xp:22, g:10},
  {id:963, n:'Finizen', t:'Eau', hp:70, atk:13, def:11, xp:18, g:8},
  {id:964, n:'Palafin', t:'Eau', hp:100, atk:24, def:16, xp:30, g:14},
  {id:965, n:'Varoom', t:'Acier/Poison', hp:45, atk:14, def:14, xp:17, g:8},
  {id:966, n:'Revavroom', t:'Acier/Poison', hp:80, atk:22, def:20, xp:28, g:13},
  {id:967, n:'Cyclizar', t:'Dragon/Normal', hp:70, atk:18, def:12, xp:22, g:10},
  {id:968, n:'Orthworm', t:'Acier', hp:70, atk:16, def:25, xp:22, g:10},
  {id:969, n:'Glimmet', t:'Roche/Poison', hp:48, atk:8, def:10, xp:17, g:8},
  {id:970, n:'Glimmora', t:'Roche/Poison', hp:83, atk:14, def:18, xp:30, g:14},
  {id:971, n:'Greavard', t:'Spectre', hp:50, atk:14, def:11, xp:17, g:8},
  {id:972, n:'Houndstone', t:'Spectre', hp:72, atk:18, def:18, xp:27, g:12},
  {id:973, n:'Flamigo', t:'Vol/Combat', hp:82, atk:22, def:14, xp:22, g:10},
  {id:974, n:'Cetoddle', t:'Glace', hp:108, atk:14, def:10, xp:17, g:8},
  {id:975, n:'Cetitan', t:'Glace', hp:170, atk:20, def:11, xp:29, g:13},
  {id:976, n:'Veluza', t:'Eau/Psy', hp:90, atk:21, def:12, xp:22, g:10},
  {id:977, n:'Dondozo', t:'Eau', hp:150, atk:20, def:15, xp:28, g:13},
  {id:978, n:'Tatsugiri', t:'Dragon/Eau', hp:68, atk:13, def:13, xp:22, g:10},
  {id:979, n:'Annihilape', t:'Combat/Spectre', hp:110, atk:23, def:16, xp:28, g:13},
  {id:980, n:'Clodsire', t:'Poison/Sol', hp:130, atk:13, def:15, xp:26, g:12},
  {id:981, n:'Farigiraf', t:'Normal/Psy', hp:120, atk:16, def:16, xp:29, g:13},
  {id:982, n:'Dudunsparce', t:'Normal', hp:125, atk:16, def:14, xp:28, g:13},
  {id:983, n:'Kingambit', t:'Ténèbres/Acier', hp:100, atk:30, def:22, xp:30, g:14},
  {id:984, n:'Great Tusk', t:'Combat/Sol', hp:115, atk:26, def:22, xp:35, g:16},
  {id:985, n:'Scream Tail', t:'Fée/Psy', hp:115, atk:16, def:20, xp:35, g:16},
  {id:986, n:'Brute Bonnet', t:'Plante/Ténèbres', hp:111, atk:23, def:18, xp:35, g:16},
  {id:987, n:'Flutter Mane', t:'Spectre/Fée', hp:55, atk:22, def:13, xp:35, g:16},
  {id:988, n:'Slither Wing', t:'Insecte/Combat', hp:85, atk:26, def:20, xp:35, g:16},
  {id:989, n:'Sandy Shocks', t:'Électrik/Sol', hp:85, atk:17, def:14, xp:35, g:16},
  {id:990, n:'Iron Treads', t:'Acier/Sol', hp:90, atk:23, def:23, xp:35, g:16},
  {id:991, n:'Iron Bundle', t:'Glace/Eau', hp:56, atk:20, def:22, xp:35, g:16},
  {id:992, n:'Iron Hands', t:'Combat/Électrik', hp:154, atk:26, def:20, xp:35, g:16},
  {id:993, n:'Iron Jugulis', t:'Vol/Ténèbres', hp:94, atk:19, def:15, xp:35, g:16},
  {id:994, n:'Iron Moth', t:'Feu/Poison', hp:80, atk:19, def:15, xp:35, g:16},
  {id:995, n:'Iron Thorns', t:'Roche/Électrik', hp:100, atk:23, def:23, xp:35, g:16},
  {id:996, n:'Frigibax', t:'Dragon/Glace', hp:65, atk:15, def:12, xp:17, g:8},
  {id:997, n:'Arctibax', t:'Dragon/Glace', hp:90, atk:20, def:17, xp:24, g:11},
  {id:998, n:'Baxcalibur', t:'Dragon/Glace', hp:115, atk:28, def:22, xp:35, g:16},
  {id:999, n:'Gimmighoul', t:'Spectre', hp:45, atk:8, def:10, xp:17, g:8},
  {id:1000, n:'Gholdengo', t:'Acier/Spectre', hp:87, atk:19, def:19, xp:30, g:14},
  {id:1001, n:'Wo-Chien', t:'Ténèbres/Plante', hp:85, atk:14, def:23, xp:50, g:23},
  {id:1002, n:'Chien-Pao', t:'Glace/Ténèbres', hp:80, atk:27, def:12, xp:50, g:23},
  {id:1003, n:'Ting-Lu', t:'Ténèbres/Sol', hp:155, atk:20, def:22, xp:50, g:23},
  {id:1004, n:'Chi-Yu', t:'Feu/Ténèbres', hp:55, atk:22, def:13, xp:50, g:23},
  {id:1005, n:'Roaring Moon', t:'Dragon/Ténèbres', hp:105, atk:28, def:18, xp:55, g:25},
  {id:1006, n:'Iron Valiant', t:'Fée/Combat', hp:74, atk:22, def:16, xp:55, g:25},
  {id:1007, n:'Koraidon', t:'Combat/Dragon', hp:100, atk:25, def:23, xp:60, g:27},
  {id:1008, n:'Miraidon', t:'Électrik/Dragon', hp:100, atk:22, def:20, xp:60, g:27},
  {id:1009, n:'Walking Wake', t:'Eau/Dragon', hp:99, atk:22, def:15, xp:55, g:25},
  {id:1010, n:'Iron Leaves', t:'Plante/Psy', hp:90, atk:24, def:20, xp:55, g:25},
];
const GEN9_SPD = {906:40,907:50,908:123,909:60,910:55,911:66,912:46,913:55,914:100,915:35,916:93,917:28,918:32,919:65,920:105,921:80,922:100,923:105,924:75,925:104,926:50,927:95,928:30,929:33,930:53,931:95,932:25,933:35,934:35,935:35,936:75,937:85,938:46,939:45,940:70,941:125,942:60,943:82,944:94,945:110,946:72,947:118,948:70,949:100,950:82,951:70,952:88,953:30,954:45,955:60,956:105,957:45,958:55,959:75,960:90,961:120,962:95,963:93,964:100,965:46,966:98,967:121,968:45,969:55,970:86,971:51,972:72,973:90,974:43,975:71,976:90,977:35,978:109,979:90,980:20,981:60,982:55,983:50,984:87,985:111,986:67,987:135,988:85,989:101,990:106,991:136,992:50,993:105,994:110,995:70,996:55,997:66,998:87,999:30,1000:84,1001:70,1002:135,1003:45,1004:100,1005:119,1006:116,1007:135,1008:135,1009:109,1010:104};

// ══ Pokédex légendaires (pour Trial Mode) ══
const LEGENDARIES_IDS = [144,145,146,149,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386,480,481,482,483,484,485,486,487,488,490,491,492,493,638,639,640,641,642,643,644,645,647,648,649,716,717,718,720,721,785,786,787,788,791,792,800,801,802,807,808,809,880,881,882,883,884,1001,1002,1003,1004,1007,1008];

// ──────────────────────────────────────────────────────────────
// BASE COMPLÈTE TOUTES GÉNÉRATIONS
// ──────────────────────────────────────────────────────────────
const ALL_POKEMON = [...GEN1, ...GEN2, ...GEN3, ...GEN4, ...GEN5, ...GEN6, ...GEN7, ...GEN8, ...GEN9];
const ALL_SPD = {...GEN1_SPD, ...GEN2_SPD, ...GEN3_SPD, ...GEN4_SPD, ...GEN5_SPD, ...GEN6_SPD, ...GEN7_SPD, ...GEN8_SPD, ...GEN9_SPD};
// Index Map O(1) pour lookups fréquents par ID (remplace .find() O(n))
const ALL_POKEMON_MAP = new Map(ALL_POKEMON.map(p => [p.id, p]));

// ──────────────────────────────────────────────────────────────
// CHAÎNES D'ÉVOLUTION — GEN 2 & 3
// ──────────────────────────────────────────────────────────────
Object.assign(EVO_CHAINS, {
  // Gen 2 starters
  152:{next:153, name:'Macronium',  level:16},
  153:{next:154, name:'Méganium',   level:32},
  155:{next:156, name:'Feurisson',  level:14},
  156:{next:157, name:'Typhlosion', level:36},
  158:{next:159, name:'Crocrodil',  level:18},
  159:{next:160, name:'Aligatueur', level:30},
  // Johto
  161:{next:162, name:'Fouinar',    level:15},
  163:{next:164, name:'Noarfang',   level:20},
  165:{next:166, name:'Coxy',       level:18},
  167:{next:168, name:'Migalos',    level:22},
  41: {next:169, name:'Nostenfer',  level:22}, // Nosféralto → Nostenfer
  42: {next:169, name:'Nostenfer',  level:22},
  170:{next:171, name:'Lanturn',    level:27},
  172:{next:25,  name:'Pikachu',    level:16},
  175:{next:176, name:'Togetic',    level:15},
  177:{next:178, name:'Xatu',       level:25},
  179:{next:180, name:'Lainergie',  level:15},
  180:{next:181, name:'Pharamp',    level:30},
  183:{next:184, name:'Azumarill',  level:18},
  187:{next:188, name:'Floravol',   level:18},
  188:{next:189, name:'Cotovol',    level:27},
  194:{next:195, name:'Maraiste',   level:20},
  // Évoli → Gen 2 évolutions (amitié simulée par niveau)
  196:{}, // Mentali est final
  197:{}, // Noctali est final
  204:{next:205, name:'Foretress',  level:31},
  209:{next:210, name:'Granbull',   level:23},
  216:{next:217, name:'Ursaring',   level:30},
  218:{next:219, name:'Magcargo',   level:38},
  220:{next:221, name:'Cochignon',  level:33},
  223:{next:224, name:'Octillery',  level:25},
  228:{next:229, name:'Démolosse',  level:24},
  231:{next:232, name:'Donphan',    level:25},
  236:{next:237, name:'Kapoera',    level:20},
  246:{next:247, name:'Ymphect',    level:30},
  247:{next:248, name:'Tyranocif',  level:55},
  // Gen 3
  252:{next:253, name:'Massko',     level:16},
  253:{next:254, name:'Jungko',     level:36},
  255:{next:256, name:'Galifeu',    level:16},
  256:{next:257, name:'Braségali',  level:36},
  258:{next:259, name:'Flobio',     level:16},
  259:{next:260, name:'Laggron',    level:36},
  261:{next:262, name:'Mightyena', level:18},
  263:{next:264, name:'Linéon',     level:20},
  280:{next:281, name:'Kirlia',     level:20},
  281:{next:282, name:'Gardevoir',  level:30},
  285:{next:286, name:'Chapignon',  level:23},
  290:{next:291, name:'Ninjask',    level:20},
  296:{next:297, name:'Hariyama',   level:24},
  304:{next:305, name:'Golithe',    level:32},
  305:{next:306, name:'Galeking',   level:42},
  307:{next:308, name:'Charmina',   level:37},
  309:{next:310, name:'Élecsprint', level:26},
  318:{next:319, name:'Sharpedo',   level:30},
  322:{next:323, name:'Camérupt',   level:33},
  328:{next:329, name:'Vibraninf',  level:35},
  329:{next:330, name:'Libégon',    level:45},
  333:{next:334, name:'Altaria',    level:35},
  361:{next:362, name:'Oniglali',   level:42},
  363:{next:364, name:'Phogleur',   level:32},
  364:{next:365, name:'Kaimorse',   level:44},
  349:{next:350, name:'Milobellus', level:20},
  371:{next:372, name:'Drackhaus',  level:30},
  372:{next:373, name:'Drattack',   level:50},
  374:{next:375, name:'Métang',     level:20},
  375:{next:376, name:'Métalosse',  level:45},
  // Gen 4 starters
  387:{next:388, name:'Tortiflame',  level:18},
  390:{next:391, name:'Chimpenfeu', level:14},
  393:{next:394, name:'Prinplouf',  level:16},
  // Gen 5 starters
  495:{next:496, name:'Lianaja',    level:17},
  498:{next:499, name:'Grotichon',  level:17},
  501:{next:502, name:'Maousse',    level:17},
  // Gen 6 starters
  650:{next:651, name:'Sonistrelle',level:16},
  653:{next:654, name:'Roussil',    level:16},
  656:{next:657, name:'Croâporal',  level:16},
  // Gen 7 starters
  722:{next:723, name:'Efflèche',   level:17},
  725:{next:726, name:'Matignon',   level:17},
  728:{next:729, name:'Otarlette',  level:17},
  // Gen 8 starters
  810:{next:811, name:'Éfflèche',   level:16},
  813:{next:814, name:'Raboot',     level:16},
  816:{next:817, name:'Chlabrador', level:16},
  // Gen 9 starters
  906:{next:907, name:'Miaouss',    level:16},
  909:{next:910, name:'Crocubot',   level:16},
  912:{next:913, name:'Canards',    level:16},
});

// ──────────────────────────────────────────────────────────────
// STARTERS GEN 2 & 3
// ──────────────────────────────────────────────────────────────
Object.assign(CLASSES, {
  'Germignon': {
    id:152, evoId:153, evoName:'Macronium', evoLevel:16, sprite:152,
    type:'Plante', hp:110, mp:75, atk:13, def:15, spd:9, magic:20,
    move:'Fouet-Liane', mMove:'Tranche', moveElem:'Plante', mMoveElem:'Normal',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'leaf'
  },
  'Héricendre': {
    id:155, evoId:156, evoName:'Feurisson', evoLevel:14, sprite:155,
    type:'Feu', hp:90, mp:70, atk:16, def:10, spd:13, magic:17,
    move:'Griffe', mMove:'Flammèche', moveElem:'Normal', mMoveElem:'Feu',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'fire'
  },
  'Kaiminus': {
    id:158, evoId:159, evoName:'Crocrodil', evoLevel:18, sprite:158,
    type:'Eau', hp:120, mp:60, atk:18, def:14, spd:8, magic:11,
    move:'Griffe', mMove:'Pistolet-O', moveElem:'Normal', mMoveElem:'Eau',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'water'
  },
  'Arcko': {
    id:252, evoId:253, evoName:'Massko', evoLevel:16, sprite:252,
    type:'Plante', hp:95, mp:80, atk:14, def:11, spd:15, magic:18,
    move:'Griffe', mMove:'Tranch\'Herbe', moveElem:'Normal', mMoveElem:'Plante',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'leaf'
  },
  'Poussifeu': {
    id:255, evoId:256, evoName:'Galifeu', evoLevel:16, sprite:255,
    type:'Feu', hp:100, mp:65, atk:17, def:9, spd:10, magic:15,
    move:'Griffe', mMove:'Flammèche', moveElem:'Normal', mMoveElem:'Feu',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:1},{n:'SuperPotion',img:'super-potion',q:1}], animType:'fire'
  },
  'Gobou': {
    id:258, evoId:259, evoName:'Flobio', evoLevel:16, sprite:258,
    type:'Eau', hp:125, mp:55, atk:19, def:13, spd:8, magic:11,
    move:'Griffe', mMove:'Pistolet-O', moveElem:'Normal', mMoveElem:'Eau',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'water'
  },
});

// ──────────────────────────────────────────────────────────────
// STARTERS GEN 4
// ──────────────────────────────────────────────────────────────
Object.assign(CLASSES, {
  'Tortipouss': {
    id:387, evoId:388, evoName:'Tortiflame', evoLevel:18, sprite:387,
    type:'Plante', hp:108, mp:70, atk:11, def:17, spd:7, magic:15,
    move:'Fouet-Liane', mMove:'Tranche', moveElem:'Plante', mMoveElem:'Normal',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'leaf'
  },
  'Ouisticram': {
    id:390, evoId:391, evoName:'Chimpenfeu', evoLevel:14, sprite:390,
    type:'Feu', hp:85, mp:65, atk:18, def:8, spd:17, magic:15,
    move:'Griffe', mMove:'Flammèche', moveElem:'Normal', mMoveElem:'Feu',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:1},{n:'SuperPotion',img:'super-potion',q:1}], animType:'fire'
  },
  'Tiplouf': {
    id:393, evoId:394, evoName:'Prinplouf', evoLevel:16, sprite:393,
    type:'Eau', hp:112, mp:60, atk:12, def:14, spd:9, magic:13,
    move:'Pistolet-O', mMove:'Écume', moveElem:'Eau', mMoveElem:'Eau',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'water'
  },
});

// ──────────────────────────────────────────────────────────────
// STARTERS GEN 5
// ──────────────────────────────────────────────────────────────
Object.assign(CLASSES, {
  'Vipélierre': {
    id:495, evoId:496, evoName:'Lianaja', evoLevel:17, sprite:495,
    type:'Plante', hp:90, mp:80, atk:13, def:10, spd:17, magic:17,
    move:'Fouet-Liane', mMove:'Tranch\'Herbe', moveElem:'Plante', mMoveElem:'Plante',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'leaf'
  },
  'Gruikui': {
    id:498, evoId:499, evoName:'Grotichon', evoLevel:17, sprite:498,
    type:'Feu', hp:110, mp:60, atk:20, def:11, spd:9, magic:12,
    move:'Griffe', mMove:'Flammèche', moveElem:'Normal', mMoveElem:'Feu',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'fire'
  },
  'Moustillon': {
    id:501, evoId:502, evoName:'Maousse', evoLevel:17, sprite:501,
    type:'Eau', hp:118, mp:55, atk:13, def:16, spd:8, magic:12,
    move:'Pistolet-O', mMove:'Écume', moveElem:'Eau', mMoveElem:'Eau',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'water'
  },
});

// ──────────────────────────────────────────────────────────────
// STARTERS GEN 6
// ──────────────────────────────────────────────────────────────
Object.assign(CLASSES, {
  'Marisson': {
    id:650, evoId:651, evoName:'Sonistrelle', evoLevel:16, sprite:650,
    type:'Plante', hp:112, mp:65, atk:12, def:18, spd:8, magic:13,
    move:'Fouet-Liane', mMove:'Tranche', moveElem:'Plante', mMoveElem:'Normal',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'leaf'
  },
  'Feunnec': {
    id:653, evoId:654, evoName:'Roussil', evoLevel:16, sprite:653,
    type:'Feu', hp:88, mp:85, atk:12, def:8, spd:12, magic:21,
    move:'Griffe', mMove:'Flammèche', moveElem:'Normal', mMoveElem:'Feu',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:1},{n:'SuperPotion',img:'super-potion',q:1}], animType:'fire'
  },
  'Grenousse': {
    id:656, evoId:657, evoName:'Croâporal', evoLevel:16, sprite:656,
    type:'Eau', hp:88, mp:65, atk:14, def:7, spd:18, magic:14,
    move:'Pistolet-O', mMove:'Écume', moveElem:'Eau', mMoveElem:'Eau',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'water'
  },
});

// ──────────────────────────────────────────────────────────────
// STARTERS GEN 7
// ──────────────────────────────────────────────────────────────
Object.assign(CLASSES, {
  'Brindibou': {
    id:722, evoId:723, evoName:'Efflèche', evoLevel:17, sprite:722,
    type:'Plante', hp:100, mp:70, atk:15, def:12, spd:12, magic:16,
    move:'Fouet-Liane', mMove:'Tranch\'Herbe', moveElem:'Plante', mMoveElem:'Plante',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'leaf'
  },
  'Flamiaou': {
    id:725, evoId:726, evoName:'Matignon', evoLevel:17, sprite:725,
    type:'Feu', hp:85, mp:65, atk:17, def:9, spd:18, magic:14,
    move:'Griffe', mMove:'Flammèche', moveElem:'Normal', mMoveElem:'Feu',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'fire'
  },
  'Otaquin': {
    id:728, evoId:729, evoName:'Otarlette', evoLevel:17, sprite:728,
    type:'Eau', hp:108, mp:80, atk:10, def:11, spd:9, magic:21,
    move:'Pistolet-O', mMove:'Écume', moveElem:'Eau', mMoveElem:'Eau',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'water'
  },
});

// ──────────────────────────────────────────────────────────────
// STARTERS GEN 8
// ──────────────────────────────────────────────────────────────
Object.assign(CLASSES, {
  'Ouistiaou': {
    id:810, evoId:811, evoName:'Éfflèche', evoLevel:16, sprite:810,
    type:'Plante', hp:96, mp:65, atk:19, def:10, spd:13, magic:14,
    move:'Fouet-Liane', mMove:'Tranche', moveElem:'Plante', mMoveElem:'Normal',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'leaf'
  },
  'Scorbunny': {
    id:813, evoId:814, evoName:'Raboot', evoLevel:16, sprite:813,
    type:'Feu', hp:90, mp:65, atk:18, def:9, spd:19, magic:13,
    move:'Griffe', mMove:'Flammèche', moveElem:'Normal', mMoveElem:'Feu',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:1},{n:'SuperPotion',img:'super-potion',q:1}], animType:'fire'
  },
  'Larméléon': {
    id:816, evoId:817, evoName:'Chlabrador', evoLevel:16, sprite:816,
    type:'Eau', hp:100, mp:75, atk:10, def:12, spd:10, magic:20,
    move:'Pistolet-O', mMove:'Écume', moveElem:'Eau', mMoveElem:'Eau',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'water'
  },
});

// ──────────────────────────────────────────────────────────────
// STARTERS GEN 9
// ──────────────────────────────────────────────────────────────
Object.assign(CLASSES, {
  'Poussacha': {
    id:906, evoId:907, evoName:'Miaouss', evoLevel:16, sprite:906,
    type:'Plante', hp:88, mp:70, atk:14, def:9, spd:19, magic:15,
    move:'Fouet-Liane', mMove:'Tranch\'Herbe', moveElem:'Plante', mMoveElem:'Plante',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'leaf'
  },
  'Chochodile': {
    id:909, evoId:910, evoName:'Crocubot', evoLevel:16, sprite:909,
    type:'Feu', hp:115, mp:60, atk:22, def:13, spd:7, magic:11,
    move:'Griffe', mMove:'Flammèche', moveElem:'Normal', mMoveElem:'Feu',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'fire'
  },
  'Coiffeton': {
    id:912, evoId:913, evoName:'Canards', evoLevel:16, sprite:912,
    type:'Eau', hp:115, mp:65, atk:15, def:15, spd:10, magic:14,
    move:'Pistolet-O', mMove:'Écume', moveElem:'Eau', mMoveElem:'Eau',
    moveUses:6, mMoveUses:4, items:[{n:'Potion',img:'potion',q:2}], animType:'water'
  },
});

// ──────────────────────────────────────────────────────────────
// ZONES JOHTO
// ──────────────────────────────────────────────────────────────
Object.assign(ZONES, {
  'ecorce': {
    name:'Bourg-Écorce', color:'#55cc55', x:50, y:88, type:'ville',
    desc:'Point de départ de Johto. Des herbes calmes accueillent les nouveaux Dresseurs.',
    connexions:['noeudpin'],
    pokemon:[152,155,158,161,163,172,175,179],
    gymLeader: null,
  },
  'noeudpin': {
    name:'Nœudpin City', color:'#7788bb', x:50, y:76, type:'ville',
    desc:'1ère Arène de Johto — Badge Nid. Leader : Ardan, spécialiste Vol.',
    connexions:['ecorce','azalee'],
    pokemon:[163,164,161,162,167,177,193],
    gymLeader: {
      name:'Ardan', title:'Champion Vol', badge:'Badge Nid', badgeIcon:'🐦',
      badgeImg:'https://archives.bulbagarden.net/media/upload/f/f2/Zephyr_Badge.png',
      sprite:164, quote:"Mes oiseaux volent plus vite que vos rêves !",  reward:600,
      team:[
        {id:163,n:'Hoothoot',lv:9,hp:75,atk:8,def:8,spd:50,type:'Normal',xp:0,gold:0},
        {id:18, n:'Roucarnage',lv:13,hp:100,atk:15,def:11,spd:100,type:'Normal',xp:0,gold:0},
      ]
    },
  },
  'azalee': {
    name:'Azuria Town (Johto)', color:'#44aaaa', x:50, y:64, type:'ville',
    desc:'2ème Arène de Johto — Badge Ruche. Leader : Hyarime, spécialiste Insecte.',
    connexions:['noeudpin','doublonville'],
    pokemon:[165,166,167,168,204,193,214],
    gymLeader: {
      name:'Hyarime', title:'Champion Insecte', badge:'Badge Ruche', badgeIcon:'🐝',
      badgeImg:'https://archives.bulbagarden.net/media/upload/a/a9/Hive_Badge.png',
      sprite:214, quote:"Mes insectes sont aussi nombreux qu'une ruche !", reward:1000,
      team:[
        {id:165,n:'Lutin',lv:14,hp:80,atk:6,def:9,spd:55,type:'Insecte',xp:0,gold:0},
        {id:167,n:'Mimigal',lv:14,hp:75,atk:14,def:9,spd:30,type:'Insecte',xp:0,gold:0},
        {id:214,n:'Scarhino',lv:16,hp:100,atk:22,def:13,spd:85,type:'Insecte',xp:0,gold:0},
      ]
    },
  },
  'doublonville': {
    name:'Doublonville', color:'#ffddaa', x:50, y:52, type:'ville',
    desc:'3ème Arène de Johto — Badge Plaine. Leader : Witney, spécialiste Normal.',
    connexions:['azalee','ecoraille'],
    pokemon:[161,162,206,216,241,234,203],
    gymLeader: {
      name:'Witney', title:'Champion Normal', badge:'Badge Plaine', badgeIcon:'⭕',
      badgeImg:'https://archives.bulbagarden.net/media/upload/f/f7/Plain_Badge.png',
      sprite:241, quote:"Ne me sous-estimez pas juste parce que je suis du type Normal !", reward:1600,
      team:[
        {id:39, n:'Rondoudou',lv:18,hp:165,atk:9,def:5,spd:45,type:'Normal',xp:0,gold:0},
        {id:241,n:'Écrémeuh',lv:20,hp:135,atk:18,def:23,spd:100,type:'Normal',xp:0,gold:0},
      ]
    },
  },
  'ecoraille': {
    name:'Écoraille City', color:'#bbaa44', x:50, y:40, type:'ville',
    desc:'4ème Arène de Johto — Badge Brume. Leader : Mortimer, spécialiste Spectre.',
    connexions:['doublonville','acajou'],
    pokemon:[200,198,92,93,94,169,202],
    gymLeader: {
      name:'Mortimer', title:'Champion Spectre', badge:'Badge Brume', badgeIcon:'👻',
      badgeImg:'https://archives.bulbagarden.net/media/upload/b/b3/Fog_Badge.png',
      sprite:94, quote:"Les esprits vous engloutissent…", reward:2400,
      team:[
        {id:92, n:'Fantominus',lv:25,hp:100,atk:12,def:8,spd:75,type:'Spectre',xp:0,gold:0},
        {id:200,n:'Mimigel',lv:25,hp:100,atk:14,def:14,spd:85,type:'Spectre',xp:0,gold:0},
        {id:94, n:'Ectoplasma',lv:28,hp:125,atk:22,def:12,spd:110,type:'Spectre',xp:0,gold:0},
      ]
    },
  },
  'acajou': {
    name:'Acajou City', color:'#cc6666', x:50, y:28, type:'ville',
    desc:'5ème Arène de Johto — Badge Tempête. Leader : Chuck, spécialiste Combat.',
    connexions:['ecoraille','sapin'],
    pokemon:[56,57,236,237,214,296,297],
    gymLeader: {
      name:'Chuck', title:'Champion Combat', badge:'Badge Tempête', badgeIcon:'💪',
      badgeImg:'https://archives.bulbagarden.net/media/upload/5/5b/Storm_Badge.png',
      sprite:57, quote:"La puissance brute surmonte tout obstacle !", reward:3200,
      team:[
        {id:57, n:'Colossinge',lv:29,hp:120,atk:20,def:8,spd:75,type:'Combat',xp:0,gold:0},
        {id:237,n:'Kapoera',lv:31,hp:110,atk:22,def:22,spd:90,type:'Combat',xp:0,gold:0},
      ]
    },
  },
  'sapin': {
    name:'Sapin City', color:'#aabb44', x:50, y:16, type:'ville',
    desc:'6ème Arène de Johto — Badge Minerai. Leader : Jasmine, spécialiste Acier.',
    connexions:['acajou','cascade'],
    pokemon:[208,227,81,82,205,304,305],
    gymLeader: {
      name:'Jasmine', title:'Champion Acier', badge:'Badge Minerai', badgeIcon:'⚙️',
      badgeImg:'https://archives.bulbagarden.net/media/upload/e/e6/Mineral_Badge.png',
      sprite:208, quote:"L'acier est solide et noble… comme mon cœur.", reward:4200,
      team:[
        {id:81, n:'Magnéti',lv:30,hp:120,atk:16,def:16,spd:50,type:'Acier',xp:0,gold:0},
        {id:81, n:'Magnéti',lv:30,hp:120,atk:16,def:16,spd:50,type:'Acier',xp:0,gold:0},
        {id:208,n:'Steelix',lv:35,hp:165,atk:20,def:50,spd:30,type:'Acier',xp:0,gold:0},
      ]
    },
  },
  'cascade': {
    name:'Cascade City', color:'#6699ff', x:50, y:4, type:'ville',
    desc:'7ème Arène de Johto — Badge Glacier. Leader : Foxy, spécialiste Glace.',
    connexions:['sapin','volcrystal'],
    pokemon:[220,221,225,361,362,86,87,131],
    gymLeader: {
      name:'Foxy', title:'Champion Glace', badge:'Badge Glacier', badgeIcon:'❄️',
      badgeImg:'https://archives.bulbagarden.net/media/upload/c/c4/Glacier_Badge.png',
      sprite:221, quote:"Mon givre figera votre volonté !", reward:5500,
      team:[
        {id:87, n:'Lapras',lv:27,hp:140,atk:15,def:14,spd:55,type:'Glace',xp:0,gold:0},
        {id:220,n:'Marcacrin',lv:29,hp:100,atk:12,def:10,spd:50,type:'Glace',xp:0,gold:0},
        {id:221,n:'Cochignon',lv:31,hp:155,atk:22,def:18,spd:50,type:'Glace',xp:0,gold:0},
        {id:225,n:'Cadoizo',lv:31,hp:100,atk:13,def:11,spd:75,type:'Glace',xp:0,gold:0},
      ]
    },
  },
  'volcrystal': {
    name:'Volcrystal City', color:'#8855ff', x:50, y:-8, type:'ville',
    desc:'8ème Arène de Johto — Badge Dragon. Leader : Clair, spécialiste Dragon.',
    connexions:['cascade','ligue-johto'],
    pokemon:[246,247,230,130,149,371,372],
    gymLeader: {
      name:'Clair', title:'Champion Dragon', badge:'Badge Dragon', badgeIcon:'🐉',
      badgeImg:'https://archives.bulbagarden.net/media/upload/2/28/Rising_Badge.png',
      sprite:149, quote:"Les Dragons sont la force ultime de ce monde !", reward:7500,
      team:[
        {id:148,n:'Draco',lv:37,hp:175,atk:18,def:13,spd:70,type:'Dragon',xp:0,gold:0},
        {id:148,n:'Draco',lv:37,hp:175,atk:18,def:13,spd:70,type:'Dragon',xp:0,gold:0},
        {id:230,n:'Hyporoi',lv:40,hp:185,atk:22,def:22,spd:85,type:'Dragon',xp:0,gold:0},
        {id:149,n:'Dracolosse',lv:44,hp:225,atk:28,def:15,spd:80,type:'Dragon',xp:0,gold:0},
      ]
    },
  },
  'ligue-johto': {
    name:'Ligue Johto', color:'#ff3300', x:50, y:-20, type:'elite',
    desc:'Ligue Pokémon de Johto — Affrontez l\'Élite 4 et le Champion !',
    connexions:['volcrystal'],
    pokemon:[245,243,244,248,249,250,251],
    gymLeader: {
      name:'Enzo', title:'Champion de Johto', badge:'Titre Champion', badgeIcon:'🏆',
      badgeImg:'', sprite:249, quote:"Seuls les meilleurs dresseurs du monde arrivent ici.",
      reward:12000,
      team:[
        {id:248,n:'Tyranocif',lv:66,hp:280,atk:44,def:36,spd:61,type:'Roche',xp:0,gold:0},
        {id:244,n:'Entei',lv:66,hp:295,atk:37,def:27,spd:100,type:'Feu',xp:0,gold:0},
        {id:245,n:'Suicune',lv:66,hp:270,atk:24,def:37,spd:85,type:'Eau',xp:0,gold:0},
        {id:250,n:'Ho-Oh',lv:70,hp:295,atk:42,def:29,spd:90,type:'Feu',xp:0,gold:0},
      ]
    },
  },

  // ── ZONES HOENN ──
  'littleroot': {
    name:'Littleroot Town', color:'#66aa33', x:50, y:88, type:'ville',
    desc:'Point de départ de Hoenn. Région tropicale pleine de mystères.',
    connexions:['pierreferite'],
    pokemon:[252,255,258,261,263,265,276],
    gymLeader: null,
  },
  'pierreferite': {
    name:'Pierreferite City', color:'#997755', x:50, y:76, type:'ville',
    desc:'1ère Arène Hoenn — Badge Roche. Leader : Roxane, spécialiste Roche.',
    connexions:['littleroot','mardeborg'],
    pokemon:[74,75,304,305,185,206],
    gymLeader: {
      name:'Roxane', title:'Champion Roche', badge:'Badge Roche', badgeIcon:'🪨',
      badgeImg:'https://archives.bulbagarden.net/media/upload/e/e4/Stone_Badge.png',
      sprite:306, quote:"Mes connaissances géologiques vont vous écraser !", reward:700,
      team:[
        {id:74, n:'Racaillou',lv:14,hp:90,atk:14,def:16,spd:25,type:'Roche',xp:0,gold:0},
        {id:304,n:'Coqueline',lv:15,hp:100,atk:14,def:28,spd:30,type:'Acier',xp:0,gold:0},
      ]
    },
  },
  'mardeborg': {
    name:'Mardeborg City', color:'#4488cc', x:50, y:64, type:'ville',
    desc:'2ème Arène Hoenn — Badge Poing. Leader : Bastio, spécialiste Combat.',
    connexions:['pierreferite','laberganta'],
    pokemon:[296,297,285,286,56,57,107],
    gymLeader: {
      name:'Bastio', title:'Champion Combat', badge:'Badge Poing', badgeIcon:'👊',
      badgeImg:'https://archives.bulbagarden.net/media/upload/5/56/Knuckle_Badge.png',
      sprite:297, quote:"Chaque combat est une leçon de vie !", reward:1200,
      team:[
        {id:296,n:'Makuhita',lv:17,hp:140,atk:13,def:9,spd:25,type:'Combat',xp:0,gold:0},
        {id:297,n:'Hariyama',lv:18,hp:250,atk:23,def:13,spd:50,type:'Combat',xp:0,gold:0},
      ]
    },
  },
  'laberganta': {
    name:'Laberganta City', color:'#ffaa00', x:50, y:52, type:'ville',
    desc:'3ème Arène Hoenn — Badge Dynamo. Leader : Wattson, spécialiste Électrik.',
    connexions:['mardeborg','lavaplage'],
    pokemon:[309,310,100,101,179,180,181,239],
    gymLeader: {
      name:'Wattson', title:'Champion Électrik', badge:'Badge Dynamo', badgeIcon:'⚡',
      badgeImg:'https://archives.bulbagarden.net/media/upload/f/f6/Dynamo_Badge.png',
      sprite:310, quote:"Wahahahaha ! L\'électricité, c\'est ma passion !", reward:2000,
      team:[
        {id:309,n:'Dynavolt',lv:22,hp:90,atk:13,def:9,spd:65,type:'Électrik',xp:0,gold:0},
        {id:310,n:'Élecsprint',lv:24,hp:120,atk:19,def:13,spd:105,type:'Électrik',xp:0,gold:0},
      ]
    },
  },
  'lavaplage': {
    name:'Lavaplage City', color:'#ff6600', x:50, y:40, type:'ville',
    desc:'4ème Arène Hoenn — Badge Chaleur. Leader : Adriane, spécialiste Feu.',
    connexions:['laberganta','sylvemont'],
    pokemon:[218,219,228,229,322,323,58,59,77,78],
    gymLeader: {
      name:'Adriane', title:'Champion Feu', badge:'Badge Chaleur', badgeIcon:'🔥',
      badgeImg:'https://archives.bulbagarden.net/media/upload/6/62/Heat_Badge.png',
      sprite:323, quote:"Mon feu intérieur brûle plus fort que tout volcan !", reward:3000,
      team:[
        {id:218,n:'Limagma',lv:26,hp:80,atk:10,def:10,spd:20,type:'Feu',xp:0,gold:0},
        {id:322,n:'Chamallot',lv:28,hp:110,atk:13,def:11,spd:35,type:'Feu',xp:0,gold:0},
        {id:323,n:'Camérupt',lv:30,hp:130,atk:25,def:17,spd:55,type:'Feu',xp:0,gold:0},
      ]
    },
  },
  'sylvemont': {
    name:'Sylvemont City', color:'#44cc88', x:50, y:28, type:'ville',
    desc:'5ème Arène Hoenn — Badge Plume. Leader : Winona, spécialiste Vol.',
    connexions:['lavaplage','lilycove'],
    pokemon:[274,275,276,277,333,334,21,22,16,17,18],
    gymLeader: {
      name:'Winona', title:'Champion Vol', badge:'Badge Plume', badgeIcon:'🪶',
      badgeImg:'https://archives.bulbagarden.net/media/upload/c/c8/Feather_Badge.png',
      sprite:334, quote:"Dans le ciel, rien ne m\'égale !", reward:4500,
      team:[
        {id:277,n:'Goélise',lv:31,hp:110,atk:12,def:24,spd:65,type:'Eau',xp:0,gold:0},
        {id:275,n:'Swellow',lv:33,hp:110,atk:19,def:14,spd:125,type:'Normal',xp:0,gold:0},
        {id:334,n:'Altaria',lv:35,hp:145,atk:17,def:21,spd:80,type:'Dragon',xp:0,gold:0},
      ]
    },
  },
  'lilycove': {
    name:'Lilycove City', color:'#cc44aa', x:50, y:16, type:'ville',
    desc:'6ème Arène Hoenn — Jumeaux Psy. Leaders : Léna & Dorian, spécialistes Psy.',
    connexions:['sylvemont','sootopolis'],
    pokemon:[280,281,282,307,308,63,64,96,97,122,124],
    gymLeader: {
      name:'Léna & Dorian', title:'Champions Psy', badge:'Badge Esprit', badgeIcon:'🔮',
      badgeImg:'https://archives.bulbagarden.net/media/upload/c/cf/Mind_Badge.png',
      sprite:282, quote:"En parfaite synchronisation, nous sommes invincibles !", reward:6000,
      team:[
        {id:307,n:'Méditikka',lv:40,hp:90,atk:10,def:10,spd:60,type:'Psy',xp:0,gold:0},
        {id:282,n:'Gardevoir',lv:41,hp:155,atk:16,def:16,spd:80,type:'Psy',xp:0,gold:0},
        {id:282,n:'Gardevoir',lv:42,hp:160,atk:16,def:16,spd:80,type:'Psy',xp:0,gold:0},
      ]
    },
  },
  'sootopolis': {
    name:'Illumis City', color:'#4499ff', x:50, y:4, type:'ville',
    desc:'7ème Arène Hoenn — Badge Pluie. Leader : Wallace, spécialiste Eau.',
    connexions:['lilycove','ever-grande'],
    pokemon:[350,318,319,223,224,363,364,365,130,131],
    gymLeader: {
      name:'Wallace', title:'Champion Eau', badge:'Badge Pluie', badgeIcon:'💧',
      badgeImg:'https://archives.bulbagarden.net/media/upload/2/2d/Rain_Badge.png',
      sprite:350, quote:"La beauté de l\'eau n\'a d\'égale que sa force !", reward:8000,
      team:[
        {id:319,n:'Sharpedo',lv:40,hp:140,atk:28,def:10,spd:95,type:'Eau',xp:0,gold:0},
        {id:350,n:'Milobellus',lv:42,hp:180,atk:18,def:23,spd:81,type:'Eau',xp:0,gold:0},
        {id:130,n:'Léviator',lv:42,hp:190,atk:24,def:14,spd:80,type:'Eau',xp:0,gold:0},
      ]
    },
  },
  'ever-grande': {
    name:'Ligue Hoenn', color:'#ff2200', x:50, y:-8, type:'elite',
    desc:'Ligue Pokémon de Hoenn — Affrontez les Champions de Hoenn !',
    connexions:['sootopolis'],
    pokemon:[380,381,382,383,384,386],
    gymLeader: {
      name:'Champion Hoenn', title:'Champion de Hoenn', badge:'Titre Ultime', badgeIcon:'🏆',
      badgeImg:'', sprite:384, quote:"Vous avez parcouru toute la région — félicitations. Maintenant, battez-moi !",
      reward:20000,
      team:[
        {id:373,n:'Drattack',lv:75,hp:295,atk:36,def:30,spd:100,type:'Dragon',xp:0,gold:0},
        {id:376,n:'Métalosse',lv:76,hp:255,atk:38,def:46,spd:70,type:'Acier',xp:0,gold:0},
        {id:383,n:'Groudon',lv:78,hp:295,atk:38,def:30,spd:90,type:'Sol',xp:0,gold:0},
        {id:382,n:'Kyogre',lv:78,hp:295,atk:30,def:30,spd:90,type:'Eau',xp:0,gold:0},
        {id:384,n:'Rayquaza',lv:80,hp:305,atk:44,def:28,spd:95,type:'Dragon',xp:0,gold:0},
      ]
    },
  },
});

// Étendre ZONE_ORDER avec Johto puis Hoenn
ZONE_ORDER.push(
  // Johto
  'ecorce','noeudpin','azalee','doublonville',
  'ecoraille','acajou','sapin','cascade',
  'volcrystal','ligue-johto',
  // Hoenn
  'littleroot','pierreferite','mardeborg','laberganta',
  'lavaplage','sylvemont','lilycove','sootopolis','ever-grande'
);

// ──────────────────────────────────────────────────────────────
// NOUVEAUX ITEMS — status healers, baies, objets portés
// ──────────────────────────────────────────────────────────────
SHOP_ITEMS.push(
  { id:'antidote',    name:'Antidote',      desc:'Soigne le Poison',          price:100,  heal:0, statusCure:'poison', img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/antidote.png',         type:'status' },
  { id:'paralysoin',  name:'Anti-Para',     desc:'Soigne la Paralysie',       price:200,  heal:0, statusCure:'paralysis', img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/paralyze-heal.png', type:'status' },
  { id:'réveil',      name:'Réveil',        desc:'Soigne le Sommeil',         price:250,  heal:0, statusCure:'sleep', img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/awakening.png',         type:'status' },
  { id:'brulsoins',   name:'Brûle-Soins',   desc:'Soigne les Brûlures',       price:250,  heal:0, statusCure:'burn', img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/burn-heal.png',          type:'status' },
  { id:'antidegel',   name:'Antigel',       desc:'Soigne le Gel',             price:250,  heal:0, statusCure:'freeze', img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ice-heal.png',         type:'status' },
  { id:'totalsoins',  name:'Total-Soins',   desc:'Soigne tous les statuts',   price:600,  heal:0, statusCure:'all', img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/full-heal.png',            type:'status' },
  { id:'maxrevif',    name:'Max Revif',     desc:'Soigne tout + restaure PV', price:1500, heal:999, statusCure:'all', img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-revive.png',          type:'heal' },
  { id:'elixir',      name:'Élixir',        desc:'Restaure 10 PP de toutes les attaques', price:1500, pp:10, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/elixir.png', type:'pp' },
  { id:'maxelixir',   name:'Max Élixir',    desc:'Restaure tous les PP',      price:4500, pp:999, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-elixir.png',                             type:'pp' },
);

Object.assign(ITEM_DISPLAY, {
  antidote:   { name:'Antidote',    img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/antidote.png'     },
  paralysoin: { name:'Anti-Para',   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/paralyze-heal.png'},
  réveil:     { name:'Réveil',      img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/awakening.png'    },
  brulsoins:  { name:'Brûle-Soins', img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/burn-heal.png'   },
  antidegel:  { name:'Antigel',     img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ice-heal.png'    },
  totalsoins: { name:'Total-Soins', img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/full-heal.png'   },
  maxrevif:   { name:'Max Revif',   img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-revive.png'  },
  elixir:     { name:'Élixir',      img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/elixir.png'      },
  maxelixir:  { name:'Max Élixir',  img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-elixir.png'  },
});

// Nouvelles CTs Gen 2+3
CT_LIST.push(
  { id:'ct56', name:'CT56 – Sacre-Feu',      move:'Sacre-Feu',      price:4500, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fire.png'     },
  { id:'ct57', name:'CT57 – Lame d\'Herbe',  move:'Lame-Herbe',     price:2200, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-grass.png'   },
  { id:'ct58', name:'CT58 – Mach Poing',     move:'Mach-Poing',     price:1800, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fighting.png'},
  { id:'ct59', name:'CT59 – Dracogriffe',    move:'Dracogriffe',    price:3000, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-dragon.png'  },
  { id:'ct60', name:'CT60 – Vague Sombre',   move:'Vague-Sombre',   price:2500, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-dark.png'    },
  { id:'ct61', name:'CT61 – Éclat Magique',  move:'Éclat Magique',  price:2800, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fairy.png'   },
  { id:'ct62', name:'CT62 – Tranche-Acier',  move:'Tranche-Métal',  price:2200, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-steel.png'   },
  { id:'ct63', name:'CT63 – Bulldoze',       move:'Bulldoze',       price:1600, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-ground.png'  },
  { id:'ct64', name:'CT64 – Canon Foudre',   move:'Canon-Foudre',   price:3200, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-electric.png'},
  { id:'ct65', name:'CT65 – Hydroqueue',     move:'Aqua-Queue',     price:2000, img:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-water.png'   },
);

// Nouvelles attaques en MOVES_DB
Object.assign(MOVES_DB, {
  'Sacre-Feu'      :{type:'Feu',      cat:'spe', pow:100, acc:95,  pp:5,  desc:'Puissante. Peut brûler. Attaque signature Ho-Oh.'},
  'Lame-Herbe'     :{type:'Plante',   cat:'phy', pow:90,  acc:100, pp:15, desc:'Taux de critique élevé.'},
  'Mach-Poing'     :{type:'Combat',   cat:'phy', pow:40,  acc:100, pp:30, desc:'Toujours en premier.'},
  'Dracogriffe'    :{type:'Dragon',   cat:'phy', pow:80,  acc:100, pp:15, desc:'Griffe draconique.'},
  'Vague-Sombre'   :{type:'Ténèbres', cat:'spe', pow:80,  acc:100, pp:15, desc:'Vague d\'énergie sombre.'},
  'Aqua-Queue'     :{type:'Eau',      cat:'phy', pow:90,  acc:90,  pp:10, desc:'Coup de queue aquatique puissant.'},
  'Bulldoze'       :{type:'Sol',      cat:'phy', pow:60,  acc:100, pp:20, desc:'Frappe et baisse la Vitesse.'},
  'Canon-Foudre'   :{type:'Électrik', cat:'spe', pow:120, acc:100, pp:10, desc:'Concentration maximale d\'énergie électrique.'},
  'Météore Draconique':{type:'Dragon', cat:'spe',pow:100, acc:100, pp:10, desc:'Météore de Rayquaza.'},
  'Hydroqueue'     :{type:'Eau',      cat:'phy', pow:85,  acc:90,  pp:10, desc:'Queue trempée puissante.'},
  'Charge Météore' :{type:'Acier',    cat:'phy', pow:100, acc:100, pp:5,  desc:'Impact d\'un astéroïde. Recul.'},
  'Ombre Portée'   :{type:'Spectre',  cat:'phy', pow:70,  acc:100, pp:15, desc:'Taux de critique élevé.'},
  'Poings-Fureur'  :{type:'Combat',   cat:'phy', pow:18,  acc:100, pp:15, desc:'Frappe 2 à 5 fois.'},
  'Coup Tranchant' :{type:'Normal',   cat:'phy', pow:80,  acc:100, pp:15, desc:'Taux de critique très élevé.'},
  'Aura Sphère'    :{type:'Combat',   cat:'spe', pow:80,  acc:100, pp:20, desc:'Ne rate jamais.'},
});

// Attaques apprises par niveau — Gen 2 types
Object.assign(LEVEL_UP_MOVES, {
  'Plante2': [
    {lv:1,move:'Fouet-Liane'},{lv:5,move:'Griffe'},{lv:9,move:'Poudre Toxik'},
    {lv:13,move:'Tranch\'Herbe'},{lv:17,move:'Méga-Drain'},
    {lv:21,move:'Lance-Soleil'},{lv:25,move:'Lame-Herbe'},{lv:30,move:'Végé-Attak'},
    {lv:36,move:'Cyclone'},{lv:42,move:'Damoclès'},
  ],
  'Combat': [
    {lv:1,move:'Charge'},{lv:5,move:'Rugissement'},{lv:9,move:'Coup de Boule'},
    {lv:13,move:'Pied Karaté'},{lv:17,move:'Uppercut'},
    {lv:21,move:'Soumission'},{lv:25,move:'Mach-Poing'},{lv:30,move:'Close Combat'},
    {lv:36,move:'Mégaphone'},{lv:42,move:'Aura Sphère'},
  ],
  'Dragon2': [
    {lv:1,move:'Charge'},{lv:5,move:'Griffe'},{lv:9,move:'Drakkarion'},
    {lv:13,move:'Dracogriffe'},{lv:17,move:'Colère'},
    {lv:21,move:'Draco-Météore'},{lv:25,move:'Météore Draconique'},
    {lv:30,move:'Comète Poing'},{lv:36,move:'Coup d\'Suif'},
  ],
  'Acier2': [
    {lv:1,move:'Charge'},{lv:5,move:'Armure'},{lv:9,move:'Coup d\'Acier'},
    {lv:13,move:'Tranche-Métal'},{lv:17,move:'Météores'},
    {lv:21,move:'Charge Météore'},{lv:25,move:'Tranche-Métal'},
    {lv:30,move:'Close Combat'},{lv:36,move:'Explosion'},
  ],
});

// ──────────────────────────────────────────────────────────────
// PATCH doExplore — utilise ALL_POKEMON + ALL_SPD
// ──────────────────────────────────────────────────────────────
(function patchDoExplore() {
  const _original = window.doExplore;
  window.doExplore = function() {
    if (!player) return;
    const roll = Math.random();
    if (roll < 0.55) {
      updateGlobalStats('explores');
      const scale = getWaveEnemyScale();
      const { wave } = getWaveState();
      const bossesBeaten = player.lastBossWave || 0;
      const autoIdx  = Math.min(bossesBeaten, ZONE_ORDER.length - 1);
      const selId    = player.selectedExploreZone;
      const selIdx   = selId ? ZONE_ORDER.indexOf(selId) : -1;
      const zoneId   = (selId && (selIdx === -1 || selIdx <= bossesBeaten))
        ? selId : ZONE_ORDER[autoIdx];
      const zone    = ZONES[zoneId];
      const pool    = zone?.pokemon || [];

      // Utilise ALL_POKEMON (Gen 1+2+3)
      const pokeId = pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : (ALL_POKEMON[Math.floor(Math.random() * ALL_POKEMON.length)].id);
      const pData = ALL_POKEMON_MAP.get(pokeId) || ALL_POKEMON[Math.floor(Math.random()*ALL_POKEMON.length)];

      // Tranche de niveau fixe par zone — fallback sur la zone auto si l'ID est inconnu
      const autoLvRange = ZONE_LEVELS[ZONE_ORDER[autoIdx]] || [1, 8];
      const zoneLvRange = ZONE_LEVELS[zoneId] || autoLvRange;
      const enemyLevel  = zoneLvRange[0] + Math.floor(Math.random() * (zoneLvRange[1] - zoneLvRange[0] + 1));
      const lvlScale    = 1 + enemyLevel * 0.15;
      const baseSpd     = ALL_SPD[pData.id] || 50;
      const e = {
        name: pData.n, id: pData.id, level: enemyLevel,
        hp:   Math.round(pData.hp  * lvlScale),
        atk:  Math.round(pData.atk * lvlScale),
        def:  Math.round((pData.def||5) * lvlScale) || 1,
        spd:  Math.round(baseSpd * (1 + enemyLevel * 0.02)),
        xp:   Math.round((pData.xp||10) * lvlScale),
        gold: Math.round(enemyLevel * 3),
        type: pData.t, isShiny: rollShiny(), maxHp: 0,
      };
      e.maxHp = e.hp;
      if (e.isShiny) { e.hp=Math.round(e.hp*1.15); e.maxHp=e.hp; e.atk=Math.round(e.atk*1.15); e.def=Math.round(e.def*1.15); e.spd=Math.round(e.spd*1.15); }
      showPreBattleMenu(e);
    } else if (roll < 0.68) {
      const g = Math.floor(Math.random()*10)+3;
      player.gold += g; updateHUD();
      setMessage(`✦ Vous trouvez ${g} Pokédollars !`); notify(`+${g} ₽`);
    } else if (roll < 0.78) {
      player.bag.potion = (player.bag.potion||0)+1;
      setMessage('🧪 Une Potion dans l\'herbe !'); notify('+1 Potion');
    } else {
      setMessage(EVENTS[Math.floor(Math.random()*EVENTS.length)]);
    }
  };
})();

// ──────────────────────────────────────────────────────────────
// MÉTADONNÉES STARTERS — génération et rôle
// ──────────────────────────────────────────────────────────────
const STARTER_META = {
  'Évoli':     { gen:1, role:'Équilibré' },
  'Carapuce':  { gen:1, role:'Défensif'  },
  'Salamèche': { gen:1, role:'Offensif'  },
  'Bulbizarre':{ gen:1, role:'Soutien'   },
  'Germignon': { gen:2, role:'Défensif'  },
  'Héricendre':{ gen:2, role:'Rapide'    },
  'Kaiminus':  { gen:2, role:'Offensif'  },
  'Arcko':     { gen:3, role:'Rapide'    },
  'Poussifeu': { gen:3, role:'Offensif'  },
  'Gobou':     { gen:3, role:'Défensif'  },
  // Gen 4
  'Tortipouss':{ gen:4, role:'Défensif'  },
  'Ouisticram':{ gen:4, role:'Rapide'    },
  'Tiplouf':   { gen:4, role:'Équilibré' },
  // Gen 5
  'Vipélierre':{ gen:5, role:'Rapide'    },
  'Gruikui':   { gen:5, role:'Offensif'  },
  'Moustillon':{ gen:5, role:'Défensif'  },
  // Gen 6
  'Marisson':  { gen:6, role:'Défensif'  },
  'Feunnec':   { gen:6, role:'Soutien'   },
  'Grenousse': { gen:6, role:'Rapide'    },
  // Gen 7
  'Brindibou': { gen:7, role:'Équilibré' },
  'Flamiaou':  { gen:7, role:'Rapide'    },
  'Otaquin':   { gen:7, role:'Soutien'   },
  // Gen 8
  'Ouistiaou': { gen:8, role:'Offensif'  },
  'Scorbunny': { gen:8, role:'Rapide'    },
  'Larméléon': { gen:8, role:'Soutien'   },
  // Gen 9
  'Poussacha': { gen:9, role:'Rapide'    },
  'Chochodile':{ gen:9, role:'Offensif'  },
  'Coiffeton': { gen:9, role:'Défensif'  },
};

// ──────────────────────────────────────────────────────────────
// GÉNÉRATION DYNAMIQUE DE LA GRILLE STARTERS
// ──────────────────────────────────────────────────────────────
function buildStarterGrid(gen) {
  const grid = document.getElementById('class-grid');
  if (!grid) return;
  const entries = Object.entries(CLASSES).filter(([name]) => {
    const meta = STARTER_META[name];
    return meta && (!gen || meta.gen === gen);
  });
  grid.innerHTML = entries.map(([name, data], i) => {
    const meta = STARTER_META[name] || { gen:1, role:'Équilibré' };
    const isFirst = i === 0;
    return `<div class="class-btn${isFirst ? ' selected' : ''}" data-class="${name}">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.sprite}.png" alt="${name}"/>
      ${name}
      <span class="class-type">${data.type} · ${meta.role}</span>
    </div>`;
  }).join('');
  // Rebind click events
  grid.querySelectorAll('.class-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      grid.querySelectorAll('.class-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
    });
  });
}

window.filterStarterGen = function(btn) {
  document.querySelectorAll('.gen-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const gen = parseInt(btn.dataset.gen);
  buildStarterGrid(gen);
};

// Construire la grille au chargement (Gen 1 par défaut)
document.addEventListener('DOMContentLoaded', () => {
  buildStarterGrid(1);
});
// Fallback si DOMContentLoaded déjà passé
if (document.readyState !== 'loading') {
  buildStarterGrid(1);
}

// ══════════════════════════════════════════════════════════════
//  PATCH POKÉDEX NATIONAL — couvre les 324 Pokémon
// ══════════════════════════════════════════════════════════════

const DEX_TOTAL_ALL = ALL_POKEMON.length; // ~1010 (Gen 1-9)

const NEW_DEX_MILESTONES = [
  {
    pct: 25, count: Math.floor(DEX_TOTAL_ALL * 0.25), label: '25 %',
    rewards: [
      { type:'ball', id:'superball',   qty:5 },
      { type:'item', id:'superpotion', qty:3 },
    ]
  },
  {
    pct: 50, count: Math.floor(DEX_TOTAL_ALL * 0.50), label: '50 %',
    rewards: [
      { type:'ball', id:'hyperball',   qty:5 },
      { type:'candy',                  qty:3 },
      { type:'item', id:'hyperpotion', qty:3 },
    ]
  },
  {
    pct: 75, count: Math.floor(DEX_TOTAL_ALL * 0.75), label: '75 %',
    rewards: [
      { type:'ball', id:'masterball',  qty:1 },
      { type:'candy',                  qty:5 },
      { type:'item', id:'hyperpotion', qty:5 },
    ]
  },
  {
    pct: 100, count: DEX_TOTAL_ALL,                   label: '100 %',
    rewards: [
      { type:'ball', id:'masterball',  qty:3 },
      { type:'candy',                  qty:10 },
      { type:'item', id:'hyperpotion', qty:10 },
    ]
  },
];

// État du filtre actif du Pokédex
let _dexCurrentFilter = 'all';
let _dexPage = 0;
const DEX_PAGE_SIZE = 80;

const _GEN_MAP = { '1':GEN1,'2':GEN2,'3':GEN3,'4':GEN4,'5':GEN5,'6':GEN6,'7':GEN7,'8':GEN8,'9':GEN9 };

// Filtre appelé depuis les boutons HTML
window.filterDexGen = function(gen, btn) {
  _dexCurrentFilter = gen;
  _dexPage = 0;
  document.querySelectorAll('#screen-pokedex .gen-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderDexGrid();
};
window.dexPageNext = function() { _dexPage++; renderDexGrid(); };
window.dexPagePrev = function() { _dexPage = Math.max(0,_dexPage-1); renderDexGrid(); };

// Rendu de la grille seulement (réutilisable lors du filtre)
function renderDexGrid() {
  const seen = new Set((player?.dexSeen) || []);
  const fullPool = _dexCurrentFilter === 'all' ? ALL_POKEMON
                 : (_GEN_MAP[_dexCurrentFilter] || ALL_POKEMON);
  // Pagination uniquement pour "all" (1010 entrées)
  const usePaging = _dexCurrentFilter === 'all';
  const totalPages = usePaging ? Math.ceil(fullPool.length / DEX_PAGE_SIZE) : 1;
  const pool = usePaging ? fullPool.slice(_dexPage * DEX_PAGE_SIZE, (_dexPage+1) * DEX_PAGE_SIZE) : fullPool;

  const grid = document.getElementById('pokedex-grid');
  if (!grid) return;
  grid.innerHTML = pool.map(p => {
    const unlocked = seen.has(p.id);
    const imgSrc   = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;
    const numStr   = String(p.id).padStart(3, '0');
    return `<div
      style="background:rgba(${unlocked ? '255,255,255' : '0,0,0'},.04);
             border:2px solid rgba(${unlocked ? '255,214,10' : '255,255,255'},.${unlocked ? '2' : '07'});
             border-radius:10px;padding:.5rem .4rem;text-align:center;
             transition:all .2s;cursor:${unlocked ? 'pointer' : 'default'}"
      ${unlocked ? `onclick="showDexDetail(${p.id})"
        onmouseover="this.style.borderColor='var(--yellow)'"
        onmouseout="this.style.borderColor='rgba(255,214,10,.2)'"` : ''}>
      <div style="font-family:'Press Start 2P',monospace;font-size:.28rem;color:rgba(255,255,255,.3);margin-bottom:.2rem">#${numStr}</div>
      <img src="${imgSrc}" style="width:52px;height:52px;image-rendering:pixelated;${unlocked ? '' : 'filter:grayscale(1) brightness(.25) contrast(.8)'}"/>
      <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:${unlocked ? 'var(--yellow)' : 'rgba(255,255,255,.2)'};margin-top:.25rem;line-height:1.5">${unlocked ? p.n : '???'}</div>
      ${unlocked ? `<div style="font-family:'Press Start 2P',monospace;font-size:.25rem;padding:.1rem .3rem;background:rgba(255,255,255,.07);border-radius:4px;color:rgba(255,255,255,.5);margin-top:.15rem">${p.t}</div>` : ''}
    </div>`;
  }).join('');

  // Contrôles de pagination (uniquement en mode "all")
  const pageCtrl = document.getElementById('dex-pagination');
  if (pageCtrl) {
    if (usePaging && totalPages > 1) {
      const start = _dexPage * DEX_PAGE_SIZE + 1;
      const end   = Math.min((_dexPage+1)*DEX_PAGE_SIZE, fullPool.length);
      pageCtrl.style.display = 'flex';
      pageCtrl.innerHTML = `
        <button onclick="dexPagePrev()" ${_dexPage===0?'disabled':''} style="font-family:'Press Start 2P',monospace;font-size:.38rem;padding:.35rem .7rem;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:6px;color:#fff;cursor:pointer;${_dexPage===0?'opacity:.3':''}">◀</button>
        <span style="font-family:'Press Start 2P',monospace;font-size:.35rem;color:rgba(255,255,255,.5)">#${start}–${end} / ${fullPool.length}</span>
        <button onclick="dexPageNext()" ${_dexPage>=totalPages-1?'disabled':''} style="font-family:'Press Start 2P',monospace;font-size:.38rem;padding:.35rem .7rem;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:6px;color:#fff;cursor:pointer;${_dexPage>=totalPages-1?'opacity:.3':''}">▶</button>`;
    } else {
      pageCtrl.style.display = 'none';
    }
  }
}

// Patch complet de renderPokedex
window.renderPokedex = function() {
  const seen  = new Set((player?.dexSeen) || []);
  const total = seen.size;
  const pct   = (total / DEX_TOTAL_ALL) * 100;

  // Compteur et barre
  const lbl = document.getElementById('dex-progress-label');
  const bar = document.getElementById('dex-progress-bar');
  if (lbl) lbl.textContent = `${total} / ${DEX_TOTAL_ALL} capturés`;
  if (bar) bar.style.width = pct + '%';

  // Milestones
  const given = player?.dexMilestonesGiven || [];
  const msEl  = document.getElementById('dex-milestones');
  if (msEl) {
    const ballNames = { pokeball:'Poké Ball', superball:'Super Ball', hyperball:'Hyper Ball', masterball:'Master Ball' };
    const ballImgs  = {
      pokeball:   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
      superball:  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
      hyperball:  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',
      masterball: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png',
    };
    const itemNames = { potion:'Potion', superpotion:'Super Potion', hyperpotion:'Hyper Potion' };
    const itemImgs  = {
      potion:      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',
      superpotion: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png',
      hyperpotion: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/hyper-potion.png',
    };
    msEl.innerHTML = NEW_DEX_MILESTONES.map(m => {
      const done      = given.includes(m.pct);
      const reachable = total >= m.count;
      const rewardLines = m.rewards.map(r => {
        if (r.type === 'ball')
          return `<div style="display:flex;align-items:center;gap:.35rem"><img src="${ballImgs[r.id]}" style="width:20px;height:20px;image-rendering:pixelated"/><span>${r.qty}× ${ballNames[r.id]||r.id}</span></div>`;
        if (r.type === 'item')
          return `<div style="display:flex;align-items:center;gap:.35rem"><img src="${itemImgs[r.id]}" style="width:20px;height:20px;image-rendering:pixelated"/><span>${r.qty}× ${itemNames[r.id]||r.id}</span></div>`;
        if (r.type === 'candy')
          return `<div style="display:flex;align-items:center;gap:.35rem"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" style="width:20px;height:20px;image-rendering:pixelated"/><span>${r.qty}× Super Bonbon</span></div>`;
        return '';
      }).join('');
      return `<div style="background:${done ? 'rgba(45,198,83,.12)' : reachable ? 'rgba(255,214,10,.08)' : 'rgba(255,255,255,.03)'};border:2px solid ${done ? '#2dc653' : reachable ? '#ffd60a' : 'rgba(255,255,255,.12)'};border-radius:12px;padding:.7rem .9rem;display:flex;flex-direction:column;gap:.4rem">
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.1rem">
          <span style="font-size:1.1rem">${done ? '✅' : reachable ? '⚡' : '🔒'}</span>
          <span style="font-family:'Press Start 2P',monospace;font-size:.52rem;color:${done ? '#2dc653' : reachable ? '#ffd60a' : 'rgba(255,255,255,.4)'}">${m.label}</span>
          <span style="font-family:'Press Start 2P',monospace;font-size:.35rem;color:rgba(255,255,255,.4);margin-left:auto">${m.count} Pokémon</span>
        </div>
        <div style="font-family:'Press Start 2P',monospace;font-size:.34rem;color:rgba(255,255,255,.55);display:flex;flex-direction:column;gap:.25rem">${rewardLines}</div>
        ${done ? '<div style="font-family:\'Press Start 2P\',monospace;font-size:.3rem;color:#2dc653;margin-top:.1rem">✓ Récompense récupérée</div>' : ''}
      </div>`;
    }).join('');
  }

  // Grille Pokémon (respecte le filtre actuel)
  renderDexGrid();
};

// Patch showDexDetail — cherche dans ALL_POKEMON
window.showDexDetail = function(pokeId) {
  const p = ALL_POKEMON_MAP.get(pokeId) || ALL_POKEMON.find(x => x.id === pokeId);
  if (!p) return;

  const typeColor = tp => ({
    Feu:'#ff6030', Eau:'#4488ff', Plante:'#44bb44', Électrik:'#ffcc00',
    Normal:'#9999aa', Psy:'#ff4499', Vol:'#88aaee', Dragon:'#7038f8',
    Poison:'#aa44bb', Combat:'#994422', Glace:'#88ccff', Sol:'#cc9944',
    Roche:'#9a8080', Spectre:'#5544aa', Insecte:'#88aa22', Acier:'#aaaacc',
    Ténèbres:'#443344', Fée:'#ff88cc',
  }[tp] || '#666');

  // Infos evo
  const evoChain = EVO_CHAINS[p.id];
  const evoText  = evoChain?.next
    ? `<div style="font-family:'Press Start 2P',monospace;font-size:.32rem;color:rgba(255,255,255,.55);margin-top:.3rem">→ Évolue en <span style="color:var(--yellow)">${evoChain.name}</span> (niv. ${evoChain.level})</div>`
    : '';

  const typeBadges = p.t.split('/').map(t =>
    `<span style="font-family:'Press Start 2P',monospace;font-size:.38rem;padding:.18rem .5rem;border-radius:4px;background:${typeColor(t)};color:#fff">${t}</span>`
  ).join(' ');
  const numStr   = String(p.id).padStart(3, '0');
  const genLabel = p.id <= 151 ? 'Kanto' : p.id <= 251 ? 'Johto' : 'Hoenn';
  const captured = ((player?.roster || []).concat(player?.box || []))
    .filter(r => (r.spriteId || r.currentSpriteId) === p.id);

  // Stats mini-bar
  const statBar = (val, max, color) =>
    `<div style="height:6px;width:100%;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden"><div style="height:100%;width:${Math.min(100, (val/max)*100)}%;background:${color};border-radius:3px"></div></div>`;

  const html = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:.7rem;text-align:center">
      <div style="display:flex;gap:.5rem;align-items:center">
        <span style="font-family:'Press Start 2P',monospace;font-size:.4rem;color:rgba(255,255,255,.4)">#${numStr}</span>
        <span style="font-family:'Press Start 2P',monospace;font-size:.32rem;padding:.12rem .4rem;border-radius:4px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.5)">${genLabel}</span>
      </div>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png"
           style="width:96px;height:96px;image-rendering:pixelated;filter:drop-shadow(0 0 12px rgba(255,214,10,.4))"/>
      <div style="font-family:'Press Start 2P',monospace;font-size:.65rem;color:var(--yellow)">${p.n}</div>
      <div style="display:flex;gap:.4rem">${typeBadges}</div>
      ${evoText}
      <div style="width:100%;text-align:left;display:flex;flex-direction:column;gap:.3rem">
        <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.5)">PV max base</div>
        ${statBar(p.hp, 255, '#e63946')}
        <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.5)">Attaque</div>
        ${statBar(p.atk*5, 200, '#ff9a3c')}
        <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.5)">Défense</div>
        ${statBar((p.def||5)*5, 200, '#58a6ff')}
        <div style="font-family:'Press Start 2P',monospace;font-size:.3rem;color:rgba(255,255,255,.5)">Vitesse</div>
        ${statBar(ALL_SPD[p.id]||50, 180, '#2dc653')}
      </div>
      ${captured.length > 0 ? '<div style="font-family:\'Press Start 2P\',monospace;font-size:.38rem;color:#2dc653">✓ Dans votre équipe / box</div>' : ''}
    </div>`;

  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed;inset:0;z-index:80;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center';
  modal.innerHTML = `<div style="background:rgba(10,10,30,.98);border:3px solid var(--yellow);border-radius:16px;padding:1.5rem;width:min(340px,92vw);max-height:90vh;overflow-y:auto;box-shadow:0 0 30px rgba(255,214,10,.2)">${html}<button class="btn" onclick="this.closest('div[style*=fixed]').remove()" style="margin-top:.7rem;font-size:.45rem;width:100%">✗ FERMER</button></div>`;
  document.body.appendChild(modal);
};

// Patch checkDexMilestones — utilise NEW_DEX_MILESTONES et DEX_TOTAL_ALL
window.checkDexMilestones = function() {
  if (!player) return;
  if (!player.dexMilestonesGiven) player.dexMilestonesGiven = [];
  const seen = (player.dexSeen || []).length;
  NEW_DEX_MILESTONES.forEach(m => {
    if (seen >= m.count && !player.dexMilestonesGiven.includes(m.pct)) {
      player.dexMilestonesGiven.push(m.pct);
      // Give rewards (réutilise la logique de game.js via awardDexMilestone si dispo)
      if (typeof awardDexMilestone === 'function') {
        awardDexMilestone(m);
      } else {
        // Fallback manuel
        m.rewards.forEach(r => {
          if (!player) return;
          if (r.type === 'ball')  { player.balls = player.balls || {}; player.balls[r.id] = (player.balls[r.id]||0) + r.qty; }
          if (r.type === 'candy') { player.candies = (player.candies||0) + r.qty; }
          if (r.type === 'item')  { player.bag = player.bag || {}; player.bag[r.id] = (player.bag[r.id]||0) + r.qty; }
        });
        if (typeof notify === 'function') notify(`🏅 Pokédex ${m.label} !`);
        if (typeof saveGame === 'function') saveGame();
      }
    }
  });
};

console.log(`✅ PokéWave Data loaded: ${ALL_POKEMON.length} Pokémon (Gen 1-9), ${ZONE_ORDER.length} zones`);
