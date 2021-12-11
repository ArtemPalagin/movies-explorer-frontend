const arrayCheck = (firstNumber, cardsToAdd, array) => {
  const wantedLength = firstNumber + cardsToAdd
  const filteredArray = array.slice(0, wantedLength);
  return {
    filteredArray,
    moviesNumber: filteredArray.length,
  }
}

export const download = (array, arrayNumber) => {

  if (window.innerWidth >= 903) {
    if (arrayNumber % 4 !== 0) {
      const cardsToAdd = arrayNumber + (4 - (arrayNumber % 4))
      if(array.length <= cardsToAdd){
        return arrayCheck(0, array.length, array);
      }
      return arrayCheck(0, cardsToAdd, array);
    }
    if (arrayNumber > 16) {
      return arrayCheck(0, arrayNumber, array);
    }
    return arrayCheck(0, 16, array);
  }
  if (window.innerWidth >= 768 && window.innerWidth < 930) {
    if (arrayNumber % 3 !== 0) {
      const cardsToAdd = arrayNumber + (3 - (arrayNumber % 3))
      if(array.length <= cardsToAdd){
        return arrayCheck(0, array.length, array);
      }
      return arrayCheck(0, cardsToAdd, array);
    }
    if (arrayNumber > 12) {
      return arrayCheck(0, arrayNumber, array);
    }
    return arrayCheck(0, 12, array);
  }
  if (window.innerWidth >= 430 && window.innerWidth < 768) {
    if (arrayNumber % 2 !== 0) {
      const cardsToAdd = arrayNumber + (2 - (arrayNumber % 2))
      if(array.length <= cardsToAdd){
        return arrayCheck(0, array.length, array);
      }
      return arrayCheck(0, cardsToAdd, array);
    }
    if (arrayNumber > 8) {
      return arrayCheck(0, arrayNumber, array);
    }
    return arrayCheck(0, 8, array);
  }
  if (window.innerWidth < 430) {
    if (arrayNumber > 5) {
      return arrayCheck(0, arrayNumber, array);
    }
    return arrayCheck(0, 5, array);
  }
}
export const additionalDownload = (array, arrayNumber) => {
  if (window.innerWidth >= 903) {
    return arrayCheck(arrayNumber, 4, array);
  }
  if (window.innerWidth >= 768 && window.innerWidth < 930) {
    return arrayCheck(arrayNumber, 3, array);
  }
  if (window.innerWidth >= 430 && window.innerWidth < 768) {
    return arrayCheck(arrayNumber, 2, array);
  }
  if (window.innerWidth < 430) {
    return arrayCheck(arrayNumber, 1, array);
  }

}