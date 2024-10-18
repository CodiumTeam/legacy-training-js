import {gameRunner} from "../src/game_runner.js";

const {writeFileSync, readFileSync} = require('fs');

describe('Game', () => {
    it('the output remains unchanged', () => {
        let output = "";
        console.log = (msg) => output = output + msg + "\n";
        Math.random = mockedRandom();

        gameRunner();

        // writeFileSync('golden.txt', output);
        let expectedOutput = readFileSync('golden.txt', 'utf-8');
        expect(output).toBe(expectedOutput);
    });
});

let numberOfCalls = 0;

function mockedRandom() {
    numberOfCalls++;
    return () => [
        49, 32, 14, 71, 68, 16, 36, 85, 52, 50, 76, 18, 95, 39, 3, 77, 2, 84, 59,
        87, 48, 43, 69, 83, 21, 37, 73, 56, 55, 58, 94, 6, 11, 46, 92, 26, 79, 38,
        75, 57, 72, 27, 10, 53, 35, 51, 7, 81, 20, 98, 13, 40, 15, 44, 54, 78, 88,
        19, 8, 61, 99, 47, 29, 1, 33, 24, 93, 34, 67, 23, 63, 91, 70, 22, 45, 25,
        82, 65, 89, 31, 66, 17, 41, 74, 28, 5, 9, 97, 90, 86, 62, 96, 60, 30, 80,
        42, 64, 4, 100,
    ][numberOfCalls % 100] / 100;
}
