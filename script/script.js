'use strict';

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start  = function(){

 
    do{
         money = prompt('Ваш месячный доход?');
    } while(!isNumber(money))
 };
 start();

 let appData = {
     income: {},
     addIncome:[],
     expenses:{},
     addExpenses:[],
     deposit: false,
     mission: 100000,
     period: 3,
     budget : money,
     budgetDay :0,
     budgetMonth :0,
     expensesMonth :0,
     expenses:{},
     sum:0,


     asking: function(){
        let addExpenses =prompt('Перечислите возможные расходы за рассчитываемый период через запятую','internet, taxi, communal') ;
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
           appData.addExpenses = addExpenses.toLowerCase().split(',');
        
            for (let i = 0; i <2; i++ ){
                let expenses;
                let amount;
                expenses= prompt('Введите обязательную статью расходов?');
        
               do{
                amount = prompt('Во сколько это обойдется?');
                
               } 
                while(!isNumber(amount));
                
                appData.expenses[expenses] = +amount;
                   
               
            } 
        },
        getExpensesMonth: function(){
            for(let key in appData.expenses){
                appData.expensesMonth = appData.expensesMonth + appData.expenses[key];
            }
            return appData.expensesMonth;
        },

    getTargetMonth :function(){
        let res =  Math.ceil(appData.mission/appData.budgetMonth);
        if(res > 0){
            console.log(`Цель будет достигнута за ${res} месяцев`);
    
        } else {
            console.log('Цель не будет достигнута')
        }
    },
    getStatusIncome : function(){
        if (appData.budgetDay > 1200){
            return('У вас высокий уровень дохода');
        } else if(appData.budgetDay > 600 && appData.budgetDay < 1200 ){
            return('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay > 0){
            return('К сожалению у вас уровень дохода ниже среднего');
        
        } else{
            return('Что то пошло не так');
        }
    },
    getBudget :function(){
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        return;

       
    },


 };

 appData.asking();
 appData.getExpensesMonth();
 appData.getBudget()
 appData.getTargetMonth();




console.log(appData.expensesMonth);
console.log(appData.getStatusIncome());

for(let key in appData){
    console.log('Наша программа включаете в себя данные: ' +key+ ' и значения:' +appData[key]);
};








