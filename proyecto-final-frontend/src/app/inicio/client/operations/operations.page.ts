import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operation } from './operation';
import { OperationsService } from './operations.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.page.html',
  styleUrls: ['./operations.page.scss'],
})
export class OperationsPage implements OnInit {

  operations: Operation[];

  constructor(
    private operationsService: OperationsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    if (!this.operationsService.account) {
      this.router.navigate(['/inicio'])
    } else {
      this.operationsService.getOperations().subscribe(data => {
        this.operations = data;
      });
    }
  }

}
