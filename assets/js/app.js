//@ts-check
import "@stimulus/polyfills";
import "./functions/lib";
import "@js/utils/CustomElements";
import $ from "jquery";
import startStimulus from "./utils/stimulus";

// @ts-ignore
window.$ = window.jQuery = $;
import "bootstrap";

startStimulus(
    function () {
        // @ts-ignore
        return import.meta.globEager(`./controllers/**/*_controller.js`);
    },
    function () {
        // @ts-ignore
        return require.context(`./controllers`, true, /\_controller.js$/);
    }
);
