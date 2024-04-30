import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { DenominationTable } from './denomination-table/denomination-table.component';
import { Denomination } from "./interfaces/denominationInterface";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { DenominationService } from './services/denominationRESTService';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FrontendExecution } from './services/frontendExecution';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule,MatSlideToggleModule ,CommonModule, RouterOutlet,MatTableModule, DenominationTable,MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  executionLayer: boolean = false;
  title = 'denomination_frontend';
  oldAmountDenomination: Denomination[] = [];
  newAmountDenomination: Denomination[] = [];
  differenceDenomination: Denomination[] = [];
  Amount?: number;
  CurrentAmount?: number;
  OldAmount?: number;
  amountsEntered: number = 0;
  differenceTableVisible: boolean = false;
  
  
  constructor(private denService:DenominationService){};

  changelayer()
  {
    this.executionLayer = !this.executionLayer;
  }

  calculateDenomination() {
    if(this.Amount == null)
    {
      return;
    }

    this.oldAmountDenomination = this.newAmountDenomination;
    this.OldAmount = this.CurrentAmount; 
    this.CurrentAmount = this.Amount;

    this.newAmountDenomination = [];

    switch (this.executionLayer)
    {
      case false:{
        //subscribed the obseravle -> object, can't access? cast to any
        this.denService.calculateDenomination(this.Amount).subscribe(json => {
          let jsonO = <any>json;
          for (const key in json) {
            this.newAmountDenomination = this.newAmountDenomination.concat({denomination: Number(key), quantity: Number(jsonO[key])});
          }
        });
        break;
      }
      case true:{
        this.newAmountDenomination = FrontendExecution.calculateDenomination(this.Amount);
        console.log(this.newAmountDenomination);
        break;
      }
    }

    this.amountsEntered++;
  }

  calculateDifference()
  {
    if((this.CurrentAmount == null) || (this.OldAmount == null))
    {
      return;
    }

    this.differenceDenomination = [];

    switch (this.executionLayer){
      case false:
        {
          this.denService.calculateDenominationDifference(this.CurrentAmount, this.OldAmount).subscribe(json => {
            let jsonO = <any>json;
            for (const key in json) 
            {
              this.differenceDenomination = this.differenceDenomination.concat({denomination: Number(key), quantity: Number(jsonO[key])});
            }});
          break;
        }
      case true:
        {
          this.differenceDenomination = FrontendExecution.calculateDifference(FrontendExecution.calculateDenomination(this.CurrentAmount), FrontendExecution.calculateDenomination(this.OldAmount));
          console.log(this.differenceDenomination);
          break;
        }
    }

    this.differenceTableVisible = true;
  }
}
