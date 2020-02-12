import ReactPlayer from 'react-player';
import { CurrentModule, React, useApp } from '../CurrentModule';

const style = {
  display: 'block',
  // background: 'red',
};

const MediaPlayer = () => {
  const { state } = useApp();
  const ref = React.createRef();
  const progress = progress => {
    console.log(progress.playedSeconds);
    if (ref && ref.current) console.log('REF', ref.current.getCurrentTime());
  };

  return (
    <div style={style}>
      <ReactPlayer
        ref={ref}
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
