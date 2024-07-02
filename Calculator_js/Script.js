const num1 = 10;
const num2 = 5;
const operator = '+';


function calculate(num1, num2, operator) {
    
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return 'Both inputs must be numbers.';
    }
    
    if (!['+', '-', '*', '/'].includes(operator)) {
        return 'Invalid operator. Valid operators are: +, -, *, /';
    }

    
    let result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                return 'Division by zero is not allowed.';
            }
            result = num1 / num2;
            break;
        default:
            return 'Invalid operator.';
    }

    return `The result of ${num1} ${operator} ${num2} is ${result}.`;
}

const result = calculate(num1, num2, operator);
console.log(result);
