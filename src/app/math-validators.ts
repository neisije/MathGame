import { AbstractControl, Form } from "@angular/forms";

export class MathValidators  {


  static addition( source1 : string, source2: string , target: string) {
    return (form: AbstractControl) => {
      const sum = form.value[target];
      const firstNumber = form.value[source1];
      const secondNumber = form.value[source2];
      if (firstNumber + secondNumber === parseInt(sum) ) {
        return null
      }
      return { addition: true }
    }
  }
}
