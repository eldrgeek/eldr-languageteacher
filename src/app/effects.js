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
  let mediaRef;
  let timeOut;
  return {
    initialize(clear) {
      clearFunction = clear;
    },
    getMediaRef() {
      return mediaRef;
    },
    setMediaRef(ref) {
      mediaRef = ref;
    },
    getMediaTime() {
      return mediaRef.getCurrentTime();
    },

    clearMediaTimeout(time) {
      if (!timeOut) clearTimeout(timeOut);
      timeOut = null;
    },
    setMediaTimeout(callback, timeout) {
      translate.clearMediaTimeout();
      // const timeRoutine = () => {
      //   console.log("Timer went off", callback)
      //   // callback()
      //   console.log("returned from callback")
      // }
      timeOut = setTimeout(callback, timeout);
    },

    async clearErrorMessage() {
      setTimeout(clearFunction, 3000);
    },
    convertChapter(state, actions, chapter) {
      const lines = chapter.split('.');
      let len = lines.length;

      state.fragments = state.fragments.slice(0, state.nToPreserve);
      if (state.nToConvert !== null) {
        len = state.nToConvert;
      }
      // console.log("convert",len)
      for (let i = 0; i < len; i++) {
        actions.appendFragment(lines[i + state.nToPreserve]);
      }
    },
    async toTarget(text) {
      console.log('translate', text);
      let query =
        'https://translate.googleapis.com/translate_a/single?client=gtx&sl=pl&tl=en&dt=t&q=' +
        encodeURI(text);
      // console.log(query
      // asdf

      // return 'Text not translated';
      return fetch(query)
        .then(result => {
          console.log(result);
          return result.json();
        })
        .then(parsed => {
          return parsed[0][0][0];
        })
        .catch(e => {
          console.log('Error ', e);
          return 'Translation service down';
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
