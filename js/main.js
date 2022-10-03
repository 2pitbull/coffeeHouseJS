const userSurname = document.querySelector('.surname');
const userName = document.querySelector('.name');

const goodsElements = document.querySelectorAll('.checkbox');
const countElements = document.querySelectorAll('.counter');

const btn = document.querySelector('.btn');
const resultElem = document.querySelector('.sum');


let totalSum = 0;

//этот объект нужен для хранения количества каждого товара
//либо, вы можете создать переменные/массив для хранения значений 
const countGoods = {
  "expresso": 0,
  "americano": 0,
  "latte": 0,
  "capuchino": 0,
  "chocolate_muffin": 0,
  "blueberry_muffin": 0,
  "apple_tart": 0
}

//этот объект нужен для хранения цены каждого товара
//т.е. если товар выбран, записываем его цену, если не выбран - записываем 0
//либо, вы можете создать переменные/массив для хранения значений
const choicePriceGoods = {
  "expresso": 0,
  "americano": 0,
  "latte": 0,
  "capuchino": 0,
  "chocolate_muffin": 0,
  "blueberry_muffin": 0,
  "apple_tart": 0
}

const valueOfElements = {
  func() {
    goodsElements.forEach(elementCheckbox => {
      this[elementCheckbox.dataset.goods] = elementCheckbox.value;
    })
  }
};
valueOfElements.func();


function countTotalSum() {
  let total = 0;

  for (const elem in countGoods) {
    if (choicePriceGoods[elem]) {
      total += countGoods[elem] * valueOfElements[elem];
    }
  }
  return total;
}

btn.addEventListener('click', () => {
  alert(`
  Заказчик: ${userName.value} ${userSurname.value}
  Итого: ${countTotalSum()} р.`);
})


countElements.forEach(elem => {
  elem.addEventListener('change', () => {
    const value = elem.value;
    const id = elem.id;
    countGoods[id] = +value;

    if (countGoods[id] != 0) {
      elem.parentNode.firstElementChild.checked = 1;
      choicePriceGoods[id] = 1;
    } else if (countGoods[id] == 0) {
      elem.parentNode.firstElementChild.checked = 0;
      choicePriceGoods[id] = 0;
    }

    resultElem.textContent = `${countTotalSum()} р.`
  })
})


goodsElements.forEach(product => {
  product.addEventListener('change', () => {
    const dataset = product.dataset.goods;

    if (product.checked) {
      choicePriceGoods[dataset] = 1;

      if (countGoods[dataset] == 0) {
        const elem = document.getElementById(dataset);
        elem.value = 1;
        countGoods[dataset] = 1;
      }

    } else {
      choicePriceGoods[dataset] = 0;

      const elem = document.getElementById(dataset);
      elem.value = 0;
      countGoods[dataset] = 0;
    }

    resultElem.textContent = `${countTotalSum()} р.`
  })
});
