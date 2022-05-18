import "@stimulus/polyfills";
import "@js/functions/lib";
import $ from "jquery";
import "@js/utils/CustomElements";
import startStimulus from "../utils/stimulus";

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
