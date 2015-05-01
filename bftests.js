/*bftests.js*/

/* 
*	a unit test suite for my brainfuck interpreter.
*/
var bf = {};

QUnit.module("Practical Tests, options: 0", {
	setup: function(){
		bf = bf_interpreter( bf_options.ALLOWDEBUGHASH );
	}
	,teardown: function(){
		bf = {};
	}
});


test( "Do nothing, reset", function(assert){
	var code = "";
	bf.load( code );
	bf.run( function( output ){
		assert.equal( "", output, "Nothing load and run" );
	});	
	bf.reset();
	var code = "";
	bf.run(  function( output ){
		assert.equal( "", output, "Nothing run with code parameter" );
	}, code);
	bf.load("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.");
	bf.reset();
	bf.run(  function( output ){
		assert.equal( "", output, "Reset and run" );
	}, code);
});


test( "number functions", function(assert){
	var code = "++++++++++++++++++++++++++++++++++++++++++++++++.+.+.+.+.+.#";
	bf.load( code );
	bf.run( function( output ){
		assert.equal( output, "012345", "increment only" );
	});	
	bf.reset();
	var code = "+++++++++++++++++++++++++++++++++++++++++++++--+++++.+.+.+.+.+.#";
	bf.load( code );
	bf.run( function( output ){
		assert.equal( output, "012345", " increment and decrement" );
	});	
});


test( "non code characters", function(assert){
	var code = 	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++ #48 IS WHERE THE NUMBERS START IN ASCII";
		code +=	".+.+.+.+.+.#	so we print 0 through five by incrementing";
	bf.load( code );
	bf.run( function( output ){
		assert.equal( output, "012345", "012345 load and run" );
	});	
});

test( "Tape drive functions", function(assert){
	var code = 	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++ >";
		code +=	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++  ";
		code += ".<+.";
		
	bf.load( code );
	bf.run( function( output ){
		assert.equal( output, "01", "01 shifting left and right" );
	});	
});

test( "simple loop", function( assert ){
	var code = 	"+++++ +++++> set and initial counter to ten";
		code += "+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++++";
		code +=	"+++++ +++ <# get up to 28 for ascii numbers without a loop";
		code += "[>.+<-#]# loop: printing and incrementing the ascii value each time while decrementing out counter until 0";
		console.log("code" +code.length);
	bf.run( function( output ){
		assert.equal( output, "0123456789", "counting with a loop" );
	}, code);
});


test( "Hello World!", function(assert){
	var code = "-[------->+<]>-.-[->+++++<]>++.+++++++..+++.[--->+<]>-----.---[->+++<]>.-[--->+<]>---.+++.------.--------.-[--->+<]>.#";
	bf.load( code );
	bf.run( function( output ){
		assert.equal( output, "Hello World!", "Hello world load and run" );
	});
});	
	
test( "Goodbye World!", function(assert){
	var code = "-[------->+<]>--.[--->+<]>++..-----------.--.[--->+<]>+++.--[->+++<]>.--[--->+<]>-.---[->+++<]>.-[--->+<]>---.+++.------.--------.-[--->+<]>.";
	bf.run(  function( output ){
		assert.equal( output, "Goodbye World!",  "Goodbye world" );
	}, code);
});	

test( "Lorem Ipsum", function(assert){
	var testText = "Lorem ipsum dolor sit amet, et prima placerat dissentias est, sonet noster ullamcorper vel ne. Sale habemus mei at. Unum nominati referrentur eu pro. Ullum rationibus vituperatoribus ius te.Nec omnis indoctum ne, ad vis agam aperiam fabulas, ut nam nibh vitae iudicabit. Eu altera temporibus intellegebat cum, ex possim fabellas eleifend duo, labitur pericula similique no sit. Ius augue scriptorem id, ea habemus alienum lucilius duo, veri lucilius quaerendum quo ei. Nec vidisse inermis vocibus an, mei alii soluta ea, cum te paulo voluptua. Sea falli facilisi id. An sit feugiat detracto appetere. Est case postea indoctum ne, at qui inermis nominati. Vim minim viris principes no, ad vel animal dissentias. Inani latine sea no, has tempor aeterno ceteros in. Ad velit alienum eos, recteque qualisque et his.Duis autem denique id mel. Eu mei aliquip aliquam, sea ullum latine ocurreret et. Everti equidem mediocritatem ius in, putent vivendum pri no. Diam tantas aperiam nec eu. Audiam bonorum praesent ne cum, at vel modo commodo dignissim, eos alia tractatos hendrerit in.Nam fugit consequat assueverit eu, aeque evertitur eum et. Ut wisi eirmod nam. Ne graeco indoctum adolescens his, no erat habemus quo. Eum cu habeo commodo, ea verterem scriptorem eam.";
	var code = "-[------->+<]>+++.+[--->+<]>.+++.-------------.++++++++.[->+++++<]>-.-[--->++<]>-.+++++++.+++.++.--------.[->+++++<]>-.+[->+++<]>+.+++++++++++.---.+++.+++.[-->+++++<]>+++.---[->++++<]>-.----------.+++++++++++.[---->+<]>+++.[->+++<]>+.++++++++++++.--------.[--->+<]>---.[++>---<]>--.------------.+[->+++<]>++.[--->+<]>---.[---->+<]>+++.[-->+++++++<]>.++.---------.++++.------------.-[->+++<]>.[-->+++++++<]>.----.-----------.++.++.+++++++++++++.+++[->+++<]>++.--[--->+<]>-.[---->+<]>+++.+[->+++<]>+.+++++.++++++++++..++++[->+++<]>.+++++++++.++++++.-----------.--------.--[--->+<]>--.+[---->+<]>+++.+[->+++<]>++.[--->+<]>----.+.[++>---<]>--.------------.---[->++++<]>-.----.-.---------.[--->+<]>---.[---->+<]>+++.+[----->+<]>+.+.++++.+.+++[->+++<]>.+++++++++++++.[-->+++++<]>+++.---[->++++<]>+.---------..-----------.++++++++++++.----------.++++++++++++.+++.--.-----------.+++++++++++++.[-->+++++<]>+++.--[->++++<]>--.+[->+++<]>.+++++++.[++>---<]>--.+[----->+<]>+.---------.[->+++<]>-.++[--->++<]>.>-[--->+<]>--.++++++++++++++.+++++++++++.-------.--[--->+<]>-.-[--->++<]>--.-------.+.+++.++++++++.++++++++.--.+[---->+<]>+++.+[----->+<]>.--------.++++.[--->+<]>---.[->+++<]>+.--[--->+<]>-.[++>---<]>.++[--->++<]>.>-[--->+<]>.--[--->+<]>---.+++++++.--------.[->+++++<]>-.+[----->+<]>+.+.--.----.+++++.-------------.--[--->+<]>-.-----------.[--->+<]>---.---[----->++<]>.-------------.+.-.+++++++++++++..-------------.+++++++++.++++++.+.---.[-->+++++<]>+++.+[->+++<]>++.[--->+<]>--.-[---->+<]>+++.[-->+++++++<]>.++.---.[->+++++<]>+++.++[--->++<]>.>-[--->+<]>.----[--->++++<]>..+++++++++.--------.[->+++++<]>-.---[----->++<]>.+++[->+++<]>++.--[--->+<]>-.-----------.++++++.-.-----.-------.[--->+<]>-.--.+[---->+<]>+++.--[->++++<]>--.[------>+<]>.+++++++++++.+.-----.-----------.+++++++++++++.+++[->+++<]>++.--[--->+<]>-.-----.+++.---------.-------.[--->+<]>-.--.+[---->+<]>+++.-[--->++<]>-.++++++++++++.--.+[---->+<]>+++.---[->++++<]>.+++[->+++<]>.[->+++<]>-.-------[->++<]>.>--[----->+<]>-.--.[--->+<]>-.+++++[->+++<]>.--.+.-----.++++++++++.+[---->+<]>+++.-[--->++<]>-.+++++.----------.+++++++++++.------------.-[--->+<]>--.+.--------.[->+++++<]>-.+[----->+<]>+.---------.-[->+++<]>.------------.[->+++<]>+.+++.-[--->+<]>-.--[->++++<]>--.[------>+<]>.++++++++++.+[---->+<]>+++.[->+++<]>+.++++++.------.++++++++++++.[->+++++<]>-.[->+++<]>+.-[++>-----<]>.-----------.+++++++++++++.---------.--------.++++++++++++.[->+++++<]>-.++[->+++<]>.-----.+.[--->+<]>-.---------.-----------.--[--->+<]>--.-[++>---<]>+.------------.---[->++++<]>+.-.[---->+<]>+++.+[----->+<]>+.-------------.++++++++++++.[->+++++<]>-.+[----->+<]>+.-----.-------.++++++.--[--->+<]>--.--[->++++<]>--.[------>+<]>.+++++++++++.+[->+++<]>++.++++.--[--->+<]>-.-[--->++<]>-.++++++++++++.+[->+++<]>++.+++++.------.--.+.+++++++.+++++++++++.[++>---<]>.++[--->++<]>.++[->++<]>+.-[----->+<]>+.-[---->+<]>+++.[->+++<]>+.+++++++++++.++++++++.+++[->+++<]>.+++++++++++++.+++[->+++<]>++.-[->+++<]>.---[->++++<]>.+++[->+++<]>.++++++++.+++.-.+++.---------.-------.[--->+<]>-.--.+[---->+<]>+++.-[--->++<]>-.+++++.++++++.+++[->+++<]>.+++++++..-------.++.--.---.-.--[--->+<]>-.[---->+<]>+++.+[->+++<]>.-[--->+<]>-.--------.+[----->++<]>.------------.+[->+++<]>++.[--->+<]>+.[---->+<]>++.[-->+++++++<]>.-.++++..----------.++++.[->+++++<]>-.++[->+++<]>.-----.+.+++.+++++++..-----------.--[--->+<]>--.+[---->+<]>+++.+[->+++<]>++.+++++++.-------.++++.---.-.+++++++++.----------.-[--->+<]>-.+[->+++<]>+.--[--->+<]>-.------.[->+++++<]>+.------------.++[--->++<]>.-----------.+.+++++++.+++++++++++.+.---.[-->+++++<]>+++.[-->+++++++<]>.-----------.+++++++++++++.---------.------.-[--->+<]>-.---------.-----------.-[->+++<]>.---[->++++<]>-.----------.++++.----.+++.---.++++++++.++++.++[->+++<]>.--[--->+<]>-.+[----->+<]>+.+.[--->+<]>-----.---[->++++<]>-.----------.+++++++++++.[++>---<]>.++[--->++<]>.++++[->++<]>+.[----->+<]>.--.+[---->+<]>+++.[->+++<]>+.--[--->+<]>.++[->+++<]>++.--[--->+<]>--.++[->+++<]>.--[--->+<]>-.---[->++++<]>-.+++[->+++<]>+.-[--->+<]>----.---------.+++++++.++++.-----.+++.-------------.++++++++.[->+++++<]>-.-[--->++<]>-.-----.[->+++<]>.------------.+[->+++<]>++.----.-[->+++<]>.-[--->++<]>--.-------.+.+++.++++++++.++++++++.--.+[---->+<]>+++.[->+++<]>+.+++++++++++.---.----.+++++++++.+++++++.--------.[->+++++<]>-.++[--->++<]>.+++++++++.+[->+++<]>+.++++++.+++.---.++++++++++++.--.+[---->+<]>+++.+[->+++<]>+.--[--->+<]>-.------.[->+++++<]>+.------------.--[->++++<]>--.+[->+++<]>.+++++++++++++.---------.[--->+<]>---.++[--->++<]>.+++++++++.+[->+++<]>+.++++++.+++.---.++++++++++++.--.+[---->+<]>+++.----[->++++<]>+.++++.[->+++<]>++.++++.+++++++++++++.-------------.+++++++++.----------.--[--->+<]>-.--------.[->+++++<]>-.----[->++++<]>+.++++.------.[--->+<]>-----.+[->+++<]>++.++++.----[->+++<]>-.++[--->++<]>.[-->+++++<]>--.>--[----->+<]>-.--.[--->+<]>-.--[->++++<]>--.[------>+<]>.-----.+++++.++++++++++..++++[->+++<]>.--[--->+<]>-.-[--->++<]>-.+++++.---------.+++++++++++++.-----.----.++++++++++.+[---->+<]>+++.--[->++++<]>--.-------.------------.++++++.-------.[--->+<]>-.--.+[---->+<]>+++.[->+++<]>+.+++++++++++++.[----->++<]>.------------.+[----->+<]>.--------.++++.[--->+<]>---.[->+++<]>+.+++++++++++.---..[--->+<]>---.---[->++++<]>-.----.---.+++++++++.-.+[->+++<]>++.-[->+++<]>.+[->+++<]>++.----.[--->++++<]>.------------.+[->+++<]>.-[--->+<]>-.--------.[->+++++<]>-.---[->++++<]>.+++[->+++<]>.--[--->+<]>-.[-->+++++++<]>.[----->++<]>+.--[--->+<]>.---------.+++.[--->+<]>-----.--[->++++<]>--.-------.---.+++++++++.-----.++++.+.[->+++<]>++.-[-->+<]>--.++[--->++<]>.>-[--->+<]>--.[----->+++<]>.----.-[->+++<]>.++[->+++<]>.-----.+++++++++++..---.[--->+<]>---.++[->+++<]>.-----.++.++++++.+++.---.++++++++++.----------.[--->+<]>---.-[--->++<]>-.-----.[->+++<]>++.++[--->++<]>.[->++<]>+.[--->+<]>+++.-[->+++++<]>-.---[->++++<]>-.----------.+++++++++++.[---->+<]>+++.++[->+++<]>.-.[--->+<]>--.++[->+++<]>++.++.--------.--[--->+<]>-.[---->+<]>+++.+[->+++<]>+.+.[--->+<]>---.--.+++[->+++<]>++.++.-[--->+<]>--.-----.[--->+<]>-----.[->+++<]>+.-[++>-----<]>..-----------.[--->+<]>---.+++[->+++<]>.+++++++++++++.-------------.[->+++<]>-.++[--->++<]>.++[->++<]>+.[--->+++++<]>.+.[---->+<]>+++.+[->+++<]>.--.--[--->+<]>--.++++[->+++<]>.--[--->+<]>-.[-->+++++++<]>.-.++++.+.+++[->+++<]>.----.-[->+++<]>.-[--->++<]>-.+++++.----------.+++++++++++.------------.-[--->+<]>--.+.--------.[->+++++<]>-.+[----->+<]>+.---------.-[->+++<]>.------------.[->+++<]>+.--[--->+<]>-.[---->+<]>+++.----[->++++<]>+.++++.------------.[--->+<]>---.-[--->++<]>-.+++++.---------.+++++++++++++.-----.----.++++++++++.+[---->+<]>+++.+[----->+<]>+.+.--.----.+++++.-------------.--[--->+<]>-.-----------.----[->+++<]>-.++[--->++<]>.>+[--->++<]>.++++[->++++<]>+.++++.[->+++++<]>-.+[----->+<]>.----.+++++.-----.++++.[->+++++<]>-.--[->++++<]>--.[------>+<]>.+++++++++.---------.++++++++++.+[---->+<]>+++.[-->+++++++<]>.++.---------.+++++.-----------.++++++.+++++++.-----------.[--->+<]>----.+[---->+<]>+++.+[----->+<]>+.+.[->+++++<]>+.------------.[->+++<]>+.+++.-[--->+<]>-.--[->++++<]>--.+[->+++<]>.+++++++.[++>---<]>--.[->+++<]>+.+++++++++++++.-----.++++.------------.+++++++++++.[++>---<]>--.+[->+++<]>+.+++++.++++++++++..++++[->+++<]>.+++++++++.++++++.-----------.--------.--[--->+<]>--.+[++>---<]>.++[--->++<]>.++++[->++<]>+.+[--->+<]>.-------------.+++++++++++++.-----.[--->+<]>---.++[--->++<]>.-----------.--[--->+<]>-.-----------.+++++.---------.--[--->+<]>-.---[->++++<]>-.++++[->+++<]>.----.-[->+++<]>.+[----->+<]>+.+.[->+++++<]>+.------------.-[--->++<]>--.-------.--[--->+<]>--.+[---->+<]>+++.---[->++++<]>.+++[->+++<]>.++++++++.+++.-.+++.[-->+++++<]>+++.[->+++<]>+.++++.[--->+<]>---.+++[->+++<]>.+++++++++++++.----.+.[--->+<]>-----.+[->+++<]>.++.[--->+<]>---.+++[->+++<]>.+++++++++++++.---.++++.+[---->+<]>+++.-[--->++<]>-.+++++.[----->++<]>++.++[--->++<]>.[->++<]>+.+[-->+++<]>+.-[--->+<]>-.--[->++++<]>--.+[->+++<]>.+++++++.---.+++++++++++.[---->+<]>+++.[->+++<]>+.+++++++++++.---.----.+++++++++.+++++++.--------.[->+++++<]>-.+[->+++<]>++.++++++++++.++++.-[++>---<]>+.------------.---[----->++<]>.-------------.--.-[--->+<]>--.+++[->+++<]>.++++++++++++.++++.++[->+++<]>.--[--->+<]>-.----[->++++<]>+.++++.[->+++<]>++.+++++++++++.---.++++++++++.--.++++.++[->+++<]>.--[--->+<]>-.+[->+++<]>++.[--->+<]>---.[---->+<]>+++.-[--->++<]>--.+.++++++++++.+[++>---<]>.[-->+++<]>-.[----->+<]>+.------------.++++++++++.+[---->+<]>+++.[->+++<]>+.--[--->+<]>.-.+++[->+++<]>.++++++++.[->+++++<]>-.+[->+++<]>+.+.+++++++++.-----.++++++++.++++.++[->+++<]>.--[--->+<]>-.-[--->++<]>-.-----.-[--->+<]>-.+[----->+<]>.--------.+++++++.[-->+<]>--------.++[--->++<]>.++[->++<]>+.-[----->+<]>+.-[---->+<]>+++.+[----->+<]>.--------.++++.[--->+<]>---.[->+++<]>+.+++++++++++.---.++++++++.++++.------------.+++++++.[------->++<]>.[->+++<]>+.+++++++++++.---.++++++++.++++.[->+++<]>++.++++++++++++.+[----->++<]>.------------.---[->++++<]>-.++++[->+++<]>.----.-[->+++<]>.---[->++++<]>+.---------..+++++++++.--------.[->+++++<]>-.++[--->++<]>.-----------.--[--->+<]>-.-----------.+++++.---------.--[--->+<]>-.+++++[->+++<]>.------------.-[--->+<]>-.---..-------------.+++++++++++++.-------------.[--->+<]>---.[---->+<]>+++.+[->+++<]>++.[--->+<]>---.[++>---<]>.++[--->++<]>.++[->++<]>+.-[----->+<]>++.+[->+++<]>.+++++++++++++.++.-----------.[--->+<]>---.+[->+++<]>++.++++++++++++.++++.------------.-----.+.++++++++.[->+++++<]>-.+[----->+<]>.--------.-.+++++.++++++.------------.-[--->+<]>----.---------.+++++++++++.+[->+++<]>++.--[--->+<]>-.+++[->+++<]>.++++++++.[->+++++<]>-.-[--->++<]>-.++++++++++++.--.+[---->+<]>+++.-[--->++<]>-.+++++.[----->++<]>.------------.[-->+++++++<]>.+++++.-.+++[->+++<]>.+++++++++.++++++.[---->+<]>+++.--[->++++<]>--.[------>+<]>.[->++++++<]>.+[->+++<]>.+++++++++.----------.--[--->+<]>-.--------.[->+++++<]>-.[-->+++++++<]>.++.---------.[--->+<]>---.+[----->+<]>+.+.[->+++++<]>+++.++[--->++<]>.++[->++<]>.++[-->+++<]>.--------.++++++++++++.[->+++++<]>-.---[->++++<]>.+[->+++<]>++.+++++++++++++.++++++.+[->+++<]>++.--[--->+<]>--.+[---->+<]>+++.[->+++<]>+.-[++>-----<]>.-----------.+++++++++++++.---------.--------.++++++++++++.[->+++++<]>-.+[----->+<]>+.---------.--.[--->+<]>-.+[->+++<]>++.[--->+<]>--.-[++>---<]>.++[--->++<]>.[->++<]>+.------[->++<]>-.+[->+++<]>++.+++++.--------.++++++++++++.[->+++++<]>-.[->+++<]>++.+++++++++++++.-.+.+++.+++.--------.[->+++++<]>-.[-->+++++++<]>.++.+++[->+++<]>++.++++.[--->+<]>----.++++[->+++<]>.+++++++++.++++++.[---->+<]>+++.+[----->+<]>+.---------.--[--->+<]>-.+[->+++<]>.-[--->+<]>-.--------.+[----->++<]>.------------.[->+++<]>+.--[--->+<]>-.[---->+<]>+++.--[->++++<]>--.+[->+++<]>.+++++++.[++>---<]>--.+[----->+<]>.++.-----------.+++++++++++.[--->+<]>-----.+[->+++<]>.++++++++++++.--..++.-----------.+++++++++++.[--->+<]>-----.+[->+++<]>+.+++++.--.+++++++.-----.++++++++++..----------.++++.+[----->++<]>.------------.+[->+++<]>++.++++++++++.++++.+[---->+<]>+++.[->+++<]>+.+++++++++++.---.--------.-[->+++<]>.---[->++++<]>.--.+++[->+++<]>++.++.-[--->+<]>--.+[->+++<]>++.--[--->+<]>-.-----.++++.+[---->+<]>+++.-[--->++<]>--.---.+++++++++.----------.++++++++++++++.-------------.+++++++++++++.---------.+++++++++++.[---->+<]>+++.-[--->++<]>-.+++++.[----->++<]>++.-------[->++<]>.[----->+++<]>-.++++++++++++.[->+++++<]>-.++[->+++<]>.-[--->+<]>--.++[->+++<]>++.++.+++++++++++.[---->+<]>+++.+[->+++<]>.++++++++++++.-.+++++.++++[->+++<]>.++++++++++++.++++.[->+++<]>++.--[--->+<]>-.[---->+<]>+++.[->+++<]>+.--[--->+<]>--..++.++[->+++<]>.[--->+<]>-.+[->+++<]>.+++++++++++++.---------.+++++++++++.[---->+<]>+++.+[->+++<]>++.[--->+<]>--.-[++>---<]>--.------------.[->+++<]>+.++++.++++++++++++.++++.++[->+++<]>.--[--->+<]>-.+[->+++<]>++.[--->+<]>-.+[->+++<]>.+++++++++++++.++.-----------.+++++++++++.+.---.[-->+++++<]>+++.+[->+++<]>++.[--->+<]>--.--------.[->+++++<]>-.+[->+++<]>++.[--->+<]>---.[++>---<]>.++[--->++<]>.>-[--->+<]>.+[--->+<]>++.[---->+<]>+++.--[->++++<]>-.+[->+++<]>+.++++++++++.----------.[--->+<]>---.+[->+++<]>++.++++.+++++++++.-----.++.-----------.-[--->+<]>-.+[----->+<]>+.-------------.++++++++++++.+[----->++<]>++.++[--->++<]>.[-->+++++<]>--.>--[----->+<]>-.--[--->+<]>-.++[->+++<]>+.+++++++++++.+++[->+++<]>++.++++.--.++++++++++++.[--->+<]>-----.-[--->++<]>-.+++++.----------.+++++++++++.------------.-[--->+<]>--.+.--------.[->+++++<]>-.[->+++<]>+.+++.+++++++++++.---.-------.[--->+<]>----.+++[->+++<]>+.++.+++++++++.+++++.+[---->+<]>+++.-[--->++<]>--.+.++++++++++.-[++>---<]>+.------------.+[----->+<]>+.+.[--->+<]>-----.+[->+++<]>++.+++++++++++++.+++[->+++<]>++.--[--->+<]>-.[---->+<]>+++.-[--->++<]>--.-------.+.+++.++++++++.++++++++.--.+[---->+<]>+++.----[->++++<]>+.++++.------.[->+++++<]>+++.++[--->++<]>.++[->++<]>+.-[----->+<]>+.--------.[->+++++<]>-.+[->+++<]>.-[--->+<]>-.-[---->+<]>+++.-[--->++<]>--.-------.+.+++.++++++++++.[--->+<]>-----.+[->+++<]>.++++++++++++.--..++.-----------.+++++++++++.[->+++++<]>+.------------.+[->+++<]>++.----.-[->+++<]>.--[->++++<]>--.+[->+++<]>.+++++++++++++.++.+++[->+++<]>.+++++++++++++.-------------.++++++++.[->+++++<]>-.---[->++++<]>-.+++[->+++<]>+.-[--->+<]>----.---------.+++++++.++++.-----.+++.-------------.++++++++.[->+++++<]>-.+[->+++<]>++.----.++++++++++++.+[----->++<]>++.";
	bf.run( function( output ){
		assert.equal( output, testText, "Lorem Ipsum!" );
	}, code );
});

test( "input", function(assert){
	var code = ",[.[-],]";
	var input = "123456qwerty";
	bf.setInput( input );
	bf.run( function( output ){
		assert.equal( output, input, "cat" );
	}, code );
});