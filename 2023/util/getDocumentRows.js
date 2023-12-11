"use strict";
exports.__esModule = true;
exports.getDocumentRows = exports.getInputRows = void 0;
var node_fs_1 = require("node:fs");
var getInputRows = function (rawText) { return rawText.trim().split("\n"); };
exports.getInputRows = getInputRows;
var getDocumentRows = function (filename) {
    var rawText = node_fs_1.readFileSync(filename, "utf8");
    return exports.getInputRows(rawText);
};
exports.getDocumentRows = getDocumentRows;
