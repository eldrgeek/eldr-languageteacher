import ReactPlayer from 'react-player';
import { CurrentModule, React, useApp } from '../CurrentModule';

const style = {
  height: '500px',
  width: '100px',
};
const MediaPlayer = () => {
  const { state, actions } = useApp();
  const progress = progress => {
    console.log(progress.playedSeconds);
  };

  return (
    <div style={style}>
      <ReactPlayer
        // controls={false}
        url={state.mediaURL}
        playing={state.play}
        volume={1}
        width="50vw"
        height="50vh"
        onProgress={progress}
        onReady={() => console.log('ready now')}
      />
    </div>
  );
};

export default MediaPlayer;
