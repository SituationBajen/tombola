// "pids" are the unique numbers representing the season tickets.
// Each season ticket has a unique pid number.
import pids0 from "./pids-1.0.0.js";
import pids1 from "./pids-1.0.1.js";
import pids2 from "./pids-1.0.2.js";
import pids5_dam from "./pids-dam-1.0.5.js";

const occasions = [
  { name: "27/10 2020 - Hammarby-Häcken", quantity: 280, winningCode: "XQÄHDL", pids: pids0 },
  { name: "29/10 2020 - Tilläggslottning Hammarby-Häcken", quantity: 20, pids: pids1 },
  { name: "Julkalendern", quantity: 5, pids: pids2 },
  { name: "24/6 2021 - Hammarby-Växjö", quantity: 215, substitutes: 50, pids: pids5_dam },
  { name: "27/6 2021 - Hammarby-Sirius", quantity: 250, substitutes: 50, pids: pids5_dam }
];

export default occasions;
