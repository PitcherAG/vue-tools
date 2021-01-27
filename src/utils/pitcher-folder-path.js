const splitStringAt = (value, index) => [value.substring(0, index), value.substring(index)]

export function getPitcherFolderPath() {
  if (!window.location.href.includes('zip/')) {
    throw Error('"zip" folder not found in path')
  }
  let location = window.location.href
  const pos = location.lastIndexOf('zip//')
  if (pos !== -1) {
    const parts = splitStringAt(location, pos)
    location = parts[0] + parts[1].replace('zip//', 'zip/')
  }
  return location.split('zip/')[0]
}
