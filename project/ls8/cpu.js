/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {

    /**
     * Initialize the CPU
     */
    constructor(ram) {
        this.ram = ram;

        this.reg = new Array(8).fill(0); // General-purpose registers R0-R7
        
        // Special-purpose registers
        this.reg.PC = 0; // Program Counter
    }
	
    /**
     * Store value in memory address, useful for program loading
     */
    poke(address, value) {
        this.ram.write(address, value);
    }

    /**
     * Starts the clock ticking on the CPU
     */
    startClock() {
        const _this = this;

        this.clock = setInterval(() => {
            _this.tick();
        }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
    }

    /**
     * Stops the clock
     */
    stopClock() {
        clearInterval(this.clock);
    }

    HLT() {
        this.stopClock();
    }

    LDI(index, value) {
        this.reg[index] = value
    }

    PRN(index) {
        return console.log(this.reg[index]);
    }

    /**
     * ALU functionality
     *
     * The ALU is responsible for math and comparisons.
     *
     * If you have an instruction that does math, i.e. MUL, the CPU would hand
     * it off to it's internal ALU component to do the actual work.
     *
     * op can be: ADD SUB MUL DIV INC DEC CMP
     */
    alu(op, regA, regB) {
        switch (op) {
            case 'MUL':
                // !!! IMPLEMENT ME
                
                this.reg[regA] = this.reg[regA] * this.reg[regB];
                break;
        }
    }

    /**
     * Advances the CPU one cycle
     */
    tick() {
        // Load the instruction register (IR--can just be a local variable here)
        // from the memory address pointed to by the PC. (I.e. the PC holds the
        // index into memory of the next instruction.)

        let IR = this.ram.read(this.reg.PC).toString(2);

        // !!! IMPLEMENT ME

        // Debugging output
        // console.log(`${this.reg.PC}: ${IR.toString(2)}`);

        // Get the two bytes in memory _after_ the PC in case the instruction
        // needs them.
        let operandA = this.ram.read(this.reg.PC + 1);
        let operandB = this.ram.read(this.reg.PC + 2);

        // console.log(`operandA: ${operandA}`); // 0
        // console.log(`operandB: ${operandB}`); // 8

        // !!! IMPLEMENT ME

        // Execute the instruction. Perform the actions for the instruction as
        // outlined in the LS-8 spec.
        if (parseInt(IR, 2) === parseInt('10011001', 2)) {
            this.LDI(operandA, operandB);
        } else if (parseInt(IR, 2) === parseInt('01000011', 2)) {
            this.PRN(operandA);
        } else {
            this.HLT();            
        }


        // else if (parseInt(IR, 2) === parseInt('10101010', 2)) {
        //     this.alu('MUL', operandA, operandB);
        // }

        // !!! IMPLEMENT ME

        // Increment the PC register to go to the next instruction. Instructions
        // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
        // instruction byte tells you how many bytes follow the instruction byte
        // for any particular instruction.
        // !!! IMPLEMENT ME


        let instBytes = parseInt(IR.toString(2).slice(0,2), 2);
        this.reg.PC = instBytes + 1;

        console.log(`newPC: ${this.reg.PC}`);
        // console.log(`newIR: ${this.ram.read(this.reg.PC).toString(2)}`);
        // console.log(`first2: ${parseInt(IR.toString(2).slice(0,2), 2)}`); // 2
    }
}

module.exports = CPU;
