Number.prototype.nround = function (places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
}