const listenersMap = [];

const obj = {},
  objProto = obj.__proto__;

/**
 * EventEmitter
 */
class EventEmitter {
  /**
   * イベントを待ち受ける
   * @param {string} type
   * @param {function} listener
   */
  on(type, listener) {
    // 待ち受ける対象のリスナーオブジェクト
    let listeners;
    for (const listenersMapItem of listenersMap) {
      // 継承された場合も考慮してthisで条件分岐する
      if (listenersMapItem.target === this) {
        listeners = listenersMapItem.listeners;
      }
    }
    if (!listeners) {
      listeners = {};
      // リスナー一覧に新規登録する
      listenersMap.push({
        target: this,
        listeners,
      });
    }
    // typeはスペース区切りで複数登録が可能
    const types = type.split(" ");

    for (const type of types) {
      if (!listeners[type]) {
        // まだ未登録なら配列を新規作成
        listeners[type] = [];
      }
      // 配列にコールバックを登録する
      listeners[type].push(listener);
    }

    return this;
  }

  /**
   * イベント待受を解除する
   * @param {string} type 解除したいイベントタイプ
   * @param {function} listener 解除したい処理(オプション)
   */
  off(type, listener) {
    let listeners;
    listenersMap.forEach((listenersMapItem) => {
      if (listenersMapItem.target === this) {
        listeners = listenersMapItem.listeners;
      }
    });
    // リスナーがないので終了
    if (!listeners) return this;

    const types = type.split(" ");

    for (const type of types) {
      // eslint-disable-next-line no-prototype-builtins
      if (!listeners.hasOwnProperty(type)) break;

      const _listeners = Object.keys(listeners);

      for (const eventType of _listeners) {
        if (type === eventType) {
          if (listener) {
            console.log("aaa");
            const typedListeners = listeners[eventType];
            for (let i = typedListeners.length - 1; i >= 0; i--) {
              // 登録されている関数
              if (typedListeners[i] === listener) {
                // 配列から削除する
                typedListeners.splice(i, 1);
              }
            }
            if (typedListeners.length === 0) {
              // リスナーオブジェクトを削除する
              delete listeners[eventType];
            }
          } else {
            delete listeners[eventType];
          }
        }
      }
    }
  }

  /**
   * イベント発火
   * @param {string} type 発火したいイベントタイプ
   * @param {any} data コールバック関数にわたす引数(オプション)
   */
  emit(type, data) {
    let listeners;

    for (const listenersMapItem of listenersMap) {
      if (listenersMapItem.target === this) {
        listeners = listenersMapItem.listeners;
      }
    }

    if (!listeners) return this;

    // nullや0の場合もあるのでundefinedで評価
    if (data !== undefined) {
      if (data.__proto__ === objProto) {
        data.target = data.target || this;
        data.type = data.type || type;
      }
    }

    let callbacks = [];
    const _listeners = Object.keys(listeners);
    for (const eventType of _listeners) {
      let eType = eventType;
      if (eventType.indexOf(".") > 0) {
        eType = eventType.split(".")[0];
      }
      if (eType === type) {
        // リスナー関数をコピー
        callbacks = callbacks.concat(listeners[eventType]);
      }
    }

    for (const callback of callbacks) {
      // リスナー関数の実行
      callback.call(this, data);
    }

    return this;
  }
}

export { EventEmitter };
