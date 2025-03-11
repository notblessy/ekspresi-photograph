import React from "react";

const LoadingSpinner = ({ size = 10, fontSize = 16 }) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-4">
      <div
        className={`w-${size} h-${size} border-4 border-gray-200 border-t-gray-500 rounded-full animate-spin`}
      ></div>

      <p
        style={{ fontSize: fontSize }}
        className="font-semibold text-gray-500 animate-shine"
      >
        Loading Editor...
      </p>

      <style jsx>{`
        @keyframes shine {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }
        .animate-shine {
          animation: shine 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
