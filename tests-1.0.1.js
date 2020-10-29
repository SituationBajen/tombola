import occasions from './occasions-1.0.1.js';
import pseudoRand from './pseudorand-1.0.1.js';
import tombola from './tombola-1.0.1.js';

(async () => {

    console.log("TESTING PSEUDO RANDOM GENERATOR...");
    await (async () => {
        const value0 = await pseudoRand('ABC', 0);
        const value1 = await pseudoRand('ABC', 1);
        if (value0 === value1) {
            throw new Error("pseudoRand should give different results on different iterations.");
        }
    })();
    await (async () => {
        const value0 = await pseudoRand('ABC', 0);
        const value1 = await pseudoRand('ABC', 0);
        if (value0 !== value1) {
            throw new Error("pseudoRand should give same result on same iteration.");
        }
    })();
    await (async () => {
        const value0 = await pseudoRand('ABC', 0);
        const value1 = await pseudoRand('DEF', 0);
        if (value0 === value1) {
            throw new Error("pseudoRand should give different result on same iteration but with different codes.");
        }
    })();
    await (async () => {
        const value0 = await pseudoRand('ABC', 0);
        const value1 = await pseudoRand('DEF', 1);
        if (value0 === value1) {
            throw new Error("pseudoRand should give different result on different iterations and codes.");
        }
    })();
    await (async () => {
        const value0 = await pseudoRand('KENNEDY', 1337);
        if (value0 !== "f93b0c35d49ec75ab5f995940a39c453605804be81881f61ac5b73cffd208a22") {
            throw new Error("pseudoRand should return correct value.");
        }
    })();

    console.log("PID DB...");
    await (async () => {
        const winners = await tombola(occasions[0].pids, occasions[0].winningCode, occasions[0].quantity);
        occasions[1].pids.forEach(pid => {
            if (winners.includes(pid)) {
                throw new Error("No winner from round 1 should be in the pid database for round 2");
            }
        });
    })();

    console.log("FINISHED - NO ERRORS");

})();
