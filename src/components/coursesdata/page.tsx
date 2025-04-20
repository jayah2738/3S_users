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
    <div className="section w-full h-full">
      <div className="pdf">
        <div className="border">
          <div className="webviewer h-[80vh] " ref={viewer}></div>
        </div>
      </div>
      <div className="video">
        <div>
          <video width="640" height="360" controls>
            <source src="@/my-backend-project/videos/1744753274810-Comment Commencer Le Trading (Pour DÃ©butant).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default SixExoEngPdfSocializing;