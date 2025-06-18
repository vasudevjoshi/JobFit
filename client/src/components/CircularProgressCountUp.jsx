import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import { useCountUp } from 'use-count-up';

export default function CircularProgressCountUp({ score = 0, size = 100 }) {
  // Animate from 0 to score
  const { value } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: score,
  });

  // Color based on score
  const getProgressColor = (value) => {
    if (value > 70) return 'success';     // Green
    if (value > 50) return 'warning';     // Yellow
    return 'danger';                      // Red
  };

  return (
    <Stack spacing={1} alignItems="center">

      <CircularProgress
        size="lg"
        determinate
        color={getProgressColor(Number(value))}
        value={Number(value)}
        sx={{ "--CircularProgress-size": `${size}px` }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <p className="text-3xl font-bold text-green-600"> {Math.round(Number(value))}%</p>
      </CircularProgress>
    </Stack>
  );
}