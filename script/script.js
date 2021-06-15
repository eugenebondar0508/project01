'use strict';
let calculate = document.getElementById('start');
let cancel = document.getElementById('cancel');
let plus1 =  document.getElementsByTagName('button')[0];
let plus2 =  document.getElementsByTagName('button')[1];
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

const AppData = function(){
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this. budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this. sum = 0;
}

AppData.prototype.start = function(){


    let allInput = document.querySelectorAll('.data input[type = text]');
    allInput.forEach(function(item){
        item.setAttribute('disabled', 'disabled');
    });
    plus1.setAttribute('disabled', 'true');
    plus2.setAttribute('disabled', 'true');
    calculate.style.display = 'none';
    cancel.style.display = 'block';

   
    this.budget = +salaryAmount.value;


    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getInfoDeposit();
    this.getStatusIncome();


    this.showResult();
    
   
 };

 AppData.prototype.reset = function(){
    let inputData = document.querySelectorAll('.data input[type = text]');
    let resultInput = document.querySelectorAll('.result input[type = text]');
    plus1.disabled = false;
    plus2.disabled = false;
    inputData.forEach(function(el){
        el.value = '';
        el.removeAttribute('disabled');
        period.value ='0';
        periodAmount.innerHTML = period.value;
    });
    
    resultInput.forEach(function(el){
        el.value = '';
    });

    for(let i = 1; i < incomeItems.length; i++){
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        plus1.style.display = 'block';
    } 
    for(let i = 1; i< expensesItems.length; i++){
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        plus2.style.display = 'block';
    };
    calculate.style.display = 'block';
    cancel.style.display = 'none';
    if(salaryAmount.value === ''){
       calculate.disabled = true;          
   } else {
       calculate.disabled = false;
   };
   this.income = {};
   this.incomeMonth =0;
   this.addIncome =[];
   this.expenses = {};
   this.addExpenses =[];
   this.deposit = false;
   this.percentDeposit =0;
   this.moneyDeposit =0;
   this.budget = 0;
   this.budgetDay =0;
   this.budgetMonth  =0;
   this.expensesMonth =0;
   this.sum =0;
};

AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    dayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    additionalIncomeValue.value = this.addIncome.join(', ');
    
    incomePeriodValue.value = _this.calcSavedMoney();
    period.addEventListener('input', this.changeSavedMoney);
   


};
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plus2 );
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
        plus2.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function(){
    const _this = this;
   expensesItems.forEach(function(item){
       let itemExpenses = item.querySelector('.expenses-title').value;
       let cashExpenses = item.querySelector('.expenses-amount').value;
       if(itemExpenses !== '' && cashExpenses !== ''){
           _this.expenses[itemExpenses] = +cashExpenses;
       }

   })
};
AppData.prototype.addIncomeBlock = function(){
  
    
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
   
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plus1);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
        plus1.style.display = 'none';
    }

};
AppData.prototype.getIncome = function(){
    const _this = this;
   incomeItems.forEach(function(item){
    
       let itemIncome = item.querySelector('.income-title').value;
       let cashIncome = item.querySelector('.income-amount').value;
       if(itemIncome !== '' && cashIncome !== ''){
           _this.income[itemIncome] = +cashIncome;
       };
       for(let key in _this.income){
          _this.incomeMonth += +_this.income[key];
       }
   });

};

AppData.prototype.getAddExpenses = function(){

   let addExpenses = additionalExpensesItem.value.split(',');
   const _this = this;
   addExpenses.forEach(function(item){
       item = item.trim();
       if(item !== ''){
           _this.addExpenses.push(item);
       }
   })
},
AppData.prototype.getAddIncome = function(){
    const _this = this;
   additionalIncome.forEach(function(item){
      let itemValue = item.value.trim();
      if (item.value !== ''){
         _this.addIncome.push(itemValue);
      } 
   });
};

AppData.prototype.getExpensesMonth = function(){
       for(let key in this.expenses){
           this.expensesMonth = this.expensesMonth +this.expenses[key];
       }
       return this.expensesMonth;
};

AppData.prototype.getTargetMonth = function(){
   return target.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function(){
   if (this.budgetDay > 1200){
       return('У вас высокий уровень дохода');
   } else if(this.budgetDay > 600 && this.budgetDay < 1200 ){
       return('У вас средний уровень дохода');
   } else if (this.budgetDay < 600 && this.budgetDay > 0){
       return('К сожалению у вас уровень дохода ниже среднего');
   
   } else{
       return('Что то пошло не так');
   }
};

AppData.prototype.getBudget = function(){
   this.budgetMonth = this.budget +this.incomeMonth - this.expensesMonth;
   this.budgetDay = Math.floor(this.budgetMonth / 30);
   return;

  
};
AppData.prototype.getInfoDeposit = function(){
   if(this.deposit){
       do{
           this.percentDeposit = prompt('Какой годовой процент?');
       } while(!isNumber(this.percentDeposit));
       
       do{
           this.moneyDeposit = prompt('Какая сумма заложена?');
       } while(!isNumber(this.moneyDeposit));
   }
};

AppData.prototype.calcSavedMoney = function(){
  return this.budgetMonth * period.value;
};

AppData.prototype.changePeriod = function(){
   periodAmount.innerHTML = period.value;
}; 

AppData.prototype.changeSavedMoney = function(){
  incomePeriodValue.value = this.budgetMonth * period.value;
};

AppData.prototype.startError = function(){
   if(salaryAmount.value === ''){
       calculate.disabled = true;          
   } else {
       calculate.disabled = false;
   }
   
   
};

AppData.prototype.eventsListeners = function(){
    salaryAmount.addEventListener('input', this.startError);
    calculate.addEventListener('click', this.start.bind(appData));
    cancel.addEventListener('click', this.reset.bind(appData));
    plus2.addEventListener('click', this.addExpensesBlock);
    plus1.addEventListener('click', this.addIncomeBlock);
    period.addEventListener('input', this.changePeriod);
};

const appData = new AppData();
appData.eventsListeners();
// console.log(appData);

 




// let words = []
// for(let item of appData.addExpenses){
//     item = item.trim();
//     item = item.charAt(0).toUpperCase() + item.slice(1);
//     console.log(item);
//     words.push(' ' + item);   
// }



