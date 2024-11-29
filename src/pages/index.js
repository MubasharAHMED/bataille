import Deck from "@@/business/Deck.jsx"

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-200">
      <h1 className="text-3xl my-4">Simple Bataille</h1>

      <Deck />
    </div>
  )
}

export default Home
