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
      // provided password param is actually a bit redundant due to API key restrictions
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
    // Perhaps a bit odd to do this request directly to the DB while API function is available...
    return this.db.collection("fibs", ref => ref.orderBy('timestamp', "desc")).snapshotChanges();
  }
}
