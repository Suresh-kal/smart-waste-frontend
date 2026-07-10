function LoadingSpinner({
    text = "Loading..."
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">

            <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>

            <p className="mt-6 text-slate-600 text-lg">
                {text}
            </p>

        </div>
    );
}

export default LoadingSpinner;