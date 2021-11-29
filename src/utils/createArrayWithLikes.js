const createArrayWithLikes = (array, likedArray) => {
  let arrayWithLikes = array;
  for(let i = 0; i < arrayWithLikes.length; i++){
    for(let j = 0; j < likedArray.length; j++){
      if(arrayWithLikes[i].id === likedArray.id[j]){
        arrayWithLikes[i].liked = true;
      } else {
        arrayWithLikes[i].liked = true;
      }
    }
  }
  return arrayWithLikes;
}
export default createArrayWithLikes;