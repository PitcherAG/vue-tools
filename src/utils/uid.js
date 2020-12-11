// S4 Generator
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

export const uid = (times = 1, prefix = '') => {
  let uid = prefix

  for (let i = 0; i < times; i++) {
    uid += i === 0 ? `${s4()}${s4()}` : `${s4()}`
    if (i + 1 !== times) {
      uid += '-'
    }
  }

  return uid
}
