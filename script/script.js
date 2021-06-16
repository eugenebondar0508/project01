'use strict';
let calculate = document.getElementById('start');
let cancel = document.getElementById('cancel');
let plus1 =  document.getElementsByTagName('button')[0];
let plus2 =  document.getElementsByTagName('button')[1];
const checkDeposit = document.getElementById('deposit-check');
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
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
calculate.disabled = true;

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
    constructor(){
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.sum = 0;
    }

    start() {
        salaryAmount.value = salaryAmount.value.trim();
        if(!isNumber(salaryAmount.value)){
            alert('Введите сумму месячного дохода');
            return;
        }

        let allInput = document.querySelectorAll('.data input[type = text]');
        allInput.forEach(function(item){
            item.setAttribute('disabled', 'true');
        });
        plus1.setAttribute('disabled', 'true');
        plus2.setAttribute('disabled', 'true');
        calculate.style.display = 'none';
        cancel.style.display = 'block';
        
    
       
        this.budget = +salaryAmount.value;
    
    
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.changeSavedMoney();
        this.changePeriod();
        this.changeSavedMoney();
        this.getBudget();
        this.getStatusIncome();
    
    
        this.showResult();
          
     }

     reset() {
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

       this.otherPrecent();

       checkDeposit.checked = false;
       depositPercent.style.display = 'none';
       depositBank.style.display = 'none';
       depositAmount.style.display = 'none';

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
    }

    showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        dayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        additionalIncomeValue.value = this.addIncome.join(', ');
        
        incomePeriodValue.value = _this.calcSavedMoney();
        period.addEventListener('input', this.changeSavedMoney);
       
    
    
    }

    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plus2 );
        expensesItems = document.querySelectorAll('.expenses-items');
    
        if(expensesItems.length === 3){
            plus2.style.display = 'none';
        }
    }

     addIncomeBlock() {
  
    
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
       
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plus1);
        incomeItems = document.querySelectorAll('.income-items');
    
        if(incomeItems.length === 3){
            plus1.style.display = 'none';
        }
    
    }

     getExpInc() {

        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== ''){
                this[startStr][itemTitle] = +itemAmount;
            }
        }


        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for(let key in this.income){
            this.incomeMonth += +this.income[key];
         }
     }

     getAddExpenses() {

        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if(item !== ''){
                this.addExpenses.push(item);
            }
        })
     }

     getAddIncome() {

        additionalIncome.forEach((item) => {
           let itemValue = item.value.trim();
           if (item.value !== ''){
              this.addIncome.push(itemValue);
           } 
        });
     }

     getExpensesMonth() {
        for(let key in this.expenses){
            this.expensesMonth = this.expensesMonth +this.expenses[key];
        }
        return this.expensesMonth;
 }

 getTargetMonth() {
    return Math.ceil(target.value / this.budgetMonth);
 }

 getStatusIncome() {
    if (this.budgetDay > 1200){
        return('У вас высокий уровень дохода');
    } else if(this.budgetDay > 600 && this.budgetDay < 1200 ){
        return('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay > 0){
        return('К сожалению у вас уровень дохода ниже среднего');
    
    } else{
        return('Что то пошло не так');
    }
 }

 getBudget(){
     const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget +this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    return;
 
   
 }

 getInfoDeposit(){
    if(this.deposit){
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
 }

 calcSavedMoney(){
    return this.budgetMonth * period.value;
  }

  changePeriod(){
    periodAmount.textContent = period.value;
 }

 changeSavedMoney(){
    incomePeriodValue.value = this.budgetMonth * period.value;
  }

  startError() {
    if(salaryAmount.value === ''){
        calculate.disabled = true;          
    } else {
        calculate.disabled = false;
    }
    
    
 }
 changePercent(){
     const valueSelect = this.value;
     if(valueSelect === 'other'){
        depositPercent.style.display = 'inline-block';    
     }
      else {
         depositPercent.value = valueSelect;
         depositPercent.style.display = 'none';

     }
 }
    otherPrecent(){
        if(depositPercent.value > 100 || depositPercent.value <= 0 || !isNumber(depositPercent.value)){
            
            alert('Введите число от 0 до 100');
            calculate.setAttribute('disabled', 'true');
            
        } else {
            
            calculate.removeAttribute('disabled');

        }
  }

 depositHandler(){
     if (checkDeposit.checked){
         depositBank.style.display = 'inline-block';
         depositAmount.style.display = 'inline-block';
         this.deposit = true;
         depositBank.addEventListener('change', this.changePercent);
     } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositBank.value = ''
        depositAmount.value = '';
        this.deposit = false;
        depositBank.removeEventListener('change', this.changePercent);
     }
 }

 eventsListeners(){
    salaryAmount.addEventListener('input', this.startError);
    calculate.addEventListener('click', this.start.bind(appData));
    cancel.addEventListener('click', this.reset.bind(appData));
    plus2.addEventListener('click', this.addExpensesBlock);
    plus1.addEventListener('click', this.addIncomeBlock);
    period.addEventListener('change', this.changePeriod);

    checkDeposit.addEventListener('change', this.depositHandler.bind(this));
    depositPercent.addEventListener('change', this.otherPrecent);
}

};

const appData = new AppData();
appData.eventsListeners();
// console.log(appData);

 




let words = []
for(let item of appData.addExpenses){
    item = item.trim();
    item = item.charAt(0).toUpperCase() + item.slice(1);
    console.log(item);
    words.push(' ' + item);   
}



