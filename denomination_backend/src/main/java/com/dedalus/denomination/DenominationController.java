package com.dedalus.denomination;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.TreeMap;

@RestController
@RequestMapping("/denomination")
public class DenominationController {
	
	@Autowired
	Denomination denomination;
	
	@GetMapping("/calculation")
	public ResponseEntity<TreeMap<Float, Integer>> getDenomination(@RequestParam("amount") Float amount)
	{
		return new ResponseEntity<>(denomination.calculateDenomination(amount),HttpStatus.OK);
	}
	
	@GetMapping("/difference")
	public ResponseEntity<TreeMap<Float, Integer>> getDifference(@RequestParam("oldAmount") Float oldAmount, @RequestParam("newAmount") Float newAmount)
	{
		return new ResponseEntity<>(denomination.denominationDifference(
				denomination.calculateDenomination(newAmount),
				denomination.calculateDenomination(oldAmount)
		),HttpStatus.OK);
	}

}
