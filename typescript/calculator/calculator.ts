const opts = ["+", "-", "*", "/", "%"];

let calcString: string = "";
let calcValue: number = 0;

const operationScreen = document.querySelector(".operation") as HTMLSpanElement;
const outputScreen = document.querySelector(".output") as HTMLOutputElement;
const buttonGroup = document.querySelector(".button-group");

function renderScreen() {
  operationScreen.innerText = calcString;
  outputScreen.value = String(calcValue);
}

function toggleSign() {
  console.log("toggle 양음수전환");
}

function calc(): number {
  let expression = calcString.split(" ");

  expression = expression.reduce((acc: string[], cur, index) => {
    if (cur === "×" || cur === "÷" || cur === "%") {
      const prev = parseFloat(acc.pop() || "0");
      const next = parseFloat(expression[index + 1] || "0");

      if (cur === "×") {
        acc.push((prev * next).toString());
      } else if (cur === "÷") {
        acc.push((prev / next).toString());
      } else if (cur === "%") {
        acc.push((prev % next).toString());
      }
      return acc;
    }

    acc.push(cur);
    return acc;
  }, []);

  return expression.reduce((acc, cur, index): number => {
    const num = parseFloat(cur);

    if (index === 0) return num;

    const opt = expression[index - 1];

    if (opt === "+") {
      return acc + num;
    } else if (opt === "−") {
      return acc - num;
    }

    return acc;
  }, 0);
}

function handleCalculator(e: Event) {
  const target = e.target as HTMLButtonElement;
  const length = calcString.length;
  const lastChar = length > 0 ? calcString[length - 1] : "";
  const expressions = length > 0 ? calcString.split(" ") : [];

  if (target.className === "ac") {
    calcString = "";
    calcValue = 0;
  } else if (target.dataset.num) {
    const num = target.dataset.num;

    if ((num === "." && lastChar !== " ") || (num === "0" && String(expressions[expressions.length - 1])[0] !== "0")) return;
    calcString += num;
  } else if (calcString.length > 0 && target.classList.contains("opt")) {
    const opt = target.innerText;

    switch (target.title) {
      case "양수, 음수 전환":
        if (lastChar !== " ") toggleSign();
        break;
      case "계산":
        calcValue = calc();
        calcString = String(calcValue);
        break;
      default:
        if (lastChar === " ") calcString = calcString.slice(0, -2) + opt + " ";
        else calcString += " " + opt + " ";
    }
  } else if (calcString.length > 0 && target.title === "이전 입력 삭제") {
    if (lastChar === " ") calcString = calcString.slice(0, -3);
    else calcString = calcString.slice(0, -1);
  }

  renderScreen();
}

buttonGroup?.addEventListener("click", handleCalculator);
