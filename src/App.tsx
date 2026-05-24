import { useMemo, useState } from 'react'
import './App.css'
import { monsters, type Monster } from './data/monsters'
import { monsterProfiles } from './data/monsterProfiles'
import { evolutionQuests } from './data/evolutionQuests'
import {
  initialPsychScores,
  monsterPsychProfileMap,
  type PsychScores,
  type PsychTraitKey,
} from './data/psychology'
import { psychQuestions as questions, type PsychAnswer } from './data/psychQuestions'

type GameState = 'home' | 'quiz' | 'result' | 'detail'

type Scores = PsychScores

const psychTraitKeys: PsychTraitKey[] = [
  'socialEnergy',
  'structure',
  'curiosity',
  'harmony',
  'emotionalReactivity',
  'assertiveness',
  'spontaneity',
  'rewardSensitivity',
]

const normalizePsychScore = (score: number) => {
  return Math.max(-2, Math.min(2, score / 3))
}

const rarityLabel: Record<Monster['rarity'], string> = {
  Normal: 'ノーマル',
  Rare: 'レア',
  Epic: 'エピック',
  Legend: 'レジェンド',
}


function getSharedMonsterFromUrl(): Monster | null {
  if (typeof window === 'undefined') {
    return null
  }

  const monsterId = new URLSearchParams(window.location.search).get('monster')

  if (!monsterId) {
    return null
  }

  return monsters.find((monster) => monster.id === monsterId) ?? null
}

function chooseMonster(scores: Scores): Monster {
  const normalizedScores = Object.fromEntries(
    psychTraitKeys.map((trait) => [trait, normalizePsychScore(scores[trait])]),
  ) as Scores

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

function MonsterImage({ monster }: { monster: Monster }) {
  return (
    <div className="monsterVisual">
      <img
        src={monster.image}
        alt={monster.name}
        onError={(event) => {
          event.currentTarget.style.display = 'none'
        }}
      />
      <span className="monsterFallback">👾</span>
    </div>
  )
}

function App() {
  const [sharedMonster, setSharedMonster] = useState<Monster | null>(() => getSharedMonsterFromUrl())
  const [gameState, setGameState] = useState<GameState>(() => (
    getSharedMonsterFromUrl() ? 'result' : 'home'
  ))
  const [questionIndex, setQuestionIndex] = useState(0)
  const [scores, setScores] = useState<Scores>(initialPsychScores)

  const currentQuestion = questions[questionIndex]

  const computedMonster = useMemo(() => {
    return chooseMonster(scores)
  }, [scores])

  const resultMonster = sharedMonster ?? computedMonster

  const resultProfile = monsterProfiles[resultMonster.id]
  const evolutionQuest = evolutionQuests[resultMonster.id]

  const progress = gameState === 'quiz'
    ? Math.round(((questionIndex + 1) / questions.length) * 100)
    : 0

  const startQuiz = () => {
    setSharedMonster(null)
    setScores(initialPsychScores)
    setQuestionIndex(0)

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname)
    }

    setGameState('quiz')
  }

  const selectAnswer = (answer: PsychAnswer) => {
    const nextScores = { ...scores }

    for (const [trait, point] of Object.entries(answer.scores)) {
      const key = trait as PsychTraitKey
      nextScores[key] += point ?? 0
    }

    setScores(nextScores)

    if (questionIndex + 1 >= questions.length) {
      setSharedMonster(null)
      setGameState('result')
      return
    }

    setQuestionIndex((current) => current + 1)
  }

  const siteUrl = 'https://monster-type.dimension0122.workers.dev/'
  const shareUrl = `${siteUrl}?monster=${resultMonster.id}`

  const shareText = `私のモンスタータイプは「${resultMonster.name}」でした！\n${resultMonster.title}\n${resultProfile?.shortSummary ?? resultMonster.description}\n#モンスター性格診断 #MonsterType`

  const copyShareText = async () => {
    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    alert('診断結果とURLをコピーしました！')
  }

  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'モンスター性格診断',
          text: shareText,
          url: shareUrl,
        })
        return
      } catch (error) {
        const errorName = error instanceof DOMException ? error.name : ''
        if (errorName === 'AbortError') {
          return
        }
      }
    }

    await copyShareText()
  }

  const shareToX = () => {
    const params = new URLSearchParams({
      text: shareText,
      url: shareUrl,
    })

    window.open(`https://twitter.com/intent/tweet?${params.toString()}`, '_blank', 'noopener,noreferrer')
  }

  const shareToLine = () => {
    const params = new URLSearchParams({
      url: shareUrl,
      text: shareText,
    })

    window.open(`https://social-plugins.line.me/lineit/share?${params.toString()}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="app">
      {gameState === 'home' && (
        <section className="hero">
          <div className="badge">MONSTER TYPE</div>

          <h1>
            無料のモンスター性格診断
            <br />
            {questions.length}問で、あなたの中のモンスターを召喚。
          </h1>

          <p className="lead">
            性格・行動パターン・日常のクセから、あなたにぴったりの
            モンスタータイプを診断するWebゲームです。
          </p>

          <button className="startButton" onClick={startQuiz}>
            診断をはじめる
          </button>

          <p className="note">
            例：布団吸着ねむりん / 即レス圧つよワイバーン / 締切前夜フェニックス
          </p>

          <section className="seoIntro" aria-label="モンスター性格診断の説明">
            <div className="seoBlock">
              <h2>モンスター性格診断とは？</h2>
              <p>
                モンスター性格診断は、15問の質問に答えるだけで、あなたの性格・行動パターン・日常のクセを
                モンスタータイプとして召喚する無料のWeb診断ゲームです。MBTI風のカジュアルな性格診断として、
                友達と結果を見せ合ったり、SNSでシェアしたりして楽しめます。
              </p>
            </div>

            <div className="seoBlock">
              <h2>どんな人におすすめ？</h2>
              <p>
                自分の性格を楽しく知りたい人、友達との話題になる診断を探している人、かわいいモンスターや
                レア度・属性・相性つきの診断ゲームが好きな人におすすめです。
              </p>
            </div>

            <div className="seoBlock">
              <h2>診断結果で分かること</h2>
              <p>
                診断結果では、あなたに合うモンスター、属性タイプ、レア度、強み、弱み、相性の良いタイプ、
                進化クエストを表示します。結果は何度でも診断でき、シェアして楽しめます。
              </p>
            </div>
          </section>
        </section>
      )}

      {gameState === 'quiz' && currentQuestion && (
        <section className="quizCard">
          <div className="quizTop">
            <span>Q{questionIndex + 1} / {questions.length}</span>
            <span>{progress}%</span>
          </div>

          <div className="progressBar">
            <div className="progressFill" style={{ width: `${progress}%` }} />
          </div>

          <h2>{currentQuestion.text}</h2>

          <div className="answers">
            {currentQuestion.answers.map((answer) => (
              <button
                className="answerButton"
                key={answer.text}
                onClick={() => selectAnswer(answer)}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </section>
      )}

      {gameState === 'result' && (
        <section className="resultCard">
          <div className="badge">SUMMON COMPLETE</div>

          {sharedMonster && (
            <section className="sharedResultNotice">
              <span>共有された診断結果</span>
              <p>
                このリンクは「{resultMonster.name}」の診断結果ページです。
                あなたも診断すると、自分のモンスタータイプを召喚できます。
              </p>
              <button className="miniButton" onClick={startQuiz}>
                自分も診断してみる
              </button>
            </section>
          )}

          <p className="resultLabel">あなたの中のモンスターは...</p>

          <MonsterImage monster={resultMonster} />

          <h1 className="monsterName">{resultMonster.name}</h1>
          <p className="monsterTitle">{resultMonster.title}</p>

          <div className="resultBadges">
            <div className="rarity">
              レア度：{rarityLabel[resultMonster.rarity]}
            </div>
            <div className="elementBadge">
              <span>{resultMonster.elementEmoji}</span>
              {resultMonster.element}
            </div>
          </div>

          <section className="humanTypeCard">
            <span>このモンスターはどんな人？</span>
            <h2>{resultProfile?.humanType}</h2>
            <p>{resultProfile?.shortSummary}</p>
            <button className="detailButton" onClick={() => setGameState('detail')}>
              詳細を見る
            </button>
          </section>

          <div className="elementCard">
            <span>属性タイプ</span>
            <strong>{resultMonster.elementEmoji} {resultMonster.element}</strong>
            <p>{resultMonster.elementDescription}</p>
          </div>

          <p className="description">{resultMonster.description}</p>

          <div className="monsterInfoGrid">
            <div>
              <span>強み</span>
              <strong>{resultMonster.strength}</strong>
            </div>
            <div>
              <span>弱点</span>
              <strong>{resultMonster.weakness}</strong>
            </div>
            <div>
              <span>口ぐせ</span>
              <strong>{resultMonster.catchphrase}</strong>
            </div>
            <div>
              <span>相性最高</span>
              <strong>{resultMonster.bestMatch}</strong>
            </div>
          </div>

          <div className="compatibility">
            <h2>モンスター相性</h2>

            <div className="compatibilityGrid">
              <div className="compatibilityCard good">
                <span>相性よし</span>
                <strong>{resultMonster.goodMatches.join(' / ')}</strong>
              </div>

              <div className="compatibilityCard tricky">
                <span>すれ違いがち</span>
                <strong>{resultMonster.trickyMatches.join(' / ')}</strong>
              </div>

              <div className="compatibilityCard rival">
                <span>ライバル</span>
                <strong>{resultMonster.rival}</strong>
              </div>
            </div>
          </div>

          <section className="evolutionQuestCard">
            <span>進化クエスト</span>
            <h2>{evolutionQuest?.questTitle ?? '進化条件'}</h2>
            <div className="evolutionRoute">
              <strong>{resultMonster.name}</strong>
              <span>→</span>
              <strong>{evolutionQuest?.evolvedName ?? '進化後の姿'}</strong>
            </div>
            <p>{evolutionQuest?.condition ?? resultMonster.evolution}</p>
            {evolutionQuest && (
              <div className="questMeta">
                <div>
                  <span>今日の小クエスト</span>
                  <strong>{evolutionQuest.dailyQuest}</strong>
                </div>
                <div>
                  <span>報酬</span>
                  <strong>{evolutionQuest.reward}</strong>
                </div>
                <div>
                  <span>難易度</span>
                  <strong>{evolutionQuest.difficulty}</strong>
                </div>
              </div>
            )}
          </section>

          <div className="actions shareActions">
            <button className="startButton" onClick={shareResult}>
              結果をシェア
            </button>
            <button className="subButton" onClick={shareToX}>
              Xでシェア
            </button>
            <button className="subButton" onClick={shareToLine}>
              LINEで送る
            </button>
            <button className="subButton" onClick={startQuiz}>
              もう一度診断する
            </button>
          </div>
        </section>
      )}

      {gameState === 'detail' && (
        <section className="detailCard">
          <button className="backButton" onClick={() => setGameState('result')}>
            ← 結果に戻る
          </button>

          <div className="badge">MONSTER REPORT</div>

          <MonsterImage monster={resultMonster} />

          <h1 className="monsterName">{resultMonster.name}</h1>
          <p className="monsterTitle">{resultMonster.title}</p>

          <div className="resultBadges">
            <div className="rarity">
              レア度：{rarityLabel[resultMonster.rarity]}
            </div>
            <div className="elementBadge">
              <span>{resultMonster.elementEmoji}</span>
              {resultMonster.element}
            </div>
          </div>

          <section className="detailLead">
            <span>人間タイプ</span>
            <h2>{resultProfile?.humanType}</h2>
            <p>{resultProfile?.shortSummary}</p>
          </section>

          <div className="detailGrid">
            <section>
              <span>性格の核</span>
              <p>{resultProfile?.personality}</p>
            </section>

            <section>
              <span>日常で出やすい行動</span>
              <p>{resultProfile?.dailyPattern}</p>
            </section>

            <section>
              <span>人間関係のクセ</span>
              <p>{resultProfile?.relationshipStyle}</p>
            </section>

            <section>
              <span>隠れた一面</span>
              <p>{resultProfile?.hiddenSide}</p>
            </section>
          </div>

          <section className="adviceCard">
            <span>うまく使うコツ</span>
            <p>{resultProfile?.advice}</p>
          </section>

          <section className="evolutionQuestCard detailEvolutionQuest">
            <span>進化クエスト</span>
            <h2>{evolutionQuest?.questTitle ?? `${resultMonster.name}の進化条件`}</h2>
            <div className="evolutionRoute">
              <strong>{resultMonster.name}</strong>
              <span>→</span>
              <strong>{evolutionQuest?.evolvedName ?? '進化後の姿'}</strong>
            </div>
            <p>{evolutionQuest?.condition ?? resultMonster.evolution}</p>

            {evolutionQuest && (
              <div className="questMeta">
                <div>
                  <span>今日の小クエスト</span>
                  <strong>{evolutionQuest.dailyQuest}</strong>
                </div>
                <div>
                  <span>報酬</span>
                  <strong>{evolutionQuest.reward}</strong>
                </div>
                <div>
                  <span>難易度</span>
                  <strong>{evolutionQuest.difficulty}</strong>
                </div>
              </div>
            )}
          </section>

          <div className="compatibility">
            <h2>相性レポート</h2>
            <div className="compatibilityGrid">
              <div className="compatibilityCard good">
                <span>一緒にいると伸びる</span>
                <strong>{resultMonster.goodMatches.join(' / ')}</strong>
              </div>
              <div className="compatibilityCard tricky">
                <span>すれ違いやすい</span>
                <strong>{resultMonster.trickyMatches.join(' / ')}</strong>
              </div>
              <div className="compatibilityCard rival">
                <span>正反対のライバル</span>
                <strong>{resultMonster.rival}</strong>
              </div>
            </div>
          </div>

          <div className="actions shareActions">
            <button className="startButton" onClick={shareResult}>
              詳細をシェア
            </button>
            <button className="subButton" onClick={shareToX}>
              Xでシェア
            </button>
            <button className="subButton" onClick={shareToLine}>
              LINEで送る
            </button>
            <button className="subButton" onClick={startQuiz}>
              もう一度診断する
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
