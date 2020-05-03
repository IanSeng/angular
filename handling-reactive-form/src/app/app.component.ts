import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenNames = ['test', 'abc'];


  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNameCheck.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailCheck),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })
    // Reacting to status or value change (could be a useful to debut and so on)
    this.signupForm.get('userData').get('email').valueChanges.subscribe( value => {
      console.log(value)
    })

    // Path of set value of the form 
    this.signupForm.patchValue({
      'userData': {
        'username': 'hello'
      }
    })
  }

  onSubmit(){
    console.log(this.signupForm)
    // Reset the form 
    this.signupForm.reset();
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // customized validator for user name input
  forbiddenNameCheck(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenNames.indexOf(control.value) !== -1){
      return {'nameIsForbiden': true}
    } else {
      return null
    }

  }

  // async validator to use timeout to mimic async
  forbiddenEmailCheck(control: FormControl): Promise<{[s: string]: boolean}> | Observable<any>{
    const promise = new Promise<{[s: string]: boolean}>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'test@test.com'){
          resolve({'emailForBiddenTrue': true})
        } else {
          resolve(null);
        }
      }, 1500)
    })
    return promise;
  }


}
