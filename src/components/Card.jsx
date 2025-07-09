import "../styles/Card.css";

const Card = ({ pokemon, onClick }) => {
  return (
    <li id={pokemon.id} onClick={onClick} className='list__container'>
      <img className='list__image' src={pokemon.image} alt={pokemon.name}/>
      <p>{pokemon.name}</p>
    </li>
  )
}

export default Card