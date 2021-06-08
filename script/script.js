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
     percentDeposit:0,
     moneyDeposit:0,
     mission: 100000,
     period: 3,
     budget : money,
     budgetDay :0,
     budgetMonth :0,
     expensesMonth :0,
     expenses:{},
     sum:0,


     asking: function(){

        if(confirm('Есть ли у вас дополнительный источник заработка?')){
            let itemIncome;
            do{ itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Таксую');} 
            while(isNumber(itemIncome) || !itemIncome.trim());
            let cashIncome;
            do{
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
            } while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }


        let addExpenses =prompt('Перечислите возможные расходы за рассчитываемый период через запятую','internet,taxi,communal') ;
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
           appData.addExpenses = addExpenses.toLowerCase().split(',');

        

        
            for (let i = 0; i <2; i++ ){
                let expenses;
                let amount;
                
                do{
                    expenses= prompt('Введите обязательную статью расходов?');
                } while(isNumber(expenses) || !expenses.trim()); 

                console.log(typeof expenses);
        


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
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой годовой процент?');
            } while(!isNumber(appData.percentDeposit));
            
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            } while(!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
       return appData.budgetMonth * appData.period;
    }


 };

 appData.asking();
 appData.getExpensesMonth();
 appData.getBudget()
 appData.getTargetMonth();
 appData.getInfoDeposit();
appData.calcSavedMoney();





console.log(appData.expensesMonth);
console.log(appData.getStatusIncome());

for(let key in appData){
    console.log('Наша программа включаете в себя данные: ' +key+ ' и значения:' +appData[key]);
};



let words = []
for(let item of appData.addExpenses){
    item = item.trim();
    item = item.charAt(0).toUpperCase() + item.slice(1);
    console.log(item);
    words.push(' ' + item);

    
}
console.log(`${words}`);


const calculate = document.getElementById('start');
const plus1 =  document.getElementsByTagName('button')[0];
const plus2 =  document.getElementsByTagName('button')[1];
const checkDeposit = document.querySelector('.deposit-checkmark');
const additionalIncome = document.querySelectorAll('.additional_income-item');
const dayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const budgetMonthValue = document.querySelector('.budget_month-value');
const period = document.querySelector('.period-select');
const target = document.querySelector('.target-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const expensesTitle = document.querySelectorAll('.expenses-title')[1];
const expensesAmount = document.querySelector('.expenses-amount');
const incomeAmount = document.querySelector('.income-amount');
const incomeTitle = document.querySelector('.income-title');
const salaryAmount = document.querySelector('.salary-amount');