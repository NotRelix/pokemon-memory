import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card';

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
      const data = await res.json();

      const pokemonsWithImages = data.results.map((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        const image = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`;
        return { name: pokemon.name, image };
      });

      setPokemonList(pokemonsWithImages);
    }

    fetchPokemons();
  }, []);
  
  return (
    <div className='main-container'>
      <h1 className='main-container__header'>Pokémon</h1>
      <ul className='main-container__list'>
        {pokemonList.map((pokemon) => (
          <Card pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
}

export default App
