'use strict';
let calculate = document.getElementById('start');
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
let expensesItems = document.querySelectorAll('.expenses-items');
const incomeTitle = document.querySelector('.income-title');
const salaryAmount = document.querySelector('.salary-amount');
const incomeItem = document.querySelectorAll('.income-items');
let incomeItems = document.querySelectorAll('.income-items');
const periodAmount = document.querySelector('.period-amount');
calculate.disabled = true;

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};


 let appData = {
     income: {},
     incomeMonth:0,
     addIncome:[],
     expenses:{},
     addExpenses:[],
     deposit: false,
     percentDeposit:0,
     moneyDeposit:0,
     budget : 0,
     budgetDay :0,
     budgetMonth :0,
     expensesMonth :0,
     expenses:{},
     sum:0,
     start: function(){
         

        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        // appData.getTargetMonth();
        // appData.getInfoDeposit();
        // appData.calcSavedMoney();
        appData.getExpensesMonth();
        // appData.changeSavedMoney();
        // appData.changePeriod();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getIncome();
        appData.getBudget();
        appData.showResult();
        
     },
     showResult: function(){
         budgetMonthValue.value = appData.budgetMonth;
         dayValue.value = appData.budgetDay;
         expensesMonthValue.value = appData.expensesMonth;
         additionalExpensesValue.value = appData.addExpenses.join(', ');
         targetMonthValue.value = Math.ceil(appData.getTargetMonth());
         additionalIncomeValue.value = appData.addIncome.join(', ');
         
         incomePeriodValue.value = appData.calcSavedMoney();
         period.addEventListener('input', appData.changeSavedMoney);
        



     },
     addExpensesBlock: function(){
         let cloneExpensesItem = expensesItems[0].cloneNode(true);
         expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plus2 );
         expensesItems = document.querySelectorAll('.expenses-items');

         if(expensesItems.length === 3){
             plus2.style.display = 'none';
         }
     },
     getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = +cashExpenses;
            }

        })
     },
     addIncomeBlock: function(){
       
         
         let cloneIncomeItems = incomeItems[0].cloneNode(true);
        
         incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plus1);
         incomeItems = document.querySelectorAll('.income-items');

         if(incomeItems.length === 3){
             plus1.style.display = 'none';
         }

     },
     getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = +cashIncome;
            }
            for(let key in appData.income){
                appData.incomeMonth += +appData.income[key];
            }
        });

     },

     getAddExpenses: function(){

        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        })
     },
     getAddIncome: function(){
        additionalIncome.forEach(function(item){
           let itemValue = item.value.trim();
           if (item.value !== ''){
               appData.addIncome.push(itemValue);
           } 
        });
     },

        getExpensesMonth: function(){
            for(let key in appData.expenses){
                appData.expensesMonth = appData.expensesMonth + appData.expenses[key];
            }
            return appData.expensesMonth;
        },

    getTargetMonth :function(){
        return target.value / appData.budgetMonth;
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
        appData.budgetMonth = appData.budget +appData.incomeMonth - appData.expensesMonth;
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
       return appData.budgetMonth * period.value;
    },
    changePeriod: function(){
        periodAmount.innerHTML = period.value;
    },
    changeSavedMoney:function(){
       incomePeriodValue.value = appData.budgetMonth * period.value;
    }, 
    startError: function(){
        if(salaryAmount.value === ''){
            calculate.disabled = true;          
        } else {
            calculate.disabled = false;
        }
        
        
    }

 };
 salaryAmount.addEventListener('input', appData.startError);

 calculate.addEventListener('click', appData.start);
 plus2.addEventListener('click', appData.addExpensesBlock);
 plus1.addEventListener('click', appData.addIncomeBlock);
 period.addEventListener('input', appData.changePeriod);





for(let key in appData){
    // console.log('Наша программа включаете в себя данные: ' +key+ ' и значения:' +appData[key]);
};



let words = []
for(let item of appData.addExpenses){
    item = item.trim();
    item = item.charAt(0).toUpperCase() + item.slice(1);
    console.log(item);
    words.push(' ' + item);

    
}



