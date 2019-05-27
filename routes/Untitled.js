db.customers.aggregation([ $match :{ '_id':id} }   ,
            
 )


//view ordersList without empty array

  db.customers.aggregate([ { $unwind : '$ordersList'},{$group:{'_id':null, 'TotalOrdersList'  :{ $push: '$ordersList'}}}]).pretty();
//with empty
    db.customers.aggregate([{$group:{'_id':null, 'TotalOrdersList'  :{ $push: '$ordersList'}}}]).pretty();

db.customers.find( { $and: [ { ordersList : { $exists : true } } ,{ ordersList : { $not : { $size : 0 } } }]}).pretty()

    db.customers.aggregate([ { $unwind : '$ordersList'},{$group:{'_id':'$ordersList', 'TotalOrderProductsList'  :{ $push: '$ordersList.orderedProductsList'}}}]).pretty();

    db.customers.find({_id:1,name:0,state:0,city:0}, { $and: [ { ordersList : { $exists : true } } ,{ ordersList : { $not : { $size : 0 } } }]}).pretty()


    { $match : { 'ordersList.id': 1001 } },
	{ $unwind : '$ordersList'},
	{ $group: {
		'_id':null,
		'orderedProductsList': { 
			
			$push: {  $cond: { if: { $eq: [1001,'$ordersList.id'] }, then:  '$ordersList.orderedProductsList'  , else: {}  } }
		}
	}},
	{ $unwind : '$orderedProductsList'},
	{ $unwind : '$orderedProductsList'},
	{ $group: {
		'_id':null,
		'orderTotal': { $sum: { $multiply: [ "$orderedProductsList.price", "$orderedProductsList.orderedQuantity"] } }
	}}	


    
db.customers.aggregate
([
	{ $match : { 'ordersList.id': 1001 } },
	{ $unwind : '$ordersList'},
	{ $group: {
		'_id':null,
		'orderedProductsList': { 
			
			$push: {  $cond: { if: { $eq: [1001,'$ordersList.id'] }, then:  '$ordersList.orderedProductsList'  , else: {}  } }
		}
	}},
	{ $unwind : '$orderedProductsList'},
	{ $unwind : '$orderedProductsList'},
	{ $group: {
		'_id':null,
		'orderTotal': { '$orderedProductsList' } 
        }
	}	
]).pretty()