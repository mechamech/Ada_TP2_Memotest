class Board {
	constructor() {
		this._progress = 0; // pares ya encontrados (máximo 6)
		this._win = 6; 
		this._attempts = 24; // intentos que quedan
		this._tiles = []; // objetos ficha
		this._activeTiles = []; // fichas dadas vuelta (máximo 2)
	}

	//OCULTA TABLERO, PREGUNTA NOMBRE, MUESTRA TABLERO
	startGame() {
		let board = this;
		$("#submitName").on("click", function() {
			$("#playerName").text($("#input").val());
			$("#nameInput").remove();
			$(".board").removeClass("overlay");
			board.makeTiles();
		})		
	}

	//GENERA FICHAS
	makeTiles() {
		let board = this; // para usar "this" dentro de funciones
		let tileImgs = ["badtzmaru", "chococat", "hellokitty", "keroppi", "mymelody", "twinstars"]; // recorro este array y creo dos fichas con cada imagen //cargo las imágenes desde css con clases
		let bgColors = ["salmon", "#4AB37E", "#4881A2", "#FFBC69", "#DF5C8A", "#71A5C3"]; //salmon, verde, azul, naranja, magenta, celeste

		function getRandomColor() {
			let color = Math.floor(Math.random() * bgColors.length);
			return bgColors.splice(color, 1)[0];
		}

		tileImgs.forEach(function(element, index) { //por cada imagen de ficha
			//genero un par de fichas de igual imagen y id
			let color = getRandomColor(); // el mismo color para las dos fichas
			let tile1 = new Tile(element, index, 0, color, board); //la posición se genera al mezclar las fichas en placeTiles()
			let tile2 = new Tile(element, index, 0, color, board);
			board._tiles.push(tile1, tile2);
		}); 

		board.placeTiles();
	}

	//MEZCLA LAS FICHAS, LES ASIGNA POSICIÓN Y GENERA DIVS
	placeTiles() {
		let shuffledTiles = this._tiles.sort(function() {
			return Math.random() - 0.5;
		});

		shuffledTiles.forEach(function(tileObj, index) {
			tileObj._position = index;
			let tile = $(`<div class='square ${tileObj._image} back'>`);
			tile.css("background-color", tileObj._bgcolor);	
			tile.attr("data-position", index);
			$(".board").append(tile);
		})
	}

	//MANEJAN FICHAS ACTIVAS
	makeTileActive(tile) {
		this._activeTiles.push(tile);
	}

	makeTileInactive(tile) {
		let index = this._activeTiles.indexOf(tile.id) // busco la ficha en activetiles
		this._activeTiles.splice(index, 1); // y la saco
	}

	//COMPARA FICHAS ACTIVAS (cuando hay 2)
	compareTiles() {
		if (this._activeTiles[0]._id == this._activeTiles[1]._id) {//si las fichas activas tienen el mismo id
			this._progress += 1; //sumo 1 al progreso
			this._activeTiles = []; //vacío activeTiles
		}		

		else {//si no matchean
			let board = this;
			function flipBoth() {
				board._activeTiles[1]._status = "front" ;
				board._activeTiles[1].flip();
				board._activeTiles[0]._status = "front";
				board._activeTiles[0].flip();
			}
			window.setTimeout(flipBoth, 1000);
		}

		$(".attempts").text(this._attempts); // muestro intentos restantes
		this.checkWinLose.bind(this)();  // me fijo si gané o perdí después de un ratito
	}

	//
	checkWinLose() {
		if (this._progress == this._win) {
			window.setTimeout(function() { alert("Ganaste! Yay!"); location.reload();  }, 500);
		}

		else if (this._attempts == 0 && this._progress !== this._win) {//impide perder si se gana en el último intento
			window.setTimeout(function() { alert("Perdiste! Boo!"); location.reload(); }, 500)
		}

		else {
			this._attempts -= 1; // si no gané ni perdí, sólo resto un intento
		}
	}
}

