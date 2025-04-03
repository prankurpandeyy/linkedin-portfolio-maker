export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
        <div className="mt-4 space-y-2 text-center">
          <p className="text-lg font-semibold dark:text-white">Creating Your Portfolio</p>
          <div className="flex flex-col items-center space-y-2">
            <div className="h-1.5 w-60 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 animate-[loading_2s_ease-in-out_infinite]" style={{width: '60%'}}></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">This may take a few moments...</p>
          </div>
        </div>
      </div>
    </div>
  );
} 