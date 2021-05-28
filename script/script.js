let money  = 1000;
let income = 'freelance';
let addExpenses ='internet, taxi, communal';
let deposit = true;
let mission = 10000;
let period = 5;


console.log(typeof income);
console.log(typeof money);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log( `Период равен ${period} месяцев. Цель заработать ${10000} $` );
console.log(addExpenses.toLocaleUpperCase().split(''));

let budgetDay = money / 30;
console.log(`Бюджет на день: ${Math.floor(budgetDay)}$`);

