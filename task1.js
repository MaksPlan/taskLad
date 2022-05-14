// Нужен цикл  - это кол-во попыток
// Нужна функция сравнения введеного числа с загаданным 
// Генерация числа идет в заданом диапазоне от 3 до 6 цифр

//  function findNumber() {
//     const pickNum = Math.floor(Math.random() * (1000_000 - 100) + 100);
//     const userAnswer = +prompt('Угадайте' + `${pickNum.toString().length}`  +  '-ое число', '');
//     for (let i = 10; i < 10; i++) {
        
//         checkNumbers(userAnswer, pickNum);
//         alert(`цифр на своих местах - ${correctNumAndPlace.length}` , correctNumAndPlace,`совпавших цифр не на своих местах - ${correctNum.length}` , correctNum)
        
//     }
//  };


// function checkNumbers() {
//     let correctNumAndPlace = [];
//     let correctNum = [];
//     if (userNum - pickNum === 0) {
//       return  alert('Поздравляю, правильный отвтет!!!')
//     } else {
//       let numOne = pickNum.toString().split('');
//       let numTwo = userAnswer.toString().split('');
     

//         numTwo.forEach((number, index) => {
//             if (number === numOne[index]) {
//             correctNumAndPlace.push(number)
//         } else if ( numOne.inclueds(number)) {
//            correctNum.push(number);
//         }
//      return [correctNum, correctNumAndPlace]
//     }
//     }
// };