
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LockState = 'RECORD' | 'VERIFY' | 'OPEN' | 'FAIL';

const CadenceLockDemo = () => {
  const [mode, setMode] = useState<LockState>('RECORD');
  const [recordedIntervals, setRecordedIntervals] = useState<number[]>([]);
  const [inputIntervals, setInputIntervals] = useState<number[]>([]);
  const [accuracy, setAccuracy] = useState(0);
  const lastClickTime = useRef<number | null>(null);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    const now = Date.now();
    
    if (mode === 'OPEN' || mode === 'FAIL') return;

    if (lastClickTime.current !== null) {
      const interval = now - lastClickTime.current;
      
      if (mode === 'RECORD') {
        const newIntervals = [...recordedIntervals, interval];
        setRecordedIntervals(newIntervals);
        
        if (newIntervals.length >= 4) {
          finalizeRecording(newIntervals);
        }
      } else if (mode === 'VERIFY') {
        const nextInput = [...inputIntervals, interval];
        setInputIntervals(nextInput);
        calculateAccuracy(nextInput);
      }
    }

    lastClickTime.current = now;

    if (resetTimeout.current) clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => {
      if (mode === 'RECORD' && recordedIntervals.length >= 2) {
        finalizeRecording(recordedIntervals);
      } else if (mode === 'VERIFY') {
        checkResult();
      }
      lastClickTime.current = null;
    }, 1500);
  };

  const finalizeRecording = (intervals: number[]) => {
    setMode('VERIFY');
    lastClickTime.current = null;
  };

  const calculateAccuracy = (input: number[]) => {
    if (input.length > recordedIntervals.length) return;
    
    let totalDiff = 0;
    input.forEach((val, i) => {
      const diff = Math.abs(val - recordedIntervals[i]);
      totalDiff += diff;
    });

    const avgDiff = totalDiff / input.length;
    const acc = Math.max(0, 1 - avgDiff / 300);
    setAccuracy(acc);

    if (input.length === recordedIntervals.length) {
      checkResult(acc);
    }
  };

  const checkResult = (currentAcc?: number) => {
    const finalAcc = currentAcc ?? accuracy;
    if (finalAcc > 0.7) {
      setMode('OPEN');
    } else {
      setMode('FAIL');
      setTimeout(() => {
        setMode('VERIFY');
        setInputIntervals([]);
        setAccuracy(0);
      }, 1000);
    }
  };

  const resetAll = () => {
    setMode('RECORD');
    setRecordedIntervals([]);
    setInputIntervals([]);
    setAccuracy(0);
    lastClickTime.current = null;
  };

  // Circumference for r=90 is 565.48
  const circumference = 565.48;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-12 gap-12 overflow-hidden relative">
      <div className="text-center space-y-2">
        <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">
          {mode === 'RECORD' ? 'Define_Rhythm' : mode === 'VERIFY' ? 'Verify_Sequence' : mode === 'OPEN' ? 'Access_Granted' : 'Match_Failed'}
        </h4>
        <p className="mono text-[9px] text-neutral-500 uppercase tracking-[0.4em]">
          {mode === 'RECORD' 
            ? `Tap_4_Times_To_Set_Key [${Math.min(4, recordedIntervals.length)}/4]` 
            : mode === 'VERIFY' 
            ? `Repeat_Your_Pattern [${inputIntervals.length}/${recordedIntervals.length}]`
            : 'Temporal_Lock_Disengaged'}
        </p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Visual Feedback Rings */}
        <AnimatePresence>
          {mode === 'OPEN' && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 border-4 border-cyan-500 rounded-full blur-xl"
            />
          )}
        </AnimatePresence>

        <motion.button
          onMouseDown={handleClick}
          whileTap={{ scale: 0.92 }}
          animate={{ 
            backgroundColor: mode === 'OPEN' ? '#fff' : mode === 'FAIL' ? '#f43f5e' : '#111',
            borderColor: mode === 'RECORD' ? '#333' : mode === 'VERIFY' ? '#06b6d4' : '#fff'
          }}
          className="w-40 h-40 rounded-full border-4 flex flex-col items-center justify-center gap-2 relative z-10 transition-colors shadow-2xl overflow-hidden"
        >
          <motion.div 
            animate={mode === 'RECORD' ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-3 h-3 rounded-full ${mode === 'OPEN' ? 'bg-black' : 'bg-cyan-500 shadow-[0_0_15px_cyan]'}`} 
          />
          <span className={`mono text-[10px] font-black ${mode === 'OPEN' ? 'text-black' : 'text-neutral-400'}`}>
            {mode === 'RECORD' ? 'RECORD' : mode === 'VERIFY' ? 'INPUT' : mode === 'FAIL' ? 'RETRY' : 'UNLOCKED'}
          </span>
        </motion.button>

        {/* Circular Accuracy/Progress Meter - Using viewBox for perfect alignment */}
        <svg 
          viewBox="0 0 256 256"
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
        >
           <circle cx="128" cy="128" r="90" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
           <motion.circle 
              cx="128" cy="128" r="90" fill="none" 
              stroke={mode === 'RECORD' ? '#555' : '#06b6d4'} 
              strokeWidth="4" 
              strokeDasharray={circumference}
              animate={{ 
                strokeDashoffset: mode === 'RECORD' 
                  ? circumference * (1 - Math.min(1, recordedIntervals.length / 4))
                  : circumference * (1 - accuracy) 
              }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
           />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-4">
        {mode !== 'RECORD' && (
          <button 
            onClick={resetAll}
            className="mono text-[9px] text-neutral-600 hover:text-white border border-white/5 px-4 py-2 rounded transition-all uppercase tracking-widest"
          >
            Reset_Secret_Pattern
          </button>
        )}
        
        <div className="max-w-xs text-center mono text-[8px] text-neutral-800 leading-relaxed uppercase">
          {mode === 'RECORD' 
            ? "Establishing user-defined temporal key. Every interval creates a unique signature in the system buffer."
            : "The system matches incoming kinetic pulses against the stored interval strata. Precision is required for validation."
          }
        </div>
      </div>

      {/* Accuracy HUD */}
      <AnimatePresence>
        {mode === 'VERIFY' && inputIntervals.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-8 right-8 flex flex-col items-end gap-1 mono text-[9px]"
          >
            <span className="text-neutral-500">SYNC_ACCURACY</span>
            <span className="text-cyan-500 font-bold">{(accuracy * 100).toFixed(1)}%</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CadenceLockDemo;
