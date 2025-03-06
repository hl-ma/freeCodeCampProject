const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const countryCode = '^(1\\s?)?';
const areaCode = '(\\(\\d{3}\\)|\\d{3})[\\s\\-]?';
const centralOfficeCode = '\\d{3}[\\s\\-]?';
const lineNumber = '\\d{4}$';
const numberRegex = new RegExp(
    `${countryCode}${areaCode}${centralOfficeCode}${lineNumber}`
);

const displayResults = input => {
    if (!input)
        return alert("Please provide a phone number.");

    const isValidPhoneNumber = numberRegex.test(input);

    const pTag = document.createElement("p");
    pTag.textContent = `${isValidPhoneNumber ? "Valid" : "Invalid"} US number: ${input}`;
    pTag.style.color = isValidPhoneNumber ? "green" : "red";

    resultsDiv.appendChild(pTag);
}

checkBtn.addEventListener("click", () => {
    displayResults(userInput.value);
    userInput.value = '';
});

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        displayResults(userInput.value);
        userInput.value = '';
    }
})

clearBtn.addEventListener("click", () => resultsDiv.textContent = '');