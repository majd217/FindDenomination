import { TestBed } from '@angular/core/testing';
import { Denomination } from './../interfaces/denominationInterface';

export class FrontendExecution{
    
     static calculateDenomination(amount: number): Denomination[]
    {
        const euroDenomination: number[] = 
        [500,   200,   100,   50,    20,
        10,    5,     2,     1,     0.5,
        0.2,   0.1,   0.05,  0.02,  0.01];

        var denominationQuantity: number;

        var amountDenomination: Denomination[] = []; 

        while(amount > 0)
        {
            for (var element of euroDenomination) {
                denominationQuantity = Math.floor(amount/element);
                if(denominationQuantity <= 0)
                    {
                        continue;
                    }
                
                amountDenomination = amountDenomination.concat({denomination: Number(element), quantity: Number(denominationQuantity)});
                amount = (amount-(denominationQuantity * element));
                amount = Math.round(amount * 100) / 100
            }

        }
        return amountDenomination;
    }
  

    static calculateDifference(newAmountDenomination: Denomination[], oldAmountDenomination: Denomination[]): Denomination[]
    {
        var denominationDifference: Denomination[] =[];
        var unionKeySet = new Set<number>();
        
        newAmountDenomination.forEach((element) =>  
            {
                unionKeySet.add(element.denomination)

            });
        oldAmountDenomination.forEach((element) =>  
            {
                unionKeySet.add(element.denomination)
            });
            
            var sortedArray = Array.from(unionKeySet).sort((a,b)=> b-a);
            var sortedKeySet = [...new Set(sortedArray)]
            
            sortedKeySet.forEach((key)=>{
                var denominationQuantity = 0;
                var newDenominationObject = newAmountDenomination.find(e => e.denomination == key);
                var oldDenominationObject = oldAmountDenomination.find(e => e.denomination == key)

                if(newDenominationObject != null)
                {
                    denominationQuantity = newDenominationObject.quantity;
                }
        
                if(oldDenominationObject != null)
                {
                    denominationQuantity -= oldDenominationObject.quantity;
                }   
    
                denominationDifference = denominationDifference.concat({denomination: Number(key), quantity: Number(denominationQuantity)});
        
            });
       
        return denominationDifference;
    }
}
