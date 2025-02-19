const userInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const displayResult = document.getElementById("result");

const isPalindrome = (str) => {
    const cleanInput = str.split('')
        .filter(char => /[a-zA-Z0-9]/.test(char))
        .join('')
        .toLowerCase();

    const reverseString = cleanInput.split('').reverse().join('');
    return cleanInput === reverseString;
}

const checkPalindrome = (e) => {
    if (e.type === "click" || e.key === "Enter") {
        const input = userInput.value;

        if (input.trim() === '')
            return alert("Please input a value");

        const result = `${input} ${isPalindrome(input) ? "is" : "is not"} a palindrome.`;
        displayResult.textContent = result;
        displayResult.classList.remove("hidden");
        userInput.value = "";
    };
};

userInput.addEventListener("keydown", checkPalindrome);
checkButton.addEventListener("click", checkPalindrome);