
exports.forEach = function (array, callback) {
  for (let i=0;i<array.length;i++) {
    callback(array[i], i, array)
  }
}

exports.map = (array, callback) => {
  return array
}

exports.filter = (array, callback) => {
  return filter
}

exports.reduce = (array, callback, accumulator) => {
  return array
}
