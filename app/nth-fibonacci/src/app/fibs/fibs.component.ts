import { Component, OnInit } from '@angular/core';
import { FibsService } from "../shared/fibs.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fibs',
  templateUrl: './fibs.component.html',
  styleUrls: ['./fibs.component.scss']
})
export class FibsComponent implements OnInit {

  constructor(
    public fibsService: FibsService,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {}

  onSubmit() {
    const nthNumberInput = this.fibsService.form.controls['nthNumber'],
      nthNumber = nthNumberInput.value;

    if (nthNumber === "") return;
    
    if (!Number.isInteger(nthNumber) || nthNumber < 1) {
      this.matSnackBar.open(`Please provide a positive whole number`, "", {
        duration: 1000, verticalPosition: "top",
      });
    } else {
      // TODO: disable until blur + add loader
      this.fibsService.doFibRequest(nthNumber).then(
        (res: any) => {
          this.matSnackBar.open(`Fibonacci number at position ${nthNumber} is: ${res}`, "Okay!", {
            duration: 5000, verticalPosition: "top",
          });

          nthNumberInput.setValue("");
        },
        (err: any) => {
          this.matSnackBar.open(`Something went wrong: ${err.message}`, ":(", {
            duration: 1000, politeness: 'assertive',  verticalPosition: "top"
          });
        });
    }
  }
}
