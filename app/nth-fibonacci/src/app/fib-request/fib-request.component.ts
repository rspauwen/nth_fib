import { Component, OnInit } from '@angular/core';
import { FibsService } from "../shared/fibs.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fib-request',
  templateUrl: './fib-request.component.html',
  styleUrls: ['./fib-request.component.scss']
})
export class FibRequestComponent implements OnInit {
  constructor(
    public fibsService: FibsService,
    private matSnackBar: MatSnackBar,
  ) { }

  loader = false;

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
      this.loader = true;

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
        }).finally(() => {
          this.loader = false;
        });
    }
  }
}
