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
            const start = rep.indexOf('{"cols":[');
            const end = rep.indexOf('}]}');
            if (start !== -1 && end !== -1) {
                const jsonResponse = JSON.parse(rep.substring(start, end + 2));
                const data = jsonResponse.rows.map(row => row.c[0].v); // Extract data from the first column (A)
                console.log(data);
            }
        })
        .catch(error => {
            console.error(error);
        });
}
