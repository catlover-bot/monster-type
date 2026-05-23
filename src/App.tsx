import { useMemo, useState } from 'react'
import './App.css'
import { monsters, type Monster, type TraitKey } from './data/monsters'
import { monsterProfiles } from './data/monsterProfiles'
import { evolutionQuests } from './data/evolutionQuests'
import { questions, type Answer } from './data/questions'

type GameState = 'home' | 'quiz' | 'result' | 'detail'

type Scores = Record<TraitKey, number>

const initialScores: Scores = {
  energy: 0,
  social: 0,
  sleepiness: 0,
  romance: 0,
  planning: 0,
  delay: 0,
  approval: 0,
  replySpeed: 0,
  chaos: 0,
  kindness: 0,
}

const rarityLabel: Record<Monster['rarity'], string> = {
  Normal: 'ノーマル',
  Rare: 'レア',
  Epic: 'エピック',
  Legend: 'レジェンド',
}

function chooseMonster(scores: Scores): Monster {
  const rarityBonus: Record<Monster['rarity'], number> = {
    Normal: 0,
    Rare: 0.15,
    Epic: 0.3,
    Legend: 0.45,
  }

  const ranked = monsters
    .map((monster) => {
      const traitTotal = monster.primaryTraits.reduce((sum, trait) => sum + scores[trait], 0)
      const average = traitTotal / monster.primaryTraits.length
      const total = average + rarityBonus[monster.rarity]

      return { monster, total }
    })
    .sort((a, b) => b.total - a.total)

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
  const [gameState, setGameState] = useState<GameState>('home')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [scores, setScores] = useState<Scores>(initialScores)

  const currentQuestion = questions[questionIndex]

  const resultMonster = useMemo(() => {
    return chooseMonster(scores)
  }, [scores])

  const resultProfile = monsterProfiles[resultMonster.id]
  const evolutionQuest = evolutionQuests[resultMonster.id]

  const progress = gameState === 'quiz'
    ? Math.round(((questionIndex + 1) / questions.length) * 100)
    : 0

  const startQuiz = () => {
    setScores(initialScores)
    setQuestionIndex(0)
    setGameState('quiz')
  }

  const selectAnswer = (answer: Answer) => {
    const nextScores = { ...scores }

    for (const [trait, point] of Object.entries(answer.scores)) {
      const key = trait as TraitKey
      nextScores[key] += point ?? 0
    }

    setScores(nextScores)

    if (questionIndex + 1 >= questions.length) {
      setGameState('result')
      return
    }

    setQuestionIndex((current) => current + 1)
  }

  const shareResult = async () => {
    const text = `私のモンスタータイプは「${resultMonster.name}」でした！\n${resultMonster.title}\n${resultProfile?.shortSummary ?? resultMonster.description}\n#モンスター性格診断`

    if (navigator.share) {
      await navigator.share({
        title: 'モンスター性格診断',
        text,
      })
      return
    }

    await navigator.clipboard.writeText(text)
    alert('診断結果をコピーしました！')
  }

  return (
    <main className="app">
      {gameState === 'home' && (
        <section className="hero">
          <div className="badge">MONSTER TYPE</div>

          <h1>
            {questions.length}問で、あなたの中の
            <br />
            モンスターを召喚。
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

          <div className="actions">
            <button className="startButton" onClick={shareResult}>
              結果をシェア
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

          <div className="actions">
            <button className="startButton" onClick={shareResult}>
              詳細をシェア
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
