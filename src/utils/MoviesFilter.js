const moviesFilter = (array, keyword, shortFilms) => {
  if(!keyword){
    return []
  }
  let films = [];
  // debugger
  if (shortFilms) {
    films = array.filter((film) => {
      if (film.duration <= 40) {
        return true;
      }
      return false;
    })
  } else {
    films = array;
  }
  const filteredArray = films.filter((film) => {
    return film.nameRU?.includes(keyword) || film.nameEN?.includes(keyword)
  })
  return filteredArray;
}
export default moviesFilter;