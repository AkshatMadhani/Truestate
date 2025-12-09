export default function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
  
    const canPrev = page > 1;
    const canNext = page < totalPages;
  
    const goPrev = () => canPrev && onPageChange(page - 1);
    const goNext = () => canNext && onPageChange(page + 1);
  
    return (
      <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={goPrev}
            disabled={!canPrev}
            className={`rounded border px-3 py-1 ${
              canPrev
                ? "bg-white hover:bg-gray-50"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Prev
          </button>
          <button
            onClick={goNext}
            disabled={!canNext}
            className={`rounded border px-3 py-1 ${
              canNext
                ? "bg-white hover:bg-gray-50"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
  