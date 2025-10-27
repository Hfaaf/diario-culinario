import { useState, useRef, useCallback } from 'react';

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1. Inicia a câmera
  const startCamera = useCallback(async () => {
    stopCamera(); // Garante que streams antigos sejam parados
    setError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Prefere a câmera traseira
        audio: false,
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch (err) {
      console.error(err);
      setError('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  }, []);

  // 2. Para a câmera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  // 3. Tira a foto e retorna um Blob (melhor para upload)
  const takePhoto = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas || !stream) {
        resolve(null);
        return;
      }

      // Configura o canvas com o tamanho do vídeo
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Desenha o frame atual do vídeo no canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Converte o canvas para Blob
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', 0.9); // 90% de qualidade
      } else {
        resolve(null);
      }
    });
  }, [stream]);

  return { videoRef, canvasRef, stream, error, startCamera, stopCamera, takePhoto };
};