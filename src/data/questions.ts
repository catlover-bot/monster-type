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
    text: '休日の朝、最初にすることは？',
    answers: [
      { text: '予定を確認してすぐ動く', scores: { planning: 3, energy: 2 } },
      { text: 'スマホを見ながら二度寝する', scores: { sleepiness: 3, delay: 2 } },
      { text: '誰かから連絡が来てないか見る', scores: { social: 2, approval: 2 } },
      { text: 'その日の気分で決める', scores: { chaos: 3, energy: 1 } },
    ],
  },
  {
    id: 2,
    text: 'LINEやDMの返信スタイルは？',
    answers: [
      { text: '基本すぐ返す', scores: { replySpeed: 3, social: 2 } },
      { text: '返したつもりで忘れる', scores: { delay: 3, chaos: 2 } },
      { text: '内容を考えすぎて遅くなる', scores: { kindness: 2, romance: 2, delay: 1 } },
      { text: '寝てから返すことが多い', scores: { sleepiness: 3, delay: 2 } },
    ],
  },
  {
    id: 3,
    text: '褒められたときの反応は？',
    answers: [
      { text: 'かなり嬉しい。もっと頑張れる', scores: { approval: 3, energy: 2 } },
      { text: '照れるけど内心ずっと覚えてる', scores: { approval: 2, kindness: 2 } },
      { text: '普通に受け取る', scores: { planning: 1, replySpeed: 1 } },
      { text: '疑ってしまう', scores: { romance: 2, chaos: 1 } },
    ],
  },
  {
    id: 4,
    text: '締切がある作業、いつ始めがち？',
    answers: [
      { text: '早めに計画して進める', scores: { planning: 4 } },
      { text: '少し余裕を持って始める', scores: { planning: 2, kindness: 1 } },
      { text: 'ギリギリで覚醒する', scores: { delay: 3, energy: 3, chaos: 2 } },
      { text: '気づいたら締切当日', scores: { delay: 4, sleepiness: 2 } },
    ],
  },
  {
    id: 5,
    text: '友達との予定で多いのは？',
    answers: [
      { text: '自分が日程調整する', scores: { planning: 3, social: 2 } },
      { text: '誘われたら行く', scores: { social: 2, kindness: 2 } },
      { text: '行きたいけど直前で眠くなる', scores: { sleepiness: 3, delay: 1 } },
      { text: 'ノリで急に決まるのが好き', scores: { chaos: 3, energy: 2 } },
    ],
  },
  {
    id: 6,
    text: '気になる人から短い返信が来たら？',
    answers: [
      { text: '少し意味を考えてしまう', scores: { romance: 3, kindness: 1 } },
      { text: '気にせず普通に返す', scores: { replySpeed: 2, planning: 1 } },
      { text: '相手のテンションを分析する', scores: { romance: 3, approval: 1 } },
      { text: '返信を考えて寝る', scores: { sleepiness: 2, delay: 2, romance: 1 } },
    ],
  },
  {
    id: 7,
    text: 'グループでのあなたの立ち位置は？',
    answers: [
      { text: '話を回すことが多い', scores: { social: 3, energy: 2 } },
      { text: '聞き役になることが多い', scores: { kindness: 3 } },
      { text: '急に変なことを言う', scores: { chaos: 3, energy: 1 } },
      { text: '気づいたら眠そうにしている', scores: { sleepiness: 3 } },
    ],
  },
  {
    id: 8,
    text: 'スマホの通知が来たら？',
    answers: [
      { text: 'すぐ見る', scores: { replySpeed: 3, approval: 1 } },
      { text: '内容だけ見てあとで返す', scores: { delay: 2, planning: 1 } },
      { text: '誰からかで反応速度が変わる', scores: { romance: 2, social: 2 } },
      { text: '通知に気づかないことがある', scores: { sleepiness: 2, delay: 2 } },
    ],
  },
  {
    id: 9,
    text: '一番近い口ぐせは？',
    answers: [
      { text: 'なんとかなる', scores: { chaos: 2, energy: 2 } },
      { text: 'あとでやる', scores: { delay: 4 } },
      { text: '予定確認するね', scores: { planning: 4 } },
      { text: '眠い', scores: { sleepiness: 4 } },
    ],
  },
  {
    id: 10,
    text: '自分を一言で表すなら？',
    answers: [
      { text: '人といると元気になる', scores: { social: 3, approval: 2 } },
      { text: '好きなことには全力', scores: { energy: 3, romance: 1 } },
      { text: '優しいけど考えすぎる', scores: { kindness: 3, romance: 2 } },
      { text: 'ギリギリで生きている', scores: { delay: 3, chaos: 3 } },
    ],
  },
]
