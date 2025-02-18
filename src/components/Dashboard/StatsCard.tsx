import React from 'react';

export const StatsCard = ({ title, value, description }: {
  title: string;
  value: string | number;
  description: string;
}) => {
  return (
    <div className="p-6 bg-background rounded-lg border">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="mt-2">
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
