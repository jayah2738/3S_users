"use client";
import { useState, Suspense } from "react";
import SectionTitle from "../Common/SectionTitle";
import dynamic from 'next/dynamic';

// Dynamically import ReactPlayer with no SSR
const ReactPlayer = dynamic(() => import('react-player'), { 
  ssr: false,
  loading: () => (
    <div className="relative aspect-[77/40] items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
      </div>
    </div>
  )
});

const Video = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section id="video" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Ready to start learning"
          paragraph="We are here to help you with your learning journey. Our platform offers a wide range of courses and resources to help you achieve your goals"
          center
          mb="80px"
        />

        <div className="flex justify-center">
          <div className="w-full max-w-[770px]">
            <div
              className="relative overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40]">
                <Suspense fallback={
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
                  </div>
                }>
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=ZcO4KuriDU8"
                    loop
                    controls={false}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated SVG Background */}
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full overflow-hidden">
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          @keyframes randomMove1 {
            0% { transform: translate(0, 0); }
            20% { transform: translate(400px, -300px); }
            40% { transform: translate(-350px, 250px); }
            60% { transform: translate(300px, 350px); }
            80% { transform: translate(-400px, -250px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes randomMove2 {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-450px, 350px); }
            40% { transform: translate(400px, -300px); }
            60% { transform: translate(-300px, -400px); }
            80% { transform: translate(350px, 250px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes randomMove3 {
            0% { transform: translate(0, 0); }
            20% { transform: translate(350px, 400px); }
            40% { transform: translate(-400px, -350px); }
            60% { transform: translate(300px, -300px); }
            80% { transform: translate(-350px, 400px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes randomMove4 {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-400px, -300px); }
            40% { transform: translate(350px, 400px); }
            60% { transform: translate(-300px, 350px); }
            80% { transform: translate(400px, -400px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes randomMove5 {
            0% { transform: translate(0, 0); }
            20% { transform: translate(300px, -400px); }
            40% { transform: translate(-400px, 300px); }
            60% { transform: translate(400px, 350px); }
            80% { transform: translate(-300px, -350px); }
            100% { transform: translate(0, 0); }
          }
          @keyframes colorShift1 {
            0% { fill: #fbbf24; }    /* Amber */
            5% { fill: #f43f5e; }    /* Rose */
            10% { fill: #8b5cf6; }   /* Purple */
            15% { fill: #3b82f6; }   /* Blue */
            20% { fill: #10b981; }   /* Emerald */
            25% { fill: #f59e0b; }   /* Orange */
            30% { fill: #ec4899; }   /* Pink */
            35% { fill: #6366f1; }   /* Indigo */
            40% { fill: #14b8a6; }   /* Teal */
            45% { fill: #f97316; }   /* Orange */
            50% { fill: #ef4444; }   /* Red */
            55% { fill: #a855f7; }   /* Purple */
            60% { fill: #0ea5e9; }   /* Sky Blue */
            65% { fill: #22c55e; }   /* Green */
            70% { fill: #eab308; }   /* Yellow */
            75% { fill: #d946ef; }   /* Fuchsia */
            80% { fill: #4f46e5; }   /* Indigo */
            85% { fill: #06b6d4; }   /* Cyan */
            90% { fill: #f59e0b; }   /* Amber */
            95% { fill: #ec4899; }   /* Pink */
            100% { fill: #fbbf24; }  /* Amber */
          }
          @keyframes colorShift2 {
            0% { fill: #f43f5e; }    /* Rose */
            5% { fill: #8b5cf6; }    /* Purple */
            10% { fill: #3b82f6; }   /* Blue */
            15% { fill: #10b981; }   /* Emerald */
            20% { fill: #f59e0b; }   /* Orange */
            25% { fill: #ec4899; }   /* Pink */
            30% { fill: #6366f1; }   /* Indigo */
            35% { fill: #14b8a6; }   /* Teal */
            40% { fill: #f97316; }   /* Orange */
            45% { fill: #ef4444; }   /* Red */
            50% { fill: #a855f7; }   /* Purple */
            55% { fill: #0ea5e9; }   /* Sky Blue */
            60% { fill: #22c55e; }   /* Green */
            65% { fill: #eab308; }   /* Yellow */
            70% { fill: #d946ef; }   /* Fuchsia */
            75% { fill: #4f46e5; }   /* Indigo */
            80% { fill: #06b6d4; }   /* Cyan */
            85% { fill: #f59e0b; }   /* Amber */
            90% { fill: #ec4899; }   /* Pink */
            95% { fill: #fbbf24; }   /* Amber */
            100% { fill: #f43f5e; }  /* Rose */
          }
          @keyframes colorShift3 {
            0% { fill: #8b5cf6; }    /* Purple */
            5% { fill: #3b82f6; }    /* Blue */
            10% { fill: #10b981; }   /* Emerald */
            15% { fill: #f59e0b; }   /* Orange */
            20% { fill: #ec4899; }   /* Pink */
            25% { fill: #6366f1; }   /* Indigo */
            30% { fill: #14b8a6; }   /* Teal */
            35% { fill: #f97316; }   /* Orange */
            40% { fill: #ef4444; }   /* Red */
            45% { fill: #a855f7; }   /* Purple */
            50% { fill: #0ea5e9; }   /* Sky Blue */
            55% { fill: #22c55e; }   /* Green */
            60% { fill: #eab308; }   /* Yellow */
            65% { fill: #d946ef; }   /* Fuchsia */
            70% { fill: #4f46e5; }   /* Indigo */
            75% { fill: #06b6d4; }   /* Cyan */
            80% { fill: #f59e0b; }   /* Amber */
            85% { fill: #ec4899; }   /* Pink */
            90% { fill: #fbbf24; }   /* Amber */
            95% { fill: #f43f5e; }   /* Rose */
            100% { fill: #8b5cf6; }  /* Purple */
          }
          @keyframes colorShift4 {
            0% { fill: #3b82f6; }    /* Blue */
            5% { fill: #10b981; }    /* Emerald */
            10% { fill: #f59e0b; }   /* Orange */
            15% { fill: #ec4899; }   /* Pink */
            20% { fill: #6366f1; }   /* Indigo */
            25% { fill: #14b8a6; }   /* Teal */
            30% { fill: #f97316; }   /* Orange */
            35% { fill: #ef4444; }   /* Red */
            40% { fill: #a855f7; }   /* Purple */
            45% { fill: #0ea5e9; }   /* Sky Blue */
            50% { fill: #22c55e; }   /* Green */
            55% { fill: #eab308; }   /* Yellow */
            60% { fill: #d946ef; }   /* Fuchsia */
            65% { fill: #4f46e5; }   /* Indigo */
            70% { fill: #06b6d4; }   /* Cyan */
            75% { fill: #f59e0b; }   /* Amber */
            80% { fill: #ec4899; }   /* Pink */
            85% { fill: #fbbf24; }   /* Amber */
            90% { fill: #f43f5e; }   /* Rose */
            95% { fill: #8b5cf6; }   /* Purple */
            100% { fill: #3b82f6; }  /* Blue */
          }
          @keyframes colorShift5 {
            0% { fill: #10b981; }    /* Emerald */
            5% { fill: #f59e0b; }    /* Orange */
            10% { fill: #ec4899; }   /* Pink */
            15% { fill: #6366f1; }   /* Indigo */
            20% { fill: #14b8a6; }   /* Teal */
            25% { fill: #f97316; }   /* Orange */
            30% { fill: #ef4444; }   /* Red */
            35% { fill: #a855f7; }   /* Purple */
            40% { fill: #0ea5e9; }   /* Sky Blue */
            45% { fill: #22c55e; }   /* Green */
            50% { fill: #eab308; }   /* Yellow */
            55% { fill: #d946ef; }   /* Fuchsia */
            60% { fill: #4f46e5; }   /* Indigo */
            65% { fill: #06b6d4; }   /* Cyan */
            70% { fill: #f59e0b; }   /* Amber */
            75% { fill: #ec4899; }   /* Pink */
            80% { fill: #fbbf24; }   /* Amber */
            85% { fill: #f43f5e; }   /* Rose */
            90% { fill: #8b5cf6; }   /* Purple */
            95% { fill: #3b82f6; }   /* Blue */
            100% { fill: #10b981; }  /* Emerald */
          }
          .float-animation { animation: float 6s ease-in-out infinite; }
          .pulse-animation { animation: pulse 4s ease-in-out infinite; }
          .color-animation1 { animation: colorShift1 8s linear infinite; }
          .color-animation2 { animation: colorShift2 10s linear infinite; }
          .color-animation3 { animation: colorShift3 12s linear infinite; }
          .color-animation4 { animation: colorShift4 14s linear infinite; }
          .color-animation5 { animation: colorShift5 16s linear infinite; }
          .random-move1 { animation: randomMove1 10s ease-in-out infinite; }
          .random-move2 { animation: randomMove2 12s ease-in-out infinite; }
          .random-move3 { animation: randomMove3 14s ease-in-out infinite; }
          .random-move4 { animation: randomMove4 16s ease-in-out infinite; }
          .random-move5 { animation: randomMove5 18s ease-in-out infinite; }
        `}</style>
        
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
          style={{ overflow: 'visible' }}
        >
          {/* Sun-like Main Circle */}
          <circle
            cx="600"
            cy="400"
            r="300"
            className="float-animation"
            fill="#fbbf24"
          >
            <animate
              attributeName="r"
              values="300;320;300"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Randomly Moving Circles */}
          <g className="random-move1" style={{ transformOrigin: 'center' }}>
            <circle cx="600" cy="400" r="40" className="pulse-animation color-animation1" />
          </g>
          <g className="random-move2" style={{ transformOrigin: 'center' }}>
            <circle cx="600" cy="400" r="50" className="pulse-animation color-animation2" />
          </g>
          <g className="random-move3" style={{ transformOrigin: 'center' }}>
            <circle cx="600" cy="400" r="60" className="pulse-animation color-animation3" />
          </g>
          <g className="random-move4" style={{ transformOrigin: 'center' }}>
            <circle cx="600" cy="400" r="70" className="pulse-animation color-animation4" />
          </g>
          <g className="random-move5" style={{ transformOrigin: 'center' }}>
            <circle cx="600" cy="400" r="80" className="pulse-animation color-animation5" />
          </g>
          <g className="random-move1" style={{ transformOrigin: 'center', animationDelay: '2s' }}>
            <circle cx="600" cy="400" r="35" className="pulse-animation color-animation2" />
          </g>
          <g className="random-move2" style={{ transformOrigin: 'center', animationDelay: '4s' }}>
            <circle cx="600" cy="400" r="45" className="pulse-animation color-animation3" />
          </g>
          <g className="random-move3" style={{ transformOrigin: 'center', animationDelay: '6s' }}>
            <circle cx="600" cy="400" r="55" className="pulse-animation color-animation4" />
          </g>
          <g className="random-move4" style={{ transformOrigin: 'center', animationDelay: '8s' }}>
            <circle cx="600" cy="400" r="65" className="pulse-animation color-animation5" />
          </g>
          <g className="random-move5" style={{ transformOrigin: 'center', animationDelay: '10s' }}>
            <circle cx="600" cy="400" r="75" className="pulse-animation color-animation1" />
          </g>
        </svg>
      </div>
    </section>
  );
};

export default Video;
