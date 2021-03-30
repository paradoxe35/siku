//@ts-check
import { SigninOrAuthMixin } from "@/js/mixins/SigninOrAuth_mixin";
import { Controller } from "stimulus"

const controller = class extends Controller { }

Object.assign(controller.prototype, SigninOrAuthMixin);

export default controller
