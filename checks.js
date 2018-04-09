// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var date = require('./index.js');

function getFruitsCost() {
    var cost = 7;
    return function(count) {
        return cost * count;
    };
}
var getCost = getFruitsCost();
var price = getCost(10);

console.log(price);