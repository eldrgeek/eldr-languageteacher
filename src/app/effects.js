// import page from 'page';
console.log('loading effects!');
export const storage = (() => {
  let logSave, logRestore;
  return {
    initialize(state) {
      logSave = state.devState.logDiags.save;
      logRestore = state.devState.logDiags.restore;
    },
    async saveLocalAttribute(attr, value) {
      if (logSave) console.log('saving ', attr, value);
      localStorage.setItem(attr, JSON.stringify(value));
    },

    getLocalAttribute(attr, value) {
      let saved = localStorage.getItem(attr);
      if (logRestore) console.log('recovered', attr, saved, JSON.parse(saved));
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.log(saved);
        console.log(e);
        return value;
      }
    },
  };
})();
export const translate = (() => {
  let clearFunction;
  return {
    initialize(clear) {
      clearFunction = clear;
    },

    async clearErrorMessage() {
      setTimeout(clearFunction, 3000);
    },
    async toTarget(text) {
      let query =
        'https://translate.googleapis.com/translate_a/single?client=gtx&sl=pl&tl=en&dt=t&q=' +
        encodeURI(text);
      fetch(query)
        .then(result => {
          return result.json();
        })
        .then(parsed => {
          return parsed[0][0][0];
        });
    },
  };
})();

// export const router = {
//   initialize(routes) {
//     Object.keys(routes).forEach(url => {
//       page(url, ({ params }) => routes[url](params));
//     });
//     page.start();
//   },
//   goTo(url) {
//     page.show(url);
//   },
// };

// export const ids = {
//   create() {
//     return Date.now().toString();
//   },
// };
