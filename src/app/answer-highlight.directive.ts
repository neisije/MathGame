import { Directive , ElementRef} from '@angular/core';
import { FormGroup, NgControl } from '@angular/forms';
import { map, filter } from 'rxjs/operators';
@Directive({
  selector: '[appAnswerHighlight]'
})
export class AnswerHighlightDirective {

  constructor(private el: ElementRef, private controlName: NgControl) {
    console.log(el);
   }

   ngOnInit () {
    const parentFormGroup = this.controlName.control?.parent;

    parentFormGroup?.valueChanges
    .pipe(
      map(({a, b, answer}) => {
        return Math.abs((a+b-answer)/(a+b))
      })
    )
    .subscribe((value) => {
      if (value < 0.2) {
        this.el.nativeElement.classList.add('close')
      } else {
        this.el.nativeElement.classList.remove('close')
      }
    })
   }

}
