//@ts-check
import { Controller } from "stimulus"
import { PricingMixin } from "@js/mixins/pricing_mixin"

const controller = class extends Controller { }

Object.assign(controller.prototype, PricingMixin);

export default controller