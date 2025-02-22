const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const resultContainer = document.getElementById("result-container");
const result = document.getElementById("output");

const romanToArabicTable = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1]
];

const handleInputValidation = (input) => {
    if (!input) return 'Please enter a valid number.';
    if (input <= 0) return 'Please enter a number greater than or equal to 1.';
    if (input >= 4000) return 'Please enter a number less than or equal to 3999';
}

// Iteration
const handleArabicToRoman = (input) => {
    let result = '';
    while (input > 0) {
        const [roma, value] = [...romanToArabicTable.find(([_, val]) => input >= val)];
        result += roma;
        input -= value;
    }
    return result;
}

// Recursion
// const handleArabicToRoman = (input) => {
//     if (input <= 0) return '';
//     const [roma, value] = [...romanToArabicTable.find(([_, val]) => input >= val)];
//     return roma + handleArabicToRoman(input - value);
// }

const handleConvert = (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
        resultContainer.classList.remove('hidden', 'error');
        const inputValue = numberInput.value;
        const errorMessage = handleInputValidation(inputValue);
        if (errorMessage) {
            resultContainer.classList.add('error')
            result.textContent = errorMessage;
            return;
        }
        result.textContent = handleArabicToRoman(inputValue);
    }
}

convertBtn.addEventListener('click', handleConvert);
numberInput.addEventListener('keydown', handleConvert);