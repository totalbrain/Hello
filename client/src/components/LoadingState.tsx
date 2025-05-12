const LoadingState = () => {
  return (
    <section className="bg-white rounded-xl shadow-md p-8 text-center mb-8">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Creating Your Animation</h3>
        <p className="text-gray-600">This may take a few moments...</p>
      </div>
    </section>
  );
};

export default LoadingState;
