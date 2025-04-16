'use client';
import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';

const SixExoEngPdfSocializing = () => {
  const viewer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewer.current) {
      WebViewer(
        {
          path: '/lib', 
          initialDoc: '/pdf/level1.pdf', 
        },
        viewer.current
      )
        .then((instance) => {
          console.log('WebViewer initialized', instance);
        })
        .catch((error) => {
          console.error('Error initializing WebViewer:', error);
        });
    }
  }, []);

  return (
    <div className="border">
      <div className="webviewer h-[100vh]" ref={viewer}></div>
    </div>
  );
};

export default SixExoEngPdfSocializing;