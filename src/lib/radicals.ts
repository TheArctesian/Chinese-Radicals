// The 214 Kangxi radicals. Started from the hand-written table that used to
// live in src/routes/+page.svelte; the extra senses in `meanings` come from the
// Unihan character definitions, curated where a raw definition read badly.

export interface Radical {
	/** Kangxi radical number, 1-214. */
	number: number;
	pinyin: string;
	/** Traditional / canonical form. */
	radical: string;
	/** Variant column exactly as it appears in the table, parentheses included. */
	variantLabel: string;
	/** Variant forms as bare characters, for lookups. */
	variants: string[];
	/** The conventional one-word name, for chips and other tight spaces. */
	english: string;
	/** Fuller sense list, `english` first. Shown in the table. */
	meanings: string[];
}

export const radicals: Radical[] = [
	{
		number: 1,
		pinyin: 'yī',
		radical: '一',
		variantLabel: '',
		variants: [],
		english: 'one',
		meanings: ['one', 'single', 'alone']
	},
	{
		number: 2,
		pinyin: 'shù',
		radical: '丨',
		variantLabel: '',
		variants: [],
		english: 'line',
		meanings: ['line', 'vertical stroke']
	},
	{
		number: 3,
		pinyin: 'diǎn',
		radical: '丶',
		variantLabel: '',
		variants: [],
		english: 'dot',
		meanings: ['dot', 'point']
	},
	{
		number: 4,
		pinyin: 'piě',
		radical: '丿',
		variantLabel: '乀 乁',
		variants: ['乀', '乁'],
		english: 'slash',
		meanings: ['slash', 'sloping stroke']
	},
	{
		number: 5,
		pinyin: 'yǐ',
		radical: '乙',
		variantLabel: '乚 乛',
		variants: ['乚', '乛'],
		english: 'second',
		meanings: ['second', 'second heavenly stem']
	},
	{
		number: 6,
		pinyin: 'gōu',
		radical: '亅',
		variantLabel: '',
		variants: [],
		english: 'hook',
		meanings: ['hook', 'barb']
	},
	{
		number: 7,
		pinyin: 'èr',
		radical: '二',
		variantLabel: '',
		variants: [],
		english: 'two',
		meanings: ['two', 'twice']
	},
	{
		number: 8,
		pinyin: 'tóu',
		radical: '亠',
		variantLabel: '',
		variants: [],
		english: 'lid',
		meanings: ['lid', 'head']
	},
	{
		number: 9,
		pinyin: 'rén',
		radical: '人',
		variantLabel: '亻',
		variants: ['亻'],
		english: 'person',
		meanings: ['person', 'man', 'people']
	},
	{
		number: 10,
		pinyin: 'ér',
		radical: '儿',
		variantLabel: '',
		variants: [],
		english: 'legs',
		meanings: ['legs', 'son', 'child']
	},
	{
		number: 11,
		pinyin: 'rù',
		radical: '入',
		variantLabel: '',
		variants: [],
		english: 'enter',
		meanings: ['enter', 'come in', 'join']
	},
	{
		number: 12,
		pinyin: 'bā',
		radical: '八',
		variantLabel: '丷',
		variants: ['丷'],
		english: 'eight',
		meanings: ['eight', 'divide']
	},
	{
		number: 13,
		pinyin: 'jiǒng',
		radical: '冂',
		variantLabel: '',
		variants: [],
		english: 'down box',
		meanings: ['down box', 'borders']
	},
	{
		number: 14,
		pinyin: 'mì',
		radical: '冖',
		variantLabel: '',
		variants: [],
		english: 'cover',
		meanings: ['cover', 'crown']
	},
	{
		number: 15,
		pinyin: 'bīng',
		radical: '冫',
		variantLabel: '',
		variants: [],
		english: 'ice',
		meanings: ['ice', 'frozen']
	},
	{
		number: 16,
		pinyin: 'jī, jǐ',
		radical: '几',
		variantLabel: '',
		variants: [],
		english: 'table',
		meanings: ['table', 'small table', 'how many']
	},
	{
		number: 17,
		pinyin: 'qǔ',
		radical: '凵',
		variantLabel: '',
		variants: [],
		english: 'open box',
		meanings: ['open box', 'receptacle']
	},
	{
		number: 18,
		pinyin: 'dāo',
		radical: '刀',
		variantLabel: '刂',
		variants: ['刂'],
		english: 'knife',
		meanings: ['knife', 'blade', 'old coin']
	},
	{
		number: 19,
		pinyin: 'lì',
		radical: '力',
		variantLabel: '',
		variants: [],
		english: 'power',
		meanings: ['power', 'capability', 'influence']
	},
	{
		number: 20,
		pinyin: 'bāo',
		radical: '勹',
		variantLabel: '',
		variants: [],
		english: 'wrap',
		meanings: ['wrap', 'enfold', 'envelop']
	},
	{
		number: 21,
		pinyin: 'bǐ',
		radical: '匕',
		variantLabel: '',
		variants: [],
		english: 'ladle',
		meanings: ['ladle', 'spoon', 'dagger']
	},
	{
		number: 22,
		pinyin: 'fāng',
		radical: '匚',
		variantLabel: '',
		variants: [],
		english: 'right open box',
		meanings: ['right open box', 'box', 'basket']
	},
	{
		number: 23,
		pinyin: 'xǐ',
		radical: '匸',
		variantLabel: '',
		variants: [],
		english: 'hiding enclosure',
		meanings: ['hiding enclosure', 'conceal']
	},
	{
		number: 24,
		pinyin: 'shí',
		radical: '十',
		variantLabel: '',
		variants: [],
		english: 'ten',
		meanings: ['ten', 'complete', 'perfect']
	},
	{
		number: 25,
		pinyin: 'bǔ',
		radical: '卜',
		variantLabel: '',
		variants: [],
		english: 'divination',
		meanings: ['divination', 'fortune telling', 'prophesy']
	},
	{
		number: 26,
		pinyin: 'jié',
		radical: '卩',
		variantLabel: '',
		variants: [],
		english: 'seal',
		meanings: ['seal', 'kneeling person']
	},
	{
		number: 27,
		pinyin: 'hàn',
		radical: '厂',
		variantLabel: '',
		variants: [],
		english: 'cliff',
		meanings: ['cliff', 'factory', 'workshop']
	},
	{
		number: 28,
		pinyin: 'sī',
		radical: '厶',
		variantLabel: '',
		variants: [],
		english: 'private',
		meanings: ['private', 'secret']
	},
	{
		number: 29,
		pinyin: 'yòu',
		radical: '又',
		variantLabel: '',
		variants: [],
		english: 'again',
		meanings: ['again', 'also', 'right hand']
	},
	{
		number: 30,
		pinyin: 'kǒu',
		radical: '口',
		variantLabel: '',
		variants: [],
		english: 'mouth',
		meanings: ['mouth', 'opening', 'entrance']
	},
	{
		number: 31,
		pinyin: 'wéi',
		radical: '囗',
		variantLabel: '',
		variants: [],
		english: 'enclosure',
		meanings: ['enclosure', 'border', 'surround']
	},
	{
		number: 32,
		pinyin: 'tǔ',
		radical: '土',
		variantLabel: '',
		variants: [],
		english: 'earth',
		meanings: ['earth', 'soil']
	},
	{
		number: 33,
		pinyin: 'shì',
		radical: '士',
		variantLabel: '',
		variants: [],
		english: 'scholar',
		meanings: ['scholar', 'gentleman', 'soldier']
	},
	{
		number: 34,
		pinyin: 'zhī',
		radical: '夂',
		variantLabel: '',
		variants: [],
		english: 'go',
		meanings: ['go', 'follow']
	},
	{
		number: 35,
		pinyin: 'suī',
		radical: '夊',
		variantLabel: '',
		variants: [],
		english: 'go slowly',
		meanings: ['go slowly', 'drag the feet']
	},
	{
		number: 36,
		pinyin: 'xī',
		radical: '夕',
		variantLabel: '',
		variants: [],
		english: 'night',
		meanings: ['night', 'evening', 'dusk']
	},
	{
		number: 37,
		pinyin: 'dà',
		radical: '大',
		variantLabel: '',
		variants: [],
		english: 'big',
		meanings: ['big', 'great', 'vast']
	},
	{
		number: 38,
		pinyin: 'nǚ',
		radical: '女',
		variantLabel: '',
		variants: [],
		english: 'woman',
		meanings: ['woman', 'girl', 'feminine']
	},
	{
		number: 39,
		pinyin: 'zǐ',
		radical: '子',
		variantLabel: '',
		variants: [],
		english: 'child',
		meanings: ['child', 'offspring', 'seed']
	},
	{
		number: 40,
		pinyin: 'mián',
		radical: '宀',
		variantLabel: '',
		variants: [],
		english: 'roof',
		meanings: ['roof', 'house', 'cover']
	},
	{
		number: 41,
		pinyin: 'cùn',
		radical: '寸',
		variantLabel: '',
		variants: [],
		english: 'inch',
		meanings: ['inch', 'small', 'tiny']
	},
	{
		number: 42,
		pinyin: 'xiǎo',
		radical: '小',
		variantLabel: '',
		variants: [],
		english: 'small',
		meanings: ['small', 'tiny', 'insignificant']
	},
	{
		number: 43,
		pinyin: 'yóu',
		radical: '尢',
		variantLabel: '尣',
		variants: ['尣'],
		english: 'lame',
		meanings: ['lame', 'weak', 'crooked']
	},
	{
		number: 44,
		pinyin: 'shī',
		radical: '尸',
		variantLabel: '',
		variants: [],
		english: 'corpse',
		meanings: ['corpse', 'body', 'preside']
	},
	{
		number: 45,
		pinyin: 'chè',
		radical: '屮',
		variantLabel: '',
		variants: [],
		english: 'sprout',
		meanings: ['sprout', 'young plant']
	},
	{
		number: 46,
		pinyin: 'shān',
		radical: '山',
		variantLabel: '',
		variants: [],
		english: 'mountain',
		meanings: ['mountain', 'hill', 'peak']
	},
	{
		number: 47,
		pinyin: 'chuān',
		radical: '川',
		variantLabel: '巛 巜',
		variants: ['巛', '巜'],
		english: 'river',
		meanings: ['river', 'stream', 'flow']
	},
	{
		number: 48,
		pinyin: 'gōng',
		radical: '工',
		variantLabel: '',
		variants: [],
		english: 'work',
		meanings: ['work', 'labor']
	},
	{
		number: 49,
		pinyin: 'jǐ',
		radical: '己',
		variantLabel: '',
		variants: [],
		english: 'oneself',
		meanings: ['oneself', 'personal', 'private']
	},
	{
		number: 50,
		pinyin: 'jīn',
		radical: '巾',
		variantLabel: '',
		variants: [],
		english: 'towel',
		meanings: ['towel', 'kerchief', 'turban']
	},
	{
		number: 51,
		pinyin: 'gān',
		radical: '干',
		variantLabel: '',
		variants: [],
		english: 'dry',
		meanings: ['dry', 'shield', 'stem']
	},
	{
		number: 52,
		pinyin: 'yāo',
		radical: '幺',
		variantLabel: '',
		variants: [],
		english: 'thread',
		meanings: ['thread', 'tiny', 'small']
	},
	{
		number: 53,
		pinyin: 'guǎng',
		radical: '广',
		variantLabel: '',
		variants: [],
		english: 'shelter',
		meanings: ['shelter', 'wide', 'broad']
	},
	{
		number: 54,
		pinyin: 'yǐn',
		radical: '廴',
		variantLabel: '',
		variants: [],
		english: 'stride',
		meanings: ['stride', 'go']
	},
	{
		number: 55,
		pinyin: 'gǒng',
		radical: '廾',
		variantLabel: '',
		variants: [],
		english: 'hands joined',
		meanings: ['hands joined', 'two hands']
	},
	{
		number: 56,
		pinyin: 'yì',
		radical: '弋',
		variantLabel: '',
		variants: [],
		english: 'shoot with a bow',
		meanings: ['shoot with a bow', 'catch', 'arrest']
	},
	{
		number: 57,
		pinyin: 'gōng',
		radical: '弓',
		variantLabel: '',
		variants: [],
		english: 'bow',
		meanings: ['bow', 'curved', 'arched']
	},
	{
		number: 58,
		pinyin: 'jì',
		radical: '彐',
		variantLabel: '彑',
		variants: ['彑'],
		english: 'snout',
		meanings: ['snout', 'hand']
	},
	{
		number: 59,
		pinyin: 'shān',
		radical: '彡',
		variantLabel: '',
		variants: [],
		english: 'hair',
		meanings: ['hair', 'bristles', 'feathers']
	},
	{
		number: 60,
		pinyin: 'chì',
		radical: '彳',
		variantLabel: '',
		variants: [],
		english: 'step',
		meanings: ['step', 'walk slowly']
	},
	{
		number: 61,
		pinyin: 'xīn',
		radical: '心',
		variantLabel: '忄',
		variants: ['忄'],
		english: 'heart',
		meanings: ['heart', 'mind', 'intelligence', 'soul']
	},
	{
		number: 62,
		pinyin: 'gē',
		radical: '戈',
		variantLabel: '',
		variants: [],
		english: 'spear',
		meanings: ['spear', 'halberd', 'lance']
	},
	{
		number: 63,
		pinyin: 'hù',
		radical: '户',
		variantLabel: '',
		variants: [],
		english: 'door',
		meanings: ['door', 'household', 'family']
	},
	{
		number: 64,
		pinyin: 'shǒu',
		radical: '手',
		variantLabel: '扌',
		variants: ['扌'],
		english: 'hand',
		meanings: ['hand', 'palm', 'to hold']
	},
	{
		number: 65,
		pinyin: 'zhī',
		radical: '支',
		variantLabel: '',
		variants: [],
		english: 'branch',
		meanings: ['branch', 'support', 'pay']
	},
	{
		number: 66,
		pinyin: 'pū',
		radical: '攴',
		variantLabel: '攵',
		variants: ['攵'],
		english: 'rap',
		meanings: ['rap', 'tap lightly']
	},
	{
		number: 67,
		pinyin: 'wén',
		radical: '文',
		variantLabel: '',
		variants: [],
		english: 'script',
		meanings: ['script', 'writing', 'literature']
	},
	{
		number: 68,
		pinyin: 'dǒu',
		radical: '斗',
		variantLabel: '',
		variants: [],
		english: 'dipper',
		meanings: ['dipper', 'unit of volume']
	},
	{
		number: 69,
		pinyin: 'jīn',
		radical: '斤',
		variantLabel: '',
		variants: [],
		english: 'axe',
		meanings: ['axe', 'catty', 'shrewd']
	},
	{
		number: 70,
		pinyin: 'fāng',
		radical: '方',
		variantLabel: '',
		variants: [],
		english: 'square',
		meanings: ['square', 'rectangle', 'region']
	},
	{
		number: 71,
		pinyin: 'wú',
		radical: '无',
		variantLabel: '',
		variants: [],
		english: 'not',
		meanings: ['not', 'negative', 'without']
	},
	{
		number: 72,
		pinyin: 'rì',
		radical: '日',
		variantLabel: '',
		variants: [],
		english: 'sun',
		meanings: ['sun', 'day']
	},
	{
		number: 73,
		pinyin: 'yuē',
		radical: '曰',
		variantLabel: '',
		variants: [],
		english: 'say',
		meanings: ['say', 'speak', 'called']
	},
	{
		number: 74,
		pinyin: 'yuè',
		radical: '月',
		variantLabel: '',
		variants: [],
		english: 'moon',
		meanings: ['moon', 'month']
	},
	{
		number: 75,
		pinyin: 'mù',
		radical: '木',
		variantLabel: '',
		variants: [],
		english: 'tree',
		meanings: ['tree', 'wood', 'lumber']
	},
	{
		number: 76,
		pinyin: 'qiàn',
		radical: '欠',
		variantLabel: '',
		variants: [],
		english: 'lack',
		meanings: ['lack', 'owe', 'be deficient']
	},
	{
		number: 77,
		pinyin: 'zhǐ',
		radical: '止',
		variantLabel: '',
		variants: [],
		english: 'stop',
		meanings: ['stop', 'halt', 'desist', 'detain']
	},
	{
		number: 78,
		pinyin: 'dǎi',
		radical: '歹',
		variantLabel: '',
		variants: [],
		english: 'death',
		meanings: ['death', 'bad', 'wicked']
	},
	{
		number: 79,
		pinyin: 'shū',
		radical: '殳',
		variantLabel: '',
		variants: [],
		english: 'weapon',
		meanings: ['weapon', 'halberd shaft', 'kill']
	},
	{
		number: 80,
		pinyin: 'mǔ',
		radical: '毋',
		variantLabel: '母',
		variants: ['母'],
		english: 'mother',
		meanings: ['mother', 'do not']
	},
	{
		number: 81,
		pinyin: 'bǐ',
		radical: '比',
		variantLabel: '',
		variants: [],
		english: 'compare',
		meanings: ['compare', 'liken', 'than']
	},
	{
		number: 82,
		pinyin: 'máo',
		radical: '毛',
		variantLabel: '',
		variants: [],
		english: 'fur',
		meanings: ['fur', 'hair', 'feathers']
	},
	{
		number: 83,
		pinyin: 'shì',
		radical: '氏',
		variantLabel: '',
		variants: [],
		english: 'clan',
		meanings: ['clan', 'family', 'lineage']
	},
	{
		number: 84,
		pinyin: 'qì',
		radical: '气',
		variantLabel: '',
		variants: [],
		english: 'steam',
		meanings: ['steam', 'vapor']
	},
	{
		number: 85,
		pinyin: 'shuǐ',
		radical: '水',
		variantLabel: '氵',
		variants: ['氵'],
		english: 'water',
		meanings: ['water', 'liquid', 'juice']
	},
	{
		number: 86,
		pinyin: 'huǒ',
		radical: '火',
		variantLabel: '灬',
		variants: ['灬'],
		english: 'fire',
		meanings: ['fire', 'flame', 'burn', 'anger']
	},
	{
		number: 87,
		pinyin: 'zhǎo',
		radical: '爪',
		variantLabel: '爫',
		variants: ['爫'],
		english: 'claw',
		meanings: ['claw', 'nail', 'talon']
	},
	{
		number: 88,
		pinyin: 'fù',
		radical: '父',
		variantLabel: '',
		variants: [],
		english: 'father',
		meanings: ['father', 'elder male relative']
	},
	{
		number: 89,
		pinyin: 'yáo',
		radical: '爻',
		variantLabel: '',
		variants: [],
		english: 'lines on a trigram',
		meanings: ['lines on a trigram', 'divination diagrams']
	},
	{
		number: 90,
		pinyin: 'qiáng',
		radical: '爿',
		variantLabel: '',
		variants: [],
		english: 'half of a tree trunk',
		meanings: ['half of a tree trunk', 'split wood']
	},
	{
		number: 91,
		pinyin: 'piàn',
		radical: '片',
		variantLabel: '',
		variants: [],
		english: 'slice',
		meanings: ['slice', 'splinter', 'strip']
	},
	{
		number: 92,
		pinyin: 'yá',
		radical: '牙',
		variantLabel: '',
		variants: [],
		english: 'tooth',
		meanings: ['tooth', 'molars', 'fang']
	},
	{
		number: 93,
		pinyin: 'niú',
		radical: '牛',
		variantLabel: '牜',
		variants: ['牜'],
		english: 'cow',
		meanings: ['cow', 'ox', 'bull']
	},
	{
		number: 94,
		pinyin: 'quǎn',
		radical: '犬',
		variantLabel: '犭',
		variants: ['犭'],
		english: 'dog',
		meanings: ['dog', 'hound']
	},
	{
		number: 95,
		pinyin: 'xuán',
		radical: '玄',
		variantLabel: '',
		variants: [],
		english: 'profound',
		meanings: ['profound', 'deep', 'abstruse']
	},
	{
		number: 96,
		pinyin: 'yù',
		radical: '玉',
		variantLabel: '王',
		variants: ['王'],
		english: 'jade',
		meanings: ['jade', 'precious stone', 'gem']
	},
	{
		number: 97,
		pinyin: 'guā',
		radical: '瓜',
		variantLabel: '',
		variants: [],
		english: 'melon',
		meanings: ['melon', 'gourd', 'cucumber']
	},
	{
		number: 98,
		pinyin: 'wǎ',
		radical: '瓦',
		variantLabel: '',
		variants: [],
		english: 'tile',
		meanings: ['tile', 'earthenware', 'pottery']
	},
	{
		number: 99,
		pinyin: 'gān',
		radical: '甘',
		variantLabel: '',
		variants: [],
		english: 'sweet',
		meanings: ['sweet', 'tasty', 'sweetness']
	},
	{
		number: 100,
		pinyin: 'shēng',
		radical: '生',
		variantLabel: '',
		variants: [],
		english: 'life',
		meanings: ['life', 'living', 'birth']
	},
	{
		number: 101,
		pinyin: 'yòng',
		radical: '用',
		variantLabel: '',
		variants: [],
		english: 'use',
		meanings: ['use', 'employ', 'apply']
	},
	{
		number: 102,
		pinyin: 'tián',
		radical: '田',
		variantLabel: '',
		variants: [],
		english: 'field',
		meanings: ['field', 'arable land', 'farmland']
	},
	{
		number: 103,
		pinyin: 'pǐ',
		radical: '疋',
		variantLabel: '',
		variants: [],
		english: 'cloth',
		meanings: ['cloth', 'bolt of cloth', 'foot']
	},
	{
		number: 104,
		pinyin: 'bìng',
		radical: '疒',
		variantLabel: '',
		variants: [],
		english: 'ill',
		meanings: ['ill', 'sick']
	},
	{
		number: 105,
		pinyin: 'bō',
		radical: '癶',
		variantLabel: '',
		variants: [],
		english: 'foot steps',
		meanings: ['foot steps', 'legs']
	},
	{
		number: 106,
		pinyin: 'bái',
		radical: '白',
		variantLabel: '',
		variants: [],
		english: 'white',
		meanings: ['white', 'pure', 'bright']
	},
	{
		number: 107,
		pinyin: 'pí',
		radical: '皮',
		variantLabel: '',
		variants: [],
		english: 'skin',
		meanings: ['skin', 'hide', 'fur']
	},
	{
		number: 108,
		pinyin: 'mǐn',
		radical: '皿',
		variantLabel: '',
		variants: [],
		english: 'dish',
		meanings: ['dish', 'shallow container']
	},
	{
		number: 109,
		pinyin: 'mù',
		radical: '目',
		variantLabel: '',
		variants: [],
		english: 'eye',
		meanings: ['eye', 'look', 'see']
	},
	{
		number: 110,
		pinyin: 'máo',
		radical: '矛',
		variantLabel: '',
		variants: [],
		english: 'spear',
		meanings: ['spear', 'lance']
	},
	{
		number: 111,
		pinyin: 'shǐ',
		radical: '矢',
		variantLabel: '',
		variants: [],
		english: 'arrow',
		meanings: ['arrow', 'dart', 'vow']
	},
	{
		number: 112,
		pinyin: 'shí',
		radical: '石',
		variantLabel: '',
		variants: [],
		english: 'stone',
		meanings: ['stone', 'rock', 'mineral']
	},
	{
		number: 113,
		pinyin: 'shì',
		radical: '示',
		variantLabel: '礻',
		variants: ['礻'],
		english: 'spirit',
		meanings: ['spirit', 'show', 'manifest']
	},
	{
		number: 114,
		pinyin: 'róu',
		radical: '禸',
		variantLabel: '',
		variants: [],
		english: 'track',
		meanings: ['track', 'rump']
	},
	{
		number: 115,
		pinyin: 'hé',
		radical: '禾',
		variantLabel: '',
		variants: [],
		english: 'grain',
		meanings: ['grain', 'rice plant']
	},
	{
		number: 116,
		pinyin: 'xuè',
		radical: '穴',
		variantLabel: '',
		variants: [],
		english: 'cave',
		meanings: ['cave', 'den', 'hole']
	},
	{
		number: 117,
		pinyin: 'lì',
		radical: '立',
		variantLabel: '',
		variants: [],
		english: 'stand',
		meanings: ['stand', 'establish', 'set']
	},
	{
		number: 118,
		pinyin: 'zhú',
		radical: '竹',
		variantLabel: '',
		variants: [],
		english: 'bamboo',
		meanings: ['bamboo', 'flute']
	},
	{
		number: 119,
		pinyin: 'mǐ',
		radical: '米',
		variantLabel: '',
		variants: [],
		english: 'rice',
		meanings: ['rice', 'hulled rice']
	},
	{
		number: 120,
		pinyin: 'sī',
		radical: '糸',
		variantLabel: '(纟)',
		variants: ['纟'],
		english: 'silk',
		meanings: ['silk', 'thread', 'fine silk']
	},
	{
		number: 121,
		pinyin: 'fǒu',
		radical: '缶',
		variantLabel: '',
		variants: [],
		english: 'jar',
		meanings: ['jar', 'earthen crock']
	},
	{
		number: 122,
		pinyin: 'wǎng',
		radical: '网',
		variantLabel: '罒',
		variants: ['罒'],
		english: 'net',
		meanings: ['net', 'network', 'web']
	},
	{
		number: 123,
		pinyin: 'yáng',
		radical: '羊',
		variantLabel: '',
		variants: [],
		english: 'sheep',
		meanings: ['sheep', 'goat']
	},
	{
		number: 124,
		pinyin: 'yǔ',
		radical: '羽',
		variantLabel: '',
		variants: [],
		english: 'feather',
		meanings: ['feather', 'plume', 'wings']
	},
	{
		number: 125,
		pinyin: 'lǎo',
		radical: '老',
		variantLabel: '',
		variants: [],
		english: 'old',
		meanings: ['old', 'aged', 'experienced']
	},
	{
		number: 126,
		pinyin: 'ér',
		radical: '而',
		variantLabel: '',
		variants: [],
		english: 'and',
		meanings: ['and', 'and yet', 'but']
	},
	{
		number: 127,
		pinyin: 'lěi',
		radical: '耒',
		variantLabel: '',
		variants: [],
		english: 'plow',
		meanings: ['plow', 'plow handle']
	},
	{
		number: 128,
		pinyin: 'ěr',
		radical: '耳',
		variantLabel: '',
		variants: [],
		english: 'ear',
		meanings: ['ear', 'handle']
	},
	{
		number: 129,
		pinyin: 'yù',
		radical: '聿',
		variantLabel: '',
		variants: [],
		english: 'brush',
		meanings: ['brush', 'pencil']
	},
	{
		number: 130,
		pinyin: 'ròu',
		radical: '肉',
		variantLabel: '',
		variants: [],
		english: 'meat',
		meanings: ['meat', 'flesh']
	},
	{
		number: 131,
		pinyin: 'chén',
		radical: '臣',
		variantLabel: '',
		variants: [],
		english: 'minister',
		meanings: ['minister', 'statesman', 'official']
	},
	{
		number: 132,
		pinyin: 'zì',
		radical: '自',
		variantLabel: '',
		variants: [],
		english: 'oneself',
		meanings: ['oneself', 'self', 'from']
	},
	{
		number: 133,
		pinyin: 'zhì',
		radical: '至',
		variantLabel: '',
		variants: [],
		english: 'arrive',
		meanings: ['arrive', 'reach', 'utmost']
	},
	{
		number: 134,
		pinyin: 'jiù',
		radical: '臼',
		variantLabel: '',
		variants: [],
		english: 'mortar',
		meanings: ['mortar', 'joint socket']
	},
	{
		number: 135,
		pinyin: 'shé',
		radical: '舌',
		variantLabel: '',
		variants: [],
		english: 'tongue',
		meanings: ['tongue', 'clapper of bell']
	},
	{
		number: 136,
		pinyin: 'chuǎn',
		radical: '舛',
		variantLabel: '',
		variants: [],
		english: 'contrary',
		meanings: ['contrary', 'oppose', 'deviate']
	},
	{
		number: 137,
		pinyin: 'zhōu',
		radical: '舟',
		variantLabel: '',
		variants: [],
		english: 'boat',
		meanings: ['boat', 'ship']
	},
	{
		number: 138,
		pinyin: 'gèn',
		radical: '艮',
		variantLabel: '',
		variants: [],
		english: 'mountain',
		meanings: ['mountain', 'stopping']
	},
	{
		number: 139,
		pinyin: 'sè',
		radical: '色',
		variantLabel: '',
		variants: [],
		english: 'color',
		meanings: ['color', 'hue', 'appearance']
	},
	{
		number: 140,
		pinyin: 'cǎo',
		radical: '艸',
		variantLabel: '(艹)',
		variants: ['艹'],
		english: 'grass',
		meanings: ['grass', 'plants', 'vegetation']
	},
	{
		number: 141,
		pinyin: 'hǔ',
		radical: '虍',
		variantLabel: '',
		variants: [],
		english: 'tiger',
		meanings: ['tiger', 'tiger stripes']
	},
	{
		number: 142,
		pinyin: 'chóng',
		radical: '虫',
		variantLabel: '',
		variants: [],
		english: 'insect',
		meanings: ['insect', 'worms']
	},
	{
		number: 143,
		pinyin: 'xuè',
		radical: '血',
		variantLabel: '',
		variants: [],
		english: 'blood',
		meanings: ['blood']
	},
	{
		number: 144,
		pinyin: 'xíng',
		radical: '行',
		variantLabel: '',
		variants: [],
		english: 'walk',
		meanings: ['walk', 'go', 'move', 'travel']
	},
	{
		number: 145,
		pinyin: 'yī',
		radical: '衣',
		variantLabel: '衤',
		variants: ['衤'],
		english: 'clothes',
		meanings: ['clothes', 'garment', 'cover']
	},
	{
		number: 146,
		pinyin: 'xī',
		radical: '西',
		variantLabel: '覀',
		variants: ['覀'],
		english: 'west',
		meanings: ['west', 'occident']
	},
	{
		number: 147,
		pinyin: 'jiàn',
		radical: '見',
		variantLabel: '(见)',
		variants: ['见'],
		english: 'see',
		meanings: ['see', 'observe', 'perceive']
	},
	{
		number: 148,
		pinyin: 'jiǎo',
		radical: '角',
		variantLabel: '',
		variants: [],
		english: 'horn',
		meanings: ['horn', 'angle', 'corner', 'point']
	},
	{
		number: 149,
		pinyin: 'yán',
		radical: '言',
		variantLabel: '(讠)',
		variants: ['讠'],
		english: 'speech',
		meanings: ['speech', 'words', 'speak', 'say']
	},
	{
		number: 150,
		pinyin: 'gǔ',
		radical: '谷',
		variantLabel: '',
		variants: [],
		english: 'valley',
		meanings: ['valley', 'gorge', 'ravine']
	},
	{
		number: 151,
		pinyin: 'dòu',
		radical: '豆',
		variantLabel: '',
		variants: [],
		english: 'bean',
		meanings: ['bean', 'peas']
	},
	{
		number: 152,
		pinyin: 'shǐ',
		radical: '豕',
		variantLabel: '',
		variants: [],
		english: 'pig',
		meanings: ['pig', 'boar']
	},
	{
		number: 153,
		pinyin: 'zhì',
		radical: '豸',
		variantLabel: '',
		variants: [],
		english: 'badger',
		meanings: ['badger', 'legless insect', 'worm']
	},
	{
		number: 154,
		pinyin: 'bèi',
		radical: '貝',
		variantLabel: '(贝)',
		variants: ['贝'],
		english: 'shell',
		meanings: ['shell', 'money', 'currency']
	},
	{
		number: 155,
		pinyin: 'chì',
		radical: '赤',
		variantLabel: '',
		variants: [],
		english: 'red',
		meanings: ['red', 'bare']
	},
	{
		number: 156,
		pinyin: 'zǒu',
		radical: '走',
		variantLabel: '',
		variants: [],
		english: 'walk',
		meanings: ['walk', 'go on foot', 'run']
	},
	{
		number: 157,
		pinyin: 'zú',
		radical: '足',
		variantLabel: '',
		variants: [],
		english: 'foot',
		meanings: ['foot', 'leg', 'enough']
	},
	{
		number: 158,
		pinyin: 'shēn',
		radical: '身',
		variantLabel: '',
		variants: [],
		english: 'body',
		meanings: ['body', 'trunk', 'hull']
	},
	{
		number: 159,
		pinyin: 'chē',
		radical: '車',
		variantLabel: '(车)',
		variants: ['车'],
		english: 'cart',
		meanings: ['cart', 'vehicle']
	},
	{
		number: 160,
		pinyin: 'xīn',
		radical: '辛',
		variantLabel: '',
		variants: [],
		english: 'bitter',
		meanings: ['bitter', 'pungent', 'toilsome']
	},
	{
		number: 161,
		pinyin: 'chén',
		radical: '辰',
		variantLabel: '',
		variants: [],
		english: 'morning',
		meanings: ['morning', 'early morning']
	},
	{
		number: 162,
		pinyin: 'chuò',
		radical: '辶',
		variantLabel: '',
		variants: [],
		english: 'walk',
		meanings: ['walk', 'walking', 'movement']
	},
	{
		number: 163,
		pinyin: 'yì',
		radical: '邑',
		variantLabel: '阝',
		variants: ['阝'],
		english: 'city',
		meanings: ['city', 'town', 'district']
	},
	{
		number: 164,
		pinyin: 'yǒu',
		radical: '酉',
		variantLabel: '',
		variants: [],
		english: 'wine',
		meanings: ['wine', 'wine vessel']
	},
	{
		number: 165,
		pinyin: 'biàn',
		radical: '釆',
		variantLabel: '',
		variants: [],
		english: 'distinguish',
		meanings: ['distinguish', 'separate']
	},
	{
		number: 166,
		pinyin: 'lǐ',
		radical: '里',
		variantLabel: '',
		variants: [],
		english: 'village',
		meanings: ['village', 'lane', 'unit of distance']
	},
	{
		number: 167,
		pinyin: 'jīn',
		radical: '金',
		variantLabel: '(钅)',
		variants: ['钅'],
		english: 'metal',
		meanings: ['metal', 'gold', 'money']
	},
	{
		number: 168,
		pinyin: 'cháng',
		radical: '長',
		variantLabel: '(长)',
		variants: ['长'],
		english: 'long',
		meanings: ['long', 'length', 'elder']
	},
	{
		number: 169,
		pinyin: 'mén',
		radical: '門',
		variantLabel: '(门)',
		variants: ['门'],
		english: 'gate',
		meanings: ['gate', 'door', 'entrance', 'opening']
	},
	{
		number: 170,
		pinyin: 'fù',
		radical: '阜',
		variantLabel: '阝',
		variants: ['阝'],
		english: 'mound',
		meanings: ['mound', 'hill', 'abundant']
	},
	{
		number: 171,
		pinyin: 'lì',
		radical: '隶',
		variantLabel: '',
		variants: [],
		english: 'slave',
		meanings: ['slave', 'servant', 'subservient']
	},
	{
		number: 172,
		pinyin: 'zhuī',
		radical: '隹',
		variantLabel: '',
		variants: [],
		english: 'short-tailed bird',
		meanings: ['short-tailed bird', 'bird']
	},
	{
		number: 173,
		pinyin: 'yǔ',
		radical: '雨',
		variantLabel: '',
		variants: [],
		english: 'rain',
		meanings: ['rain', 'rainy']
	},
	{
		number: 174,
		pinyin: 'qīng',
		radical: '青',
		variantLabel: '',
		variants: [],
		english: 'blue',
		meanings: ['blue', 'green', 'young']
	},
	{
		number: 175,
		pinyin: 'fēi',
		radical: '非',
		variantLabel: '',
		variants: [],
		english: 'wrong',
		meanings: ['wrong', 'not', 'non-']
	},
	{
		number: 176,
		pinyin: 'miàn',
		radical: '面',
		variantLabel: '',
		variants: [],
		english: 'face',
		meanings: ['face', 'surface', 'side']
	},
	{
		number: 177,
		pinyin: 'gé',
		radical: '革',
		variantLabel: '',
		variants: [],
		english: 'leather',
		meanings: ['leather', 'animal hides']
	},
	{
		number: 178,
		pinyin: 'wěi',
		radical: '韋',
		variantLabel: '(韦)',
		variants: ['韦'],
		english: 'soft leather',
		meanings: ['soft leather', 'tanned leather']
	},
	{
		number: 179,
		pinyin: 'jiǔ',
		radical: '韭',
		variantLabel: '',
		variants: [],
		english: 'leek',
		meanings: ['leek', 'scallion']
	},
	{
		number: 180,
		pinyin: 'yīn',
		radical: '音',
		variantLabel: '',
		variants: [],
		english: 'sound',
		meanings: ['sound', 'tone', 'pitch', 'pronunciation']
	},
	{
		number: 181,
		pinyin: 'yè',
		radical: '頁',
		variantLabel: '(页)',
		variants: ['页'],
		english: 'page',
		meanings: ['page', 'sheet', 'leaf']
	},
	{
		number: 182,
		pinyin: 'fēng',
		radical: '風',
		variantLabel: '(风)',
		variants: ['风'],
		english: 'wind',
		meanings: ['wind', 'air', 'custom']
	},
	{
		number: 183,
		pinyin: 'fēi',
		radical: '飛',
		variantLabel: '(飞)',
		variants: ['飞'],
		english: 'fly',
		meanings: ['fly', 'soar', 'dart']
	},
	{
		number: 184,
		pinyin: 'shí',
		radical: '食',
		variantLabel: '飠 (饣)',
		variants: ['飠', '饣'],
		english: 'eat',
		meanings: ['eat', 'meal', 'food']
	},
	{
		number: 185,
		pinyin: 'shǒu',
		radical: '首',
		variantLabel: '',
		variants: [],
		english: 'head',
		meanings: ['head', 'first', 'chief']
	},
	{
		number: 186,
		pinyin: 'xiāng',
		radical: '香',
		variantLabel: '',
		variants: [],
		english: 'fragrant',
		meanings: ['fragrant', 'sweet-smelling', 'incense']
	},
	{
		number: 187,
		pinyin: 'mǎ',
		radical: '馬',
		variantLabel: '(马)',
		variants: ['马'],
		english: 'horse',
		meanings: ['horse']
	},
	{
		number: 188,
		pinyin: 'gǔ',
		radical: '骨',
		variantLabel: '',
		variants: [],
		english: 'bone',
		meanings: ['bone', 'skeleton', 'frame']
	},
	{
		number: 189,
		pinyin: 'gāo',
		radical: '高',
		variantLabel: '',
		variants: [],
		english: 'high',
		meanings: ['high', 'tall', 'lofty', 'elevated']
	},
	{
		number: 190,
		pinyin: 'biāo',
		radical: '髟',
		variantLabel: '',
		variants: [],
		english: 'long hair',
		meanings: ['long hair', 'hair']
	},
	{
		number: 191,
		pinyin: 'dòu',
		radical: '鬥',
		variantLabel: '(斗)',
		variants: ['斗'],
		english: 'fight',
		meanings: ['fight', 'struggle', 'contend']
	},
	{
		number: 192,
		pinyin: 'chàng',
		radical: '鬯',
		variantLabel: '',
		variants: [],
		english: 'sacrificial wine',
		meanings: ['sacrificial wine', 'unhindered']
	},
	{
		number: 193,
		pinyin: 'lì',
		radical: '鬲',
		variantLabel: '',
		variants: [],
		english: 'cauldron',
		meanings: ['cauldron', 'tripod cauldron']
	},
	{
		number: 194,
		pinyin: 'guǐ',
		radical: '鬼',
		variantLabel: '',
		variants: [],
		english: 'ghost',
		meanings: ['ghost', 'spirit of the dead', 'devil']
	},
	{
		number: 195,
		pinyin: 'yú',
		radical: '魚',
		variantLabel: '(鱼)',
		variants: ['鱼'],
		english: 'fish',
		meanings: ['fish']
	},
	{
		number: 196,
		pinyin: 'niǎo',
		radical: '鳥',
		variantLabel: '(鸟)',
		variants: ['鸟'],
		english: 'bird',
		meanings: ['bird', 'fowl']
	},
	{
		number: 197,
		pinyin: 'lǔ',
		radical: '鹵',
		variantLabel: '(卤)',
		variants: ['卤'],
		english: 'salty',
		meanings: ['salty', 'saline soil', 'rock salt']
	},
	{
		number: 198,
		pinyin: 'lù',
		radical: '鹿',
		variantLabel: '',
		variants: [],
		english: 'deer',
		meanings: ['deer']
	},
	{
		number: 199,
		pinyin: 'mài',
		radical: '麥',
		variantLabel: '(麦)',
		variants: ['麦'],
		english: 'wheat',
		meanings: ['wheat', 'barley', 'oats']
	},
	{
		number: 200,
		pinyin: 'má',
		radical: '麻',
		variantLabel: '',
		variants: [],
		english: 'hemp',
		meanings: ['hemp', 'jute', 'flax']
	},
	{
		number: 201,
		pinyin: 'huáng',
		radical: '黄',
		variantLabel: '',
		variants: [],
		english: 'yellow',
		meanings: ['yellow']
	},
	{
		number: 202,
		pinyin: 'shǔ',
		radical: '黍',
		variantLabel: '',
		variants: [],
		english: 'millet',
		meanings: ['millet', 'glutinous millet']
	},
	{
		number: 203,
		pinyin: 'hēi',
		radical: '黑',
		variantLabel: '',
		variants: [],
		english: 'black',
		meanings: ['black', 'dark', 'sinister']
	},
	{
		number: 204,
		pinyin: 'zhǐ',
		radical: '黹',
		variantLabel: '',
		variants: [],
		english: 'embroidery',
		meanings: ['embroidery', 'needlework']
	},
	{
		number: 205,
		pinyin: 'mǐn',
		radical: '黽',
		variantLabel: '(黾)',
		variants: ['黾'],
		english: 'frog',
		meanings: ['frog', 'toad', 'to strive']
	},
	{
		number: 206,
		pinyin: 'dǐng',
		radical: '鼎',
		variantLabel: '',
		variants: [],
		english: 'tripod',
		meanings: ['tripod', 'three-legged cauldron']
	},
	{
		number: 207,
		pinyin: 'gǔ',
		radical: '鼓',
		variantLabel: '',
		variants: [],
		english: 'drum',
		meanings: ['drum', 'beat', 'strike']
	},
	{
		number: 208,
		pinyin: 'shǔ',
		radical: '鼠',
		variantLabel: '',
		variants: [],
		english: 'rat',
		meanings: ['rat', 'mouse']
	},
	{
		number: 209,
		pinyin: 'bí',
		radical: '鼻',
		variantLabel: '',
		variants: [],
		english: 'nose',
		meanings: ['nose', 'first']
	},
	{
		number: 210,
		pinyin: 'qí',
		radical: '齊',
		variantLabel: '(齐)',
		variants: ['齐'],
		english: 'even',
		meanings: ['even', 'uniform', 'of equal length']
	},
	{
		number: 211,
		pinyin: 'chǐ',
		radical: '齒',
		variantLabel: '(齿)',
		variants: ['齿'],
		english: 'tooth',
		meanings: ['tooth', 'teeth', 'age']
	},
	{
		number: 212,
		pinyin: 'lóng',
		radical: '龍',
		variantLabel: '(龙)',
		variants: ['龙'],
		english: 'dragon',
		meanings: ['dragon']
	},
	{
		number: 213,
		pinyin: 'guī',
		radical: '龜',
		variantLabel: '(龟)',
		variants: ['龟'],
		english: 'turtle',
		meanings: ['turtle', 'tortoise']
	},
	{
		number: 214,
		pinyin: 'yuè',
		radical: '龠',
		variantLabel: '',
		variants: [],
		english: 'flute',
		meanings: ['flute', 'pipe', 'ancient measure']
	}
];

/** Every form of every radical (canonical + variants) mapped to its entry. */
export const radicalByForm: Map<string, Radical> = new Map();
for (const r of radicals) {
	radicalByForm.set(r.radical, r);
	for (const v of r.variants) {
		if (!radicalByForm.has(v)) radicalByForm.set(v, r);
	}
}
