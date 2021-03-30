//@ts-check
import { NavBarMixin } from "@/js/mixins/navbar_mixin";
import { Controller } from "stimulus"


const controller = class extends Controller {}

Object.assign(controller.prototype, NavBarMixin);

export default controller