const addModulo = (symbol, toAdd) => {
    let tmp = symbol + toAdd;
    if (tmp >= global.amountOfSymbols) {
        tmp -= global.amountOfSymbols
    }
    return tmp;
}

const diffModulo = (firstSymbol, secondSymbol) => {
    let tmp = firstSymbol - secondSymbol;
    return tmp >= 0 ? tmp : tmp + global.amountOfSymbols;
}

module.exports = {addModulo, diffModulo};