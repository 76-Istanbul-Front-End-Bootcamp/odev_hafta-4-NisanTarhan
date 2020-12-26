const data = {
  USD: { EUR: 0.82, GBP: 0.74, JPY: 103.33 },
  EUR: { USD: 1.23, GBP: 0.91, JPY: 126.51 },
  GBP: { USD: 1.35, EUR: 1.1, JPY: 139.12 },
  JPY: { GBP: 0.0072, USD: 0.0097, EUR: 0.0079 },
};

const currencyKeys = Object.keys(data);

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);


const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function () {
  const fromTarget = document.querySelector("input[name='currency_from']:checked");
  const toTarget = document.querySelector("input[name='currency_to']:checked");
  const currencyResult = document.querySelector("#currency-result");
  const amount = document.querySelector("input[name='amount']")

  const fromTargetValue = fromTarget?.value;
  const toTargetValue = toTarget?.value;
  const amountValue = Number(amount.value);

  currencyResult.innerHTML = calculateCurrency(fromTargetValue, toTargetValue, amountValue)

  currencyResult.className = "show";
  setTimeout(function () { currencyResult.className = currencyResult.className.replace("show", ""); }, 3000);

  function calculateCurrency(fromTargetValue, toTargetValue, amountValue) {
    if (!fromTarget && !toTarget) return "Seçim yapmalısınız!"
    if (!fromTarget) return "Çevrilecek değer seçilmedi";
    if (!toTarget) return "Çevrilmek istenen değer seçilmedi.";
    if (fromTargetValue === toTargetValue) return "Farklı seçimler yapmalısınız!"
    if (typeof amountValue !== "number" || isNaN(amountValue)) return "Amout olarak sayı girmelisiniz."
    const currentCurrencyObject = data[fromTargetValue];
    const resultForOne = currentCurrencyObject[toTargetValue];
    const result = amountValue * resultForOne;
    return amountValue + " " + fromTargetValue + " = " + result + " " + toTargetValue;
  }
});


function createCurrencyElements(elements, root, inputName) {
  for (let i = 0; i < elements.length; i++) {
    const currencyKeyDiv = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}
