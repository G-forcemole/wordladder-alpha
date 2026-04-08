const SLOT_COUNT = 4

function App() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100">
      <div
        className="relative w-[min(90vw,300px)] py-3"
        role="img"
        aria-label="Word ladder with empty word slots"
      >
        <div
          className="pointer-events-none absolute left-0 top-3 bottom-3 w-3.5 rounded-full bg-[#9a7b4f] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.12)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-3 bottom-3 w-3.5 rounded-full bg-[#9a7b4f] shadow-[inset_2px_0_4px_rgba(0,0,0,0.12)]"
          aria-hidden
        />

        <div className="mx-6 flex flex-col">
          {Array.from({ length: SLOT_COUNT }, (_, index) => (
            <div key={index}>
              <div className="min-h-[4.25rem] rounded-lg border border-stone-200/90 bg-white px-4 py-4 shadow-[0_4px_14px_rgba(15,23,42,0.08)]" />
              {index < SLOT_COUNT - 1 ? (
                <div
                  className="mx-0.5 my-2 h-3 w-auto rounded-full bg-[#8f6a3e] shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)]"
                  aria-hidden
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
