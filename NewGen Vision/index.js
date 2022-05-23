'use strict'

// Список курсов
let courses = [
    { name: "Courses in England", prices: [0, 100] }, 
    { name: "Courses in Germany", prices: [500, null] }, 
    { name: "Courses in Italy", prices: [100, 200] }, 
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];


//
function getCourse (arr, course) { // функция проверяет конкретный курс
    let result = true;
   result = +arr[0] <= course.prices[0] && (arr[1] >= course.prices[1] || course.prices[1] === null) && (arr[1] >= course.prices[0] || arr[1] === null) ? true : false;
   return result;
}

function checkAllCourses(arr, courses) { 
    let result = [];
  result =  courses.filter((course) => getCourse(arr, course));
  console.log(arr)
  console.log(result);
  return result;
}

checkAllCourses(requiredRange2, courses);




