const XLSX = require('xlsx');
const workbook = XLSX.readFile('Top100Crypto.xlsx');
const sheet_name_list = workbook.SheetNames;
// var json = JSON.stringify(
//   XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
// );
let coinList1 = '';
let coinList2 = '';

XLSX.utils
  .sheet_to_json(workbook.Sheets[sheet_name_list[0]])
  .slice(0, 50)
  .forEach(function(element) {
    coinList1 = coinList1 + element.Symbol + ',';
  });

coinList1 = coinList1.substring(0, coinList1.length - 1);

XLSX.utils
  .sheet_to_json(workbook.Sheets[sheet_name_list[0]])
  .slice(50, 101)
  .forEach(function(element) {
    coinList2 = coinList2 + element.Symbol + ',';
  });

coinList2 = coinList2.substring(0, coinList2.length - 1);

console.log(coinList1);
console.log(coinList1.length);

console.log(coinList2);
console.log(coinList2.length);

// var fs = require('fs');
// fs.writeFile('top100.json', json, 'utf8', function() {});
