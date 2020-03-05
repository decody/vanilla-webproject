// exchangeRate-api

/*
// fetch()
function calculate() {
    // fetch('./items.json').then(res => console.log(res));
    fetch('./items.json')
        .then(res => res.json())
        .then(data => (document.body.innerHTML = data[0].text));
}
calculate();
*/

const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// fetch exchange rates and update the DOM
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            const rate = data.rates[currency_two];
            rateEl.innerText = `1 ${currency_one} = ${currency_two}`;

            // Number.toFixed() : 부동소수점 e.g) "123.46"
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);   
        });
}

// event listeners
currencyEl_one.addEventListener('change', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate();