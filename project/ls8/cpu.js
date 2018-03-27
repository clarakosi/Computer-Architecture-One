/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */

const HLT = 0b00000001;
const LDI = 0b10011001;
const PRN = 0b01000011;
const MUL = 0b10101010;

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
        
        let IR = this.ram.read(this.reg.PC);
        
        let operandA = this.ram.read(this.reg.PC + 1);
        let operandB = this.ram.read(this.reg.PC + 2);
        
        const handle_HLT = () => {
            this.stopClock();
        }
    
        const handle_LDI = (index, value) => {
            this.reg[index] = value
        }
    
        const handle_PRN = (index) => {
            console.log(this.reg[index]);
        }

        const handle_MUL = () => {
            this.alu('MUL', operandA, operandB);
        }
        
        // switch(IR) {
        //     case LDI: 
        //     handle_LDI(operandA, operandB);
        //     break;
        //     case PRN: 
        //     handle_PRN(operandA);
        //     break;
        //     case HLT:
        //     handle_HLT();
        //     break;
        //     case MUL:
        //     handle_MUL();
        //     break;
        //     default:
        //     console.log("Unknown instructions: " + IR.toString(2));
        //     handle_HLT()
        //     break;
        // }

        const branchTable = {
            [LDI]: handle_LDI,
            [PRN]: handle_PRN,
            [HLT]: handle_HLT,
            [MUL]: handle_MUL
        }
        
        branchTable[IR](operandA, operandB)

        this.reg.PC += (IR >>> 6) + 1;
    }
}

module.exports = CPU;
