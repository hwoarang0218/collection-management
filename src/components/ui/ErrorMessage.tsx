interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h2 className="text-red-600 font-semibold text-lg">Error</h2>
        <p className="text-red-500 mt-2">{message}</p>
      </div>
    </div>
  );
}
