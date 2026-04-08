import { useMemo, useState } from 'react'
import ladders from './data/ladders.json'

function getRandomLadder(excludedId = null) {
  const pool = ladders.filter((ladder) => ladder.id !== excludedId)
  const options = pool.length > 0 ? pool : ladders
  return options[Math.floor(Math.random() * options.length)]
}

function isOneLetterDiff(a, b) {
  if (a.length !== b.length) return false

  let diff = 0
  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) diff += 1
  }

  return diff === 1
}

function App() {
  const [currentLadder, setCurrentLadder] = useState(() => getRandomLadder())
  const [currentStep, setCurrentStep] = useState(0)
  const [userPath, setUserPath] = useState([currentLadder.start_word])
  const [status, setStatus] = useState('playing')
  const [inputValue, setInputValue] = useState('')
  const [feedback, setFeedback] = useState('')

  const previousWord = userPath[userPath.length - 1]
  const totalMoves = currentLadder.steps.length - 1
  const expectedWord = currentLadder.steps[currentStep + 1]
  const progressText = `${currentStep} / ${totalMoves} moves`
  const canSubmit = status === 'playing'

  const normalizedInput = useMemo(
    () => inputValue.trim().toLowerCase(),
    [inputValue],
  )

  function resetGame(nextLadder) {
    setCurrentLadder(nextLadder)
    setCurrentStep(0)
    setUserPath([nextLadder.start_word])
    setStatus('playing')
    setInputValue('')
    setFeedback('')
  }

  function handleNewPuzzle() {
    resetGame(getRandomLadder(currentLadder.id))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!canSubmit) return
    if (!normalizedInput) {
      setFeedback('Enter a word before submitting.')
      return
    }

    if (normalizedInput.length !== currentLadder.word_length) {
      setFeedback(`Use a ${currentLadder.word_length}-letter word.`)
      return
    }

    if (!isOneLetterDiff(previousWord, normalizedInput)) {
      setFeedback(`"${normalizedInput}" must differ from "${previousWord}" by one letter.`)
      return
    }

    if (normalizedInput !== expectedWord) {
      setFeedback('That move is not in this ladder path. Try another word.')
      return
    }

    const nextStep = currentStep + 1
    const nextPath = [...userPath, normalizedInput]
    setCurrentStep(nextStep)
    setUserPath(nextPath)
    setInputValue('')

    if (nextStep === totalMoves) {
      setStatus('success')
      setFeedback(`Great job! You solved the ladder in ${totalMoves} moves.`)
      return
    }

    setFeedback('Correct! Keep going.')
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl p-4 sm:p-8">
      <header className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Word Ladder Alpha
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Change one letter at a time to get from the start word to the end word.
        </p>
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Start</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{currentLadder.start_word}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">End</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{currentLadder.end_word}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Difficulty
            </p>
            <p className="mt-2 text-2xl font-bold capitalize text-slate-900">
              {currentLadder.difficulty}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
            Progress: {progressText}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            Word length: {currentLadder.word_length}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="next-word" className="sr-only">
            Next word
          </label>
          <input
            id="next-word"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={`Next ${currentLadder.word_length}-letter word`}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg lowercase outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            disabled={!canSubmit}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            Submit
          </button>
        </form>

        <p
          className={`mt-3 min-h-6 text-sm font-medium ${
            status === 'success' ? 'text-emerald-600' : 'text-slate-600'
          }`}
        >
          {feedback}
        </p>

        <div className="mt-6 rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Your path
          </p>
          <p className="mt-2 break-all text-lg font-semibold text-slate-900">
            {userPath.join(' -> ')}
          </p>
        </div>

        {status === 'success' && (
          <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-emerald-800">
            <p className="text-base font-semibold">Puzzle complete!</p>
            <p className="mt-1 text-sm">
              You reached <strong>{currentLadder.end_word}</strong>. Start another puzzle any time.
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => resetGame(currentLadder)}
            className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Reset Puzzle
          </button>
          <button
            type="button"
            onClick={handleNewPuzzle}
            className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-700"
          >
            New Puzzle
          </button>
          <a
            href="https://forms.gle/replace-with-your-survey-link"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 font-semibold text-indigo-700 transition hover:bg-indigo-100"
          >
            Give Feedback
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
