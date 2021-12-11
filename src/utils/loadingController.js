const arrayCheck = (firstNumber, numberOfCards, array) => {
  const wantedLength = firstNumber + numberOfCards
  const filteredArray = array.slice(0, wantedLength);
  return {
    filteredArray,
    moviesNumber: filteredArray.length,
  }
}

export const download = (array, arrayNumber) => {

  if (window.innerWidth >= 903) {
    if (array.length <= 16) {
      return arrayCheck(arrayNumber, array.length, array);
    }
    if (arrayNumber % 4 !== 0) {
      if(array.length <= arrayNumber + (4 - (arrayNumber % 4))){
        return arrayCheck(0, array.length, array);
      }
      return arrayCheck(0, arrayNumber + (4 - (arrayNumber % 4)), array);
    }
    if (arrayNumber > 16) {
      return arrayCheck(0, arrayNumber, array);
    }
    return arrayCheck(0, 16, array);
  }
  if (window.innerWidth >= 768 && window.innerWidth < 930) {
    if (array.length <= 12) {
      return arrayCheck(arrayNumber, array.length, array);
    }
    if (arrayNumber % 3 !== 0) {
      if(array.length <= arrayNumber + (3 - (arrayNumber % 3))){
        return arrayCheck(0, array.length, array);
      }
      return arrayCheck(0, arrayNumber + (3 - (arrayNumber % 3)), array);
    }
    if (arrayNumber > 12) {
      return arrayCheck(0, arrayNumber, array);
    }
    return arrayCheck(0, 12, array);
  }
  if (window.innerWidth >= 430 && window.innerWidth < 768) {
    if (array.length <= 8) {
      return arrayCheck(arrayNumber, array.length, array);
    }
    if (arrayNumber % 2 !== 0) {
      if(array.length <= arrayNumber + (2 - (arrayNumber % 2))){
        return arrayCheck(0, array.length, array);
      }
      return arrayCheck(0, arrayNumber + (2 - (arrayNumber % 2)), array);
    }
    if (arrayNumber > 8) {
      return arrayCheck(0, arrayNumber, array);
    }
    return arrayCheck(0, 8, array);
  }
  if (window.innerWidth < 430) {
    if (array.length <= 5) {
      return arrayCheck(arrayNumber, array.length, array);
    }
    if (arrayNumber > 5) {
      return arrayCheck(0, arrayNumber, array);
    }
    return arrayCheck(0, 5, array);
  }
}
export const additionalDownload = (array, arrayNumber) => {
  if (window.innerWidth >= 903) {
    // if (arrayNumber % 4 !== 0) {
    //   return arrayCheck(arrayNumber, 4 - (arrayNumber % 4), array);
    // }
    // if (array.length <= arrayNumber + 4) {
    //   return arrayCheck(arrayNumber, arrayNumber + 4 - array.length, array);
    // }
    return arrayCheck(arrayNumber, 4, array);
  }
  if (window.innerWidth >= 768 && window.innerWidth < 930) {
    // if (arrayNumber % 4 !== 0) {
    //   return arrayCheck(arrayNumber, 4 - (arrayNumber % 4), array);
    // }

    if (array.length <= arrayNumber + 3) {
      return arrayCheck(arrayNumber, arrayNumber + 3 - array.length, array);
    }
    return arrayCheck(arrayNumber, 3, array);
  }
  if (window.innerWidth >= 430 && window.innerWidth < 768) {
    // if (arrayNumber % 4 !== 0) {
    //   return arrayCheck(arrayNumber, 4 - (arrayNumber % 4), array);
    // }
    if (array.length <= arrayNumber + 2) {
      return arrayCheck(arrayNumber, arrayNumber + 2 - array.length, array);
    }
    return arrayCheck(arrayNumber, 2, array);
  }
  if (window.innerWidth < 430) {
    if (array.length <= arrayNumber + 1) {
      return arrayCheck(arrayNumber, arrayNumber + 1 - array.length, array);
    }
    return arrayCheck(arrayNumber, 1, array);
  }

}