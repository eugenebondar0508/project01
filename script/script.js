'use strict';


let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'freelance';
let addExpenses =prompt('Перечислите возможные расходы за рассчитываемый период через запятую','internet, taxi, communal') ;
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;


let start  = function(){
   money = prompt('Ваш месячный доход?');

   while(!isNumber(money)){
        money = prompt('Ваш месячный доход?');
   }
};
start();

let expenses = [];

let showTypeOf = function(data){
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = function(){
    let sum = 0;
    for (let i = 0; i <2; i++ ){

        
            expenses[i] = prompt('Введите обязательную статью расходов?');  



        sum += +prompt('Во сколько это обойдется?', '10');
        while(!isNumber(sum)){
            sum = prompt('Во сколько это обойдется?', '10');
       }
    }
    console.log(expenses);
    return  sum;
    
};

let expensesAmount = getExpensesMonth();
console.log(expensesAmount);


let getAccumulatedMonth = function(){
    return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();
let period = Math.ceil(mission / accumulatedMonth);





let getTargetMonth = function(){
    let res =  Math.ceil(mission/accumulatedMonth);
    if(res > 0){
        console.log(`Цель будет достигнута за ${res} месяцев`);

    } else {
        console.log('Цель не будет достигнута')
    }
};

getTargetMonth();




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

console.log(getStatusIncome());




console.log(addExpenses.toLowerCase().split(','));
console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);












