"use client";
import { useEffect, useState } from "react";

const STEPS = [
  { n: 1, label: "Personal Info"   },
  { n: 2, label: "Aadhaar Card"    },
  { n: 3, label: "Driving License" },
];

export default function StepProgress({
  current,
  completed = false,
}: {
  current: 1 | 2 | 3;
  completed?: boolean;
}) {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [animatedStep,  setAnimatedStep]  = useState(0);

  const targetWidth = completed ? 100 : ((current - 1) / 2) * 100;

  useEffect(() => {
    setAnimatedWidth(0);
    setAnimatedStep(0);

    const t1 = setTimeout(() => setAnimatedStep(completed ? 99 : current), 50);
    const t2 = setTimeout(() => setAnimatedWidth(targetWidth), 100);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [current, completed]);

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-5 py-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-3 relative">

          {/* background line */}
          <div className="absolute left-4 right-4 top-4 h-0.5 bg-gray-100 z-0" />

          {/* animated fill line */}
          <div
            className={`absolute left-4 top-4 h-0.5 z-0 ${completed ? "bg-linear-to-r from-emerald-500 to-emerald-400" : "bg-linear-to-r from-cyan-500 to-cyan-400"}`}
            style={{
              width: `calc(${animatedWidth}% * (100% - 32px) / 100%)`,
              maxWidth: "calc(100% - 32px)",
              transition: "width 600ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />

          {STEPS.map((s, i) => {
            const isDone    = completed ? true : animatedStep > s.n;
            const isCurrent = completed ? false : animatedStep === s.n;

            return (
              <div key={s.n} className="flex flex-col items-center gap-1.5 z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2
                    transition-all duration-500
                    ${isDone
                      ? "bg-emerald-500 border-emerald-500 text-white scale-100"
                      : isCurrent
                        ? "bg-cyan-500 border-cyan-500 text-white scale-110 shadow-lg shadow-cyan-200"
                        : "bg-white border-gray-200 text-gray-400 scale-100"
                    }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {isDone ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ animation: "popIn 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : s.n}
                </div>

                {isCurrent && (
                  <div
                    className="absolute w-8 h-8 rounded-full border-2 border-cyan-300 animate-ping opacity-40"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  />
                )}

                <span className={`text-[10px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                  (completed || s.n <= animatedStep) ? (completed ? "text-emerald-600" : "text-cyan-600") : "text-gray-400"
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-gray-400">
            {completed ? "All steps done" : `Step ${current} of 3`}
          </span>
          <span
            className={`text-[10px] font-semibold tabular-nums ${completed ? "text-emerald-500" : "text-cyan-500"}`}
            style={{ transition: "all 300ms ease" }}
          >
            {completed ? "100%" : `${Math.round(animatedWidth)}%`} complete
          </span>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0) rotate(-45deg); opacity: 0; }
          60%  { transform: scale(1.3) rotate(5deg);  opacity: 1; }
          100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
        }
      `}</style>
    </div>
  );
}