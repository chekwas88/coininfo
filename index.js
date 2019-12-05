// https://api.coinlore.com/api/tickers/?start=100&limit=100

let start = 1;
let nextStart = 11;
let previousStart;
let previousCounter = 0;
let nextCounter = 0
const limit = 10;
const buttonNext = document.querySelector('.next');
const buttonPrevious = document.querySelector('.previous');

window.onload = async () => {
    try {
        const response = await fetch(`https://api.coinlore.com/api/tickers/?start=${start}&limit=${limit}`);
        const resJson = await response.json();
        nextStart += limit;
        const {data} = resJson;
        if(data) {
            const tableBody = document.querySelector('tbody');
            let output = '';
            data.map((coin) => {
                output += `<tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol}</td>
                    <td>$${coin.price_usd}</td>
                    <td>${coin.tsupply} ${coin.symbol}</td>
                </tr>
                `
            })
        
            tableBody.innerHTML = output;
        }
        buttonPrevious.classList.add('hidden');
    }catch (err) {
        if(err){
            alert('Something went wrong... try again later')
        }
    }
}

buttonNext.onclick = async () => {
    try {
        const response = await fetch(`https://api.coinlore.com/api/tickers/?start=${nextStart}&limit=${limit}`);
        const resJson = await response.json();
        nextStart += limit;
        const {data} = resJson;
        if(data) {
            const tableBody = document.querySelector('tbody');
            let output = '';
            data.map((coin) => {
                output += `<tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol}</td>
                    <td>$${coin.price_usd}</td>
                    <td>${coin.tsupply} ${coin.symbol}</td>
                </tr>
                `
            })
            buttonPrevious.classList.remove('hidden') ;
            tableBody.innerHTML = output;
        }
    }catch (err) {
        if(err){
            alert('Something went wrong... try again later')
        }
    }

}

buttonPrevious.onclick = async () => {
    previousStart = nextStart - limit * 2
    let response;
    try {
        response = await fetch(`https://api.coinlore.com/api/tickers/?start=${previousStart}&limit=${limit}`);
        const resJson = await response.json();
        nextStart -= limit
        const {data} = resJson;
        if(data) {
            if(nextStart === 11){
                buttonPrevious.classList.add('hidden');
            }
            const tableBody = document.querySelector('tbody');
            let output = '';
            data.map((coin) => {
                output += `<tr>
                    <td>${coin.name}</td>
                    <td>${coin.symbol}</td>
                    <td>$${coin.price_usd}</td>
                    <td>${coin.tsupply} ${coin.symbol}</td>
                </tr>
                `
            })
            
            tableBody.innerHTML = output;
        }
    } catch (err) {
        if(err){
            alert('Something went wrong... try again later')
        }
    }
}
