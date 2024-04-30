package com.dedalus.denomination;

import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

import static java.util.Arrays.asList;

@Component
public class Denomination {
	
	private static final TreeSet<Float> euroDenomination;
	static {
		TreeSet<Float> euroDenominationSet = new TreeSet<>(Collections.reverseOrder());
		euroDenominationSet.addAll(asList(
				500f,   200f,   100f,   50f,    20f,
				10f,    5f,     2f,     1f,     0.5f,
				0.2f,   0.1f,   0.05f,  0.02f,  0.01f
		));
		euroDenomination = new TreeSet<>(Collections.unmodifiableSortedSet(euroDenominationSet));
	}
	public TreeMap<Float,Integer> calculateDenomination(Float amount)
	{
		TreeMap<Float,Integer> amountDenomination = new TreeMap<>(Collections.reverseOrder());
		Iterator<Float> euroDenominationIterator = euroDenomination.iterator();
		
		while (euroDenominationIterator.hasNext() && amount > 0f)
		{
			Float currentDomination = euroDenominationIterator.next();
			Integer denominationQuantity = (int)(amount/currentDomination);
			
			if( denominationQuantity == 0)
			{
				continue;
			}
			amountDenomination.put(currentDomination, denominationQuantity);
			amount = (amount - (denominationQuantity * currentDomination));
			amount = BigDecimal.valueOf(amount).setScale(2, RoundingMode.HALF_UP).floatValue();
			//rounding up to fix float precision issues, when the input has more than two decimal points, it will be rounded up,
			//it is being scaled to the nearest two digits according to the least denomination.
		}
		System.out.println(amountDenomination);
		return amountDenomination;
	}
	
	public TreeMap<Float,Integer> denominationDifference(TreeMap <Float,Integer> newAmountDenomination, TreeMap<Float,Integer> oldAmountDenomination)
	{
	
		TreeMap<Float,Integer> denominationDiff = new TreeMap<>(Collections.reverseOrder());
		Set<Float> unionKeySet = new TreeSet<>(Collections.reverseOrder());
		unionKeySet.addAll(newAmountDenomination.keySet());
		unionKeySet.addAll(oldAmountDenomination.keySet());
		
		for (Float key : unionKeySet)
		{
			Integer denominationQuantity = newAmountDenomination.getOrDefault(key, 0);
			denominationQuantity -= oldAmountDenomination.getOrDefault(key, 0);
			denominationDiff.put(key, denominationQuantity);
		}
		
		return denominationDiff;
	}
	

}
