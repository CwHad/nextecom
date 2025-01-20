import Link from "next/link";

export default function Pagination({currentPage, totalPages, pathname}) {
    return (
        <div className="row">
        <div className="col text-text">
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <li
                    key={page}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      href={`${pathname}?page=${page}`}
                      as={`${pathname}?page=${page}`}
                    >
                      {page}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    )
}