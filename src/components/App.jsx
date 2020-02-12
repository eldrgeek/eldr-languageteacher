import { CurrentModule, React } from '../CurrentModule';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import Title from './Title';
import MediaPlayer from './MediaPlayer';
import Controls from './Controls';
import TextDisplay from './TextDisplay';
import ErrorMessage from './ErrorMessage';
const App = () => {
  // const { state, actions } = useApp();
  const keyEvent = event => {
    console.log('key event', event.key);
  };
  return (
    <React.Fragment>
      <section onKeyDown={keyEvent}>
        {/* <header className="header">
        </header> */}

        {/* <Title /> */}
        <MediaPlayer />
        <Controls />
        <TextDisplay />
        <ErrorMessage />
        <section className="main" />
      </section>
    </React.Fragment>
  );
};
export default App;
CurrentModule(App);
