
exports.addItem = function (array, item) {
  return [...array, item]
}

exports.removeItem = function (array, item) {
  let index = array.indexOf(item)
  return array.splice(0, index).concat(array.splice(index))
}

exports.removeItemAtIndex = function (array, index) {
  return array.filter((a, i) => i!==index)
}

exports.setItemAtIndex = function (array, item, index) {
  return [...array.splice(0, index), item, ...array.splice(index)]
}

exports.addItemAtIndex = function (array, item, index) {
  return [...array.splice(0, index), item, ...array.splice(index-1)]
}



exports.replaceItem = function (array, item, new_item) {
  return array.map(function (n, i) {
    if (n===item) {
      return new_item
    } else {
      return n
    }
  })
}



// This is mutation
// let obj = {
//   name: 'draz',
//   age: 12
// }
// obj.age = 20
// This is also mutation
// obj.age = Object.assign(obj, {
//   age: 20
// })
// merge (obj, {age: 20}) should be { name: 'darz', age: 20 } and is a new object
exports.merge = (object, new_object) => {
  return Object.assign({}, object, new_object)
}
