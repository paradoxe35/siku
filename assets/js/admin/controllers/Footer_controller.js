//@ts-check
import { FooterMixin } from "@/js/mixins/footer_mixin";
import { Controller } from "stimulus"


const controller = class extends Controller { }

Object.assign(controller.prototype, FooterMixin);

export default controller