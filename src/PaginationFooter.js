import { useEffect } from "react";

const PaginationFooter = ({ range, slice, setPage, page }) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
          setPage(page - 1);
        }
    }, [slice, page, setPage]);

    return (
        <div className="tableFooter">
            { range.map((el, index) => (
                <button
                key={index}
                className={`pagination-button ${
                    page === el ? "activeButton" : "inactiveButton"
                }`}
                onClick={() => setPage(el)}
                >
                {el}
                </button>
            ))}
        </div>
    );
}
export default PaginationFooter;