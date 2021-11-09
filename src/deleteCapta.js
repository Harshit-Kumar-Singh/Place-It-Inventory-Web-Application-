const {dataBase}  =  require('./index');

function getRand(l, r) {
  let randomVal = parseInt(Math.random() * 100000000);
  let modVal = r - l + 1;
  randomVal = randomVal % modVal;
  return l + randomVal;
}

function deCap(n) {
  let expression = Array(2 * n - 1);
  for (let i = 0; i < expression.length; i += 2)
    expression[i] = getRand(1, 10).toString();
  for (let i = 1; i < expression.length; i += 2)
    expression[i] = "*+-"[getRand(0, 2)];
  expression = expression.join(" ");
  let ans = eval(expression);
  
  return ([expression, ans]);
}
function xx(){
    return deCap(3);
    
}
function deleteList(){
 console.log("time to do something")
}
module.exports = {xx};
