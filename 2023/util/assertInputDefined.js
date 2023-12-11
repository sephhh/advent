"use strict";
exports.__esModule = true;
exports.assertInputDefined = void 0;
function assertInputDefined(input) {
    if (typeof input === "undefined") {
        throw new Error("Invalid or unexpected input");
    }
}
exports.assertInputDefined = assertInputDefined;
