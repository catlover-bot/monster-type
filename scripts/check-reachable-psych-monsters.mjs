import { monsters } from '../src/data/monsters.ts'
import {
  initialPsychScores,
  monsterPsychProfileMap,
} from '../src/data/psychology.ts'
import { psychQuestions } from '../src/data/psychQuestions.ts'

const psychTraitKeys = [
  'socialEnergy',
  'structure',
  'curiosity',
  'harmony',
  'emotionalReactivity',
  'assertiveness',
  'spontaneity',
  'rewardSensitivity',
]

const BEAM_WIDTH = Number(process.env.BEAM_WIDTH ?? 12000)

const normalizePsychScore = (score) => {
  return Math.max(-2, Math.min(2, score / 3))
}

function chooseMonster(scores) {
  const normalizedScores = Object.fromEntries(
    psychTraitKeys.map((trait) => [trait, normalizePsychScore(scores[trait] ?? 0)]),
  )

  const ranked = monsters
    .map((monster) => {
      const profile = monsterPsychProfileMap[monster.id]

      if (!profile) {
        return { monster, distance: Number.POSITIVE_INFINITY }
      }

      const distance = psychTraitKeys.reduce((sum, trait) => {
        const diff = normalizedScores[trait] - profile.target[trait]
        return sum + diff * diff
      }, 0)

      return { monster, distance }
    })
    .sort((a, b) => a.distance - b.distance)

  return ranked[0].monster
}

function distanceToTarget(target, scores) {
  const profile = monsterPsychProfileMap[target.id]
  const normalizedScores = Object.fromEntries(
    psychTraitKeys.map((trait) => [trait, normalizePsychScore(scores[trait] ?? 0)]),
  )

  return psychTraitKeys.reduce((sum, trait) => {
    const diff = normalizedScores[trait] - profile.target[trait]
    return sum + diff * diff
  }, 0)
}

function addScores(scores, answerScores) {
  const next = { ...scores }

  for (const [trait, point] of Object.entries(answerScores)) {
    next[trait] = (next[trait] ?? 0) + (point ?? 0)
  }

  return next
}

function scoreKey(scores) {
  return psychTraitKeys.map((trait) => scores[trait] ?? 0).join(',')
}

function searchForTarget(target) {
  let beam = [
    {
      scores: { ...initialPsychScores },
      path: [],
      distance: distanceToTarget(target, initialPsychScores),
    },
  ]

  for (const question of psychQuestions) {
    const candidates = []

    for (const state of beam) {
      for (const answer of question.answers) {
        const nextScores = addScores(state.scores, answer.scores)
        candidates.push({
          scores: nextScores,
          path: [
            ...state.path,
            {
              question: question.text,
              answer: answer.text,
            },
          ],
          distance: distanceToTarget(target, nextScores),
        })
      }
    }

    candidates.sort((a, b) => a.distance - b.distance)

    const seen = new Set()
    const nextBeam = []

    for (const candidate of candidates) {
      const key = scoreKey(candidate.scores)
      if (seen.has(key)) continue

      seen.add(key)
      nextBeam.push(candidate)

      if (nextBeam.length >= BEAM_WIDTH) break
    }

    beam = nextBeam
  }

  for (const state of beam) {
    const winner = chooseMonster(state.scores)

    if (winner.id === target.id) {
      return {
        found: true,
        target,
        winner,
        distance: distanceToTarget(target, state.scores),
        scores: state.scores,
        path: state.path,
      }
    }
  }

  const best = beam[0]
  return {
    found: false,
    target,
    winner: chooseMonster(best.scores),
    distance: distanceToTarget(target, best.scores),
    scores: best.scores,
    path: best.path,
  }
}

console.log(`questions: ${psychQuestions.length}`)
console.log(`monsters: ${monsters.length}`)
console.log(`beam width: ${BEAM_WIDTH}`)
console.log('')

const results = monsters.map(searchForTarget)
const found = results.filter((result) => result.found)
const missing = results.filter((result) => !result.found)

console.log('=== reachable check ===')
for (const result of results) {
  const status = result.found ? 'OK ' : 'NG '
  console.log(
    `${status} ${result.target.id} / ${result.target.name} / winner: ${result.winner.name} / distance: ${result.distance.toFixed(3)}`,
  )
}

console.log('')
console.log(`appeared monsters: ${found.length}`)
console.log(`missing monsters: ${missing.length}`)

if (missing.length > 0) {
  console.log('')
  console.log('=== missing ===')
  for (const result of missing) {
    console.log(`NG ${result.target.id} / ${result.target.name} / closest winner: ${result.winner.name}`)
  }
}

console.log('')
console.log('=== sample paths ===')
for (const result of found) {
  console.log(`\n[${result.target.name}]`)
  result.path.forEach((step, index) => {
    console.log(`${index + 1}. ${step.answer}`)
  })
}
