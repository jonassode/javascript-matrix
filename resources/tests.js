

test( "Test creation of Matrix", function() {
  var matrix = new jsmatrix.Matrix2d(10,15);
  ok( matrix.rows == 10, "Testing Matrix Rows." );
  ok( matrix.cols == 15, "Testing Matrix Cols." );
});

test( "Cell Set and Get Item", function() {
  var matrix = new jsmatrix.Matrix2d(5,5);
  var cell = matrix.get_cell(0,0);

  cell.set_item("back",{text: "A"});
  cell.set_item("front",{text: "B"});

  ok( cell.get_item("back").text == "A", "Set /get item." );
  ok( cell.get_item("front").text == "B", "Set / get item 2." );
  
  
});

test( "Cell Size ", function() {
  var matrix = new jsmatrix.Matrix2d(5,5);
  var cell = matrix.get_cell(0,0);

  cell.set_item("back",{text: "A"});
  cell.set_item("front",{text: "B"});

  ok( cell.size() == 2, "Check Size. Expected 2, was " + cell.size );
  
});

test( "Cell Remove Item ", function() {
  var matrix = new jsmatrix.Matrix2d(5,5);
  var cell = matrix.get_cell(0,0);

  cell.set_item("back",{text: "A"});
  cell.set_item("front",{text: "B"});

  cell.remove_item("front");

  ok( cell.size() == 1, "Check Size. Expected 1, was " + cell.size );
  ok( ! cell.get_item("front"), "Get deleted item." );
   
});

test( "Cell Remove Item Which does not exist.", function() {
  var matrix = new jsmatrix.Matrix2d(5,5);
  var cell = matrix.get_cell(0,0);

  cell.remove_item("front");

  ok( cell.size() == 0, "Check Size. Expected 1, was " + cell.size );
  ok( ! cell.get_item("front"), "Get deleted item." );
   
});

test( "Cell Has Item ", function() {
  var matrix = new jsmatrix.Matrix2d(5,5);
  var cell = matrix.get_cell(0,0);

  cell.set_item("back",{text: "A"});

  ok( cell.has_item() == true, "Has item. Expected true." );
   
});

test( "Cell Has Item by Type", function() {
  var matrix = new jsmatrix.Matrix2d(5,5);
  var cell = matrix.get_cell(0,0);

  cell.set_item("back",{text: "A"});

  ok( cell.has_item_by_type("back") == true, "Has item 'back'. Expected true." );
  ok( cell.has_item_by_type("front") == false, "Has item 'front'. Expected false." );

});

test( "Cell Items", function() {
  var matrix = new jsmatrix.Matrix2d(5,5);
  var cell = matrix.get_cell(0,0);
  cell.set_item("back",{text: "A"});
  cell.set_item("front",{text: "B"});  
  var items = cell.items();

  ok( items, "Items is not empty object." );
  ok( typeof items === "object", "Items is an object." + typeof items );
  ok( items.length === 2, "Testing Length." + length );

});

test( "Cell Directions", function() {
  var matrix = new jsmatrix.Matrix2d(5,5);
  var cell = matrix.get_cell(3,3);
  var directions = cell.directions();

  ok( directions.length === 4, "There should be 4 directions." );

  ok( cell.north().row === 2, "Checking the north cell row");
  ok( cell.south().row === 4, "Checking the south cell row");
  ok( cell.west().col === 2, "Checking the west cell col");
  ok( cell.east().col === 4, "Checking the east cell col");

});

test( "Cell Directions Diagonal", function() {
  var matrix = new jsmatrix.Matrix2d(5,5, new jsmatrix.SquareNonDiagonal());
  var cell = matrix.get_cell(3,3);
  var directions = cell.directions();

  ok( directions.length === 4, "There should be 8 directions." );

});

test( "Cell Directions Diagonal", function() {
  var matrix = new jsmatrix.Matrix2d(5,5, new jsmatrix.SquareDiagonal());
  var cell = matrix.get_cell(3,3);
  var directions = cell.directions();

  ok( directions.length === 8, "There should be 8 directions." );

  ok( cell.northeast().row === 2, "Checking the northeast cell row");
  ok( cell.northeast().col === 4, "Checking the northeast cell col");
  ok( cell.northwest().row === 2, "Checking the northwest cell row");
  ok( cell.northwest().col === 2, "Checking the northwest cell col");
  ok( cell.southeast().row === 4, "Checking the southeast cell row");
  ok( cell.southeast().col === 4, "Checking the southeast cell col");
  ok( cell.southwest().row === 4, "Checking the southwest cell row");
  ok( cell.southwest().col === 2, "Checking the southwest cell col");

});

test( "Cell Directions Hex Uneven rows", function() {
  var matrix = new jsmatrix.Matrix2d(5,5, new jsmatrix.Hex());

  // UnEven
  var cell = matrix.get_cell(3,3);
  var directions = cell.directions();
  ok( directions.length === 6, "There should be 6 directions." );

  ok( cell.northeast().col === 4, "Checking the northeast cell col");
  ok( cell.north().col === 3, "Checking the north cell col");
  ok( cell.southeast().col === 4, "Checking the southeast cell col");
  ok( cell.south().col === 3, "Checking the south cell col");

});

test( "Cell Directions Hex Even rows", function() {
  var matrix = new jsmatrix.Matrix2d(5,5, new jsmatrix.Hex());

  // UnEven
  var cell = matrix.get_cell(2,3);
  var directions = cell.directions();
  ok( directions.length === 6, "There should be 6 directions." );

  ok( cell.northeast().col === 3, "Checking the northeast cell col");
  ok( cell.north().col === 2, "Checking the north cell col");
  ok( cell.southeast().col === 3, "Checking the southeast cell col");
  ok( cell.south().col === 2, "Checking the south cell col");

});




