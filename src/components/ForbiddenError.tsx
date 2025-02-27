export default function ForbiddenError() {
    return (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-95 flex items-center justify-center px-4 z-50">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-6xl font-bold text-red-500">403</h1>
                <p className="text-2xl font-semibold text-gray-800 mt-2">Access Forbidden</p>
                <p className="text-gray-600 mt-4">
                    You don't have permission to access this page.
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}