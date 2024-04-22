function roundto(num, digits) {
    if (digits < 0) return num;
    return Math.round(num*Math.pow(10, digits))/Math.pow(10, digits);
}