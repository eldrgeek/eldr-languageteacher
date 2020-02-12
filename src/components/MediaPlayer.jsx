import ReactPlayer from 'react-player';
import { CurrentModule, React, useApp } from '../CurrentModule';

const style = {
  display: 'block',
  // background: 'red',
};

const MediaPlayer = () => {
  const { state } = useApp();
  const progress = progress => {
    console.log(progress.playedSeconds);
  };

  return (
    <div style={style}>
      <ReactPlayer
        controls={false}
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
CurrentModule(MediaPlayer);
