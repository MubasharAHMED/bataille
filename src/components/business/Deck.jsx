import { createDeck, ranks, shuffleArray } from "@/utils/createDeck.js"
import { useEffect, useState } from "react"

const TIME_BETWEEN_MATCH = 700

const Deck = () => {
  const [playerCards, setPlayerCards] = useState([])
  const [computerCards, setComputerCards] = useState([])
  const [playedCards, setPlayedCards] = useState([])
  const [winner, setWinner] = useState("")

  useEffect(() => {
    const deck = createDeck()
    const shuffledDeck = shuffleArray(deck)

    const playerCards = shuffledDeck.slice(0, 26)
    const computerCards = shuffledDeck.slice(26)

    setPlayerCards(playerCards)
    setComputerCards(computerCards)
  }, [])

  const restartGame = () => {
    window.location.reload()
    setWinner("")
  }

  const handleBataille = () => {
    if (playerCards.length === 0 || computerCards.length === 0) {
      return
    }
    const playerCard1 = playerCards[playerCards.length - 1]
    const playerCard2 = playerCards[playerCards.length - 2]
    const computerCard1 = computerCards[computerCards.length - 1]
    const computerCard2 = computerCards[computerCards.length - 2]

    setPlayedCards((prev) => [
      ...prev,
      playerCard1,
      playerCard2,
      computerCard1,
      computerCard2,
    ])

    setPlayerCards((prev) => prev.slice(0, prev.length - 2))
    setComputerCards((prev) => prev.slice(0, prev.length - 2))

    const newPlayerCard = playerCards[playerCards.length - 1]
    const newComputerCard = computerCards[computerCards.length - 1]

    setPlayedCards((prev) => [...prev, newPlayerCard, newComputerCard])

    compareCards(newPlayerCard, newComputerCard)

    const playerRank = ranks.indexOf(newPlayerCard.rank)
    const computerRank = ranks.indexOf(newComputerCard.rank)

    if (playerRank > computerRank) {
    setPlayerCards((prev) => [
      newPlayerCard,
      newComputerCard,
      ...playedCards,
      ...prev,
    ]);
    setPlayedCards([]);
    
  }

  const handlePlayCard = () => {
    if (playerCards.length === 0 || computerCards.length === 0) {
      return
    }

    const playerCard = playerCards[playerCards.length - 1]
    const computerCard = computerCards[computerCards.length - 1]

    setPlayedCards([playerCard, computerCard])

    const comparePlayerCards = () => {
      const playerRank = ranks.indexOf(playerCard.rank)
      const computerRank = ranks.indexOf(computerCard.rank)

      if (playerRank > computerRank) {
        setPlayerCards((prev) => [
          playerCard,
          computerCard,
          ...prev.slice(0, prev.length - 1),
        ])

        setComputerCards((prev) => prev.slice(0, prev.length - 1))
      } else if (playerRank < computerRank) {
        setComputerCards((prev) => [
          computerCard,
          playerCard,
          ...prev.slice(0, prev.length - 1),
        ])
        setPlayerCards((prev) => prev.slice(0, prev.length - 1))
      } else {
        handleBataille()
      }
    }

    setTimeout(() => {
      comparePlayerCards()

      if (playerCards.length === 1) {
        setWinner("Ordinateur")
      } else if (computerCards.length === 1) {
        setWinner("Joueur")
      }
    }, TIME_BETWEEN_MATCH)
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full border-2 border-black bg-green-500 gap-4 p-2">
      {winner ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="w-24 h-32 border border-black bg-gray-200 flex items-center justify-center rounded shadow">
            <span className="text-center">{winner} a gagné!</span>
          </div>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded shadow"
            onClick={() => restartGame()}
          >
            Recommencer
          </button>
        </div>
      ) : (
        <div className="gap-2 p-2 flex flex-col">
          <div className="w-24 h-32 border border-black bg-gray-200 flex flex-col items-center justify-center rounded shadow">
            <span className="text-center">Ordinateur</span>
            <span>({computerCards.length})</span>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-20 h-28 p-1 border border-black bg-white flex  items-center justify-center rounded shadow">
              <span>
                {playedCards ? playedCards[1]?.rank : ""}-
                {playedCards ? playedCards[1]?.suit : ""}
              </span>
            </div>
            <div className="w-20 h-28 p-1 border border-black bg-white flex  items-center justify-center rounded shadow">
              <span>
                {playedCards ? playedCards[0]?.rank : ""}-
                {playedCards ? playedCards[0]?.suit : ""}
              </span>
            </div>
          </div>

          <div className="w-24 h-32  bg-blue-500 flex flex-col items-center justify-center rounded shadow">
            <button
              className="w-full h-full  text-white rounded"
              onClick={() => handlePlayCard()}
            >
              Joueur
            </button>
            <span className="text-white">({playerCards.length})</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Deck
