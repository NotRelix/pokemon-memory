import "../styles/Card.css";

const Card = ({ pokemon }) => {
  return (
    <li className='list__container' key={pokemon.name}>
      <img className='list__image' src={pokemon.image} alt={pokemon.name}/>
      <p>{pokemon.name}</p>
    </li>
  )
}

export default Card