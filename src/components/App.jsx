import { CurrentModule, React, useApp } from '../CurrentModule';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import Title from './Title';
const App = () => {
  const { state, actions } = useApp();

  return (
    <React.Fragment>
      <section className="todoapp">
        <header className="header">
          <Title />
          <h2>{state.testValue} </h2>
        </header>
        {/* <MediaPlayer />

        <TranslationDisplay /> */}
        <section className="main" />
      </section>
    </React.Fragment>
  );
};
export default App;
CurrentModule(App);
