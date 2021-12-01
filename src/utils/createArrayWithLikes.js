const isLiked = (list, id) => {
  return list.some(item => item.id === id)
}

const createArrayWithLikes = (array, likedArray) => {
  let arrayWithLikes = array;
  for(let i = 0; i < arrayWithLikes.length; i++){

    arrayWithLikes[i].liked = isLiked(likedArray,  arrayWithLikes[i].id);
  }
  return arrayWithLikes;
}
export default createArrayWithLikes;