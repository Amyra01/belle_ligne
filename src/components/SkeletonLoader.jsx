import React from 'react';

export function ArticleCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#121419] border border-neutral-200 dark:border-neutral-800 shadow-sm animate-pulse">
      <div className="h-64 sm:h-72 bg-neutral-200 dark:bg-neutral-800 w-full" />
      <div className="p-5 sm:p-6 space-y-3">
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
        <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-4/5" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />
        <div className="pt-4 flex justify-between items-center">
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function SpreadSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row bg-[#111317] rounded-xl overflow-hidden shadow-2xl border border-neutral-800 animate-pulse">
      <div className="w-full md:w-1/2 h-80 sm:h-96 bg-neutral-900" />
      <div className="w-full md:w-1/2 p-8 space-y-4">
        <div className="h-3 bg-neutral-800 rounded w-1/3" />
        <div className="h-8 bg-neutral-800 rounded w-3/4" />
        <div className="h-4 bg-neutral-800 rounded w-full" />
        <div className="h-4 bg-neutral-800 rounded w-5/6" />
        <div className="h-4 bg-neutral-800 rounded w-2/3" />
      </div>
    </div>
  );
}
