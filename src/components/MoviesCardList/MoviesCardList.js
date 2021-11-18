import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList(props){
  return(
    <section className="movies-cardList">
      {props.cards.map((card) => (
        <MoviesCard />
      ))}
    </section>
  )
}
export default MoviesCardList;