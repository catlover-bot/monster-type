export type TraitKey =
  | 'energy'
  | 'social'
  | 'sleepiness'
  | 'romance'
  | 'planning'
  | 'delay'
  | 'approval'
  | 'replySpeed'
  | 'chaos'
  | 'kindness'

export type Monster = {
  id: string
  name: string
  title: string
  rarity: 'Normal' | 'Rare' | 'Epic' | 'Legend'
  image: string
  description: string
  strength: string
  weakness: string
  catchphrase: string
  bestMatch: string
  evolution: string
  primaryTraits: TraitKey[]
}

export const monsters: Monster[] = [
  {
    id: 'sleep-slime',
    name: '寝落ちスライム',
    title: '布団に吸収されし者',
    rarity: 'Normal',
    image: '/monsters/sleep-slime.png',
    description: 'やる気はあるのに、気づいたら布団に吸収されているタイプ。返信も作業も「あとでやる」と思った瞬間に夢の中へ行きがち。',
    strength: '深夜の謎テンション',
    weakness: '横になれる場所',
    catchphrase: 'あと5分だけ……',
    bestMatch: '予定詰め込みキメラ',
    evolution: '3日連続で早寝に成功すると、快眠ドラゴンに進化するかも。',
    primaryTraits: ['sleepiness', 'delay'],
  },
  {
    id: 'approval-dragon',
    name: '承認欲求ドラゴン',
    title: 'いいねを食べて育つ竜',
    rarity: 'Epic',
    image: '/monsters/approval-dragon.png',
    description: '褒められると一気に強くなるタイプ。反応があると燃え上がり、無反応だと静かに灰になる。',
    strength: '人前での爆発力',
    weakness: '既読無視と無反応',
    catchphrase: 'で、どう思った？',
    bestMatch: '返信遅すぎゴースト',
    evolution: '自分で自分を褒められるようになると、自己肯定フェニックスに進化。',
    primaryTraits: ['approval', 'social'],
  },
  {
    id: 'late-reply-ghost',
    name: '返信遅すぎゴースト',
    title: '通知欄に住む幽霊',
    rarity: 'Rare',
    image: '/monsters/late-reply-ghost.png',
    description: '返信する気持ちはある。でも文章を考えているうちに時空を超えるタイプ。悪気はないが、気づけば3日経っている。',
    strength: '一人時間の回復力',
    weakness: '即レス文化',
    catchphrase: '返したつもりだった……',
    bestMatch: '承認欲求ドラゴン',
    evolution: '下書きを送信できるようになると、即レスウィザードに進化。',
    primaryTraits: ['delay', 'replySpeed'],
  },
  {
    id: 'student-phoenix',
    name: '限界フェニックス',
    title: '締切前日に蘇る鳥',
    rarity: 'Legend',
    image: '/monsters/student-phoenix.png',
    description: '普段はゆるいのに、追い込まれると急に覚醒するタイプ。燃え尽きても、締切が来るたびに何度でも蘇る。',
    strength: 'ラストスパート',
    weakness: '余裕のあるスケジュール',
    catchphrase: 'まだ間に合う。たぶん。',
    bestMatch: '何でも後回しタートル',
    evolution: '前日ではなく3日前に始められると、計画フェニックスに進化。',
    primaryTraits: ['energy', 'chaos', 'delay'],
  },
  {
    id: 'love-unicorn',
    name: '恋愛脳ユニコーン',
    title: '通知で心が揺れる幻獣',
    rarity: 'Epic',
    image: '/monsters/love-unicorn.png',
    description: '人の言葉や態度の裏側を読み取りがちなタイプ。小さな一言でテンションが上がったり下がったりする。',
    strength: '相手の変化に気づく力',
    weakness: '意味深なスタンプ',
    catchphrase: 'これってどういう意味？',
    bestMatch: '寝落ちスライム',
    evolution: '深読みをほどほどにできると、余裕ユニコーンに進化。',
    primaryTraits: ['romance', 'kindness'],
  },
  {
    id: 'planning-chimera',
    name: '予定詰め込みキメラ',
    title: 'カレンダーを埋める合成獣',
    rarity: 'Rare',
    image: '/monsters/planning-chimera.png',
    description: '予定を入れている時が一番元気なタイプ。気づけば休む時間まで予定にしてしまう。',
    strength: '行動力と調整力',
    weakness: '何もない休日',
    catchphrase: 'その日、夕方なら空いてる！',
    bestMatch: '寝落ちスライム',
    evolution: '休む予定を守れると、余白キメラに進化。',
    primaryTraits: ['planning', 'energy', 'social'],
  },
  {
    id: 'procrastinate-turtle',
    name: '何でも後回しタートル',
    title: '明日の自分を信じる亀',
    rarity: 'Normal',
    image: '/monsters/procrastinate-turtle.png',
    description: 'やるべきことは分かっている。でも今ではないと判断するタイプ。明日の自分への信頼が異常に高い。',
    strength: 'ギリギリでの集中力',
    weakness: '自由時間とスマホ',
    catchphrase: '明日やる。本当に。',
    bestMatch: '限界フェニックス',
    evolution: '5分だけ着手できるようになると、着手タートルに進化。',
    primaryTraits: ['delay', 'sleepiness'],
  },
]
