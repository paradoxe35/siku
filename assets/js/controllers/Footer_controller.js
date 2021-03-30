//@ts-check
import { Controller } from "stimulus"
import { FooterMixin } from "@js/mixins/footer_mixin"

const controller = class extends Controller {}

Object.assign(controller.prototype, FooterMixin);

export default controller