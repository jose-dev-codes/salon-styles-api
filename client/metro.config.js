const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const cacheStoreOriginal = config.cacheStores[0];

class CacheStoreLimitado {
  constructor(store, limite = 8) {
    this.store = store;
    this.limite = limite;
    this.activos = 0;
    this.cola = [];
  }

  async get(key) {
    await this.esperarTurno();

    try {
      return await this.store.get(key);
    } finally {
      this.liberarTurno();
    }
  }

  set(key, value) {
    return this.store.set(key, value);
  }

  clear() {
    return this.store.clear();
  }

  esperarTurno() {
    if (this.activos < this.limite) {
      this.activos++;
      return Promise.resolve();
    }

    return new Promise((resolver) => {
      this.cola.push(resolver);
    });
  }

  liberarTurno() {
    if (this.cola.length > 0) {
      const siguiente = this.cola.shift();
      siguiente();
    } else {
      this.activos--;
    }
  }
}

config.cacheStores = [
  new CacheStoreLimitado(cacheStoreOriginal, 8)
];

module.exports = config;
