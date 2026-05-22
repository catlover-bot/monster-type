import { useMemo, useState } from 'react'
import './App.css'
import { monsters, type Monster, type TraitKey } from './data/monsters'
import { questions, type Answer } from './data/questions'

type GameState = 'home' | 'quiz' | 'result'

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
  const ranked = monsters
    .map((monster) => {
      const total = monster.primaryTraits.reduce((sum, trait) => sum + scores[trait], 0)
      return { monster, total }
    })
    .sort((a, b) => b.total - a.total)

  return ranked[0].monster
}

function App() {
  const [gameState, setGameState] = useState<GameState>('home')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [scores, setScores] = useState<Scores>(initialScores)

  const currentQuestion = questions[questionIndex]

  const resultMonster = useMemo(() => {
    return chooseMonster(scores)
  }, [scores])

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
    const text = `私のモンスタータイプは「${resultMonster.name}」でした！\n${resultMonster.title}\n#モンスター性格診断`

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
            10問で、あなたの中の
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
            例：寝落ちスライム / 承認欲求ドラゴン / 返信遅すぎゴースト
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

          <div className="monsterVisual">
            <img
              src={resultMonster.image}
              alt={resultMonster.name}
              onError={(event) => {
                event.currentTarget.style.display = 'none'
              }}
            />
            <span className="monsterFallback">👾</span>
          </div>

          <h1 className="monsterName">{resultMonster.name}</h1>
          <p className="monsterTitle">{resultMonster.title}</p>

          <div className="rarity">
            レア度：{rarityLabel[resultMonster.rarity]}
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
              <span>相性◎</span>
              <strong>{resultMonster.bestMatch}</strong>
            </div>
          </div>

          <div className="evolution">
            <span>進化条件</span>
            <p>{resultMonster.evolution}</p>
          </div>

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
    </main>
  )
}

export default App
