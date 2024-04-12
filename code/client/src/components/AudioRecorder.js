import mic from "../mic.png";
import React, { useState, useRef } from 'react';
// import axios from 'axios'; // use s3 here

const AudioRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioPlayerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      recorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setAudioChunks([]);
      });

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const playRecordedAudio = () => {
    if (audioUrl) {
      audioPlayerRef.current.play();
    }
  };

  // const uploadRecordedAudio = async () => {
  //   if (audioUrl) {
  //     const response = await fetch(audioUrl);
  //     const blob = await response.blob();
  //     const formData = new FormData();
  //     formData.append('audioFile', blob, 'recording.wav');

  //     try {
  //       await axios.post('/api/upload', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       });
  //       console.log('Audio file uploaded successfully');
  //     } catch (err) {
  //       console.error('Error uploading audio file:', err);
  //     }
  //   }
  // };

  return (
    <div>
      <div>
        <button
          type="button"
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
          onClick={isRecording ? stopRecording : startRecording}
        >
          <img
            src={mic}
            alt="Record"
            style={{ width: '36px', height: '36px' }}
          />
        </button>
      </div>
      <div>
        <audio ref={audioPlayerRef} src={audioUrl} controls />
        <button onClick={playRecordedAudio}>Play Recorded Audio</button>
      </div>
    </div>
  );
};

export default AudioRecorder;