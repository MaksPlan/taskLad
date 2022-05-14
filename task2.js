// Монстр Лютый
const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
};

// Маг Евстафий
const moves =  [
    {
        "name": "Удар боевым кадилом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 50,
        "cooldown": 0
    },
    {
        "name": "Вертушка левой пяткой",
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 4
    },
    {
        "name": "Каноничный фаербол",
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 3
    },
    {
        "name": "Магический блок",
        "physicalDmg": 0,
        "magicDmg": 0,
        "physicArmorPercents": 100,
        "magicArmorPercents": 100,
        "cooldown": 4
    },
];




//Деструктуризация статов Лютого
let {maxHealth: monsterHealth, name, moves: monsterMoveSet} = monster
const [claw, fireBreath, tail] = monsterMoveSet


let heroCoolDownSet = [0, 0, 0, 0];
let monsterCoolDownSet = [0, 0, 0];

// Здоровье Монстра
let monsterDiv = document.querySelector('.healthM');
let healthMonster = document.createElement('span')
healthMonster.textContent = monsterHealth;
monsterDiv.append(healthMonster);

//Здоровье Евстафия
let heroMaxHealt = document.querySelector('.healthE');
let healthHero = document.createElement('span')
healthHero.textContent =  +prompt('Выберерти сложность', '')
let heroEvstf = healthHero.textContent;
heroMaxHealt.append(healthHero);

const attackToggler  = heroMaxHealt.classList


 //Ходы Евстафия
 const heroMoves = document.querySelectorAll('.moveHero');
 let heroStats = [];
    

let startButton = document.querySelector('.start');
    startButton.addEventListener('click', () => monsterStepChoise())
    startButton.addEventListener('click', () => heroMoves.forEach((el) => el.classList.remove('hide')));

    heroMoves.forEach((button, i) => button.addEventListener('click',() => {
        heroStats = destructMoveSet(i);
        heroCoolDownSet[i] = heroStats[4] + 1;
        if (!(heroCoolDownSet[i] === 0)) button.setAttribute('disabled', 'disabled');
        action(moves, heroStats, i, 'pink');
        finalDamage(); 
  
    }))
//coolDown Евстафия
 heroMoves.forEach((button) => button.addEventListener('click', () => {

    heroCoolDownSet = heroCoolDownSet.map((el) => {
      return  el === 0 ? el : el - (el/el);
    });
    heroCoolDownSet.forEach((el, i) => {
        if (el === 0) heroMoves[i].removeAttribute('disabled');
    });
  
 }))


//Ходы монстра
let monsterStats = [];
function actionMonster(index)  {

         monsterStats = destructMoveSet(index);
        if (monsterCoolDownSet[index] === 0) {
            monsterCoolDownSet[index] = monsterStats[4];
            action(monsterMoveSet, monsterStats, index, 'red')
        } else {
            monsterStepChoise();
        }
        return monsterStats;
};

function monsterStepChoise()  {
   let im = Math.floor(Math.random()*(3));//Выбор удара
     return actionMonster(im);//retutn [monsterStats]
  
   } 

//общие функции
function finalDamage() {
      let phDamageForHero = countDamage(monsterStats[0], heroStats[2]);//damage armor
      let phDamageForMonster = countDamage(heroStats[0], monsterStats[2]);
      let mgDamageForHero = countDamage(monsterStats[1], heroStats[3]);
      let mgDamageForMonster = countDamage(heroStats[1], monsterStats[3]);
      monsterHealth = monsterHealth - (phDamageForMonster + mgDamageForMonster) 
     heroEvstf = +heroEvstf - (phDamageForHero + mgDamageForHero)
     monsterDiv.innerHTML = monsterHealth;
     heroMaxHealt.innerHTML = heroEvstf;
     chooseWinner();
     coolDownCounter(monsterCoolDownSet);
     coolDownCounter(heroCoolDownSet);
  
}

function chooseWinner() {
    if (monsterHealth <= 0) {
    let span = document.createElement('span');
    span.textContent = 'Вы победили'
    span.style.backgroundColor = 'green';
    span.style.fontSize = '40px';
    span.style.height = span.style.width = '40px'
    startButton.after(span);
    heroMoves.forEach((button) => button.classList.add('hide'));
   useReload();
    
} else if (heroEvstf <= 0) {
    let span = document.createElement('span');
    span.textContent = 'Вы проиграли';
    span.style.backgroundColor = 'green';
    span.style.fontSize = '40px';
    span.style.height = span.style.width = '40px'
    startButton.after(span);
    heroMoves.forEach((button) => button.classList.add('hide'));
    useReload();
}
else {

    heroStats = [];
    monsterStats = [];
    do {
         setTimeout(() => {
        monsterStats = monsterStepChoise()
       }, 2000) 
   
      attackToggler.toggle('attack!')

      
     } while (attackToggler.includes('attack!'))
    }
}

function destructMoveSet(index) {
    const {name,
        physicalDmg: phDmg,
        magicDmg: mgDmg,
        physicArmorPercents: phArmor,
        magicArmorPercents: mgArmor,
        cooldown
        } = moves[index]

       let stats = [phDmg, mgDmg, phArmor, mgArmor, cooldown]
        return stats;
}
function countDamage(damage, armor) {
  let  armoR = Math.floor(damage * (armor / 100)) //считаю броню как процент от урона
  console.log(armoR)
    let result = damage - armoR;
    // result > 0 ? result : result = 0;
    return result;
}

function action(arr, stats, index, color)  {
    let ul = document.querySelector('.movesList');
    let move = document.createElement('li');
    move.textContent = `${arr[index]['name']} 
     физ. урон: ${stats[0]} 
     маг. урон: ${stats[1]} 
     физ. броня ${stats[2]}  
     маг. броня ${stats[3]}`;
     move.style.backgroundColor = `${color}`
    ul.append(move);
   }
function coolDownCounter(arr) {
    let array = [];
       arr.forEach((el) => {el === 0 ? el : el-- ;
     array.push(el)});
     arr = array;
     console.log(arr)
     return arr;
 } 

 function useReload() {
    let restartButton = document.createElement('button');
    restartButton.onclick = () => document.location.reload();
    restartButton.textContent = 'restart'
    startButton.after(restartButton);
 }

 //Карточки со статами 
 moves.forEach((move) => {
     let div = document.createElement('div');
     let ull = document.createElement('ul');
    for (key in move) {
        let cardLine = document.createElement('li')
        cardLine.textContent = `${key}: ${move[key]}`
        ull.append(cardLine)
    }
    div.style.backgroundColor = '#f4a460'
    div.append(ull);
    let discript = document.querySelector('.discript');
    discript.append(div);
 })
















