'use strict';

let money  = +prompt('Ваш месячный доход?','1000');
let income = 'freelance';
let addExpenses =prompt('Перечислите возможные расходы за рассчитываемый период через запятую','internet, taxi, communal') ;
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?', '10');
let amount2 = +prompt('Во сколько это обойдется?', '50');



let getExpensesMonth = function(a,b){
    let res = a+b;
    return(res);
};



let getAccumulatedMonth = function(a,b,c){
    let accumulatedMonth = a - (b+c);
    return (accumulatedMonth);
};

let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
let period = Math.ceil(mission / accumulatedMonth);
let budgetDay = accumulatedMonth / 30;

let getStatusIncome = function(){
    if (budgetDay > 1200){
        return('У вас высокий уровень дохода');
    } else if(budgetDay > 600 && budgetDay < 1200 ){
        return('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay > 0){
        return('К сожалению у вас уровень дохода ниже среднего');
    
    } else{
        return('Что то пошло не так');
    }
};




let getTargetMonth = function(a,b){
    let res = Math.ceil(a/b);
    return (res);
};




let showTypeOf = function(data){
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLowerCase().split(','));
console.log(getTargetMonth(mission, accumulatedMonth));
console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);
console.log(getStatusIncome());











