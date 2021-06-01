let money  = +prompt('Ваш месячный доход?','1000');
let income = 'freelance';
let addExpenses =prompt('Перечислите возможные расходы за рассчитываемый период через запятую','internet, taxi, communal') ;
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?', '10');
let amount2 = +prompt('Во сколько это обойдется?', '50');
let budgetMonth = money - (amount1 + amount2);
let period = Math.ceil(mission / budgetMonth);
let budgetDay = budgetMonth / 30;

if (budgetDay > 1200){
    console.log('У вас высокий уровень дохода');
} else if(budgetDay > 600 && budgetDay < 1200 ){
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0){
    console.log('К сожалению у вас уровень дохода ниже среднего');

} else{
    console.log('Что то пошло не так');
}


console.log(typeof income);
console.log(typeof money);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log( `Период равен ${period} месяцев. Цель заработать ${mission} $` );
console.log(addExpenses.toLowerCase().split(','));
console.log(`За ${period} месяцев будет достигнуто ${mission}`);
console.log(`Месячный бютжет: ${budgetMonth}$`);
console.log(`Бюджет на день: ${Math.floor(budgetDay)}$`);







