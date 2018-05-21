class Tile {
	constructor(image, id, position, bgcolor, board) {
		this._image = image;
		this._id = id;
		this._position = position;
		this._bgcolor = bgcolor;
		this._status = "back";
		this._board = board;
	}

	flip() {
		let tile = $(".square[data-position='" +this._position+ "']") //el div que corresponde al objeto
		if (this._status == "back") {
			if (this._board._activeTiles.length < 2) { //sólo si no hay dos fichas ya visibles
				tile.removeClass("back"); //le saco la clase que muestra el reverso
				this._status = "disabled";
				this._board.makeTileActive(this) // lo mando a activetiles

				if (this._board._activeTiles.length == 2) { //cuando termino de dar vuelta la ficha, me fijo si hay dos activas
						this._board.compareTiles(); // comparo las fichas
				}
			}
		}

		else if (this._status == "front") {
			tile.addClass("back"); // muestro el reverso
			this._status = "back"; // cambio el estado
			this._board.makeTileInactive(this);
		}
	}
}