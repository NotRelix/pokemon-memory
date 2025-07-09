import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [shuffledList, setShuffledList] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pickedPokemon, setPickedPokemon] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
      const data = await res.json();

      const pokemonsWithImages = data.results.map((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        const image = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;
        return { id, name: pokemon.name, image };
      });

      setPokemonList(pokemonsWithImages);
    }

    fetchPokemons();
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0) {
      shuffleList();
    }
  }, [pokemonList]);

  function shuffleList() {
    const shuffled = [...pokemonList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledList(shuffled);
  }

  function onCardClick(e) {
    const container = e.target.closest(".list__container");
    if (!container) return;
    const id = container.getAttribute("id");
    const alreadyPicked = pickedPokemon.includes(id);
    shuffleList();
    if (alreadyPicked) {
      setCurrentScore(0);
      setPickedPokemon([]);
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
    } else {
      setCurrentScore(prev => prev + 1);
      setPickedPokemon(prev => [...prev, id]);
    }
  }
  
  return (
    <div className='main-container'>
      <h1 className='main-container__header'>Pokémon Memory</h1>
      <div className='main-container__score'>
        <p>Score: {currentScore}</p>
        <p>Best Score: {bestScore}</p>
      </div>
      <ul className='main-container__list'>
        {shuffledList.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} onClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default App
