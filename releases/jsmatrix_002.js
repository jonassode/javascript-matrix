
var jsmatrix = {

	/**
	* Creates and returns a 2 dimensional Array.
	*
	* @param {Integer} rows		The width of the new matrix.
	* @param {Integer} cols		The height of the new matrix.
	* @return {Array[Array]}	Returns the matrix.
	*/
	create_matrix: function(rows, cols){
		var matrix = new Array(rows);

		for( var row = 0; row < rows; row++) {
			matrix[row] = new Array(cols);
		}
		return matrix;
	},

	/**
	* Creates and returns a 2d matrix with lots of great methods.
	*
	* @param {Integer} rows		The width of the new matrix.
	* @param {Integer} cols		The height of the new matrix.
	* @return {Array[Array]}	Returns the matrix.
	*/
	matrix2d: function(rows, cols){
		var object = {};
		object.rows = rows;
		object.cols = cols;

		/**
		* Returns a specified cell
		*
		* @param {Integer} row		The row of the cell.
		* @param {Integer} col		The col of the cell.
		* @return {cell}		Returns the cell.
		*/
		object.get_cell = function(row,col){
			return this.matrix[row][col];
		}

		object.set_cell = function(row,col,cell){
			this.matrix[row][col] = cell;
			cell.row = row;
			cell.col = col;
			cell.matrix = this;
		}

		object.rotate_right = function(){
			var matrix = jsmatrix.create_matrix(this.rows, this.cols);

			// Shift Right
			for( var row = 0; row < this.rows; row++) {
				for( var col = 0; col < this.cols; col++) {
					matrix[col][(this.cols - (row+1))] = object.matrix[row][col];
				}
			}
			this.matrix = matrix;
		}

		object.rotate_left = function(){
			var matrix = jsmatrix.create_matrix(this.rows, this.cols);

			// Shift Left
			for( var row = 0; row < this.rows; row++) {
				for( var col = 0; col < this.cols; col++) {
					matrix[this.cols - (col+1)][row] = object.matrix[row][col];
				}
			}
			this.matrix = matrix;
		}

		object.mirror_vertical = function(){
			var matrix = jsmatrix.create_matrix(this.rows, this.cols);

			// Shift Left
			for( var row = 0; row < this.rows; row++) {
				for( var col = 0; col < this.cols; col++) {
					matrix[row][this.cols - (col+1)] = object.matrix[row][col];
				}
			}
			this.matrix = matrix;
		}

		object.mirror_horizontal = function(){
			var matrix = jsmatrix.create_matrix(this.rows, this.cols);

			// Shift Left
			for( var row = 0; row < this.rows; row++) {
				for( var col = 0; col < this.cols; col++) {
					matrix[this.rows - (row+1)][col] = object.matrix[row][col];
				}
			}
			this.matrix = matrix;
		}

		object.matrix = new Array(rows);

		for( var row = 0; row < rows; row++) {
			object.matrix[row] = new Array(cols);
	        	for( var col = 0; col < cols; col++) {
				object.set_cell(row,col,jsmatrix.cell());
			}
		}

		return object;
	},


	// Cell
	cell: function(){
		var object = {};
		object.hash  = jsmatrix.hash();

		object.set_item = function(key,item){
			this.hash.set(key,item);
			item.key = key;
			item.row = this.row;
			item.col = this.col;
			item.cell = this;			
		}

		object.get_item = function(key){
			return this.hash.get(key);
		}
		
		object.remove_item = function(key){
			var item = this.hash.get(key);
			this.hash.remove(key);
			item.row = undefined;
			item.col = undefined;
			item.cell = undefined;			
		}

		object.size = function(){
			return this.hash.size();
		}

		object.has_item = function(key){
			var boolean = false;
			if ( this.hash.get(key) != undefined ){
				boolean = true;
			}
			return boolean;
		}

		object.has_item = function(){
			var boolean = false;
			if ( this.hash.length() != 0 ){
				boolean = true;
			}
			return boolean;
		}

		object.right = function(){
			return this.matrix.get_cell(this.row,this.col+1);
		}

		object.left = function(){
			return this.matrix.get_cell(this.row,this.col-1);
		}

		object.up = function(){
			return this.matrix.get_cell(this.row-1,this.col);
		}

		object.down = function(){
			return this.matrix.get_cell(this.row+1,this.col);
		}

		object.move = function(item, cell){
			this.remove_item(item.key);
			cell.set_item(item.key, item);
		}


		return object;
	},

	hash: function(){
		var object = {};
		object.size = 0;
		object.hash = new Array();
		
		object.set = function(key, item){
			this.size++;
			this.hash[key] = item;
		}

		object.get = function(key){
			return this.hash[key];
		}

		object.remove = function(key){
			this.hash[key] = undefined;
			this.size--;
		}

		object.length = function(){
			return this.size;
		}

		return object;
	},

	list: function(){
		var object = {};
		object.size = 0;
		object.list = new Array();

		object.push = function(item){
			this.size++;
			this.list.push(item);
		}

		object.get = function(index){
			return this.list[index];
		}
		
		return object;
	},

}



