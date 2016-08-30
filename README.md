A Brainfuck Language interpreter written in javascript.

Includes unit tests.

## Use
A new default Brainfuck Interpreter is made by calling `new BrainFuckInterpreter()`

API:

`.load("")` sets the program string of the engine

`.setInput("")` predefines a string of characters to use as input, should the code need it.

`.reset(integer)` resets the interpreter, maintaining current code and input strings. BrainFuckOptions can be passed as a parameter.

`.run(function, "")` runs the interpreter, with the string (if provided) as a program. The function provided will be called when (if) the program terminates. This callback function should take a string, which will be the output of the BrainFuck program.

## options

The BrainFuckInterpreter can be initialized with options: `new BrainFuckInterpreter(integer)`
Options are single bit flags that can be `OR`'d together. For example, `new BrainFuckInterpreter(11)` will create a brainfuck interpreter that allows the debug hash and has a longer tape that wraps. Included in the library is a BrainFuckOptions object, which makes selecting options a little easier. The above example with options can be written as:

`new BrainFuckInterpreter(
    BrainFuckOptions.ALLOWDEBUGHASH ||
    BrainFuckOptions.EXTRALARGECELLS||
    BrainFuckOptions.WRAPTAPE
)`

|Value|Codename|Effect|Default|
|---|---|---|---|
|0x1|ALLOWDEBUGHASH|The '#' character is interpreted as a command that prints the current tape (limited to 10 cells)|The '#' character is ignored|
|0x2|EXTRALARGETAPE|sets the length of the tape to 30k cells|The tape length is 10k cells|
|0x4|EXTRALARGECELLS|cells emulate 32bit integers|cells emulate 8bit integers|
|0x8|WRAPTAPE|When a command moves the data pointer off either edge of the tape, it will move to the opposite end|When the data pointer moves off either end of the tape, and error is generated.|
