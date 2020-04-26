import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: true }) signupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female', 'do not disclose'];
  defaultGender = 'do not disclose';
  submited = false;
  user = {
    name: '',
    email: '',
    secret: '',
    answer: '',
    gender: ''
  }

  suggestuserName() {
    const suggestedName = 'Superuser';
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }
  // onSubmit(form: NgForm) ;
  //   console.log(form)
  // }

  onSubmit() {
    this.submited = true;
    this.user.name = this.signupForm.form.value.userData.username;
    this.user.email = this.signupForm.form.value.userData.email;
    this.user.secret = this.signupForm.form.value.secret;
    this.user.answer = this.signupForm.form.value.questionAnswer;
    this.user.gender = this.signupForm.form.value.gender;
    this.signupForm.form.reset();
  }
}
