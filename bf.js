"use strict";2

var bf_options = {
	ALLOWDEBUGHASH: 0x1
	,EXTRALARGETAPE: 0x2
	,EXTRALARGECELLS: 0x4
	,WRAPTAPE: 0x8
};

var bf_interpreter = function( options ){
	
	var TAPE_MAX = options & bf_options.EXTRALARGETAPE? 100000 : 30000;
	var CELL_MAX = options & bf_options.EXTRALARGECELLS? Math.pow(2, 32)-1 : Math.pow(2, 8) -1;
	var program = "";
	var output = "";
	var input = "";
	var tape = [0];
	var pointer = 0;
	var pc = 0;
	
	var bfi = {
		load: function( code ){
			program = code;
		}
		,setInput: function( newInput ){
			input = newInput;
		}
		,reset: function( newOptions ){
			if(newOptions) options = newOptions;
			var TAPE_MAX = options & bf_options.EXTRALARGETAPE? 100000 : 30000;
			var CELL_MAX = options & bf_options.EXTRALARGECELLS? Math.pow(2, 32) : 255;
			program = output = "";
			pc = pointer = 0;
			tape = [0];
		}
		,run: function( callback, code ){
			if( code ) program = code;
			while (pc !== program.length){
				//console.log("step:"+pc+"  "+program[pc]);
				switch (program[pc]){
					case '+': 
						if( !inc() ){ 
							console.log(output);	
							if( callback) {	callback( output ); }
							return; 
						}
						break;
					case '-': 
						if( !dec() ){ 
							console.log(output);	
							if( callback) {	callback( output ); }
							return; 
						}
						break;
					case '<':
						if( !movl() ){ 
							console.log(output);	
							if( callback) {	callback( output ); }
							return; 
						}
						break;
					case '>': 
						if( !movr() ){ 
							console.log(output);	
							if( callback) {	callback( output ); }
							return; 
						}
						break;
					case '.': 
						if( !prnt() ){ 
							
							console.log(output);	
							if( callback) {	callback( output ); }
							return; 
						}
						break;
					case ',': 
						if( !scan() ){
							console.log(output);	
							if( callback) {	callback( output ); } 
							return; 
						}
						break;
					case '[': 
						if( !loop() ){ 
							console.log(output);	
							if( callback) {	callback( output ); }
							return; 
						}
						break;
					case ']':
						if( !endl() ){
							console.log(output);	
							if( callback) {	callback( output ); } 
							return; 
						}
						break;
					case '#':
						if( !debug() ){ 
							console.log(output);	
							if( callback) {	callback( output ); }
							return;
						}
						break;
					default:
						break;
				}
				pc++;
			}
			if( !callback ){
				console.log(output);
			}
			else{
				callback( output );
			}
		}
	};
	
	
	function inc(){//	+
		if( tape[pointer] === CELL_MAX ){
			tape[pointer] = 0;
			return true;
		}
		tape[pointer]++;
		return true;
	}
	function dec(){//	-
		if( tape[pointer] === 0 ){
			tape[pointer] = CELL_MAX;
			return true;
		} 
		tape[pointer]--;
		return true;
	}
	function movl(){//	<
		if( pointer === 0 ){
			if( options & bf_options.WRAPTAPE ){
				pointer = TAPE_MAX;
				return true;
			}
			error( "Tape underflow!" );
			return false;
		}
		pointer--;
		return true;
	}
	function movr(){//	>
		if( pointer === TAPE_MAX ){
			if( options & bf_options.WRAPTAPE ){
				pointer = 0;
				return true;
			}
			return error( "Tape overflow!" );
		}
		pointer++;
		if( tape[pointer] === undefined ){
			tape[pointer] = 0;
		}
		return true;
	}
	
	function prnt(){//	.
		output += String.fromCharCode( tape[pointer] % 255 );
	//	console.log("print:"+tape[pointer]+" asChar:"+String.fromCharCode( tape[pointer] % 255 ) );
		return true;
	}
	
	function scan(){//	,
		if( input.length === 0 ){
			return false;
		}
		tape[pointer] = input.charCodeAt(0);
		input = input.slice(1);
		return true;
	}
	
	function loop(){//	[
		if( tape[pointer] === 0 ){
			console.log("must loop");
			let pcBackup = pc;
			pc++;
			let indent = 0;
				console.log("bip "+pc+ " " + program[pc]);
			while( program[pc] !== ']' || indent !== 0){
				console.log("bip "+pc+ " " + program[pc]);
				
				if( program[pc] === '[' ){
					indent++;
				}
				if( program[pc] === ']' && indent !== 0 ){
					indent--;
				}
				pc++;
				if( pc >= program.length ){
					return error( "unmatched braces, start at: " + pcBackup + " indent level at end of program: " + indent );
				}
			}
			console.log("loop skipped to "+pc+ " from "+pcBackup); 
		}
		return true;
	}
	
	function endl(){//	]
		var pcBackup = pc;
		var indent = 0;
		
		//console.log("endl:: "+pc+" "+program[pc]);
		while(pc-- && program[pc] !== '[' || indent !== 0 ){
		//	console.log("endl "+pc+" "+program[pc] + " i:"+indent);
			if( program[pc] === '[' && indent !== 0 ){
				indent++;
			}
			if( program[pc] === ']' && indent !== 0 ){
				indent--;
			}
			if( pc < 0 ){
				return error( "Unmatched braces, ending brace found at: "+ pcBackup + ", indent level to start of program: "+indent89 );
			}
		}
		pc--;
		return true;
	}
	
	function debug(){
		if( options & bf_options.ALLOWDEBUGHASH ) {
			console.log("Debugging: " + tape);
			let outstring = "";
			for(let i = 0; i < 10; i++){
				outstring += "[" + (tape[i]||0) + "]";
			}
		}
		return true;
	}
	function error( err ){
		output = err;
		return false;
	}
	return bfi;
};

