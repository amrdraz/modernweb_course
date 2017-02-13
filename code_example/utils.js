
exports.forEach = function (array, callback) {
  for (let i=0;i<array.length;i++) {
    callback(array[i], i, array)
  }
}
exports.map = (array, callback) => {
  let out = []
  for (let i=0;i<array.length;i++) {
    out.push(callback(array[i], i, array))
  }
  return out
}
exports.filter = (array, callback) => {
  let out = []
  for (let i=0;i<array.length;i++) {
    if (callback(array[i], i, array)) {
      out.push(array[i])
    }
  }
  return out
}
exports.reduce = (array, callback, accumulator) => {
  let out = []
  let i = 0
  if(!accumulator) {
    accumulator = array[i++]
  }
  for (;i<array.length;i++) {
    accumulator = callback(accumulator, array[i], i, array)
  }
  return out
}
