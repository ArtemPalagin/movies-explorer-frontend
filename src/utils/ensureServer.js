const ensureServer = (img) => {
  if (img.startsWith('http')) {
    return img
  }

  return `https://api.nomoreparties.co${img}`
}
export default ensureServer;