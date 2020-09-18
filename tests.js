import pseudoRand from './pseudorand.js'

console.log("TESTING PSEUDO RANDOM GENERATOR...");
(async () => {
    const value0 = await pseudoRand('ABC', 0);
    const value1 = await pseudoRand('ABC', 1);
    if (value0 === value1) {
        throw new Error("pseudoRand should give different results on different iterations.");
    }
})();
(async () => {
    const value0 = await pseudoRand('ABC', 0);
    const value1 = await pseudoRand('ABC', 0);
    if (value0 !== value1) {
        throw new Error("pseudoRand should give same result on same iteration.");
    }
})();
(async () => {
    const value0 = await pseudoRand('ABC', 0);
    const value1 = await pseudoRand('DEF', 0);
    if (value0 === value1) {
        throw new Error("pseudoRand should give different result on same iteration but with different codes.");
    }
})();
(async () => {
    const value0 = await pseudoRand('ABC', 0);
    const value1 = await pseudoRand('DEF', 1);
    if (value0 === value1) {
        throw new Error("pseudoRand should give different result on different iterations and codes.");
    }
})();
(async () => {
    const value0 = await pseudoRand('KENNEDY', 1337);
    if (value0 !== "f93b0c35d49ec75ab5f995940a39c453605804be81881f61ac5b73cffd208a22") {
        throw new Error("pseudoRand should return correct value.");
    }
})();


