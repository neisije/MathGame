import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay , filter , scan} from 'rxjs/operators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution : number = 0;

  mathForm = new FormGroup({
    a : new FormControl(this.randomNumber()),
    b : new FormControl(this.randomNumber()),
    answer : new FormControl('')
  },[
    MathValidators.addition('a','b','answer')
  ]);

  constructor() { }

  ngOnInit(): void {
    this.mathForm.statusChanges.pipe(
      filter( value => value === 'VALID'),
      delay(250),
      scan((acc) => {
        return {
          numberSolved: acc.numberSolved + 1 , 
          startTime : acc.startTime
        }
      }, { numberSolved: 0,startTime: new Date() })
    ).subscribe(({numberSolved, startTime}) => {
        this.secondsPerSolution = (
          new Date().getTime() - startTime.getTime()
        ) / numberSolved / 1000;

        this.mathForm.setValue({
          a : this.randomNumber(),
          b: this.randomNumber(),
          answer: ''
        });
    })
  }

  close() {
    return Math.abs(this.a + this.b -this.answer) === 1 ? 'close' : 'notclose';
  }

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  get answer() {
    return this.mathForm.value.answer;
  }

  randomNumber() {
    return Math.floor(Math.random() * 100);
  }
}
