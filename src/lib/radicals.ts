// The 214 Kangxi radicals. Generated from the original hand-written table in
// src/routes/+page.svelte; edit here and the table follows.

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
	english: string;
}

export const radicals: Radical[] = [
	{ number: 1, pinyin: 'yī', radical: '一', variantLabel: '', variants: [], english: 'one' },
	{ number: 2, pinyin: 'shù', radical: '丨', variantLabel: '', variants: [], english: 'line' },
	{ number: 3, pinyin: 'diǎn', radical: '丶', variantLabel: '', variants: [], english: 'dot' },
	{
		number: 4,
		pinyin: 'piě',
		radical: '丿',
		variantLabel: '乀 乁',
		variants: ['乀', '乁'],
		english: 'slash'
	},
	{
		number: 5,
		pinyin: 'yǐ',
		radical: '乙',
		variantLabel: '乚 乛',
		variants: ['乚', '乛'],
		english: 'second'
	},
	{ number: 6, pinyin: 'gōu', radical: '亅', variantLabel: '', variants: [], english: 'hook' },
	{ number: 7, pinyin: 'èr', radical: '二', variantLabel: '', variants: [], english: 'two' },
	{ number: 8, pinyin: 'tóu', radical: '亠', variantLabel: '', variants: [], english: 'lid' },
	{
		number: 9,
		pinyin: 'rén',
		radical: '人',
		variantLabel: '亻',
		variants: ['亻'],
		english: 'person'
	},
	{ number: 10, pinyin: 'ér', radical: '儿', variantLabel: '', variants: [], english: 'legs' },
	{ number: 11, pinyin: 'rù', radical: '入', variantLabel: '', variants: [], english: 'enter' },
	{
		number: 12,
		pinyin: 'bā',
		radical: '八',
		variantLabel: '丷',
		variants: ['丷'],
		english: 'eight'
	},
	{
		number: 13,
		pinyin: 'jiǒng',
		radical: '冂',
		variantLabel: '',
		variants: [],
		english: 'down box'
	},
	{ number: 14, pinyin: 'mì', radical: '冖', variantLabel: '', variants: [], english: 'cover' },
	{ number: 15, pinyin: 'bīng', radical: '冫', variantLabel: '', variants: [], english: 'ice' },
	{ number: 16, pinyin: 'jī, jǐ', radical: '几', variantLabel: '', variants: [], english: 'table' },
	{ number: 17, pinyin: 'qǔ', radical: '凵', variantLabel: '', variants: [], english: 'open box' },
	{
		number: 18,
		pinyin: 'dāo',
		radical: '刀',
		variantLabel: '刂',
		variants: ['刂'],
		english: 'knife'
	},
	{ number: 19, pinyin: 'lì', radical: '力', variantLabel: '', variants: [], english: 'power' },
	{ number: 20, pinyin: 'bāo', radical: '勹', variantLabel: '', variants: [], english: 'wrap' },
	{ number: 21, pinyin: 'bǐ', radical: '匕', variantLabel: '', variants: [], english: 'ladle' },
	{
		number: 22,
		pinyin: 'fāng',
		radical: '匚',
		variantLabel: '',
		variants: [],
		english: 'right open box'
	},
	{
		number: 23,
		pinyin: 'xǐ',
		radical: '匸',
		variantLabel: '',
		variants: [],
		english: 'hiding enclosure'
	},
	{ number: 24, pinyin: 'shí', radical: '十', variantLabel: '', variants: [], english: 'ten' },
	{
		number: 25,
		pinyin: 'bǔ',
		radical: '卜',
		variantLabel: '',
		variants: [],
		english: 'divination'
	},
	{ number: 26, pinyin: 'jié', radical: '卩', variantLabel: '', variants: [], english: 'seal' },
	{ number: 27, pinyin: 'hàn', radical: '厂', variantLabel: '', variants: [], english: 'cliff' },
	{ number: 28, pinyin: 'sī', radical: '厶', variantLabel: '', variants: [], english: 'private' },
	{ number: 29, pinyin: 'yòu', radical: '又', variantLabel: '', variants: [], english: 'again' },
	{ number: 30, pinyin: 'kǒu', radical: '口', variantLabel: '', variants: [], english: 'mouth' },
	{
		number: 31,
		pinyin: 'wéi',
		radical: '囗',
		variantLabel: '',
		variants: [],
		english: 'enclosure'
	},
	{ number: 32, pinyin: 'tǔ', radical: '土', variantLabel: '', variants: [], english: 'earth' },
	{ number: 33, pinyin: 'shì', radical: '士', variantLabel: '', variants: [], english: 'scholar' },
	{ number: 34, pinyin: 'zhī', radical: '夂', variantLabel: '', variants: [], english: 'go' },
	{
		number: 35,
		pinyin: 'suī',
		radical: '夊',
		variantLabel: '',
		variants: [],
		english: 'go slowly'
	},
	{ number: 36, pinyin: 'xī', radical: '夕', variantLabel: '', variants: [], english: 'night' },
	{ number: 37, pinyin: 'dà', radical: '大', variantLabel: '', variants: [], english: 'big' },
	{ number: 38, pinyin: 'nǚ', radical: '女', variantLabel: '', variants: [], english: 'woman' },
	{ number: 39, pinyin: 'zǐ', radical: '子', variantLabel: '', variants: [], english: 'child' },
	{ number: 40, pinyin: 'mián', radical: '宀', variantLabel: '', variants: [], english: 'roof' },
	{ number: 41, pinyin: 'cùn', radical: '寸', variantLabel: '', variants: [], english: 'inch' },
	{ number: 42, pinyin: 'xiǎo', radical: '小', variantLabel: '', variants: [], english: 'small' },
	{
		number: 43,
		pinyin: 'yóu',
		radical: '尢',
		variantLabel: '尣',
		variants: ['尣'],
		english: 'lame'
	},
	{ number: 44, pinyin: 'shī', radical: '尸', variantLabel: '', variants: [], english: 'corpse' },
	{ number: 45, pinyin: 'chè', radical: '屮', variantLabel: '', variants: [], english: 'sprout' },
	{
		number: 46,
		pinyin: 'shān',
		radical: '山',
		variantLabel: '',
		variants: [],
		english: 'mountain'
	},
	{
		number: 47,
		pinyin: 'chuān',
		radical: '川',
		variantLabel: '巛 巜',
		variants: ['巛', '巜'],
		english: 'river'
	},
	{ number: 48, pinyin: 'gōng', radical: '工', variantLabel: '', variants: [], english: 'work' },
	{ number: 49, pinyin: 'jǐ', radical: '己', variantLabel: '', variants: [], english: 'oneself' },
	{ number: 50, pinyin: 'jīn', radical: '巾', variantLabel: '', variants: [], english: 'towel' },
	{ number: 51, pinyin: 'gān', radical: '干', variantLabel: '', variants: [], english: 'dry' },
	{ number: 52, pinyin: 'yāo', radical: '幺', variantLabel: '', variants: [], english: 'thread' },
	{
		number: 53,
		pinyin: 'guǎng',
		radical: '广',
		variantLabel: '',
		variants: [],
		english: 'shelter'
	},
	{ number: 54, pinyin: 'yǐn', radical: '廴', variantLabel: '', variants: [], english: 'stride' },
	{
		number: 55,
		pinyin: 'gǒng',
		radical: '廾',
		variantLabel: '',
		variants: [],
		english: 'hands joined'
	},
	{
		number: 56,
		pinyin: 'yì',
		radical: '弋',
		variantLabel: '',
		variants: [],
		english: 'shoot with a bow'
	},
	{ number: 57, pinyin: 'gōng', radical: '弓', variantLabel: '', variants: [], english: 'bow' },
	{
		number: 58,
		pinyin: 'jì',
		radical: '彐',
		variantLabel: '彑',
		variants: ['彑'],
		english: 'snout'
	},
	{ number: 59, pinyin: 'shān', radical: '彡', variantLabel: '', variants: [], english: 'hair' },
	{ number: 60, pinyin: 'chì', radical: '彳', variantLabel: '', variants: [], english: 'step' },
	{
		number: 61,
		pinyin: 'xīn',
		radical: '心',
		variantLabel: '忄',
		variants: ['忄'],
		english: 'heart'
	},
	{ number: 62, pinyin: 'gē', radical: '戈', variantLabel: '', variants: [], english: 'spear' },
	{ number: 63, pinyin: 'hù', radical: '户', variantLabel: '', variants: [], english: 'door' },
	{
		number: 64,
		pinyin: 'shǒu',
		radical: '手',
		variantLabel: '扌',
		variants: ['扌'],
		english: 'hand'
	},
	{ number: 65, pinyin: 'zhī', radical: '支', variantLabel: '', variants: [], english: 'branch' },
	{ number: 66, pinyin: 'pū', radical: '攴', variantLabel: '攵', variants: ['攵'], english: 'rap' },
	{ number: 67, pinyin: 'wén', radical: '文', variantLabel: '', variants: [], english: 'script' },
	{ number: 68, pinyin: 'dǒu', radical: '斗', variantLabel: '', variants: [], english: 'dipper' },
	{ number: 69, pinyin: 'jīn', radical: '斤', variantLabel: '', variants: [], english: 'axe' },
	{ number: 70, pinyin: 'fāng', radical: '方', variantLabel: '', variants: [], english: 'square' },
	{ number: 71, pinyin: 'wú', radical: '无', variantLabel: '', variants: [], english: 'not' },
	{ number: 72, pinyin: 'rì', radical: '日', variantLabel: '', variants: [], english: 'sun' },
	{ number: 73, pinyin: 'yuē', radical: '曰', variantLabel: '', variants: [], english: 'say' },
	{ number: 74, pinyin: 'yuè', radical: '月', variantLabel: '', variants: [], english: 'moon' },
	{ number: 75, pinyin: 'mù', radical: '木', variantLabel: '', variants: [], english: 'tree' },
	{ number: 76, pinyin: 'qiàn', radical: '欠', variantLabel: '', variants: [], english: 'lack' },
	{ number: 77, pinyin: 'zhǐ', radical: '止', variantLabel: '', variants: [], english: 'stop' },
	{ number: 78, pinyin: 'dǎi', radical: '歹', variantLabel: '', variants: [], english: 'death' },
	{ number: 79, pinyin: 'shū', radical: '殳', variantLabel: '', variants: [], english: 'weapon' },
	{
		number: 80,
		pinyin: 'mǔ',
		radical: '毋',
		variantLabel: '母',
		variants: ['母'],
		english: 'mother'
	},
	{ number: 81, pinyin: 'bǐ', radical: '比', variantLabel: '', variants: [], english: 'compare' },
	{ number: 82, pinyin: 'máo', radical: '毛', variantLabel: '', variants: [], english: 'fur' },
	{ number: 83, pinyin: 'shì', radical: '氏', variantLabel: '', variants: [], english: 'clan' },
	{ number: 84, pinyin: 'qì', radical: '气', variantLabel: '', variants: [], english: 'steam' },
	{
		number: 85,
		pinyin: 'shuǐ',
		radical: '水',
		variantLabel: '氵',
		variants: ['氵'],
		english: 'water'
	},
	{
		number: 86,
		pinyin: 'huǒ',
		radical: '火',
		variantLabel: '灬',
		variants: ['灬'],
		english: 'fire'
	},
	{
		number: 87,
		pinyin: 'zhǎo',
		radical: '爪',
		variantLabel: '爫',
		variants: ['爫'],
		english: 'claw'
	},
	{ number: 88, pinyin: 'fù', radical: '父', variantLabel: '', variants: [], english: 'father' },
	{
		number: 89,
		pinyin: 'yáo',
		radical: '爻',
		variantLabel: '',
		variants: [],
		english: 'lines on a trigram'
	},
	{
		number: 90,
		pinyin: 'qiáng',
		radical: '爿',
		variantLabel: '',
		variants: [],
		english: 'half of a tree trunk'
	},
	{ number: 91, pinyin: 'piàn', radical: '片', variantLabel: '', variants: [], english: 'slice' },
	{ number: 92, pinyin: 'yá', radical: '牙', variantLabel: '', variants: [], english: 'tooth' },
	{
		number: 93,
		pinyin: 'niú',
		radical: '牛',
		variantLabel: '牜',
		variants: ['牜'],
		english: 'cow'
	},
	{
		number: 94,
		pinyin: 'quǎn',
		radical: '犬',
		variantLabel: '犭',
		variants: ['犭'],
		english: 'dog'
	},
	{
		number: 95,
		pinyin: 'xuán',
		radical: '玄',
		variantLabel: '',
		variants: [],
		english: 'profound'
	},
	{
		number: 96,
		pinyin: 'yù',
		radical: '玉',
		variantLabel: '王',
		variants: ['王'],
		english: 'jade'
	},
	{ number: 97, pinyin: 'guā', radical: '瓜', variantLabel: '', variants: [], english: 'melon' },
	{ number: 98, pinyin: 'wǎ', radical: '瓦', variantLabel: '', variants: [], english: 'tile' },
	{ number: 99, pinyin: 'gān', radical: '甘', variantLabel: '', variants: [], english: 'sweet' },
	{ number: 100, pinyin: 'shēng', radical: '生', variantLabel: '', variants: [], english: 'life' },
	{ number: 101, pinyin: 'yòng', radical: '用', variantLabel: '', variants: [], english: 'use' },
	{ number: 102, pinyin: 'tián', radical: '田', variantLabel: '', variants: [], english: 'field' },
	{ number: 103, pinyin: 'pǐ', radical: '疋', variantLabel: '', variants: [], english: 'cloth' },
	{ number: 104, pinyin: 'bìng', radical: '疒', variantLabel: '', variants: [], english: 'ill' },
	{
		number: 105,
		pinyin: 'bō',
		radical: '癶',
		variantLabel: '',
		variants: [],
		english: 'foot steps'
	},
	{ number: 106, pinyin: 'bái', radical: '白', variantLabel: '', variants: [], english: 'white' },
	{ number: 107, pinyin: 'pí', radical: '皮', variantLabel: '', variants: [], english: 'skin' },
	{ number: 108, pinyin: 'mǐn', radical: '皿', variantLabel: '', variants: [], english: 'dish' },
	{ number: 109, pinyin: 'mù', radical: '目', variantLabel: '', variants: [], english: 'eye' },
	{ number: 110, pinyin: 'máo', radical: '矛', variantLabel: '', variants: [], english: 'spear' },
	{ number: 111, pinyin: 'shǐ', radical: '矢', variantLabel: '', variants: [], english: 'arrow' },
	{ number: 112, pinyin: 'shí', radical: '石', variantLabel: '', variants: [], english: 'stone' },
	{
		number: 113,
		pinyin: 'shì',
		radical: '示',
		variantLabel: '礻',
		variants: ['礻'],
		english: 'spirit'
	},
	{ number: 114, pinyin: 'róu', radical: '禸', variantLabel: '', variants: [], english: 'track' },
	{ number: 115, pinyin: 'hé', radical: '禾', variantLabel: '', variants: [], english: 'grain' },
	{ number: 116, pinyin: 'xuè', radical: '穴', variantLabel: '', variants: [], english: 'cave' },
	{ number: 117, pinyin: 'lì', radical: '立', variantLabel: '', variants: [], english: 'stand' },
	{ number: 118, pinyin: 'zhú', radical: '竹', variantLabel: '', variants: [], english: 'bamboo' },
	{ number: 119, pinyin: 'mǐ', radical: '米', variantLabel: '', variants: [], english: 'rice' },
	{
		number: 120,
		pinyin: 'sī',
		radical: '糸',
		variantLabel: '(纟)',
		variants: ['纟'],
		english: 'silk'
	},
	{ number: 121, pinyin: 'fǒu', radical: '缶', variantLabel: '', variants: [], english: 'jar' },
	{
		number: 122,
		pinyin: 'wǎng',
		radical: '网',
		variantLabel: '罒',
		variants: ['罒'],
		english: 'net'
	},
	{ number: 123, pinyin: 'yáng', radical: '羊', variantLabel: '', variants: [], english: 'sheep' },
	{ number: 124, pinyin: 'yǔ', radical: '羽', variantLabel: '', variants: [], english: 'feather' },
	{ number: 125, pinyin: 'lǎo', radical: '老', variantLabel: '', variants: [], english: 'old' },
	{ number: 126, pinyin: 'ér', radical: '而', variantLabel: '', variants: [], english: 'and' },
	{ number: 127, pinyin: 'lěi', radical: '耒', variantLabel: '', variants: [], english: 'plow' },
	{ number: 128, pinyin: 'ěr', radical: '耳', variantLabel: '', variants: [], english: 'ear' },
	{ number: 129, pinyin: 'yù', radical: '聿', variantLabel: '', variants: [], english: 'brush' },
	{ number: 130, pinyin: 'ròu', radical: '肉', variantLabel: '', variants: [], english: 'meat' },
	{
		number: 131,
		pinyin: 'chén',
		radical: '臣',
		variantLabel: '',
		variants: [],
		english: 'minister'
	},
	{ number: 132, pinyin: 'zì', radical: '自', variantLabel: '', variants: [], english: 'oneself' },
	{ number: 133, pinyin: 'zhì', radical: '至', variantLabel: '', variants: [], english: 'arrive' },
	{ number: 134, pinyin: 'jiù', radical: '臼', variantLabel: '', variants: [], english: 'mortar' },
	{ number: 135, pinyin: 'shé', radical: '舌', variantLabel: '', variants: [], english: 'tongue' },
	{
		number: 136,
		pinyin: 'chuǎn',
		radical: '舛',
		variantLabel: '',
		variants: [],
		english: 'contrary'
	},
	{ number: 137, pinyin: 'zhōu', radical: '舟', variantLabel: '', variants: [], english: 'boat' },
	{
		number: 138,
		pinyin: 'gèn',
		radical: '艮',
		variantLabel: '',
		variants: [],
		english: 'mountain'
	},
	{ number: 139, pinyin: 'sè', radical: '色', variantLabel: '', variants: [], english: 'color' },
	{
		number: 140,
		pinyin: 'cǎo',
		radical: '艸',
		variantLabel: '(艹)',
		variants: ['艹'],
		english: 'grass'
	},
	{ number: 141, pinyin: 'hǔ', radical: '虍', variantLabel: '', variants: [], english: 'tiger' },
	{
		number: 142,
		pinyin: 'chóng',
		radical: '虫',
		variantLabel: '',
		variants: [],
		english: 'insect'
	},
	{ number: 143, pinyin: 'xuè', radical: '血', variantLabel: '', variants: [], english: 'blood' },
	{ number: 144, pinyin: 'xíng', radical: '行', variantLabel: '', variants: [], english: 'walk' },
	{
		number: 145,
		pinyin: 'yī',
		radical: '衣',
		variantLabel: '衤',
		variants: ['衤'],
		english: 'clothes'
	},
	{
		number: 146,
		pinyin: 'xī',
		radical: '西',
		variantLabel: '覀',
		variants: ['覀'],
		english: 'west'
	},
	{
		number: 147,
		pinyin: 'jiàn',
		radical: '見',
		variantLabel: '(见)',
		variants: ['见'],
		english: 'see'
	},
	{ number: 148, pinyin: 'jiǎo', radical: '角', variantLabel: '', variants: [], english: 'horn' },
	{
		number: 149,
		pinyin: 'yán',
		radical: '言',
		variantLabel: '(讠)',
		variants: ['讠'],
		english: 'speech'
	},
	{ number: 150, pinyin: 'gǔ', radical: '谷', variantLabel: '', variants: [], english: 'valley' },
	{ number: 151, pinyin: 'dòu', radical: '豆', variantLabel: '', variants: [], english: 'bean' },
	{ number: 152, pinyin: 'shǐ', radical: '豕', variantLabel: '', variants: [], english: 'pig' },
	{ number: 153, pinyin: 'zhì', radical: '豸', variantLabel: '', variants: [], english: 'badger' },
	{
		number: 154,
		pinyin: 'bèi',
		radical: '貝',
		variantLabel: '(贝)',
		variants: ['贝'],
		english: 'shell'
	},
	{ number: 155, pinyin: 'chì', radical: '赤', variantLabel: '', variants: [], english: 'red' },
	{ number: 156, pinyin: 'zǒu', radical: '走', variantLabel: '', variants: [], english: 'walk' },
	{ number: 157, pinyin: 'zú', radical: '足', variantLabel: '', variants: [], english: 'foot' },
	{ number: 158, pinyin: 'shēn', radical: '身', variantLabel: '', variants: [], english: 'body' },
	{
		number: 159,
		pinyin: 'chē',
		radical: '車',
		variantLabel: '(车)',
		variants: ['车'],
		english: 'cart'
	},
	{ number: 160, pinyin: 'xīn', radical: '辛', variantLabel: '', variants: [], english: 'bitter' },
	{
		number: 161,
		pinyin: 'chén',
		radical: '辰',
		variantLabel: '',
		variants: [],
		english: 'morning'
	},
	{ number: 162, pinyin: 'chuò', radical: '辶', variantLabel: '', variants: [], english: 'walk' },
	{
		number: 163,
		pinyin: 'yì',
		radical: '邑',
		variantLabel: '阝',
		variants: ['阝'],
		english: 'city'
	},
	{ number: 164, pinyin: 'yǒu', radical: '酉', variantLabel: '', variants: [], english: 'wine' },
	{
		number: 165,
		pinyin: 'biàn',
		radical: '釆',
		variantLabel: '',
		variants: [],
		english: 'distinguish'
	},
	{ number: 166, pinyin: 'lǐ', radical: '里', variantLabel: '', variants: [], english: 'village' },
	{
		number: 167,
		pinyin: 'jīn',
		radical: '金',
		variantLabel: '(钅)',
		variants: ['钅'],
		english: 'metal'
	},
	{
		number: 168,
		pinyin: 'cháng',
		radical: '長',
		variantLabel: '(长)',
		variants: ['长'],
		english: 'long'
	},
	{
		number: 169,
		pinyin: 'mén',
		radical: '門',
		variantLabel: '(门)',
		variants: ['门'],
		english: 'gate'
	},
	{
		number: 170,
		pinyin: 'fù',
		radical: '阜',
		variantLabel: '阝',
		variants: ['阝'],
		english: 'mound'
	},
	{ number: 171, pinyin: 'lì', radical: '隶', variantLabel: '', variants: [], english: 'slave' },
	{
		number: 172,
		pinyin: 'zhuī',
		radical: '隹',
		variantLabel: '',
		variants: [],
		english: 'short-tailed bird'
	},
	{ number: 173, pinyin: 'yǔ', radical: '雨', variantLabel: '', variants: [], english: 'rain' },
	{ number: 174, pinyin: 'qīng', radical: '青', variantLabel: '', variants: [], english: 'blue' },
	{ number: 175, pinyin: 'fēi', radical: '非', variantLabel: '', variants: [], english: 'wrong' },
	{ number: 176, pinyin: 'miàn', radical: '面', variantLabel: '', variants: [], english: 'face' },
	{ number: 177, pinyin: 'gé', radical: '革', variantLabel: '', variants: [], english: 'leather' },
	{
		number: 178,
		pinyin: 'wěi',
		radical: '韋',
		variantLabel: '(韦)',
		variants: ['韦'],
		english: 'soft leather'
	},
	{ number: 179, pinyin: 'jiǔ', radical: '韭', variantLabel: '', variants: [], english: 'leek' },
	{ number: 180, pinyin: 'yīn', radical: '音', variantLabel: '', variants: [], english: 'sound' },
	{
		number: 181,
		pinyin: 'yè',
		radical: '頁',
		variantLabel: '(页)',
		variants: ['页'],
		english: 'page'
	},
	{
		number: 182,
		pinyin: 'fēng',
		radical: '風',
		variantLabel: '(风)',
		variants: ['风'],
		english: 'wind'
	},
	{
		number: 183,
		pinyin: 'fēi',
		radical: '飛',
		variantLabel: '(飞)',
		variants: ['飞'],
		english: 'fly'
	},
	{
		number: 184,
		pinyin: 'shí',
		radical: '食',
		variantLabel: '飠 (饣)',
		variants: ['飠', '饣'],
		english: 'eat'
	},
	{ number: 185, pinyin: 'shǒu', radical: '首', variantLabel: '', variants: [], english: 'head' },
	{
		number: 186,
		pinyin: 'xiāng',
		radical: '香',
		variantLabel: '',
		variants: [],
		english: 'fragrant'
	},
	{
		number: 187,
		pinyin: 'mǎ',
		radical: '馬',
		variantLabel: '(马)',
		variants: ['马'],
		english: 'horse'
	},
	{ number: 188, pinyin: 'gǔ', radical: '骨', variantLabel: '', variants: [], english: 'bone' },
	{ number: 189, pinyin: 'gāo', radical: '高', variantLabel: '', variants: [], english: 'high' },
	{
		number: 190,
		pinyin: 'biāo',
		radical: '髟',
		variantLabel: '',
		variants: [],
		english: 'long hair'
	},
	{
		number: 191,
		pinyin: 'dòu',
		radical: '鬥',
		variantLabel: '(斗)',
		variants: ['斗'],
		english: 'fight'
	},
	{
		number: 192,
		pinyin: 'chàng',
		radical: '鬯',
		variantLabel: '',
		variants: [],
		english: 'sacrificial wine'
	},
	{ number: 193, pinyin: 'lì', radical: '鬲', variantLabel: '', variants: [], english: 'cauldron' },
	{ number: 194, pinyin: 'guǐ', radical: '鬼', variantLabel: '', variants: [], english: 'ghost' },
	{
		number: 195,
		pinyin: 'yú',
		radical: '魚',
		variantLabel: '(鱼)',
		variants: ['鱼'],
		english: 'fish'
	},
	{
		number: 196,
		pinyin: 'niǎo',
		radical: '鳥',
		variantLabel: '(鸟)',
		variants: ['鸟'],
		english: 'bird'
	},
	{
		number: 197,
		pinyin: 'lǔ',
		radical: '鹵',
		variantLabel: '(卤)',
		variants: ['卤'],
		english: 'salty'
	},
	{ number: 198, pinyin: 'lù', radical: '鹿', variantLabel: '', variants: [], english: 'deer' },
	{
		number: 199,
		pinyin: 'mài',
		radical: '麥',
		variantLabel: '(麦)',
		variants: ['麦'],
		english: 'wheat'
	},
	{ number: 200, pinyin: 'má', radical: '麻', variantLabel: '', variants: [], english: 'hemp' },
	{
		number: 201,
		pinyin: 'huáng',
		radical: '黄',
		variantLabel: '',
		variants: [],
		english: 'yellow'
	},
	{ number: 202, pinyin: 'shǔ', radical: '黍', variantLabel: '', variants: [], english: 'millet' },
	{ number: 203, pinyin: 'hēi', radical: '黑', variantLabel: '', variants: [], english: 'black' },
	{
		number: 204,
		pinyin: 'zhǐ',
		radical: '黹',
		variantLabel: '',
		variants: [],
		english: 'embroidery'
	},
	{
		number: 205,
		pinyin: 'mǐn',
		radical: '黽',
		variantLabel: '(黾)',
		variants: ['黾'],
		english: 'frog'
	},
	{ number: 206, pinyin: 'dǐng', radical: '鼎', variantLabel: '', variants: [], english: 'tripod' },
	{ number: 207, pinyin: 'gǔ', radical: '鼓', variantLabel: '', variants: [], english: 'drum' },
	{ number: 208, pinyin: 'shǔ', radical: '鼠', variantLabel: '', variants: [], english: 'rat' },
	{ number: 209, pinyin: 'bí', radical: '鼻', variantLabel: '', variants: [], english: 'nose' },
	{
		number: 210,
		pinyin: 'qí',
		radical: '齊',
		variantLabel: '(齐)',
		variants: ['齐'],
		english: 'even'
	},
	{
		number: 211,
		pinyin: 'chǐ',
		radical: '齒',
		variantLabel: '(齿)',
		variants: ['齿'],
		english: 'tooth'
	},
	{
		number: 212,
		pinyin: 'lóng',
		radical: '龍',
		variantLabel: '(龙)',
		variants: ['龙'],
		english: 'dragon'
	},
	{
		number: 213,
		pinyin: 'guī',
		radical: '龜',
		variantLabel: '(龟)',
		variants: ['龟'],
		english: 'turtle'
	},
	{ number: 214, pinyin: 'yuè', radical: '龠', variantLabel: '', variants: [], english: 'flute' }
];

/** Every form of every radical (canonical + variants) mapped to its entry. */
export const radicalByForm: Map<string, Radical> = new Map();
for (const r of radicals) {
	radicalByForm.set(r.radical, r);
	for (const v of r.variants) {
		if (!radicalByForm.has(v)) radicalByForm.set(v, r);
	}
}
