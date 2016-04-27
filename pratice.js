

/****************         paginate             *********************/

var Query =  require('mongoose').Query;

Query.prototype.paginate = function (options,callback) {
	var default = {
		 perPage : 10, // nums of items to display in each pages
		 delta   : 2 , // numbers of page number to display before and after current.
		 page    : 1,  // the initial number
		 offset  : 0   // offset number
	};
	options = options || default;
	options.perPage = options.perPage || default.perPage;
	options.delta = options.delta || defaults.delta;
  	options.page = options.page || defaults.page;
  	options.offset = options.offset || defaults.offset;

  	var query = this;
  	var model = query.model;
  	model.count(query._conditions,function (err,count) {
  		var _skip = options.(page-1) * options.perPage;
  		_skip += options.offset;

  		query.skip(_skip).limit(options.perPage).exec(function (err,results) {
  			if(err){
  				 callback(err,{});
  				 return;
  			}
  		})


  		results = results || [];
  		var page = parseInt(options.page,10) || 0;
  		var delta = options.delta;
  		var offset_count = count - options.offset;
  		offset_count = offset_count > 0 ? offset_count : 0;
  		var last = Math.ceil(offset_count/options.perPage);
  		var current = page;
  		var start = page - delta > 1 ? page - delta : 1;
  		var end = current + delta + 1 < last ? current + delta : last;
         
        var pages = [];
        for(var i = start ; i <= end; i++){
        	pages.push(i)
        } 


        var prev = !count || current == start ? null : current - 1;
      	var next = !count || current == end ? null : current + 1;
     	 if (!offset_count) {
        prev = next = last = null;
      }


        
      var pager = {
        'results': results,
        'options': options,
        'current': current,
        'last': last,
        'prev': prev,
        'next': next,
        'pages': pages,
        'count': count
      };
      callback(err, pager);

  	})
}