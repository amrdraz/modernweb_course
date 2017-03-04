
exports.addItem = function (array, item) {
  return [...array, item]
}

exports.removeItem = function (array, item) {
  let index = array.indexOf(item)
  return array.splice(0, index).concat(array.splice(index + 1))
}

exports.removeItemAtIndex = function (array, index) {
  return array.filter((a, i), i!==index)
}

exports.addItemAtIndex = function (array, item, index) {
  return [...array.splice(0, index), item, ...array.splice(index)]
}


exports.setItemAtIndex = function (array, item, index) {
  return [...array.splice(0, index), item, ...array.splice(index + 1)]
}

exports.replaceItem = function (array, item, new_item) {
  return array.map(function (n, i) {
    if (n===item) {
      return new_item
    } else {
      return item
    }
  })
}

exports.merge = (object, new_object) => {
  return Object.assign({}, object, new_object)
}
