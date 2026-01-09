import React, { useRef, useEffect, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import talwinderPng from '../assets/filter/talwinder.png';
import talwinderSound from '../assets/filter/talwinder.m4a';

export const FaceTimeContent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [filterMode, setFilterMode] = useState<'cat' | 'talwinder'>('cat');
  const faceMeshRef = useRef<FaceMesh | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const filterModeRef = useRef<'cat' | 'talwinder'>('cat');
  const talwinderImageRef = useRef<HTMLImageElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Preload Talwinder image and audio
  useEffect(() => {
    const img = new Image();
    img.src = talwinderPng;
    img.onload = () => {
      talwinderImageRef.current = img;
    };
    
    // Preload audio
    const audio = new Audio(talwinderSound);
    audio.loop = true;
    audioRef.current = audio;
  }, []);

  // Update ref whenever filterMode changes
  useEffect(() => {
    filterModeRef.current = filterMode;
    
    // Play/pause audio based on filter mode
    if (audioRef.current) {
      if (filterMode === 'talwinder') {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset to beginning
      }
    }
  }, [filterMode]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
    }
    // Camera.stop() already handles stopping all tracks
    if (faceMeshRef.current) {
      faceMeshRef.current.close();
    }
    // Stop audio when component unmounts
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const startCamera = async () => {
    try {
      setIsLoading(true);
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (!video || !canvas) return;

      // Initialize FaceMesh
      const faceMesh = new FaceMesh({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        }
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      faceMesh.onResults(onResults);
      faceMeshRef.current = faceMesh;

      // Start camera
      const camera = new Camera(video, {
        onFrame: async () => {
          if (faceMeshRef.current) {
            await faceMeshRef.current.send({ image: video });
          }
        },
        width: 1280,
        height: 720
      });

      await camera.start();
      cameraRef.current = camera;
      setIsLoading(false);
      
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please allow camera permissions.');
      setIsLoading(false);
    }
  };

  const onResults = (results: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const video = videoRef.current;
    if (!video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw mirrored video
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(results.image, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();

    // If face detected, draw cat overlay
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      
      // Mirror the canvas for drawing
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      
      if (filterModeRef.current === 'cat') {
        drawCatOverlay(ctx, landmarks, canvas.width, canvas.height);
      } else {
        drawTalwinderOverlay(ctx, landmarks, canvas.width, canvas.height);
      }
      
      ctx.restore();
    }
  };

  const drawCatOverlay = (
    ctx: CanvasRenderingContext2D,
    landmarks: any[],
    width: number,
    height: number
  ) => {
    // Get key facial points (no mirroring needed, we already mirrored the canvas)
    const nose = landmarks[1];
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];
    const leftCheek = landmarks[234];
    const rightCheek = landmarks[454];
    const chin = landmarks[152];
    const forehead = landmarks[10];
    
    // Get mouth landmarks for expression detection
    const upperLip = landmarks[13];
    const lowerLip = landmarks[14];
    const leftMouth = landmarks[61];
    const rightMouth = landmarks[291];
    
    // Get eye landmarks for blink detection
    const leftEyeUpper = landmarks[159];
    const leftEyeLower = landmarks[145];
    const rightEyeUpper = landmarks[386];
    const rightEyeLower = landmarks[374];

    // Calculate face center and dimensions
    const centerX = nose.x * width;
    const centerY = nose.y * height;
    const faceWidth = Math.abs((rightCheek.x - leftCheek.x) * width) * 1.6;
    const faceHeight = Math.abs((chin.y - forehead.y) * height) * 1.8;
    
    // Detect expressions
    const mouthOpenness = Math.abs((lowerLip.y - upperLip.y) * height);
    const mouthWidth = Math.abs((rightMouth.x - leftMouth.x) * width);
    const isSmiling = mouthWidth > faceWidth * 0.25;
    const isMouthOpen = mouthOpenness > 15;
    
    // Detect eye state (blink)
    const leftEyeOpenness = Math.abs((leftEyeLower.y - leftEyeUpper.y) * height);
    const rightEyeOpenness = Math.abs((rightEyeLower.y - rightEyeUpper.y) * height);
    const isLeftEyeClosed = leftEyeOpenness < 5;
    const isRightEyeClosed = rightEyeOpenness < 5;

    // Calculate head tilt angle
    const eyeAngle = Math.atan2(
      (rightEye.y - leftEye.y) * height,
      (rightEye.x - leftEye.x) * width
    );

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(eyeAngle);

    // Draw cat face (oval shape) - main face
    ctx.fillStyle = '#f5a742'; // Orange cat color
    ctx.strokeStyle = '#d88c2f';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.ellipse(0, 0, faceWidth / 2, faceHeight / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Draw lighter muzzle area
    ctx.fillStyle = '#ffd4a3';
    ctx.beginPath();
    ctx.ellipse(0, faceHeight * 0.1, faceWidth * 0.35, faceHeight * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw cat ears
    ctx.fillStyle = '#f5a742';
    ctx.strokeStyle = '#d88c2f';
    ctx.lineWidth = 3;

    // Left ear
    ctx.beginPath();
    ctx.moveTo(-faceWidth * 0.35, -faceHeight * 0.45);
    ctx.lineTo(-faceWidth * 0.5, -faceHeight * 0.75);
    ctx.lineTo(-faceWidth * 0.2, -faceHeight * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Left ear inner (pink)
    ctx.fillStyle = '#ffb6c1';
    ctx.beginPath();
    ctx.moveTo(-faceWidth * 0.35, -faceHeight * 0.5);
    ctx.lineTo(-faceWidth * 0.43, -faceHeight * 0.68);
    ctx.lineTo(-faceWidth * 0.27, -faceHeight * 0.53);
    ctx.closePath();
    ctx.fill();

    // Right ear
    ctx.fillStyle = '#f5a742';
    ctx.beginPath();
    ctx.moveTo(faceWidth * 0.35, -faceHeight * 0.45);
    ctx.lineTo(faceWidth * 0.5, -faceHeight * 0.75);
    ctx.lineTo(faceWidth * 0.2, -faceHeight * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right ear inner (pink)
    ctx.fillStyle = '#ffb6c1';
    ctx.beginPath();
    ctx.moveTo(faceWidth * 0.35, -faceHeight * 0.5);
    ctx.lineTo(faceWidth * 0.43, -faceHeight * 0.68);
    ctx.lineTo(faceWidth * 0.27, -faceHeight * 0.53);
    ctx.closePath();
    ctx.fill();

    // Draw cat eyes (react to user's blinking)
    const eyeWidth = faceWidth * 0.12;
    const eyeHeight = isLeftEyeClosed ? faceHeight * 0.02 : faceHeight * 0.1;
    const eyeHeightRight = isRightEyeClosed ? faceHeight * 0.02 : faceHeight * 0.1;
    const eyeY = -faceHeight * 0.15;

    // Left eye (white) - closes when user closes left eye
    if (!isLeftEyeClosed) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-faceWidth * 0.2, eyeY, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Left pupil (vertical slit) - wider when mouth open
      const pupilWidth = isMouthOpen ? eyeWidth * 0.25 : eyeWidth * 0.15;
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.ellipse(-faceWidth * 0.2, eyeY, pupilWidth, eyeHeight * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Closed eye (line)
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(-faceWidth * 0.2, eyeY, eyeWidth, 0.2, Math.PI - 0.2);
      ctx.stroke();
    }

    // Right eye (white) - closes when user closes right eye
    if (!isRightEyeClosed) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(faceWidth * 0.2, eyeY, eyeWidth, eyeHeightRight, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Right pupil (vertical slit) - wider when mouth open
      const pupilWidth = isMouthOpen ? eyeWidth * 0.25 : eyeWidth * 0.15;
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.ellipse(faceWidth * 0.2, eyeY, pupilWidth, eyeHeightRight * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Closed eye (line)
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(faceWidth * 0.2, eyeY, eyeWidth, 0.2, Math.PI - 0.2);
      ctx.stroke();
    }

    // Draw nose (triangle)
    ctx.fillStyle = '#ffb6c1';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, faceHeight * 0.05);
    ctx.lineTo(-faceWidth * 0.04, faceHeight * 0.12);
    ctx.lineTo(faceWidth * 0.04, faceHeight * 0.12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw mouth (reacts to user's expression)
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    
    // Vertical line from nose
    ctx.beginPath();
    ctx.moveTo(0, faceHeight * 0.12);
    ctx.lineTo(0, faceHeight * 0.22);
    ctx.stroke();

    if (isMouthOpen) {
      // Open mouth (surprised/meowing expression)
      ctx.fillStyle = '#ff69b4';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, faceHeight * 0.28, faceWidth * 0.08, faceHeight * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (isSmiling) {
      // Big smile
      ctx.beginPath();
      ctx.arc(-faceWidth * 0.08, faceHeight * 0.22, faceWidth * 0.12, 0.2, Math.PI - 0.2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(faceWidth * 0.08, faceHeight * 0.22, faceWidth * 0.12, 0.2, Math.PI - 0.2);
      ctx.stroke();
    } else {
      // Normal smile
      ctx.beginPath();
      ctx.arc(-faceWidth * 0.08, faceHeight * 0.22, faceWidth * 0.1, 0.3, Math.PI - 0.3);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(faceWidth * 0.08, faceHeight * 0.22, faceWidth * 0.1, 0.3, Math.PI - 0.3);
      ctx.stroke();
    }

    // Draw whiskers
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    // Left whiskers (3 on each side)
    for (let i = 0; i < 3; i++) {
      const y = -faceHeight * 0.05 + i * (faceHeight * 0.1);
      ctx.beginPath();
      ctx.moveTo(-faceWidth * 0.45, y);
      ctx.lineTo(-faceWidth * 0.7, y - faceHeight * 0.05 + i * (faceHeight * 0.04));
      ctx.stroke();
    }

    // Right whiskers
    for (let i = 0; i < 3; i++) {
      const y = -faceHeight * 0.05 + i * (faceHeight * 0.1);
      ctx.beginPath();
      ctx.moveTo(faceWidth * 0.45, y);
      ctx.lineTo(faceWidth * 0.7, y - faceHeight * 0.05 + i * (faceHeight * 0.04));
      ctx.stroke();
    }

    // Add fur texture - forehead stripes
    ctx.strokeStyle = '#d88c2f';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 3; i++) {
      const y = -faceHeight * 0.35 + i * (faceHeight * 0.06);
      ctx.beginPath();
      ctx.moveTo(-faceWidth * 0.12, y);
      ctx.quadraticCurveTo(0, y - faceHeight * 0.02, faceWidth * 0.12, y);
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawTalwinderOverlay = (
    ctx: CanvasRenderingContext2D,
    landmarks: any[],
    width: number,
    height: number
  ) => {
    // Check if Talwinder image is loaded
    if (!talwinderImageRef.current) return;
    
    // Get key facial points
    const nose = landmarks[1];
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];
    const leftCheek = landmarks[234];
    const rightCheek = landmarks[454];
    const chin = landmarks[152];
    const forehead = landmarks[10];
    
    // Calculate face dimensions
    const faceWidth = Math.abs(rightCheek.x * width - leftCheek.x * width);
    const faceHeight = Math.abs(chin.y * height - forehead.y * height);
    
    // Calculate face angle based on eyes
    const eyeAngle = Math.atan2(
      (rightEye.y - leftEye.y) * height,
      (rightEye.x - leftEye.x) * width
    );
    
    // Eye calculations for blinking
    const leftEyeTop = landmarks[159];
    const leftEyeBottom = landmarks[145];
    const rightEyeTop = landmarks[386];
    const rightEyeBottom = landmarks[374];
    
    const leftEyeOpenness = Math.abs((leftEyeBottom.y - leftEyeTop.y) * height);
    const rightEyeOpenness = Math.abs((rightEyeBottom.y - rightEyeTop.y) * height);
    
    const isLeftEyeClosed = leftEyeOpenness < 5;
    const isRightEyeClosed = rightEyeOpenness < 5;
    
    // Calculate center point between eyes and chin
    const centerX = nose.x * width;
    const centerY = ((forehead.y + chin.y) / 2) * height;
    
    // Calculate Talwinder overlay dimensions - larger to cover entire face
    const overlayWidth = faceWidth * 1.8;
    const overlayHeight = faceHeight * 2.0;
    
    // Save context
    ctx.save();
    
    // Move to center, rotate, then draw
    ctx.translate(centerX, centerY);
    ctx.rotate(eyeAngle);
    
    // Draw the preloaded Talwinder image centered
    ctx.drawImage(
      talwinderImageRef.current,
      -overlayWidth / 2,
      -overlayHeight / 2,
      overlayWidth,
      overlayHeight
    );
    
    // Calculate eye positions relative to Talwinder overlay
    // Adjust these offsets based on where the eyes are in your PNG
    const eyeOffsetY = faceHeight * 0.0001 - 10; // Move eyes lower (subtract more to move down)
    const eyeOffsetX = faceWidth * 0.35;
    const eyeWidth = faceWidth * 0.12; // Increased from 0.08
    const eyeHeight = faceWidth * 0.08; // Increased from 0.05
    
    // Draw animated eyes that open and close (within the same rotated context)
    if (!isLeftEyeClosed) {
      // Open left eye - white eye with almond shape
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-eyeOffsetX, -eyeOffsetY, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Black outline
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Black pupil
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(-eyeOffsetX, -eyeOffsetY, eyeHeight * 0.6, 0, Math.PI * 2);
      ctx.fill();
      
      // White highlight (shine)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-eyeOffsetX - eyeHeight * 0.2, -eyeOffsetY - eyeHeight * 0.2, eyeHeight * 0.25, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Closed left eye - curved line (like closed eyelid)
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(-eyeOffsetX, -eyeOffsetY, eyeWidth, eyeHeight * 0.1, 0, 0, Math.PI);
      ctx.stroke();
    }
    
    if (!isRightEyeClosed) {
      // Open right eye - white eye with almond shape
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(eyeOffsetX, -eyeOffsetY, eyeWidth, eyeHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Black outline
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Black pupil
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(eyeOffsetX, -eyeOffsetY, eyeHeight * 0.6, 0, Math.PI * 2);
      ctx.fill();
      
      // White highlight (shine)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeOffsetX - eyeHeight * 0.2, -eyeOffsetY - eyeHeight * 0.2, eyeHeight * 0.25, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Closed right eye - curved line (like closed eyelid)
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(eyeOffsetX, -eyeOffsetY, eyeWidth, eyeHeight * 0.1, 0, 0, Math.PI);
      ctx.stroke();
    }
    
    ctx.restore();
  };

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Hidden video element */}
      <video
        ref={videoRef}
        className="hidden"
        playsInline
        muted
      />

      {/* Canvas with cat overlay */}
      {!error && (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />
      )}

      {/* Loading state */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Connecting to FaceTime...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90">
          <svg className="w-20 h-20 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-white text-lg text-center px-8">{error}</p>
          <button
            onClick={startCamera}
            className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* FaceTime controls overlay */}
      {!isLoading && !error && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button className="w-14 h-14 rounded-full bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm flex items-center justify-center transition-colors border border-white/20">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
          <button className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button className="w-14 h-14 rounded-full bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm flex items-center justify-center transition-colors border border-white/20">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      )}

      {/* Filter mode toggle */}
      {!isLoading && !error && (
        <div className="absolute top-6 left-6 flex gap-2">
          <button
            onClick={() => setFilterMode('cat')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 border transition-all ${
              filterMode === 'cat'
                ? 'bg-purple-600 text-white border-white/20 shadow-lg'
                : 'bg-gray-800/80 text-white/70 border-white/10 hover:bg-gray-700/80'
            } backdrop-blur-sm`}
          >
            <span className="text-xl">😺</span>
            <span className="font-medium">Cat</span>
          </button>
          <button
            onClick={() => setFilterMode('talwinder')}
            className={`px-4 py-2 rounded-full flex items-center gap-2 border transition-all ${
              filterMode === 'talwinder'
                ? 'bg-purple-600 text-white border-white/20 shadow-lg'
                : 'bg-gray-800/80 text-white/70 border-white/10 hover:bg-gray-700/80'
            } backdrop-blur-sm`}
          >
            <span className="text-xl">💀</span>
            <span className="font-medium">Talwinder</span>
          </button>
        </div>
      )}

      {/* Active mode indicator */}
      {!isLoading && !error && (
        <div className="absolute top-6 right-6 bg-purple-600/80 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
          <span className="text-2xl">{filterMode === 'cat' ? '🐱' : '💀'}</span>
          <span className="text-white font-medium">
            {filterMode === 'cat' ? 'Cat Mode' : 'Talwinder Mode'} Active
          </span>
        </div>
      )}
    </div>
  );
};
