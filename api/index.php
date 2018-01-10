<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, HEAD');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type');
require 'Slim/Slim.php';

$app = new Slim();


$app->get('/bookings/:bcid', 'getWines');
$app->get('/booking/:bid',	'getWine');
$app->get('/appointments/:did', 'getBookings');
$app->get('/appointment/:bid',	'getBooking');
$app->get('/drivers', 'getDrivers');
$app->get('/drivers/:did',	'getDriver');
$app->get('/customers', 'getCustomers');
$app->get('/cars', 'getCars');
$app->get('/cars/:cid',	'getCar');
$app->get('/customers/:cid', 'getCustomer');
$app->get('/wines', 'getWines');
$app->get('/wines/:id',	'getWine');
$app->options('/customers/login',	'customerLogin');
$app->post('/customers/login',	'customerLogin');
$app->get('/wines/search/:query', 'findByName');
$app->options('/drivers/login',	'driverLogin');
$app->post('/drivers/login',	'driverLogin');
$app->options('/customers', 'addCustomer');
$app->post('/customers', 'addCustomer');
$app->options('/drivers', 'addDriver');
$app->post('/drivers', 'addDriver');
// $app->options('/customers', 'addCustomer');
$app->post('/invoice', 'invoice');
$app->options('/invoice', 'invoice');
$app->post('/booking', 'addBooking');
$app->options('/booking', 'addBooking');
$app->post('/booking', 'addBooking');
$app->options('/cancel', 'cancel');
$app->post('/cancel', 'cancel');
$app->post('/wines', 'addWine');
$app->put('/wines/:id', 'updateWine');
$app->delete('/wines/:id',	'deleteWine');

$app->run();



function getWines($bcid) {

	$sql = "SELECT * FROM book2 where bcid=:bcid";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("bcid", $bcid);
		$stmt->execute();
		$wines = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($wines);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getWine($bid) {
	$sql = "SELECT * FROM book2 WHERE bid=:bid";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("bid", $bid);
		$stmt->execute();
		$wine = $stmt->fetchObject();  
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getBookings($did) {

	$sql = "SELECT * FROM book2 where did=:did";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("did", $did);
		$stmt->execute();
		$wines = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($wines);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getBooking($bid) {
	$sql = "SELECT * FROM book2 WHERE bid=:bid";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("bid", $bid);
		$stmt->execute();
		$wine = $stmt->fetchObject();  
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function getCustomer($cid) {
	$sql = "SELECT * FROM customer2 WHERE cid=:cid";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("cid", $cid);
		$stmt->execute();
		$wine = $stmt->fetchObject();  
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}



function getCars() {
	$sql = "select * FROM car2 ORDER BY carname";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$cars = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($cars);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getCar($cid) {
	$sql = "SELECT * FROM car2 WHERE carid=:cid";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("cid", $cid);
		$stmt->execute();
		$car = $stmt->fetchObject();  
		$db = null;
		echo json_encode($car); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getDrivers() {
	$sql = "select * FROM driver2";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$cars = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($cars);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getDriver($did) {
	$sql = "SELECT * FROM driver2 WHERE did=:did";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("did", $did);
		$stmt->execute();
		$car = $stmt->fetchObject();  
		$db = null;
		echo json_encode($car); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getCustomers() {
	$sql = "select * FROM customer2";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$cars = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($cars);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function addWine() {
	error_log('addWine\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$wine = json_decode($request->getBody());
	$sql = "INSERT INTO wine (name, grapes, country, region, year, description, picture) VALUES (:name, :grapes, :country, :region, :year, :description, :picture)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $wine->name);
		$stmt->bindParam("grapes", $wine->grapes);
		$stmt->bindParam("country", $wine->country);
		$stmt->bindParam("region", $wine->region);
		$stmt->bindParam("year", $wine->year);
		$stmt->bindParam("description", $wine->description);
		$stmt->bindParam("picture", $wine->picture);
		$stmt->execute();
		$wine->id = $db->lastInsertId();
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function customerLogin() {
	error_log('loginCustomer\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$customer = json_decode($request->getBody());
	$sql = "SELECT cid, cname, cphone, csex, cemail, caddress, clogin, cpassword, cpicture FROM customer2 WHERE clogin=:clogin  AND cpassword=:cpassword";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("clogin", $customer->clogin);
		$stmt->bindParam("cpassword", $customer->cpassword);
		$stmt->execute();
		$customer = $stmt->fetchObject();
		$db = null;
		echo json_encode($customer); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function driverLogin() {
	error_log('loginDriver\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$customer = json_decode($request->getBody());
	$sql = "SELECT did, dname, dphone, dsex, demail, daddress, dlogin, dpassword, dpicture, manager FROM driver2 WHERE dlogin=:dlogin  AND dpassword=:dpassword";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("dlogin", $customer->dlogin);
		$stmt->bindParam("dpassword", $customer->dpassword);
		$stmt->execute();
		$customer = $stmt->fetchObject();
		$db = null;
		echo json_encode($customer); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}



function addCustomer() {
	error_log('addCustomer\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$customer = json_decode($request->getBody());

	$sql="SELECT * FROM customer2 WHERE clogin=:clogin and cpassword=:cpassword";
	
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql); 
		$stmt->bindParam("clogin",$customer->clogin); 
		$stmt->bindParam("cpassword",$customer->cpassword); 
		// $stmt->bindParam("clogin", $customer->clogin);
		// $stmt->bindParam("cpassword", $customer->cpassword);
		$stmt->execute();
		$record= null;
		$record = $stmt->fetchObject();
		$db = null;
		if(!$record)
		{
			$sql2 = "INSERT INTO customer2 (cname, cphone, csex, cemail, caddress, clogin, cpassword, cpicture) VALUES (:cname, :cphone, :csex, :cemail, :caddress, :clogin, :cpassword, :cpicture)";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql2);  
			$stmt->bindParam("cname", $customer->cname);
			$stmt->bindParam("cphone", $customer->cphone);
			$stmt->bindParam("csex", $customer->csex);
			$stmt->bindParam("cemail", $customer->cemail);
			$stmt->bindParam("caddress", $customer->caddress);
			$stmt->bindParam("clogin", $customer->clogin);
			$stmt->bindParam("cpassword", $customer->cpassword);
			$stmt->bindParam("cpicture", $customer->cpicture);
			$stmt->execute();
			$customer->id = $db->lastInsertId();
			$db = null;
			echo json_encode($customer); 
		} catch(PDOException $e) {
			error_log($e->getMessage(), 3, '/var/tmp/php.log');
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	
	}
		
		} catch(PDOException $e) {
			error_log($e->getMessage(), 3, '/var/tmp/php.log');
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}


}


function addBooking() {
	error_log('addBooking\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$booking = json_decode($request->getBody());

	
	$sql="SELECT * FROM driver2 WHERE free='1' and dsex=:csex";
	
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql); 
		$stmt->bindParam("csex",$booking->csex); 
		// $stmt->bindParam("clogin", $customer->clogin);
		// $stmt->bindParam("cpassword", $customer->cpassword);
		$stmt->execute();
		$driver = $stmt->fetchObject();
		$db = null;
		// echo json_encode($driver);
		} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
	
	$sql1="SELECT * FROM customer2 WHERE cid=:cid";
	
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql1); 
		$stmt->bindParam("cid",$booking->bcid); 
		// $stmt->bindParam("clogin", $customer->clogin);
		// $stmt->bindParam("cpassword", $customer->cpassword);
		$stmt->execute();
		$customer = $stmt->fetchObject();
		$db = null;
		//echo json_encode($car);
		} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}


	 $sql2="SELECT * FROM car2 WHERE free='1' and cartype=:cartype";
	
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql2); 
		$stmt->bindParam("cartype",$booking->cartype); 
		// $stmt->bindParam("clogin", $customer->clogin);
		// $stmt->bindParam("cpassword", $customer->cpassword);
		$stmt->execute();
		$car = $stmt->fetchObject();
		$db = null;
		//echo json_encode($car);
		} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

	 $sql3 = "INSERT INTO book2 (bcid, cphone, did, bfrom, bto, cartype, carnumber, bdate) VALUES (:bcid, :cphone, :did,:bfrom,:bto,:cartype,:carnumber,:bdate)";
	 try {
		$db = getConnection();
		$stmt = $db->prepare($sql3); 
		$stmt->bindParam("cartype",$booking->cartype); 
		$stmt->bindParam("bcid",$booking->bcid); 
		$stmt->bindParam("cphone",$customer->cphone); 
		$stmt->bindParam("did",$driver->did); 
		$stmt->bindParam("bfrom",$booking->bfrom); 
		$stmt->bindParam("bto",$booking->bto); 
		$stmt->bindParam("carnumber",$car->carnumber); 
		$stmt->bindParam("bdate",$booking->bdate); 
		$stmt->execute();

		$booking->id = $db->lastInsertId();
		$db = null;
		$booking->carnumber=$car->carnumber;
		//echo $wine->id;
		echo json_encode($booking); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
	
	$sql4= "UPDATE driver2 SET free='0' WHERE did=:did";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql4); 
		$stmt->bindParam("did",$driver->did); 
		$stmt->execute();
		$db = null;
		
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

	$sql5= "UPDATE car2 SET free='0' WHERE carid=:carid";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql5); 
		$stmt->bindParam("carid",$car->carid); 
		$stmt->execute();
		$db = null;
		
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

	
}

function invoice() {
	error_log('invoice\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$customer = json_decode($request->getBody());

	$sql5="SELECT * FROM book2 WHERE bid=:bid and did=:did";
	
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql5); 
		$stmt->bindParam("bid",$customer->bid); 
		$stmt->bindParam("did",$customer->did); 
		// $stmt->bindParam("clogin", $customer->clogin);
		// $stmt->bindParam("cpassword", $customer->cpassword);
		$stmt->execute();
		$record = $stmt->fetchObject();
		$db = null;
	
	$sql = "UPDATE book2 SET duration=:duration,distance=:distance,cost=:cost WHERE bid=:bid";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("duration", $customer->duration);
		$stmt->bindParam("distance", $customer->distance);
		$stmt->bindParam("cost", $customer->cost);
		$stmt->bindParam("bid", $customer->bid);
		$stmt->execute();
		$db = null;
		//echo json_encode($customer); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

	$sql2="SELECT * FROM book2 WHERE bid=:bid";
	
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql2); 
		$stmt->bindParam("bid",$customer->bid); 
		// $stmt->bindParam("clogin", $customer->clogin);
		// $stmt->bindParam("cpassword", $customer->cpassword);
		$stmt->execute();
		$driver = $stmt->fetchObject();
		$db = null;
		// echo json_encode($driver);
		} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}


	$sql4= "UPDATE driver2 SET free='1' WHERE did=:did";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql4); 
		$stmt->bindParam("did",$driver->did); 
		$stmt->execute();
		$db = null;
		
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

	$sql5= "UPDATE car2 SET free='1' WHERE carid=:carid";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql5); 
		$stmt->bindParam("carid",$driver->carid); 
		$stmt->execute();
		$db = null;
		echo json_encode($driver);
		
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

}
	catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}


}

function cancel() {
	error_log('addBooking\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$booking = json_decode($request->getBody());

	
	$sql="SELECT * FROM book2 WHERE bid=:bid and bcid=:bcid";
	
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql); 
		$stmt->bindParam("bid",$booking->bid); 
		$stmt->bindParam("bcid",$booking->bcid); 
		// $stmt->bindParam("clogin", $customer->clogin);
		// $stmt->bindParam("cpassword", $customer->cpassword);
		$stmt->execute();
		$record = $stmt->fetchObject();
		$db = null;
		
	
	 $sql2="DELETE FROM book2 WHERE bid=:bid";
	
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql2); 
		$stmt->bindParam("bid",$booking->bid); 
		// $stmt->bindParam("clogin", $customer->clogin);
		// $stmt->bindParam("cpassword", $customer->cpassword);
		$stmt->execute();
		//$car = $stmt->fetchObject();
		$db = null;
		//echo json_encode($car);
		} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}

	

	 
	$sql4= "UPDATE driver2 SET free='1' WHERE did=:did";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql4); 
		$stmt->bindParam("did",$record->did); 
		$stmt->execute();
		$db = null;
		
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}

	$sql5= "UPDATE car2 SET free='1' WHERE carid=:carid";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql5); 
		$stmt->bindParam("carid",$record->carid); 
		$stmt->execute();
		$db = null;
		echo json_encode($record);
		
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
 
 } catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
	
}



function addDriver() {
	error_log('addDriver\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$driver = json_decode($request->getBody());
	$sql = "INSERT INTO driver2 (dname, dphone, dsex, demail, daddress, dlogin, dpassword, dpicture) VALUES (:dname, :dphone, :dsex, :demail, :daddress, :dlogin, :dpassword, :dpicture)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("dname", $driver->dname);
		$stmt->bindParam("dphone", $driver->dphone);
		$stmt->bindParam("dsex", $driver->dsex);
		$stmt->bindParam("demail", $driver->demail);
		$stmt->bindParam("daddress", $driver->daddress);
		$stmt->bindParam("dlogin", $driver->dlogin);
		$stmt->bindParam("dpassword", $driver->dpassword);
		$stmt->bindParam("dpicture", $driver->dpicture);
		$stmt->execute();
		$driver->id = $db->lastInsertId();
		$db = null;
		echo json_encode($driver); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateWine($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$wine = json_decode($body);
	$sql = "UPDATE wine SET name=:name, grapes=:grapes, country=:country, region=:region, year=:year, description=:description, picture=:picture WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $wine->name);
		$stmt->bindParam("grapes", $wine->grapes);
		$stmt->bindParam("country", $wine->country);
		$stmt->bindParam("region", $wine->region);
		$stmt->bindParam("year", $wine->year);
		$stmt->bindParam("description", $wine->description);
		$stmt->bindParam("picture", $wine->picture);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteWine($id) {
	$sql = "DELETE FROM wine WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($query) {
	$sql = "SELECT * FROM wine WHERE UPPER(name) LIKE :query ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$wines = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($wines);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="ola";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>
