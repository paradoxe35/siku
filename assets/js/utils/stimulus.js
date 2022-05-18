//@ts-check
import { Application } from "stimulus";
import { definitionsFromContext } from "stimulus/webpack-helpers";
import { TurbolinksApp } from "../modules/turbolinks";

export function requireControllerContext(modules) {
    const context = function (key) {
        return context.modules[key];
    };
    context.modules = {};
    for (const key in modules) {
        const newKey = key.replace(/.\/controllers\//, "");
        context.modules[newKey] = modules[key];
    }
    context.keys = function () {
        return Object.keys(this.modules);
    };

    return context;
}

/**
 * @param {() => any} contextDev
 * @param {() => any} contextProd
 */
export default function startStimulus(contextDev, contextProd) {
    TurbolinksApp.start();
    const application = Application.start();
    const context =
        process.env.NODE_ENV === "development"
            ? requireControllerContext(contextDev())
            : contextProd();
    application.load(definitionsFromContext(context));
}
