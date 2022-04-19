
const Currentinput = document.getElementById('CurrentInput');
const currentEquation = document.getElementById('equation');

const NumberBtns =document.querySelectorAll('.num');
const Operators = document.querySelectorAll('.operator');
const equalBtn = document.getElementById('eqaul');

let changeSecondNumber = false;

//string format from input
let firstNumstr='',
    secondNumstr='',
    operator = null;

    //to be equal num  version of str version
let firstnum,
    secondnum;

let answer;
// returns a value based on key, replacement for eval function
const operation = {
    "+": function (num1,num2) {return num1 + num2},
    "-": function (num1,num2) {return num1 - num2},
    "*": function (num1,num2) {return num1 * num2},
    "/": function (num1,num2) {return num1 / num2},
    "**":function (num1,num2) {return num1 **num2},
    "!": function (num) {return}//fix
};

//event listners for number buttns
NumberBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        if (changeSecondNumber){//choosing the second number
            secondNumstr += btn.getAttribute('data-number')
            Currentinput.textContent = secondNumstr

            // after choosing the second number adding the operator to the current equation screen
            if (!currentEquation.textContent.includes('+')&& !currentEquation.textContent.includes('-')&&!currentEquation.textContent.includes('!')&&!currentEquation.textContent.includes('*')&&!currentEquation.textContent.includes('**')&&!currentEquation.textContent.includes('*'))
            currentEquation.textContent += ` ${operator}`

        } else {//cohoosing the first number
            firstNumstr += btn.getAttribute('data-number')
            Currentinput.textContent = firstNumstr
        };
    });
});


//event listners for operator buttons
Operators.forEach(operater =>{
    operater.addEventListener('click', ()=>{
        if (!changeSecondNumber && firstNumstr != ''){//choosing operator for equation initially
            changeSecondNumber=true
            operator = operater.getAttribute('data-operator')

            Currentinput.textContent = operator
            currentEquation.textContent = firstNumstr
        }
        else if (secondNumstr==''){//changing chosen operator before changing second number
            operator = operater.getAttribute('data-operator')
            Currentinput.textContent = operator
        };
    });
});

equalBtn.addEventListener('click', ()=>{
    ConvertStrToFloat()
    firstCalulate()
})

function ConvertStrToFloat(){
    firstnum = parseFloat(firstNumstr)
    secondnum = parseFloat(secondNumstr)
};

function firstCalulate(){
    answer = operation[operator](firstnum,secondnum)

    firstNumstr = `${answer}`

    currentEquation.textContent+= ` ${secondNumstr} = `
    Currentinput.textContent = `${answer}`

    secondNumstr=''
    changeSecondNumber = false
    answer = null

}
