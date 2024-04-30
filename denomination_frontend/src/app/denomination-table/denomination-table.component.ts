import { Component, Input } from "@angular/core";
import {MatTableModule} from '@angular/material/table';
import { Denomination } from "../interfaces/denominationInterface";

@Component({selector: 'denomination-table',
standalone: true,
templateUrl: './denomination-table.component.html',
styleUrl: './denomination-table.component.css',
imports: [MatTableModule]})


export class DenominationTable
{ 
    title = "denomination-table";
    @Input() columnName: String = 'Quantity';
    @Input() denominations: Denomination[] = [];  
    displayedColumns: string[] = ['Denomination', 'Quantity'];
   
}