

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

});

test( "Cell Directions Diagonal", function() {
  var matrix = new jsmatrix.Matrix2d(5,5, new jsmatrix.SquareDiagonal());
  var cell = matrix.get_cell(3,3);
  var directions = cell.directions();

  ok( directions.length === 8, "There should be 4 directions." );

});




