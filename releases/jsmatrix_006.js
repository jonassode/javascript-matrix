
var jsmatrix = (function(){

    function SquareNonDiagonal(){
        this.name = "SquareNonDiagonal";
    }
    SquareNonDiagonal.prototype.directions = function(cell){
    	var array = new Array();

	    array.push(cell.north());
	    array.push(cell.east());
	    array.push(cell.south());
	    array.push(cell.west());

	    return array;
    }
    
    function SquareDiagonal(){
        this.name = "SquareDiagonal";   
    }
    SquareDiagonal.prototype.directions = function(cell){
    	var array = new Array();

	    array.push(cell.north());
	    array.push(cell.east());
	    array.push(cell.south());
	    array.push(cell.west());
	    array.push(cell.northeast());
	    array.push(cell.southeast());
	    array.push(cell.northwest());
	    array.push(cell.southwest());

	    return array;
    }
    function Hex(){
        this.name = "Hex";   
    }
    Hex.prototype.directions = function(cell){
    	var array = new Array();

	    array.push(cell.north());
	    array.push(cell.east());
	    array.push(cell.south());
	    array.push(cell.west());
	    array.push(cell.northeast());
	    array.push(cell.southeast());

	    return array;
    }    
    

	/**
	* Creates and returns a 2 dimensional Array.
	*
	* @param {Integer} rows		The width of the new matrix.
	* @param {Integer} cols		The height of the new matrix.
	* @return {Array[Array]}	Returns the matrix.
	*/
	function create_matrix(rows, cols){
		var matrix = new Array(rows);

		for( var row = 0; row < rows; row++) {
			matrix[row] = new Array(cols);
		}
		return matrix;
	}

	/**
	* Creates and returns a 2d matrix with lots of great methods.
	*
	* @param {Integer} rows		The width of the new matrix.
	* @param {Integer} cols		The height of the new matrix.
	* @return {Array[Array]}	Returns the matrix.
	*/
	function Matrix2d(rows, cols, type){
		this.rows = rows;
		this.cols = cols;
		this.type = type ? type : new SquareNonDiagonal();
		
		this.matrix = new Array(rows);

		for( var row = 0; row < rows; row++) {
			this.matrix[row] = new Array(cols);
	        	for( var col = 0; col < cols; col++) {
				this.set_cell(row,col, new Cell());
			}
		}		
	}

	/**
	* Returns a specified cell
	*
	* @param {Integer} row		The row of the cell.
	* @param {Integer} col		The col of the cell.
	* @return {cell}		Returns the cell.
	*/
	Matrix2d.prototype.get_cell = function(row,col){
		if ( row < this.matrix.length && row >= 0 ){
			return this.matrix[row][col];
		} else {
			return undefined;
		}
	}

	Matrix2d.prototype.set_cell = function(row,col,cell){
		this.matrix[row][col] = cell;
		cell.row = row;
		cell.col = col;
		cell.matrix = this;
	}

	Matrix2d.prototype.create_vos_matrix = function(){
		var matrix = jsmatrix.create_matrix(this.rows, this.cols);
		return matrix;
	}

	Matrix2d.prototype.rotate_right = function(){
		var matrix = jsmatrix.create_matrix(this.rows, this.cols);

		// Shift Right
		for( var row = 0; row < this.rows; row++) {
			for( var col = 0; col < this.cols; col++) {
				matrix[col][(this.cols - (row+1))] = this.matrix[row][col];
			}
		}
		this.matrix = matrix;
	}

	Matrix2d.prototype.rotate_left = function(){
		var matrix = jsmatrix.create_matrix(this.rows, this.cols);

		// Shift Left
		for( var row = 0; row < this.rows; row++) {
			for( var col = 0; col < this.cols; col++) {
				matrix[this.cols - (col+1)][row] = this.matrix[row][col];
			}
		}
		this.matrix = matrix;
	}

	Matrix2d.prototype.mirror_vertical = function(){
		var matrix = jsmatrix.create_matrix(this.rows, this.cols);

		// Shift Left
		for( var row = 0; row < this.rows; row++) {
			for( var col = 0; col < this.cols; col++) {
				matrix[row][this.cols - (col+1)] = this.matrix[row][col];
			}
		}
		this.matrix = matrix;
	}

	Matrix2d.prototype.mirror_horizontal = function(){
		var matrix = jsmatrix.create_matrix(this.rows, this.cols);

		// Shift Left
		for( var row = 0; row < this.rows; row++) {
			for( var col = 0; col < this.cols; col++) {
				matrix[this.rows - (row+1)][col] = this.matrix[row][col];
			}
		}
		this.matrix = matrix;
	}

	// Cell
	function Cell(){
		this.hash  = new Hash();
	}

    // Test: OK
	Cell.prototype.set_item = function(key,item){
		this.hash.set(key,item);
		item.key = key;
		item.row = this.row;
		item.col = this.col;
		item.cell = this;			
	}

    // Test: OK
	Cell.prototype.get_item = function(key){
		return this.hash.get(key);
	}
	
	// Test: OK
	Cell.prototype.remove_item = function(key){
		var item = this.hash.get(key);
		this.hash.remove(key);
		if ( item ) {
		item.row = undefined;
		item.col = undefined;
		item.cell = undefined;			
		}
	}

    // Test: OK
	Cell.prototype.size = function(){
		return this.hash.size;
	}

    // Test: OK
	Cell.prototype.has_item_by_type = function(key){
		var boolean = false;
		if ( this.hash.get(key) != undefined ){
			boolean = true;
		}
		return boolean;
	}

    // Test: OK
	Cell.prototype.has_item = function(){
		var boolean = false;
		if ( this.hash.length() != 0 ){
			boolean = true;
		}
		return boolean;
	}

    // Test: OK
	Cell.prototype.items = function(){
		return this.hash.hash;
	}

    // Test: OK
	Cell.prototype.east = function(){
		var col = this.col+1;
		return this.matrix.get_cell(this.row, col);
	}

	Cell.prototype.west = function(){
		var col = this.col-1;
		return this.matrix.get_cell(this.row, col);
	}

	Cell.prototype.north = function(){
		var row = this.row - 1;
        var col = ( this.matrix.type.name === "Hex" && this.row%2 == 0) ? this.col - 1 : this.col; 
		
		return this.matrix.get_cell(row, col);
	}

	Cell.prototype.south = function(){
		var row = this.row + 1;
		var col = ( this.matrix.type.name === "Hex" && this.row%2 == 0) ? this.col - 1 : this.col;
		return this.matrix.get_cell(row, col);
	}

	Cell.prototype.northeast = function(){
		var row = this.row - 1;
		var col = ( this.matrix.type.name === "Hex" && this.row%2 == 0) ? this.col : this.col + 1;

		return this.matrix.get_cell(row, col);
	}

	Cell.prototype.southeast = function(){
		var row = this.row + 1;
		var col = ( this.matrix.type.name === "Hex" && this.row%2 == 0) ? this.col : this.col + 1;

		return this.matrix.get_cell(row, col);
	}
	
	Cell.prototype.northwest = function(){
		var row = this.row - 1;
		var col = this.col - 1;
		
		if ( this.matrix.type.name === "Hex" ) {
		    throw "This method, northwest not supproted when using hex";
		}

		return this.matrix.get_cell(row, col);
	}

	Cell.prototype.southwest = function(){
		var row = this.row + 1;
		var col = this.col - 1;

		if ( this.matrix.type.name === "Hex" ) {
		    throw "This method, northwest not supproted when using hex";
		}

		return this.matrix.get_cell(row, col);
	}

	Cell.prototype.directions = function(){

		return this.matrix.type.directions(this);
	}

	Cell.prototype.move = function(item, cell){
		this.remove_item(item.key);
		cell.set_item(item.key, item);
	}


	function Hash(){
		this.size = 0;
		this.hash = new Array();
		
	}
	
	Hash.prototype.set = function(key, item){
		this.size++;
		this.hash.push(item);
	}

	Hash.prototype.get = function(key){
		for (var i=0;i<this.hash.length;i++){
			if (this.hash[i].key == key){
				return this.hash[i];
			}
		}
	}

	Hash.prototype.remove = function(key){
		for (var i=0;i<this.hash.length;i++){
			if (this.hash[i].key == key){
				this.hash.splice(i,1);
				this.size--;
			}
		}
	}

    Hash.prototype.length = function(){
		return this.size;
	}

    //  What is this?
    // Is this even used?
	function list(){
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
	}
	
	return {
	    Matrix2d: Matrix2d,
	    create_matrix: create_matrix,
	    SquareDiagonal: SquareDiagonal,
	    SquareNonDiagonal: SquareNonDiagonal,
	    Hex: Hex
	}

}())




