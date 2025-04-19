export function ProgressTracker({ progress }: { progress: number }) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md">
        <h3 className="text-xl font-bold mb-4">Onboarding Progress</h3>
        <div className="w-full bg-gray-800 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-400">{progress}% complete</p>
      </div>
    );
  }
  