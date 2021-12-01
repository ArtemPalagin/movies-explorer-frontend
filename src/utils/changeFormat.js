const changeFormat = (movie) => {
  return {
    ...movie,
    image: {
      url: movie.image,
      formats: {
        thumbnail: {
          url: movie.thumbnail
        }
      },
    },
    trailerLink: movie.trailer,
    id: movie.movieId,
  }
}
export default changeFormat;