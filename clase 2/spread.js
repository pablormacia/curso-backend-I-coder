const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]
const arr3 = [...arr2,[5,6]]

console.log("arr1",arr1)
console.log("arr2",arr2)
console.log("arr3",arr3)

const arrFlat = arr3.flat()
console.log(arrFlat)

//Spread: Clona o combina
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a:1, b:2, c:3 }

//Rest: Extrae propiedaes específicas y agrupa el resto
const { a, ...resto } = { a: 10, b: 20, c: 30 };
console.log(resto); // { b: 20, c: 30 }