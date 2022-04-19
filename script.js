
const Currentinput = document.getElementById('CurrentInput');
const currentEquation = document.getElementById('equation');

const NumberBtns =document.querySelectorAll('.num');
const Operators = document.querySelectorAll('.operator');
const equalBtn = document.getElementById('eqaul');
const factorialBtn = document.getElementById('factorial')

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

//used to reset first number after a calculation and not append numbers to the answer
let justCalculated = false

const operation = {
    "+": function (num1,num2) {return num1 + num2},
    "-": function (num1,num2) {return num1 - num2},
    "*": function (num1,num2) {return num1 * num2},
    "÷": function (num1,num2) {return num1 / num2},
    "**":function (num1,num2) {return num1 **num2},
    "!": function (num){//using gamma function to calculate factorial in case of decimal factorial
        num += 1
        let desiredDecimalPrecision = 7, //7 is the max JS can handle 
            p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

        if (num < 0.5) return Math.PI / Math.sin(num * Math.PI) / gamma(1 - num)
        else {
            num--;
            let x = p[0];
            for (let i = 1; i < desiredDecimalPrecision + 2; i++) {
                x += p[i] / (num + i);
            }
            let t = num + desiredDecimalPrecision + 0.5;
            return (Math.sqrt(2 * Math.PI) * Math.pow(t, (num + 0.5)) * Math.exp(-t) * x);
        };
    },
};

//event listners for number buttns
NumberBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        if (changeSecondNumber){//choosing the second number
            secondNumstr += btn.getAttribute('data-number')
            Currentinput.textContent = secondNumstr

            // after choosing the second number adding the operator to the current equation screen
            if (!currentEquation.textContent.includes('+')&& !currentEquation.textContent.includes('-')&&!currentEquation.textContent.includes('!')&&!currentEquation.textContent.includes('*')&&!currentEquation.textContent.includes('**')&&!currentEquation.textContent.includes('÷'))
            currentEquation.textContent += ` ${operator}`

        }else if (justCalculated) {// reseting answer, so numbers arnt continously appended
            firstNumstr = btn.getAttribute('data-number')
            Currentinput.textContent = firstNumstr
            justCalculated = false

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

            currentEquation.textContent = firstNumstr
            Currentinput.textContent = operator
        } else if (secondNumstr==''){//changing chosen operator before changing second number
            operator = operater.getAttribute('data-operator')
            Currentinput.textContent = operator
        }else if (!secondNumstr =='' && changeSecondNumber){
            
            ConvertStrToFloat()
            firstCalulate()
            changeSecondNumber = true
            operator = operater.getAttribute('data-operator')

            currentEquation.textContent = answer
            Currentinput.textContent = operator
        };
    });
});

equalBtn.onclick = ()=>{
    ConvertStrToFloat()
    firstCalulate()
    answer = null
    justCalculated = true
};

factorialBtn.onclick = ()=>{
    firstnum = parseFloat(firstNumstr)
    answer = operation['!'](firstnum)

    currentEquation.textContent = `${firstNumstr}! =`
    Currentinput.textContent = answer
    justCalculated = true
    
};

// functions 

function ConvertStrToFloat(){//convertinfg str variables in actuall numbers to operate on
    firstnum = parseFloat(firstNumstr)
    secondnum = parseFloat(secondNumstr)
};

function firstCalulate(){//getting an answer using 2 numbers and displaying it 
    answer = operation[operator](firstnum,secondnum)
    firstNumstr = `${answer}`
    
    currentEquation.textContent+= ` ${secondNumstr} = `
    Currentinput.textContent = `${answer}`
    
    //reseting values
    secondNumstr=''
    changeSecondNumber = false
    operator = null
    firstnum = undefined
    secondnum = undefined
};
