import dayOne from "./dayOne.js";
import dayTwo from './dayTwo.js';
import dayThree from './dayThree.js';
import dayFour from "./dayFour.js";
import { logInBox } from "./utils.js";

logInBox("Day One", dayOne.first(), dayOne.second());
console.log("-------------------");
logInBox("Day Two", dayTwo.first(), dayTwo.second());
console.log("-------------------");
logInBox("Day Three", dayThree.first(), dayThree.second());
console.log("-------------------");
logInBox("Day Four", dayFour.first(), dayFour.second());
