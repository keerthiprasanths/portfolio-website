import { useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay } from 'react-icons/fa';

export default function VideoPlayer({ url, thumbnail }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-player">
      <div className="video-player__wrapper">
        <ReactPlayer
          url={url}
          playing={playing}
          controls
          width="100%"
          height="100%"
          light={!playing && (thumbnail || true)}
          onPlay={() => setPlaying(true)}
          playIcon={
            <div className="video-player__play-btn">
              <FaPlay />
            </div>
          }
        />
      </div>
    </div>
  );
}
