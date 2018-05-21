function initGame() {
	let board = new Board();
	board.startGame();

	$(document).on("click", ".square", function() { // listener de las fichas
		let position = $(this).data("position");
		let tile = board._tiles.find(function(tile) {
			return tile._position == position;
		})
		tile.flip()
	})
	
	$(".attempts").text(board._attempts); // muestro intentos restantes
}

initGame();

