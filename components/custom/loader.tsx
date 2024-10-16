export default function Loader({ className = "" }) {
  return (
    <div className={`w-full inset-0 flex  ${className}`}> 
      <div className="bg-primary/20 bg-opacity-60 p-4 rounded-md flex items-center justify-center w-full"> 
        <div className="flex items-center">
          <span className="text-3xl mr-4">Loading</span>
          <div
            className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"
          ></div>
        </div>
      </div>
    </div>
  );
}
