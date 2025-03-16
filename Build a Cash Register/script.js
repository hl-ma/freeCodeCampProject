let price = 1.87;
let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDueDisplay = document.getElementById('change-due');
const registerDisplay = document.querySelector('.top-display');
const registerDrawer = document.querySelector('.drawer');

const updateChangeDueDisplay = (expression, status, change) => {
    changeDueDisplay.style.display = 'block';
    switch (expression) {
        case "exactCash":
            changeDueDisplay.textContent = 'No change due - customer paid with exact cash';
            break;
        case "customerInsufficientCash":
            alert("Customer does not have enough money to purchase the item");
            changeDueDisplay.textContent = 'Customer does not have enough money to purchase the item';
            break;
        case "changeDue":
            changeDueDisplay.innerHTML = `
            <p>Status: ${status}<p> 
            ${change.map((el) => `
                <p>${el[0]}: $${el[1].toFixed(2)}</p>
                `).join('')}`;
            break;
        case "RegisterInsufficientFunds":
            changeDueDisplay.innerHTML = `<p>Status: ${status}<p>`;
            break;
        default:
            changeDueDisplay.textContent = 'Error: Undefined expression';
    }
}
class Register {
    constructor(price, cid) {
        this.price = price;
        this.cid = cid;
        this.currencyUnits = [
            ['ONE HUNDRED', 10000],
            ['TWENTY', 2000],
            ['TEN', 1000],
            ['FIVE', 500],
            ['ONE', 100],
            ['QUARTER', 25],
            ['DIME', 10],
            ['NICKEL', 5],
            ['PENNY', 1]
        ];
        this.currencyNameMap = {
            PENNY: 'Pennies',
            NICKEL: 'Nickels',
            DIME: 'Dimes',
            QUARTER: 'Quarters',
            ONE: 'Ones',
            FIVE: 'Fives',
            TEN: 'Tens',
            TWENTY: 'Twenties',
            'ONE HUNDRED': 'Hundreds'
        };
    }
    get cidToCents() {
        return Math.round(this.cid.reduce((acc, curr) => acc + curr[1], 0) * 100);
    }
    updateRegisterDisplay() {
        const drawerInfo = this.cid.map(
            (el) => this.currencyNameMap[el[0]] + ': ' + el[1].toFixed(2)
        ).join('<br>');

        registerDisplay.textContent = `Total: $${price.toFixed(2)}`;
        registerDrawer.innerHTML = `
                <strong>Change in drawer:</strong><br> 
                ${drawerInfo}
            `;
    }
    calculateChange(cashInput) {
        const priceToCents = Math.round(this.price * 100);
        const cashToCents = Math.round(Number(cashInput) * 100);
        let changeDue = cashToCents - priceToCents;
        console.log(changeDue);

        if (cashToCents === priceToCents) return { expression: 'exactCash', status: '', change: [] };
        if (cashToCents < priceToCents) return { expression: 'customerInsufficientCash', status: '', change: [] };
        if (changeDue > this.cidToCents) return { expression: 'RegisterInsufficientFunds', status: 'INSUFFICIENT_FUNDS', change: [] };

        const changeToGive = [];
        for (let [currency, unitValue] of this.currencyUnits) {
            let currencyInDrawerToCents = Math.round(
                this.cid.find(el => el[0] === currency)[1] * 100
            );
            let currencyUsed = 0;
            while (changeDue >= unitValue && currencyInDrawerToCents > 0) {
                currencyInDrawerToCents -= unitValue;
                changeDue -= unitValue;
                currencyUsed++;
            }
            if (currencyUsed) {
                changeToGive.unshift([currency, currencyUsed * unitValue / 100]);
            }
        }
        if (changeDue !== 0) return { expression: 'RegisterInsufficientFunds', status: 'INSUFFICIENT_FUNDS', change: [] };

        let cidRemaining = this.cidToCents;
        changeToGive.map(([currency, value]) => {
            for (let currencyInDrawer of this.cid) {
                if (currencyInDrawer[0] === currency) {
                    currencyInDrawer[1] -= value;
                    cidRemaining -= value * 100;
                    break;
                }
            }
        })
        return cidRemaining === 0
            ? { expression: 'changeDue', status: 'CLOSED', change: changeToGive }
            : { expression: 'changeDue', status: 'OPEN', change: changeToGive };
    }
}

const register = new Register(price, cid);

purchaseBtn.addEventListener('click', () => {
    const { expression, status, change } = register.calculateChange(cashInput.value);
    updateChangeDueDisplay(expression, status, change);
    register.updateRegisterDisplay();
})

cashInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const { expression, status, change } = register.calculateChange(cashInput.value);
        updateChangeDueDisplay(expression, status, change);
        register.updateRegisterDisplay();
    }
})

window.addEventListener('load', () => {
    register.updateRegisterDisplay();
});