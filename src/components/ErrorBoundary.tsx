'use client';
import { useEffect } from 'react';

export const ErrorBoundary = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-6 bg-red-50 text-red-600 rounded-lg">
      <h2 className="font-bold">Something went wrong!</h2>
      <p className="mt-2">{error.message}</p>
    </div>
  );
};