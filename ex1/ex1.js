const arr1 = [0, 1, 2, 3, 4];
const arr2 = [5, 6, 7, 8, 9];
const mergedArr = [...arr1, ...arr2];
console.log('mergedArr:', mergedArr);

const arr3 = [0, 1, 2, 3, 4];
const arr4 = [5, 6, 7, 8, 9];
const mergedArr1 = arr3.concat(arr4);
console.log('mergedArr1:', mergedArr1);

let n = 5;
let string = '';
for (let i = n; i >= 1; i--) {
  for (let j = 0; j < i; j++) {
    string += '💡';
  }
  string += '\n';
}
console.log(string);
