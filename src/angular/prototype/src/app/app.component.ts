import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes'
import { MatChipInputEvent } from '@angular/material/chips';
import { PatternService } from 'src/services/pattern.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  patternFormGroup: FormGroup;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private sub$: Subscription | null = null;

  get tileFormControl() {
    return this.patternFormGroup.get('title') as FormControl;
  }

  get descriptionFormControl() {
    return this.patternFormGroup.get('description') as FormControl;
  }

  tags: string[] = [];

  constructor(private readonly fb: FormBuilder,
              private readonly service: PatternService) {
    this.patternFormGroup = fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  submit() {
    this.sub$ = this.service.savePatterns({ title: this.tileFormControl.value, description: this.descriptionFormControl.value, tags: this.tags }).subscribe(val => {
      console.log(val);
    });
  }
}
