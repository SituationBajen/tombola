import pseudoRand from "./pseudorand.js";

/**
 * This function distributes match tickets to season ticket owners,
 * based on the code and the quantity given.
 * Arguments:
 *   seasonTickets - Array with season ticket IDs (they are called "pids").
 *   code - String - A random code.
 *   quantity - Integer - The number of tickets wanted in the result.
 * Returns:
 *   An array with the season ticket IDs that shall be assigned a match ticket.
 *   The array has the length given as quantity argument.
 */
async function tombola(seasonTickets, code, quantity) {

    // Just some debug data
    // console.log("seasonTickets.length", seasonTickets.length);
    // console.log("code", code);
    // console.log("quantity", quantity);

    // Sort the season tickets and give each season ticket a pseudo-random value.
    // Sorting is important, since the array positions of the tickets affects the pseudoRand() result.
    const ticketsWithRandomCode = await Promise.all(
        seasonTickets.sort().map(async (ticket, index) => {
            return {
                pid: ticket,
                randomValue: await pseudoRand(code, index)
            };
        })
    )

    // Now sort the tickets by the randomValue (i.e. the value from pseudoRand):
    return ticketsWithRandomCode.sort((a, b) => a.randomValue < b.randomValue ? -1 : a.randomValue > b.randomValue ? 1 : 0)
        // Only keep the quantity of tickets given as quantity argument:
        .filter((_, index) => index < quantity)
        // Remove the randomValue, we only need to return the season ticket pids:
        .map(item => item.pid);
}

export default tombola;
