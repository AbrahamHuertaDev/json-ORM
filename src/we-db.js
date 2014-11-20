var weDb = function(db)
{
	var $this = this;

	this.records = db;

	this.options;

	this.config = function(options)
	{
		$this.options = options;
	}

	this.search = function(records, by, search, callback)
	{
		var objects = [];
		var index;
		records.forEach(function(record, i)
		{
			if(record[by] == search)
			{
				objects.push(record);
			}

			index = i;
		});

		callback(objects, index);
	}

	this.contains = function(records, by, search, callback)
	{
		var objects = [];

		records.forEach(function(record, i)
		{
			if(record[by].indexOf(search) > -1)
			{
				objects.push(record);
			}
		});

		callback(objects);
	}


	this.increments = function(records)
	{
		var record;
		for(var key in records){
		    if(records.hasOwnProperty(key)){
		       	
		       	record = records[key];
		    }
		}

		return Number(record.id) + Number(1);
	}

	this.model = function(model)
	{
		return {
			all: function()
			{
				return $this.records[model];
			},
			find: function(id)
			{
				var record = [];

				$this.search($this.records[model], 'id', id, function(records)
				{
					records.forEach(function(data, i)
					{
						record.push(data);
					});
				});

				return record[0];
			},
			where: function(where, query)
			{
				var records = [];

				$this.search($this.records[model], where, query, function(result)
				{
					result.forEach(function(data, i)
					{
						records.push(data);
					});
				});

				return {
					get: function()
					{
						return records;
					},
					first: function()
					{
						return records[0];
					}
				}
			},
			have: function(where, query)
			{
				var records = [];

				$this.contains($this.records[model], where, query, function(result)
				{
					result.forEach(function(data, i)
					{
						records.push(data);
					});
				});

				return {
					get: function()
					{
						return records;
					},
					first: function()
					{
						return records[0];
					}
				}
			},
			new: function(data)
			{
				var newRecord = data;
				newRecord.id = $this.increments($this.records[model]);

				return {
					save: function()
					{
						$this.records[model].push(newRecord);

						fs.writeFile($this.options.path, JSON.stringify($this.records), function (err) {
						  if (err) return console.log(err);
						});
					},
					get: function()
					{
						return newRecord;
					}
				}
			},
			update: function(where, query, changes)
			{
				var record = [];

				$this.search($this.records[model], where, query, function(records)
				{
					records.forEach(function(data, i)
					{
						record.push(data);
					});
				});

				for(var key in changes) {
				   record[0][key] = changes[key];
				}

				return {
					save: function()
					{
						fs.writeFile($this.options.path, JSON.stringify($this.records), function (err) {
						  if (err) return console.log(err);
						});
					},
					get: function()
					{
						return record[0];
					}
				}
			},
			delete: function(id)
			{
				var record = [];

				$this.search($this.records[model], 'id', id, function(records, index)
				{
					records.forEach(function(data, i)
					{
						record.push(data);
					});

					delete $this.records[model][index];

					string = JSON.stringify($this.records[model]);

					string =  string.replace(',null', '');

					$this.records[model] = JSON.parse(string);


					fs.writeFile($this.options.path, JSON.stringify($this.records), function (err) {
						  if (err) return console.log(err);
					});
				});


			}
		}
	}


};
