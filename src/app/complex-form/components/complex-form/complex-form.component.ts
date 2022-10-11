import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChildActivationEnd } from '@angular/router';
import { map, startWith, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {


  mainForm!: FormGroup;
  personnalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  phoneCtrl!: FormControl;
  passwordControl!: FormControl;

  confirmPasswordCtrl!: FormControl
  loginInfoForm!: FormGroup

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initFormControl()
    this.initMainForm();
    this.initFormObservables()
  }



  private initMainForm(): void {

    this.mainForm = this.formBuilder.group({
      personnalInfo: this.personnalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm


    })
  }

  private initFormControl() {
    this.personnalInfoForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required]
    })
    this.contactPreferenceCtrl = this.formBuilder.control("email")
    this.emailCtrl = this.formBuilder.control("")
    this.emailForm = this.formBuilder.group({

      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    })
    this.phoneCtrl = this.formBuilder.control("")
    this.passwordControl = this.formBuilder.control("", Validators.required)
    this.confirmEmailCtrl = this.formBuilder.control("", Validators.required)
    this.loginInfoForm = this.formBuilder.group({

      username: ["", Validators.required],
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordCtrl,
    })

  }


  initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === "email"),
    )
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === "phone"),
      tap(showPhoneCtrl => {
        if (showPhoneCtrl) {
          this.phoneCtrl.addValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
        }

        else {
          this.phoneCtrl.clearValidators()
        }
        this.phoneCtrl.updateValueAndValidity()
      })
    )
  }
  onSubmitForm() {

    console.log(this.mainForm.value)
  }

}
