import { Component, OnInit } from '@angular/core';
import { FibsService } from "../shared/fibs.service";

@Component({
  selector: 'app-fib-list',
  templateUrl: './fib-list.component.html',
  styleUrls: ['./fib-list.component.scss']
})
export class FibListComponent implements OnInit {

  constructor(private fibsService: FibsService) {}

  ngOnInit() { this.getFibRequests(); }
  
  fibRequests:any;

    getFibRequests = () =>
      this.fibsService
      .getFibRequests()
      .subscribe(res =>(this.fibRequests = res));

}
