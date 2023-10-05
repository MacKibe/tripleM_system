"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triple_m = void 0;
// Access the server services by importing all the facilities that are in the
//server module in the schema foler of our library
var server = require("../../../schema/v/code/server.js");
//
// Access to Page class of our library
var view = require("../../../outlook/v/code/view.js");
//
// Extend the page class with our own version, called mashamba
var triple_m = /** @class */ (function (_super) {
    __extends(triple_m, _super);
    //
    // Here we now intialiaze the components we declared
    function triple_m() {
        var _this = _super.call(this) || this;
        //
        // The couner for documents being displayed
        _this.counter = 0;
        //
        // the image panel
        //
        _this.images_section = document.getElementById("images_section");
        // the transcript panel
        //
        _this.transcription_section = document.getElementById("transcription_section");
        //
        // the folder panel
        _this.folder_section = document.getElementById("folder_section");
        return _this;
        //
        //
    }
    //
    // Replace the show pannels method with our own version
    triple_m.prototype.show_panels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //
                        // Load documents
                        _a = this;
                        return [4 /*yield*/, server.exec("database", ["mutall_mashamba", false], "get_sql_data", ["/mashamba/v/code/mashamba.sql", "file"])];
                    case 1:
                        //
                        // Load documents
                        _a.docs = (_b.sent());
                        //
                        // Load the current title
                        this.load_title();
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    // Load documents to the home page depending
    triple_m.prototype.load_title = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                pages = JSON.parse(this.docs[this.counter].pages);
                //
                // Create the first page, including its image
                this.populate_documents(pages[0]);
                return [2 /*return*/];
            });
        });
    };
    //
    // Polpulates my images section with images
    triple_m.prototype.populate_documents = function (page) {
        //
        // Create an image element for this page
        var image = document.createElement("img");
        //
        // Set the source of the image to the URL of the page
        image.src = "http://localhost".concat(page.url);
        //
        // Attach the image element to the other-pages div element
        this.images_section.appendChild(image);
    };
    return triple_m;
}(view.page));
exports.triple_m = triple_m;
