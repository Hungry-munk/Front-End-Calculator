
const Currentinput = document.getElementById('CurrentInput')
const currentEquation = document.getElementById('equation')

const NumberBtns =document.querySelectorAll('.num')
const Operators = document.querySelectorAll('.operator')

let changeSecondNumber = false

let firstNum='',
    secondNum='',
    operator = null

// returns a value based on key, replacement for eval function
const operation = {
    "+": function (num1,num2) {return num1 + num2},
    "-": function (num1,num2) {return num1 - num2},
    "*": function (num1,num2) {return num1 * num2},
    "/": function (num1,num2) {return num1 / num2},
    "**":function (num1,num2) {return num1 **num2},
    "!": function (num) {return}//fix
};


NumberBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        if (changeSecondNumber){//choosing the second number
            secondNum += btn.getAttribute('data-number')
            Currentinput.textContent = secondNum

            if (!currentEquation.textContent.includes('+')&& !currentEquation.textContent.includes('-')&&!currentEquation.textContent.includes('!')&&!currentEquation.textContent.includes('*')&&!currentEquation.textContent.includes('**')&&!currentEquation.textContent.includes('*'))
            currentEquation.textContent += ` ${operator}`

        } else {//cohoosing the first number
            firstNum += btn.getAttribute('data-number')
            Currentinput.textContent = firstNum
        };
    });
});

Operators.forEach(operater =>{
    operater.addEventListener('click', ()=>{
        if (!changeSecondNumber && firstNum != ''){//choosing operator for equation initially
            changeSecondNumber=true
            operator = operater.getAttribute('data-operator')

            Currentinput.textContent = operator
            currentEquation.textContent = firstNum
        }
        else if (secondNum==''){//changing chosen operator before changing second number
            operator = operater.getAttribute('data-operator')
            Currentinput.textContent = operator
        };
    });
});
