import type { Monster } from './monsters'

export type PsychTraitKey =
  | 'socialEnergy'
  | 'structure'
  | 'curiosity'
  | 'harmony'
  | 'emotionalReactivity'
  | 'assertiveness'
  | 'spontaneity'
  | 'rewardSensitivity'

export type PsychScores = Record<PsychTraitKey, number>

export type MonsterPsychProfile = {
  monsterId: Monster['id']
  /**
   * Internal target profile.
   *
   * Range:
   * -2 = very low
   * -1 = low
   *  0 = balanced
   *  1 = high
   *  2 = very high
   *
   * These values are not shown directly to users.
   * They are used only to make the diagnosis more coherent.
   */
  target: PsychScores
  userFacingPattern: string
}

export const psychTraitLabels: Record<PsychTraitKey, string> = {
  socialEnergy: '交流エネルギー',
  structure: '計画リズム',
  curiosity: '好奇心',
  harmony: '調和力',
  emotionalReactivity: '感情反応',
  assertiveness: '主張力',
  spontaneity: '勢い',
  rewardSensitivity: '反応感度',
}

export const initialPsychScores: PsychScores = {
  socialEnergy: 0,
  structure: 0,
  curiosity: 0,
  harmony: 0,
  emotionalReactivity: 0,
  assertiveness: 0,
  spontaneity: 0,
  rewardSensitivity: 0,
}

export const monsterPsychProfiles: MonsterPsychProfile[] = [
  {
    monsterId: 'sleep-slime',
    target: {
      socialEnergy: -1,
      structure: -1,
      curiosity: 0,
      harmony: 1,
      emotionalReactivity: 0,
      assertiveness: -1,
      spontaneity: -1,
      rewardSensitivity: 0,
    },
    userFacingPattern: '回復優先で、無理せずゆっくり動き出すタイプ',
  },
  {
    monsterId: 'approval-dragon',
    target: {
      socialEnergy: 1,
      structure: 0,
      curiosity: 1,
      harmony: 0,
      emotionalReactivity: 1,
      assertiveness: 1,
      spontaneity: 1,
      rewardSensitivity: 2,
    },
    userFacingPattern: '反応があるほど燃える、承認エネルギー高めタイプ',
  },
  {
    monsterId: 'late-reply-ghost',
    target: {
      socialEnergy: -1,
      structure: -1,
      curiosity: 0,
      harmony: 1,
      emotionalReactivity: 1,
      assertiveness: -1,
      spontaneity: -1,
      rewardSensitivity: 0,
    },
    userFacingPattern: '考えているうちに返信した気になる、慎重な保留タイプ',
  },
  {
    monsterId: 'student-phoenix',
    target: {
      socialEnergy: 0,
      structure: -2,
      curiosity: 1,
      harmony: 0,
      emotionalReactivity: 1,
      assertiveness: 1,
      spontaneity: 2,
      rewardSensitivity: 1,
    },
    userFacingPattern: '追い込まれると燃え上がる、短期集中タイプ',
  },
  {
    monsterId: 'love-unicorn',
    target: {
      socialEnergy: 0,
      structure: 0,
      curiosity: 1,
      harmony: 2,
      emotionalReactivity: 2,
      assertiveness: -1,
      spontaneity: -1,
      rewardSensitivity: 1,
    },
    userFacingPattern: '相手の言葉を大事に読む、繊細な深読みタイプ',
  },
  {
    monsterId: 'planning-chimera',
    target: {
      socialEnergy: 1,
      structure: 2,
      curiosity: 1,
      harmony: 0,
      emotionalReactivity: 1,
      assertiveness: 1,
      spontaneity: 0,
      rewardSensitivity: 1,
    },
    userFacingPattern: '予定を詰めて安心する、高密度スケジュールタイプ',
  },
  {
    monsterId: 'procrastinate-turtle',
    target: {
      socialEnergy: -1,
      structure: -2,
      curiosity: 0,
      harmony: 0,
      emotionalReactivity: 1,
      assertiveness: -1,
      spontaneity: -1,
      rewardSensitivity: -1,
    },
    userFacingPattern: 'やる気を温存しがちな、着手までが長いタイプ',
  },
  {
    monsterId: 'snack-goblin',
    target: {
      socialEnergy: 0,
      structure: -1,
      curiosity: 1,
      harmony: 0,
      emotionalReactivity: 0,
      assertiveness: 0,
      spontaneity: 2,
      rewardSensitivity: 1,
    },
    userFacingPattern: '目の前の楽しみに弱い、誘惑感度高めタイプ',
  },
  {
    monsterId: 'overthinking-hamster',
    target: {
      socialEnergy: -1,
      structure: 1,
      curiosity: 1,
      harmony: 1,
      emotionalReactivity: 2,
      assertiveness: -1,
      spontaneity: -2,
      rewardSensitivity: 1,
    },
    userFacingPattern: '考えてから動きたい、慎重な分析タイプ',
  },
  {
    monsterId: 'peace-angel',
    target: {
      socialEnergy: 0,
      structure: 0,
      curiosity: 0,
      harmony: 2,
      emotionalReactivity: 1,
      assertiveness: -1,
      spontaneity: 0,
      rewardSensitivity: 0,
    },
    userFacingPattern: '場の空気を守る、やさしい調整タイプ',
  },
  {
    monsterId: 'solo-wolf',
    target: {
      socialEnergy: -2,
      structure: 1,
      curiosity: 1,
      harmony: 0,
      emotionalReactivity: 0,
      assertiveness: 0,
      spontaneity: -1,
      rewardSensitivity: -1,
    },
    userFacingPattern: '一人時間で力を取り戻す、独立型タイプ',
  },
  {
    monsterId: 'chaos-basilisk',
    target: {
      socialEnergy: 1,
      structure: -2,
      curiosity: 2,
      harmony: -1,
      emotionalReactivity: 0,
      assertiveness: 2,
      spontaneity: 2,
      rewardSensitivity: 0,
    },
    userFacingPattern: '考える前に動く、突破力のある勢いタイプ',
  },
  {
    monsterId: 'morning-pegasus',
    target: {
      socialEnergy: 1,
      structure: 2,
      curiosity: 1,
      harmony: 0,
      emotionalReactivity: -1,
      assertiveness: 1,
      spontaneity: 0,
      rewardSensitivity: 1,
    },
    userFacingPattern: '早めに動いて流れを作る、前向き行動タイプ',
  },
  {
    monsterId: 'quick-reply-wyvern',
    target: {
      socialEnergy: 1,
      structure: 1,
      curiosity: 0,
      harmony: 0,
      emotionalReactivity: 0,
      assertiveness: 2,
      spontaneity: 1,
      rewardSensitivity: 1,
    },
    userFacingPattern: '反応が速く、物事を止めない即応タイプ',
  },
  {
    monsterId: 'ice-golem',
    target: {
      socialEnergy: -2,
      structure: 1,
      curiosity: -1,
      harmony: -1,
      emotionalReactivity: -2,
      assertiveness: 0,
      spontaneity: -2,
      rewardSensitivity: -2,
    },
    userFacingPattern: '感情を表に出しにくい、安定したクールタイプ',
  },
  {
    monsterId: 'noplan-jellyfish',
    target: {
      socialEnergy: 0,
      structure: -2,
      curiosity: 1,
      harmony: 1,
      emotionalReactivity: -1,
      assertiveness: -1,
      spontaneity: 1,
      rewardSensitivity: 0,
    },
    userFacingPattern: '流れに任せて進む、ゆるい適応タイプ',
  },
  {
    monsterId: 'perfect-plan-knight',
    target: {
      socialEnergy: 0,
      structure: 2,
      curiosity: 0,
      harmony: 0,
      emotionalReactivity: -1,
      assertiveness: 1,
      spontaneity: -2,
      rewardSensitivity: -1,
    },
    userFacingPattern: '段取りで安心を作る、堅実な管理タイプ',
  },
  {
    monsterId: 'party-ogre',
    target: {
      socialEnergy: 2,
      structure: -1,
      curiosity: 1,
      harmony: 0,
      emotionalReactivity: -1,
      assertiveness: 1,
      spontaneity: 2,
      rewardSensitivity: 1,
    },
    userFacingPattern: '人と場の熱量で動く、イベント駆動タイプ',
  },
]

export const monsterPsychProfileMap = Object.fromEntries(
  monsterPsychProfiles.map((profile) => [profile.monsterId, profile]),
) as Record<Monster['id'], MonsterPsychProfile>
