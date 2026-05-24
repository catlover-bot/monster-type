import type { PsychTraitKey } from './psychology'

export type PsychAnswer = {
  text: string
  scores: Partial<Record<PsychTraitKey, number>>
}

export type PsychQuestion = {
  id: string
  text: string
  axis: PsychTraitKey
  answers: PsychAnswer[]
}

export const psychQuestions: PsychQuestion[] = [
  {
    id: 'social-1',
    axis: 'socialEnergy',
    text: '休日に予定が空いたとき、どの過ごし方が近い？',
    answers: [
      { text: '人と会う予定を入れたくなる', scores: { socialEnergy: 2 } },
      { text: '気分が乗れば誰かを誘う', scores: { socialEnergy: 1 } },
      { text: '基本は一人でゆっくりしたい', scores: { socialEnergy: -1 } },
      { text: 'できれば誰とも連絡せず静かに過ごしたい', scores: { socialEnergy: -2 } },
    ],
  },
  {
    id: 'social-2',
    axis: 'socialEnergy',
    text: '初対面の人が多い場に行くとき、あなたは？',
    answers: [
      { text: '新しい人と話すのが楽しみ', scores: { socialEnergy: 2, curiosity: 1 } },
      { text: '少し緊張するけど、話し始めれば楽しい', scores: { socialEnergy: 1 } },
      { text: 'できれば知っている人の近くにいたい', scores: { socialEnergy: -1, harmony: 1 } },
      { text: 'そもそも行く前からかなり消耗する', scores: { socialEnergy: -2 } },
    ],
  },
  {
    id: 'social-3',
    axis: 'socialEnergy',
    text: '楽しい集まりが終わったあと、どうなりやすい？',
    answers: [
      { text: 'まだ話したい。二次会も行ける', scores: { socialEnergy: 2, spontaneity: 1 } },
      { text: '楽しかったので気分が上がっている', scores: { socialEnergy: 1 } },
      { text: '楽しかったけど、一人で回復したい', scores: { socialEnergy: -1 } },
      { text: '帰宅後は完全に無言モードになる', scores: { socialEnergy: -2, rewardSensitivity: -1 } },
    ],
  },

  {
    id: 'structure-1',
    axis: 'structure',
    text: '締切がある作業を始めるタイミングは？',
    answers: [
      { text: '早めに分解して計画的に進める', scores: { structure: 2 } },
      { text: 'だいたいの予定を決めてから始める', scores: { structure: 1 } },
      { text: '気にはしているが、始めるまで時間がかかる', scores: { structure: -1, emotionalReactivity: 1 } },
      { text: '締切が近づいてから一気に燃える', scores: { structure: -2, spontaneity: 2 } },
    ],
  },
  {
    id: 'structure-2',
    axis: 'structure',
    text: '旅行や遊びの予定を決めるとき、近いのは？',
    answers: [
      { text: '時間・場所・移動手段まで決めたい', scores: { structure: 2, assertiveness: 1 } },
      { text: '大枠だけ決まっていれば安心する', scores: { structure: 1 } },
      { text: 'その場の流れで決める方が楽しい', scores: { structure: -1, spontaneity: 1 } },
      { text: '集合してから考えればいいと思う', scores: { structure: -2, spontaneity: 1 } },
    ],
  },
  {
    id: 'structure-3',
    axis: 'structure',
    text: '部屋や作業環境について、あなたは？',
    answers: [
      { text: '整理されていないと集中しづらい', scores: { structure: 2 } },
      { text: '大事なものの場所はだいたい決めている', scores: { structure: 1 } },
      { text: '多少散らかっていても気にならない', scores: { structure: -1 } },
      { text: '必要なものは毎回発掘している', scores: { structure: -2, spontaneity: 1 } },
    ],
  },

  {
    id: 'curiosity-1',
    axis: 'curiosity',
    text: '知らないジャンルの話題に出会ったとき、どう感じる？',
    answers: [
      { text: '面白そう。すぐ調べたくなる', scores: { curiosity: 2 } },
      { text: '少しなら知ってみたい', scores: { curiosity: 1 } },
      { text: '必要があれば調べる', scores: { curiosity: -1, structure: 1 } },
      { text: '自分に関係なければあまり興味が出ない', scores: { curiosity: -2 } },
    ],
  },
  {
    id: 'curiosity-2',
    axis: 'curiosity',
    text: 'いつもの店に新メニューが出ていたら？',
    answers: [
      { text: '迷わず新メニューを試す', scores: { curiosity: 2, spontaneity: 1 } },
      { text: '気になったら試す', scores: { curiosity: 1 } },
      { text: '失敗したくないので定番を選びがち', scores: { curiosity: -1, emotionalReactivity: 1 } },
      { text: 'いつもの安心感を最優先する', scores: { curiosity: -2, structure: 1 } },
    ],
  },
  {
    id: 'curiosity-3',
    axis: 'curiosity',
    text: '新しいアプリやサービスを見つけたとき、近いのは？',
    answers: [
      { text: 'とりあえず触ってみる', scores: { curiosity: 2, spontaneity: 1 } },
      { text: '評判を少し見てから試す', scores: { curiosity: 1, structure: 1 } },
      { text: '必要になったら使う', scores: { curiosity: -1 } },
      { text: '今のやり方を変えるのは少し面倒', scores: { curiosity: -2, structure: 1 } },
    ],
  },

  {
    id: 'harmony-1',
    axis: 'harmony',
    text: 'グループで意見が割れたとき、あなたは？',
    answers: [
      { text: '全員が納得できる落とし所を探す', scores: { harmony: 2 } },
      { text: '相手の意見を聞いてから自分の考えを言う', scores: { harmony: 1, assertiveness: 1 } },
      { text: '自分の意見が通るならそれでよい', scores: { harmony: -1, assertiveness: 1 } },
      { text: '遠慮せず、正しいと思う方を強く押す', scores: { harmony: -2, assertiveness: 2 } },
    ],
  },
  {
    id: 'harmony-2',
    axis: 'harmony',
    text: '友達が落ち込んでいるとき、まず何をしやすい？',
    answers: [
      { text: '話を聞いて、気持ちを受け止める', scores: { harmony: 2 } },
      { text: '相手が話したそうなら聞く', scores: { harmony: 1 } },
      { text: '解決策を考えて提案する', scores: { harmony: -1, structure: 1 } },
      { text: '必要以上に踏み込まない', scores: { harmony: -2, socialEnergy: -1 } },
    ],
  },
  {
    id: 'harmony-3',
    axis: 'harmony',
    text: '頼まれごとをされたとき、あなたは？',
    answers: [
      { text: 'できるだけ力になりたい', scores: { harmony: 2 } },
      { text: '無理のない範囲なら引き受ける', scores: { harmony: 1, structure: 1 } },
      { text: '自分の予定を優先して判断する', scores: { harmony: -1, assertiveness: 1 } },
      { text: '負担ならはっきり断る', scores: { harmony: -2, assertiveness: 2 } },
    ],
  },

  {
    id: 'emotion-1',
    axis: 'emotionalReactivity',
    text: '送ったメッセージに返信が遅いとき、どうなりやすい？',
    answers: [
      { text: '何か変なことを言ったか何度も考える', scores: { emotionalReactivity: 2, rewardSensitivity: 1 } },
      { text: '少し気になるが、時間が経てば落ち着く', scores: { emotionalReactivity: 1 } },
      { text: '忙しいのだろうと思う', scores: { emotionalReactivity: -1 } },
      { text: 'ほぼ気にしない', scores: { emotionalReactivity: -2, rewardSensitivity: -1 } },
    ],
  },
  {
    id: 'emotion-2',
    axis: 'emotionalReactivity',
    text: '小さな失敗をしたあと、近いのは？',
    answers: [
      { text: 'しばらく頭の中で反省会が続く', scores: { emotionalReactivity: 2 } },
      { text: '少し引きずるが、次に活かそうと思う', scores: { emotionalReactivity: 1, structure: 1 } },
      { text: 'まあ仕方ないと切り替える', scores: { emotionalReactivity: -1 } },
      { text: 'すぐ忘れる。次に行く', scores: { emotionalReactivity: -2, spontaneity: 1 } },
    ],
  },
  {
    id: 'emotion-3',
    axis: 'emotionalReactivity',
    text: '予定外の変更が起きたとき、あなたは？',
    answers: [
      { text: '内心かなり揺れる', scores: { emotionalReactivity: 2, structure: 1 } },
      { text: '少し戸惑うが、立て直す', scores: { emotionalReactivity: 1, structure: 1 } },
      { text: 'まあそういうこともあると思う', scores: { emotionalReactivity: -1 } },
      { text: 'むしろ変化がある方が面白い', scores: { emotionalReactivity: -2, curiosity: 1, spontaneity: 1 } },
    ],
  },

  {
    id: 'assert-1',
    axis: 'assertiveness',
    text: '行きたい店を聞かれたとき、あなたは？',
    answers: [
      { text: 'ここがいい、と自分の希望を言える', scores: { assertiveness: 2 } },
      { text: '候補をいくつか出せる', scores: { assertiveness: 1, structure: 1 } },
      { text: '相手の希望を先に聞きたい', scores: { assertiveness: -1, harmony: 1 } },
      { text: 'なんでもいいと言いがち', scores: { assertiveness: -2, harmony: 1 } },
    ],
  },
  {
    id: 'assert-2',
    axis: 'assertiveness',
    text: '自分の考えが少数派だったとき、どうする？',
    answers: [
      { text: '理由を説明して、きちんと伝える', scores: { assertiveness: 2, structure: 1 } },
      { text: '言えるタイミングがあれば伝える', scores: { assertiveness: 1 } },
      { text: '空気を見て、言うか迷う', scores: { assertiveness: -1, emotionalReactivity: 1 } },
      { text: '波風を立てたくないので飲み込む', scores: { assertiveness: -2, harmony: 1 } },
    ],
  },
  {
    id: 'assert-3',
    axis: 'assertiveness',
    text: '納得できない頼まれ方をしたとき、近いのは？',
    answers: [
      { text: 'できない理由をはっきり伝える', scores: { assertiveness: 2 } },
      { text: '条件を調整して引き受ける', scores: { assertiveness: 1, harmony: 1 } },
      { text: '迷いながらも引き受けてしまう', scores: { assertiveness: -1, harmony: 1 } },
      { text: '断れずに抱え込みがち', scores: { assertiveness: -2, emotionalReactivity: 1 } },
    ],
  },

  {
    id: 'spontaneity-1',
    axis: 'spontaneity',
    text: '急に面白そうな誘いが来たら？',
    answers: [
      { text: '予定を調整してでも行きたい', scores: { spontaneity: 2, socialEnergy: 1 } },
      { text: '楽しそうなら行く', scores: { spontaneity: 1 } },
      { text: '少し考えてから決めたい', scores: { spontaneity: -1, structure: 1 } },
      { text: '急な予定変更はかなり苦手', scores: { spontaneity: -2, emotionalReactivity: 1 } },
    ],
  },
  {
    id: 'spontaneity-2',
    axis: 'spontaneity',
    text: '買い物中に予定外の欲しいものを見つけたら？',
    answers: [
      { text: '欲しいと思ったらすぐ買う', scores: { spontaneity: 2, rewardSensitivity: 1 } },
      { text: '少し迷って、気分で買う', scores: { spontaneity: 1 } },
      { text: '一度持ち帰って考える', scores: { spontaneity: -1, structure: 1 } },
      { text: '基本的に予定外の買い物はしない', scores: { spontaneity: -2, structure: 1 } },
    ],
  },
  {
    id: 'spontaneity-3',
    axis: 'spontaneity',
    text: '何かを始めるとき、あなたは？',
    answers: [
      { text: 'まず動いて、走りながら考える', scores: { spontaneity: 2, assertiveness: 1 } },
      { text: 'ざっくり分かれば始められる', scores: { spontaneity: 1 } },
      { text: 'ある程度調べてから始めたい', scores: { spontaneity: -1, structure: 1 } },
      { text: '準備が整うまでなかなか動けない', scores: { spontaneity: -2, emotionalReactivity: 1 } },
    ],
  },

  {
    id: 'reward-1',
    axis: 'rewardSensitivity',
    text: 'SNSに投稿したあと、あなたは？',
    answers: [
      { text: '反応がかなり気になる', scores: { rewardSensitivity: 2, emotionalReactivity: 1 } },
      { text: '少しは反応を見に行く', scores: { rewardSensitivity: 1 } },
      { text: '気づいたときに見るくらい', scores: { rewardSensitivity: -1 } },
      { text: '投稿したことを忘れることもある', scores: { rewardSensitivity: -2 } },
    ],
  },
  {
    id: 'reward-2',
    axis: 'rewardSensitivity',
    text: '褒められたとき、あなたの反応は？',
    answers: [
      { text: 'かなり嬉しい。しばらく元気になる', scores: { rewardSensitivity: 2 } },
      { text: '素直に嬉しい', scores: { rewardSensitivity: 1 } },
      { text: 'ありがたいが、そこまで引きずらない', scores: { rewardSensitivity: -1 } },
      { text: '反応に困って少し距離を取る', scores: { rewardSensitivity: -2, emotionalReactivity: 1 } },
    ],
  },
  {
    id: 'reward-3',
    axis: 'rewardSensitivity',
    text: '通知がたくさん来ているとき、近いのは？',
    answers: [
      { text: 'すぐ見たい。気になって仕方ない', scores: { rewardSensitivity: 2, socialEnergy: 1 } },
      { text: '時間があれば確認する', scores: { rewardSensitivity: 1 } },
      { text: '必要そうなものだけ見る', scores: { rewardSensitivity: -1, structure: 1 } },
      { text: '通知は少ない方が落ち着く', scores: { rewardSensitivity: -2, socialEnergy: -1 } },
    ],
  },
]
