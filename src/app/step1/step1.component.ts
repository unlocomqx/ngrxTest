import { Component, OnInit } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import { actions } from "../reducers/connect-form.reducer";

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  private path = "newStory";

  constructor (
    private store: Store<any>
  ) {
  }

  ngOnInit() {
    this.initFormGroup1();
    this.initFormGroup2();
    this.registerStateChange();
    this.registerFormChange();
  }

  private initFormGroup1 () {
    this.form = new FormGroup({
      firstName: new FormControl("", []),
      lastName : new FormControl("", []),
    });
  }

  private initFormGroup2 () {
    this.form2 = new FormGroup({
      email: new FormControl("", [Validators.required]),
      isTunisian : new FormControl(true, []),
    });
  }

  private registerStateChange () {
    this.store.select((state) => {
      return state.forms[this.path];
    })
      .subscribe((formValue) => {
        const currentValue = this.form.getRawValue();
        if (JSON.stringify(formValue) !== JSON.stringify(currentValue)) {
          this.form.patchValue(formValue);
        }
      });
  }

  private registerFormChange () {
    this.form.valueChanges.subscribe((value) => {
      this.store.dispatch({
        type   : actions.UPDATE_FORM,
        payload: {
          value,
          path: this.path,
        }
      });
    });
  }
}
