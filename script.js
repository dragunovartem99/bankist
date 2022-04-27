"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Artem Dragunov",
  movements: [2000, 4500, -4000, 30000, -6500, -1300, 700, 13000],
  interestRate: 1.2, // %
  pin: 1999,
};

const account2 = {
  owner: "Vadim Morozov",
  movements: [50000, 34000, -1500, -7900, -32100, -10000, 8500, -300],
  interestRate: 1.5,
  pin: 1994,
};

const account3 = {
  owner: "Vladislav Kokoev",
  movements: [20000, -2000, 3400, -3000, -200, 500, 4000, -4600],
  interestRate: 0.7,
  pin: 1996,
};

const account4 = {
  owner: "Sattar Riza-Zade",
  movements: [4300, 10000, 7000, 500, 900],
  interestRate: 1,
  pin: 1999,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["RUB", "Ruble"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

function displayMovements(movements) {
  containerMovements.innerHTML = "";

  movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const rowEl = document.createElement("div");
    rowEl.classList.add("movements__row");

    const labelEl = document.createElement("div");
    labelEl.classList.add("movements__type", `movements__type--${type}`);
    labelEl.textContent = `${i + 1} ${type}`;

    const valueEl = document.createElement("div");
    valueEl.classList.add("movements__value");
    valueEl.textContent = `${mov}₽`;

    rowEl.appendChild(labelEl);
    rowEl.appendChild(valueEl);

    containerMovements.insertAdjacentElement("afterbegin", rowEl);
  });
}

function createUsernames(accounts) {
  accounts.forEach((acc) => {
    acc.username = acc.owner
      .toUpperCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
}

createUsernames(accounts);

function calcDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}₽`;
}

function calcDisplaySummary(acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}₽`;

  const withdrawals = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(withdrawals)}₽`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .filter((interest) => interest > 10)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}₽`;
}

function updateUI(acc) {
  displayMovements(acc.movements);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
}

let currentAccount;

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    containerApp.style.opacity = 1;

    inputLoginPin.value = inputLoginUsername.value = "";
    inputLoginPin.blur();
    inputLoginUsername.blur();

    updateUI(currentAccount);
  }
});
