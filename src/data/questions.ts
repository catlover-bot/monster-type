import type { TraitKey } from './monsters'

export type Answer = {
  text: string
  scores: Partial<Record<TraitKey, number>>
}

export type Question = {
  id: number
  text: string
  answers: Answer[]
}

export const questions: Question[] = [
  {
    id: 1,
    text: '休日の朝、目が覚めた。あなたの第一声は？',
    answers: [
      { text: 'よし、午前中に全部終わらせる', scores: { planning: 3, energy: 3, replySpeed: 1 } },
      { text: 'まだ朝という概念を認めていない', scores: { sleepiness: 4, delay: 2 } },
      { text: '通知きてるかな？', scores: { approval: 2, social: 2, replySpeed: 1 } },
      { text: '今日なにするか今から決める', scores: { chaos: 3, energy: 1 } },
    ],
  },
  {
    id: 2,
    text: '友達から「今から来ない？」と誘われたら？',
    answers: [
      { text: 'ノリで行く。準備は走りながらする', scores: { chaos: 4, energy: 3, social: 2 } },
      { text: '予定を確認してから判断する', scores: { planning: 3, replySpeed: 2 } },
      { text: '行きたいけど、まず布団と相談する', scores: { sleepiness: 3, delay: 2, kindness: 1 } },
      { text: 'メンバー次第でテンションが変わる', scores: { social: 2, romance: 2, approval: 1 } },
    ],
  },
  {
    id: 3,
    text: 'LINEやDMの返信、あなたに一番近いのは？',
    answers: [
      { text: '見た瞬間に返す。未返信があると落ち着かない', scores: { replySpeed: 4, planning: 2, social: 1 } },
      { text: '返す文章を考えていたら日付が変わる', scores: { delay: 3, kindness: 2, romance: 1 } },
      { text: '脳内ではもう返している', scores: { delay: 4, sleepiness: 1 } },
      { text: '相手によって返信速度が激変する', scores: { romance: 3, social: 2, approval: 1 } },
    ],
  },
  {
    id: 4,
    text: '褒められたとき、心の中では？',
    answers: [
      { text: 'HP全回復。もっと褒めてほしい', scores: { approval: 4, energy: 2, social: 1 } },
      { text: '照れるけど、あとで何回も思い出す', scores: { approval: 2, kindness: 2, romance: 1 } },
      { text: '普通にありがたく受け取る', scores: { planning: 1, replySpeed: 1, kindness: 1 } },
      { text: '本心かな？と少し考える', scores: { romance: 2, kindness: 2, chaos: 1 } },
    ],
  },
  {
    id: 5,
    text: '締切がある作業、いつ始めがち？',
    answers: [
      { text: '早めに計画して進める', scores: { planning: 4, replySpeed: 1 } },
      { text: '予定表には入れる。でも実行は別問題', scores: { planning: 2, delay: 2 } },
      { text: 'ギリギリで覚醒する', scores: { delay: 3, energy: 3, chaos: 2 } },
      { text: '気づいたら締切と目が合っている', scores: { delay: 4, sleepiness: 2, chaos: 1 } },
    ],
  },
  {
    id: 6,
    text: 'グループで遊ぶときのあなたは？',
    answers: [
      { text: '場を盛り上げる係になりがち', scores: { social: 4, energy: 3, approval: 1 } },
      { text: '調整役・予約役になりがち', scores: { planning: 4, replySpeed: 2, kindness: 1 } },
      { text: '聞き役で平和を守る', scores: { kindness: 4, social: 2 } },
      { text: '楽しいけど帰ったら一人で充電したい', scores: { kindness: 2, planning: 1, replySpeed: 1 } },
    ],
  },
  {
    id: 7,
    text: '気になる人から「笑」だけ返ってきた。どうする？',
    answers: [
      { text: '意味を考えて夜が終わる', scores: { romance: 4, kindness: 2 } },
      { text: '普通に次の話題を送る', scores: { replySpeed: 3, social: 2 } },
      { text: '一旦スクショして相談する', scores: { romance: 3, social: 2, approval: 1 } },
      { text: '考える前に寝る', scores: { sleepiness: 3, delay: 2 } },
    ],
  },
  {
    id: 8,
    text: 'コンビニに寄ったとき、ありがちな行動は？',
    answers: [
      { text: '買うものだけ買ってすぐ出る', scores: { planning: 3, replySpeed: 1 } },
      { text: '新商品を見つけてテンションが上がる', scores: { energy: 2, chaos: 2, approval: 1 } },
      { text: '深夜におやつを増やしてしまう', scores: { sleepiness: 2, chaos: 3, delay: 1 } },
      { text: '何を買うか迷って店内を一周する', scores: { kindness: 1, romance: 1, planning: 1 } },
    ],
  },
  {
    id: 9,
    text: '予定が急に変更されたら？',
    answers: [
      { text: '代替案をすぐ出す', scores: { planning: 4, replySpeed: 2 } },
      { text: 'まあ流れでなんとかなると思う', scores: { chaos: 4, energy: 1 } },
      { text: '内心ちょっと固まる', scores: { planning: 2, kindness: 2, romance: 1 } },
      { text: 'むしろ休めるなら嬉しい', scores: { sleepiness: 3, delay: 2 } },
    ],
  },
  {
    id: 10,
    text: 'SNSに投稿したあと、どれに近い？',
    answers: [
      { text: '反応をちょっと見に行く。ちょっとだけ', scores: { approval: 4, social: 1 } },
      { text: '投稿したことを忘れている', scores: { chaos: 2, delay: 2 } },
      { text: '文章変じゃなかったか見返す', scores: { kindness: 2, romance: 2, planning: 1 } },
      { text: 'そもそもあまり投稿しない', scores: { planning: 1, kindness: 1 } },
    ],
  },
  {
    id: 11,
    text: '朝型・夜型でいうと？',
    answers: [
      { text: '朝の自分が一番信用できる', scores: { energy: 3, planning: 3, replySpeed: 1 } },
      { text: '夜になるほど本気が出る', scores: { sleepiness: 2, chaos: 3, energy: 2 } },
      { text: 'どちらでもなく、常に眠い', scores: { sleepiness: 4, delay: 2 } },
      { text: '予定があれば起きる。なければ溶ける', scores: { planning: 2, sleepiness: 2, delay: 1 } },
    ],
  },
  {
    id: 12,
    text: 'みんなでご飯に行く店を決めるときは？',
    answers: [
      { text: '候補を出して投票まで進める', scores: { planning: 4, social: 2 } },
      { text: 'なんでもいいと言いながら実は希望がある', scores: { kindness: 2, romance: 1 } },
      { text: '直感で「ここ良さそう！」と決める', scores: { chaos: 3, energy: 2 } },
      { text: 'メニューが多すぎると考え込む', scores: { planning: 1, kindness: 2, romance: 1 } },
    ],
  },
  {
    id: 13,
    text: 'あなたのスマホ通知欄は？',
    answers: [
      { text: 'ほぼ即処理。未読は少ない', scores: { replySpeed: 4, planning: 2 } },
      { text: '未読と下書きが共存している', scores: { delay: 3, sleepiness: 1 } },
      { text: '通知を見るたび気分が左右される', scores: { approval: 2, romance: 2 } },
      { text: '通知を切って平和を守っている', scores: { kindness: 2, planning: 1 } },
    ],
  },
  {
    id: 14,
    text: '失敗したときのあなたは？',
    answers: [
      { text: '反省して次の計画を立てる', scores: { planning: 3, kindness: 1 } },
      { text: 'ネタにして笑いに変える', scores: { chaos: 4, social: 2, energy: 1 } },
      { text: 'しばらく脳内反省会をする', scores: { kindness: 3, romance: 2 } },
      { text: '寝て回復する', scores: { sleepiness: 3, delay: 1 } },
    ],
  },
  {
    id: 15,
    text: '一番近い口ぐせは？',
    answers: [
      { text: 'とりあえずやってみよう', scores: { chaos: 4, energy: 3 } },
      { text: '一回整理しよう', scores: { planning: 3, kindness: 2 } },
      { text: 'あとでやる', scores: { delay: 4, sleepiness: 1 } },
      { text: 'それ、どういう意味？', scores: { romance: 3, approval: 1, kindness: 1 } },
    ],
  },
]
