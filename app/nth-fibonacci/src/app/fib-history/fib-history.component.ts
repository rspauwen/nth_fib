import { Component, OnInit } from '@angular/core';
import { FibsService } from "../shared/fibs.service";

@Component({
  selector: 'app-fib-history',
  templateUrl: './fib-history.component.html',
  styleUrls: ['./fib-history.component.scss']
})
export class FibHistoryComponent implements OnInit {

  constructor(private fibsService: FibsService) {}

  ngOnInit() { this.getFibRequests(); }
  
  fibRequests:any;

    getFibRequests = () =>
      this.fibsService
      .getFibRequests()
      .subscribe(res =>(this.fibRequests = res));

}
