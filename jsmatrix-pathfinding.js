

jsmatrix.Configuration = function() {
    this.blockers = new Array;    
}

jsmatrix.Configuration.prototype.add_blocker = function(type){
    this.blockers.push(type);
}

jsmatrix.Matrix2d.prototype.find_path = function(start, goal, configuration){

    // Maximum number of steps
    this.timeout = 3000;

	var path = new Array();
	this.nodes = new Array();
	this.configuration = configuration;

	var node = new jsmatrix.Node(start, goal, undefined);
	node.steps = 0;

	this.traverse(node, goal, path);
	return path;

};

jsmatrix.Matrix2d.prototype.find_area = function(start, goal, depth, configuration){

    // Maximum number of steps
    this.timeout = 3000;

	this.nodes = new Array();
	this.configuration = configuration;

	var node = new jsmatrix.Node(start, goal, undefined);
	node.steps = 0;

	this.traverse_area(node, depth);

    // Clean Up Duplicates	
	this.remove_duplicates();
	
	return this.nodes;

};

jsmatrix.Matrix2d.prototype.remove_duplicates = function() {

    var temp = new Array();
    for ( var i = 0; i < this.nodes.length; i++ ){
        var n = this.nodes[i];
        var found = false;
        for ( var j = 0; j < temp.length; j++ ){
            var n2 = temp[j];
            if ( n.pos.row == n2.pos.row && n.pos.col == n2.pos.col ){
                found = true;
            }
        }
        if ( ! found ){
            temp.push(n);
        }
    }
    this.nodes = temp;
}

/**
* Creates a node object.
*
* @param {Position} pos -> A position. Ex.  { row: 7, col: 5 }
* @param {Position} goal -> A position. Ex.  { row: 0, col: 0 }
* @param {Node} parent -> The parent node
* @return {Node}	Returns the matrix.
*/
jsmatrix.Node = function(pos, goal, parent) {

		this.pos = pos;
		this.active = true;
		if ( goal ){
		    this.goal = goal;
		    this.distance = jsmatrix.calculate_distance(pos, goal);
		}

		if ( parent ){
			this.steps = parent.steps + pos.weight;
			this.parent = parent;
			this.weight = this.distance + this.steps;
		}

};

/**
* Calculates and returns the position from a given object.
*
* @param {Position} position -> A position. Ex.  { row: 7, col: 5 }
* @param {Position} goal -> A position. Ex.  { row: 0, col: 0 }
* @return {Integer}	Calculated distance
*/
jsmatrix.calculate_distance = function(position, goal){
	var rows = goal.row - position.row;
	if ( rows < 0 ) {
		rows = rows * -1;
	}
	var cols = goal.col - position.col;
	if ( cols < 0 ) {
		cols = cols * -1;
	}

	return rows + cols;
};

// Document me
jsmatrix.at_goal = function(start, goal){
	if ( start.row == goal.row && start.col == goal.col ){
		return true;
	}
};

// Document me
jsmatrix.Matrix2d.prototype.reverse_path = function(position, path){
	
	path.push(position.pos);
	if ( position.parent != undefined ){
		this.reverse_path(position.parent, path);
	}
};

// Document me
jsmatrix.Matrix2d.prototype.node_exists = function(position, steps){
	var found = false;

	// Check if we already have node in table
	for( var i = 0; i < this.nodes.length; i++){
        var node = this.nodes[i];
		if ( node.pos.row == position.row && node.pos.col == position.col && node.steps == steps ){
			found = true;
			return true;
		}	
	};
	return found;
};

// Document me
jsmatrix.Matrix2d.prototype.traverse_area = function(node, depth){

	// Remove myself from this.nodes
	this.remove_node(node);

    // Get Cell
    var cell = this.get_cell(node.pos.row, node.pos.col);

	// Add Nodes for this position
	var directions = cell.directions();
	for (var i = 0; i < directions.length; i++) {
	    var next_cell = directions[i];

        // Check if blocked
		if ( next_cell != undefined ){

            // Create a Position
	        var pos = {row: next_cell.row, col: next_cell.col };

			if ( !this.node_exists(pos, node.steps) && !this.is_blocking(cell) && (node.steps+1) <= depth ){

				pos.weight = 1;
        		var new_node = new jsmatrix.Node(pos, undefined, node);
		        this.nodes.push(new_node);
		        this.traverse_area(new_node, depth);
		    }
		}
	}
};

// Document me
jsmatrix.Matrix2d.prototype.traverse = function(node, goal, path){

	if ( jsmatrix.at_goal(node.pos, goal) ) {
		// If we find the goal we reverse the path
		this.reverse_path(node, path);
	} else {	

		// Remove myself from this.nodes
		this.remove_node(node);

        // Get Cell
        var cell = this.get_cell(node.pos.row, node.pos.col);

		// Add Nodes for this position
		var directions = cell.directions();
		for (var i = 0; i < directions.length; i++) {
		    var next_cell = directions[i];

            // Check if blocked
			if ( next_cell != undefined ){

                // Create a Position
		        var pos = {row: next_cell.row, col: next_cell.col };

				if ( !this.node_exists(pos, node.steps + 1) && ! this.is_blocking(cell) ){

    				pos.weight = 1;
            		var new_node = new jsmatrix.Node(pos, goal, node);
			        this.nodes.push(new_node);
			    }
			}
		}
	
		// Find the best node to work with 
		var next_node = this.lowest_weighted_node();

		if ( next_node != undefined ){
			if ( next_node.steps < this.timeout ){
				// Work it
				this.traverse(next_node, goal, path);
			}
		}
	}
};

jsmatrix.Matrix2d.prototype.is_blocking = function(cell){
    var blocking = false;
    if ( this.configuration ) {
        for ( var i = 0; i < this.configuration.blockers.length; i++){
            var blocking_type = this.configuration.blockers[i];
            if ( cell.has_item_by_type(blocking_type) ){
                return true;        
            }
        }
    }
    return blocking;
}

// Document me
jsmatrix.Matrix2d.prototype.lowest_weighted_node = function(){
	var node = undefined;
	var weight = 0;

	// Return lowest weighted node
	for( var i = 0; i < this.nodes.length; i++){
        var check_node = this.nodes[i];
		if ( check_node.active == true ) {
			if ( node == undefined || check_node.weight < weight ){
				node = check_node;
				weight = check_node.weight;
			}
		}
	};
	return node;
};

// Document me
jsmatrix.Matrix2d.prototype.remove_node = function(node){
	node.active = false;
};


