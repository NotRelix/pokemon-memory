import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
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

  function onCardClick(e) {
    const container = e.target.closest(".list__container");
    if (!container) return;
    const id = container.getAttribute("id");
    const alreadyPicked = pickedPokemon.includes(id);
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
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} onClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default App
