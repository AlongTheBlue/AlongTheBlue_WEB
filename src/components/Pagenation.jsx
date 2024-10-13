import "../styles/Pagenation.css";

function Pagenation({ currentPage, totalPages, setCurrentPage }) {
    const pageSize = 10;  // 한 번에 이동할 페이지 단위
    const handleNextGroup = () => {
        const nextPage = Math.min(currentPage + pageSize, totalPages - 1);
        setCurrentPage(nextPage);
    };

    const handlePreviousGroup = () => {
        const prevPage = Math.max(currentPage - pageSize, 0);
        setCurrentPage(prevPage);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
        }
    };

  return (
    <div className="pagination">
      {/* << 첫 페이지 이동 */}
      <button onClick={handlePreviousGroup}>
        이전
      </button>
      {/* < 이전 페이지 이동 */}
      <button onClick={handlePreviousPage}>
        &lt;
      </button>
      {/* 페이지 번호 표시 */}
      <span className="page-info">
        {currentPage + 1} / {totalPages}
      </span>
      {/* > 다음 페이지 이동 */}
      <button onClick={handleNextPage}>
        &gt;
      </button>
      {/* >> 마지막 페이지 이동 */}
      <button onClick={handleNextGroup}>
        다음
      </button>
    </div>
  );
}

export default Pagenation;
