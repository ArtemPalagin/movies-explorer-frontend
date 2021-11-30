const ensureServer = (img) => {
  if (img.startsWith('http')) {
    return img
  }

  return `http://api.nomoreparties.co${img}`
}
export default ensureServer;