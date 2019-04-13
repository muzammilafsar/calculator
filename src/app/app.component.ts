import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  calHistory = [];
  currentEntered = '';
  currentOperator = '';
  lastNumber = '';
  lastOperator = '';
  operatorPressed = false;
  onNumberClick(num) {
    if (this.operatorPressed) {
      this.currentEntered = '';
      this.operatorPressed = false;
    }
    console.log(num);
    this.currentEntered = this.currentEntered + num;
  }
  cal(op) {
    let ans = 0;
    if (this.lastNumber && this.currentEntered) {
      switch (op) {
        case '*':
          ans = parseFloat(this.lastNumber) * parseFloat(this.currentEntered);
          break;
        case '/':
          ans = parseFloat(this.lastNumber) / parseFloat(this.currentEntered);
          break;
        case '+':
          ans = parseFloat(this.lastNumber) + parseFloat(this.currentEntered);
          break;
        case '-':
          ans = parseFloat(this.lastNumber) - parseFloat(this.currentEntered);
          break;
      }
    } else if (this.currentEntered) {
      ans = parseFloat(this.currentEntered);
    }
    return ans;
  }
  onOperatorClick(op) {
    this.operatorPressed = true;
    let firstEmpty = false;
    let ans = this.cal(op);
    if (op !== '=') {
      if (typeof this.calHistory[this.calHistory.length - 1] == 'string' && this.currentEntered === '') {
        this.calHistory = this.calHistory.slice(0, this.calHistory.length - 2);
      }
      if (this.calHistory.length === 0 && this.currentEntered === '') {
        firstEmpty = true;
      }
      this.calHistory.push(parseFloat(firstEmpty ? '0':this.currentEntered));
      this.calHistory.push(op);
      this.lastNumber = ans.toString();
      this.currentEntered = firstEmpty ?  '': ans.toString();
    }
    else {
      if (this.calHistory.length === 0) {
        this.currentEntered = eval(`${this.lastNumber} ${this.lastOperator} ${this.currentEntered}`)
      } else {

        this.lastOperator = this.calHistory[this.calHistory.length - 1];
        this.calHistory.push(parseFloat(this.currentEntered));
        this.lastNumber = this.currentEntered;
        this.currentEntered = eval(this.calHistory.join(' '));
        this.calHistory = [];
      }
    }
  }
  get history() {
    return this.calHistory.join(' ');
  }
  reset() {
    this.calHistory = [];
    this.currentEntered = '';
    this.currentOperator = '';
    this.operatorPressed =false;
    this.lastNumber = '';
    this.lastOperator = '';
  }
}
