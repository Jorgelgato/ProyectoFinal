import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Operation } from './operation';
import { OperationsService } from './operations.service';
import { OperationType } from './operationtype';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.page.html',
  styleUrls: ['./operations.page.scss'],
})
export class OperationsPage implements OnInit {

  operations?: Operation[];
  types?: OperationType[];

  constructor(
    private operationsService: OperationsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.getOperationTypes();
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

  
  typeToString(type: number): string {
    for (let types of this.types) {
      if (type == types.id) {
        return types.type;
      }
    }
  }

  private getOperationTypes() {
    this.operationsService.getOperationTypes().subscribe(data => {
      this.types = data;
    });
  }

}
