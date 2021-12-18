import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class FibsService {
  constructor(
    private db: AngularFirestore,
    private functions: AngularFireFunctions,
  ) { }

  form = new FormGroup({
    nthNumber: new FormControl(''),
  })

  doFibRequest(nthNumber: number): any {
    return new Promise((resolve, reject) => {
      const callable = this.functions.httpsCallable(`app/fibonacci/${nthNumber}?pw=vr`);
      const obs = callable({});

      obs.subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getFibRequests() {
    return this.db.collection("fibs", ref => ref.orderBy('timestamp', "desc")).snapshotChanges();
  }
}
