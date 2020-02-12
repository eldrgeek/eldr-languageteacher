import { CurrentModule, React } from '../CurrentModule';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import Title from './Title';
import MediaPlayer from './MediaPlayer';
import Controls from './Controls';
import TextDisplay from './TextDisplay';

const App = () => {
  // const { state, actions } = useApp();

  return (
    <React.Fragment>
      <section>
        {/* <header className="header">
        </header> */}

        {/* <Title /> */}
        <MediaPlayer />
        <Controls />
        <TextDisplay />

        <section className="main" />
      </section>
    </React.Fragment>
  );
};
export default App;
CurrentModule(App);
