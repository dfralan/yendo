const sheetID = '1CoqgRxK1WOkYsdZ6SPAUl9iWN2fEKm27TpzJ8YBvuLY';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'users';
let qu = 'SELECT A WHERE ROW >= 4 AND ROW <= 200';
const query = encodeURIComponent(qu);
const url = `${base}&sheet=${sheetName}&tq=${query}`;

document.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('ready');
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            const match = rep.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
            if (match) {
                const jsonResponse = JSON.parse(match[1]);
                const data = jsonResponse.table.rows.map(row => row.c[0].v); // Extract data from the first column (A)
                console.log(data);
            }
        })
        .catch(error => {
            console.error(error);
        });
}
