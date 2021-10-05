class Reflector {
    #hash

    constructor(hash) {
        this.#hash = hash
    }

    get (value) {
        return this.#hash[value];
    }
}

module.exports = Reflector;
