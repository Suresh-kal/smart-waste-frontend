
function DeleteModal({
    isOpen,
    binId,
    onClose,
    onConfirm
}) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-5 sm:p-8">

                <h2 className="text-xl sm:text-2xl font-bold text-red-600">
                    ⚠ Delete Waste Bin
                </h2>
                <p className="text-gray-500 mt-2">
    This action will permanently remove the selected waste bin.
</p>

                <p className="mt-5 text-gray-600">
                    Are you sure you want to delete
                </p>

                <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4 text-center">

    <p className="text-sm text-gray-500">
        Bin ID
    </p>

    <p className="text-xl font-bold text-red-600">
        {binId}
    </p>

</div>

                <div className="mt-5 bg-yellow-50 border border-yellow-200 rounded-lg p-3">

    <p className="text-sm text-yellow-800">
        ⚠ This action cannot be undone.
    </p>

</div>

                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-auto px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                    >
                        Delete Bin
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DeleteModal;