import React, { useState, useEffect } from "react";
import catGif from "../assets/walking-cat.gif";

export const PasswordCat: React.FC = () => {
  const [position, setPosition] = useState(-200);
  const [isDismissed, setIsDismissed] = useState(false);
  const [displayText, setDisplayText] = useState<string[]>(["", "", ""]);
  const [currentStep, setCurrentStep] = useState(0);

  const messages = [
    "Hey there! 🐱",
    "The password is ",
    "(Type it in lowercase!)",
  ];

  useEffect(() => {
    const walkTimer = setInterval(() => {
      setPosition((prev) => {
        if (prev >= 100) {
          clearInterval(walkTimer);
          return 100;
        }
        return prev + 3;
      });
    }, 20);

    return () => clearInterval(walkTimer);
  }, []);

  useEffect(() => {
    if (currentStep >= messages.length) return;

    const currentMessage = messages[currentStep];
    let charIndex = 0;

    const typeTimer = setInterval(() => {
      if (charIndex <= currentMessage.length) {
        setDisplayText((prev) => {
          const newText = [...prev];
          newText[currentStep] = currentMessage.slice(0, charIndex);
          return newText;
        });
        charIndex++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, 800);
      }
    }, 50);

    return () => clearInterval(typeTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  if (isDismissed) return null;

  return (
    <>
      <div
        className="fixed bottom-56 z-50 w-[400px]"
        style={{
          left: `${position + 160}px`,
          transform: "translateX(-50%)",
        }}
      >
        <div className="relative bg-white rounded-3xl shadow-2xl px-8 py-6 w-[400px] backdrop-blur-sm border-2 border-gray-200">
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full text-white text-base font-bold shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
            aria-label="Dismiss cat helper"
          >
            ×
          </button>

          <div className="text-gray-800 space-y-3">
            {currentStep >= 0 && (
              <p className="font-semibold text-2xl">
                {displayText[0]}
                {currentStep === 0 &&
                  displayText[0].length < messages[0].length && (
                    <span className="animate-pulse">|</span>
                  )}
              </p>
            )}

            {currentStep >= 1 && (
              <p className="text-base leading-relaxed">
                {displayText[1]}{" "}
                <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded text-lg">
                  meow
                </span>
                {currentStep === 1 &&
                  displayText[1].length < messages[1].length && (
                    <span className="animate-pulse">|</span>
                  )}
              </p>
            )}

            {currentStep >= 2 && (
              <p className="text-sm text-gray-500 italic">
                {displayText[2]}
                {currentStep === 2 &&
                  displayText[2].length < messages[2].length && (
                    <span className="animate-pulse">|</span>
                  )}
              </p>
            )}
          </div>

          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
            <div className="border-[12px] border-transparent border-t-white"></div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 z-50" style={{ left: `${position}px` }}>
        <WalkingCat isWalking={position < 100} />
      </div>
    </>
  );
};

const WalkingCat: React.FC<{ isWalking: boolean }> = () => {
  return (
    <div className="relative w-80 h-80 mb-6 flex items-end justify-center">
      <img
        src={catGif}
        alt="Animated cat"
        className="w-full h-full object-contain"
        style={{
          mixBlendMode: "multiply",
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
        }}
      />
    </div>
  );
};
