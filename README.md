JSON ORM
=======================

Store data


Example

Database json
```json
{
	"users": [
		{
			"id" : 1,
			"username": "AbrahamHuerta",
			"email": "abrahamhuertadev@gmail.com"
		}
	]
}
```
Requires node js fs
```javascript

var database = function(callback) {
  fs.readFile(app_path + 'app.config/app.data/db.json','utf8', function read(err, data) {
      if (err) {
          throw err;
      }
      callback(JSON.parse(data));
  });
}


database(function(data)
{
	var db = new weDb(data);

	db.config({
		path: app_path + 'app.config/app.data/db.json'
	});

	var users = db.model('users');
	
	var allUsers =  users.all();

	var user =  users.find(1);
	
	var user =  users.where('username', 'AbrahamHuerta').get();
	
	var user =  users.where('username', 'AbrahamHuerta').first();

	var user = users.have('email', 'gmail').get();
	
	var user = users.have('email', 'gmail').get();
	
	var user = users.new({
	    username: "JohnDoe",
	    email: "johndoe@gmail.com"
	});
	
	user.save();
	
	user.get();
	
	
	var user = users.update('id', 1,{
	    username: "JohnDoe"
	});
	
	user.save();
	
	user.get();
	
	
	users.delete(1);
	
	

});

```
