
let {
  map,
  forEach,
  filter,
  reduce
} = require('./utils')


test('forEach n in array muliply it by 2', () => {
  let arr = [1, 2, 3, 4, 5]
  let arr2 = []
  forEach(arr, (n, index)=> arr2.push(n*n))
  expect(arr2).toNotBe(arr);
  expect(arr2).toEqual([1, 4, 9, 16, 25]);
});

test('map array to array power 2', () => {
  let arr = [1, 2, 3, 4, 5]
  let arr2 = map(arr, n => n*n)
  expect(arr2).toNotBe(arr);
  expect(arr2).toEqual([1, 4, 9, 16, 25]);
});


test('filter array to only odd number', () => {
  let arr = [1, 2, 3, 4, 5]
  let arr2 = filter(arr, n => n % 2 )
  expect(arr2).toNotBe(arr);
  expect(arr2).toEqual([1, 3, 5]);
});

test('sum array using reduce', () => {
  let arr = [1, 2, 3, 4, 5]
  let sum = reduce(arr, (sum, n) => sum + n, 0)
  expect(sum).toBe(15);
})

test('multiply array using reduce', () => {
  let arr = [1, 2, 3, 4, 5]
  let sum = reduce(arr, (sum, n) => sum * n, 1)
  expect(arr2).toNotBe(arr);
  expect(sum).toBe(120);
})

test('map array using reduce to power', () => {
  let arr = [1, 2, 3, 4, 5]
  let arr2 = reduce(arr, (new_arr, n) => {
    new_arr.push(n*n)
    return new_arr
  }, [])

  expect(arr2).toNotBe(arr);
  expect(arr2).toEqual([1, 4, 9, 16, 25])
})

test('filter array using reduce', () => {
  let arr = [1, 2, 3, 4, 5]
  let arr2 = reduce(arr, (new_arr, n) => {
    if (n%2===0) {
      return new_arr
    } else {
      new_arr.push(n)
      return new_arr
    }
  }, [])
  expect(arr2).toNotBe(arr);
  expect(arr2).toEqual([1, 3, 5]);
})
