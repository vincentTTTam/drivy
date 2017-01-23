'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);

function convertDate(str)
{
  var re=/[0-9]+/g;
  var result = re[Symbol.match](str);
  var dateLoc=new Date(result[0],result[1],result[2]);
  return dateLoc;
}

//Q1

function RentalPrice()
{
  var DifferenceTemps, DifferenceJours;

  for(var i = 0; i<rentals.length; i++)
  {
    DifferenceTemps = convertDate(rentals[i].returnDate).getTime() - convertDate(rentals[i].pickupDate).getTime();
    DifferenceJours = (((DifferenceTemps /1000)/3600)/24) + 1;

    for(var j=0; j<cars.length;j++)
    {
      if(rentals[i].carId == cars[j].id )
        rentals[i].price = cars[j].pricePerDay*DifferenceJours + cars[j].pricePerKm*rentals[i].distance;
    }
    console.log(rentals[i].price); 
  }
}

//Q2

function NewRentalPrice()
{
  var DifferenceTemps,price, DifferenceJours;
  var distance=[];
  
  for(var i = 0; i < rentals.length; i++) 
  {
    distance[i]=rentals[i].distance;
    DifferenceTemps = convertDate(rentals[i].returnDate).getTime() - convertDate(rentals[i].pickupDate).getTime();
    DifferenceJours = (((DifferenceTemps /1000)/3600)/24) + 1;
    
    rentals[i].price = DifferenceJours * cars[i].pricePerDay + rentals[i].distance * cars[i].pricePerKm;
    
    if(DifferenceJours > 1 && DifferenceJours <= 4)
      rentals[i].price = rentals[i].price - (rentals[i].price * 0.10);
    
    else if(DifferenceJours > 4 && DifferenceJours <= 10)
      rentals[i].price = rentals[i].price - (rentals[i].price * 0.30);
    
    else if(DifferenceJours > 10)
      rentals[i].price = rentals[i].price - (rentals[i].price * 0.50);
	  
    console.log(rentals[i].price);
  }
}

//Q3

function Commission()
{
  var DifferenceTemps, DifferenceJours, commission, assurance;
  
  for(var i = 0; i<rentals.length; i++) 
  {
    DifferenceTemps = convertDate(rentals[i].returnDate).getTime() - convertDate(rentals[i].pickupDate).getTime();
    DifferenceJours = (((DifferenceTemps /1000)/3600)/24) + 1;
    
	commission = rentals[i].price * 0.3;
    assurance = commission / 2;
    
    rentals[i].commission.insurance = assurance;
    rentals[i].commission.assistance = DifferenceJours;
    rentals[i].commission.drivy = commission - assurance - DifferenceJours;
  }
}

//Q4

function deductible()
{
  var DifferenceTemps, DifferenceJours;
  
  for(var i = 0; i<rentals.length; i++) 
  {
    DifferenceTemps = convertDate(rentals[i].returnDate).getTime() - convertDate(rentals[i].pickupDate).getTime();
    DifferenceJours = (((DifferenceTemps /1000)/3600)/24) + 1;
  
    if (rentals[i].options.deductibleReduction == true)
      rentals[i].price = (DifferenceJours*4)+rentals[i].price;
    
	console.log(rentals[i].price);
  }
}

//Q5

function amountActors()
{
  for(var i = 0; i<actors.length; i++) 
  {
    actors[i].payment[0].amount = rentals[i].price;
    actors[i].payment[1].amount = rentals[i].price-(rentals[i].price*0.3);
    actors[i].payment[2].amount = rentals[i].commission.insurance;
    actors[i].payment[3].amount = rentals[i].commission.assistance;
    actors[i].payment[4].amount = rentals[i].commission.drivy;
  }
}