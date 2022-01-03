import { Component, OnInit } from '@angular/core';
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
    private operationsService: OperationsService) { }

  ngOnInit() {
  }
  
  ionViewDidEnter(): void {
    this.operationsService.getOperations().subscribe(data => {
      this.operations = data;
    });
  }

}
