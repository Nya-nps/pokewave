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

// ──────────────────────────────────────────────────────────────
// BASE COMPLÈTE TOUTES GÉNÉRATIONS
// ──────────────────────────────────────────────────────────────
const ALL_POKEMON = [...GEN1, ...GEN2, ...GEN3];
const ALL_SPD = {...GEN1_SPD, ...GEN2_SPD, ...GEN3_SPD};

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
      const zoneIdx = Math.min(bossesBeaten, ZONE_ORDER.length - 1);
      const zoneId  = ZONE_ORDER[zoneIdx];
      const zone    = ZONES[zoneId];
      const pool    = zone?.pokemon || [];

      // Utilise ALL_POKEMON (Gen 1+2+3)
      const pokeId = pool.length > 0
        ? pool[Math.floor(Math.random() * pool.length)]
        : (ALL_POKEMON[Math.floor(Math.random() * ALL_POKEMON.length)].id);
      const pData = ALL_POKEMON.find(p => p.id === pokeId) || ALL_POKEMON[Math.floor(Math.random()*ALL_POKEMON.length)];

      const baseLv    = Math.max(1, Math.floor((player.level||1) * 0.8 + wave * 1.5));
      const enemyLevel = baseLv + Math.floor(Math.random() * 4);
      const lvlScale  = scale * (1 + enemyLevel * 0.12);
      const baseSpd   = ALL_SPD[pData.id] || 50;
      const e = {
        name: pData.n, id: pData.id, level: enemyLevel,
        hp:   Math.round(pData.hp  * lvlScale),
        atk:  Math.round(pData.atk * lvlScale),
        def:  Math.round((pData.def||5) * lvlScale) || 1,
        spd:  Math.round(baseSpd * (1 + enemyLevel * 0.02)),
        xp:   Math.round((pData.xp||10) * lvlScale),
        gold: Math.round((pData.g||5)   * lvlScale),
        type: pData.t, isShiny: rollShiny(), maxHp: 0,
      };
      e.maxHp = e.hp;
      if (e.isShiny) { e.hp=Math.round(e.hp*1.15); e.maxHp=e.hp; e.atk=Math.round(e.atk*1.15); e.def=Math.round(e.def*1.15); e.spd=Math.round(e.spd*1.15); }
      showPreBattleMenu(e);
    } else if (roll < 0.68) {
      const g = Math.floor(Math.random()*25)+8;
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

console.log(`✅ PokéWave Data loaded: ${ALL_POKEMON.length} Pokémon (Gen 1+2+3), ${ZONE_ORDER.length} zones`);
