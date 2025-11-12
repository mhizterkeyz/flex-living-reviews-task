interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
