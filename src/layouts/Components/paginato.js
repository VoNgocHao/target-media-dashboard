import React from "react";

function range(from, to) {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
}

export default function Paginator(props) {
  const { size, page, totalPages, onPageChange, onSizeChange } = props;
  const pageClick = (e, p) => {
    e.preventDefault();
    onPageChange(p);
  };
  let bar = null;
  if (totalPages > 1) {
    /* 1 ------b1 ... b2 ----------- u1 ... u2 ---- total */
    const b1 = Math.min(3, totalPages);
    const b2 = Math.min(Math.max(b1 + 1, page - 2), totalPages);
    const u1 = Math.max(Math.min(page + 2, totalPages), b2);
    const u2 = Math.max(u1 + 1, totalPages - 2);
    bar = (
      <ul className="pagination float-right">
        {range(1, b1).map((p) => (
          <li
            key={p}
            className={
              "page-item cursor-pointer" + (p === page ? " active" : "")
            }
          >
            <button className="page-link" onClick={(e) => pageClick(e, p)}>
              {p}
            </button>
          </li>
        ))}
        {b2 - b1 > 1 && (
          <li className="page-item">
            <span className="page-link">...</span>
          </li>
        )}
        {b1 < u1 &&
          range(b2, u1).map((p) => (
            <li
              key={p}
              className={
                "page-item cursor-pointer" + (p === page ? " active" : "")
              }
            >
              <button className="page-link" onClick={(e) => pageClick(e, p)}>
                {p}
              </button>
            </li>
          ))}
        {u2 - u1 > 1 && (
          <li className="page-item">
            <span className="page-link">...</span>
          </li>
        )}
        {u1 < totalPages &&
          range(u2, totalPages).map((p) => (
            <li
              key={p}
              className={
                "page-item cursor-pointer" + (p === page ? " active" : "")
              }
            >
              <button className="page-link" onClick={(e) => pageClick(e, p)}>
                {p}
              </button>
            </li>
          ))}
      </ul>
    );
  }
  return (
    <React.Fragment>
      {onSizeChange && (
        <div className="dropdown float-left">
          <select
            className="form-control"
            value={size}
            onChange={(e) => onSizeChange(e.target.value)}
          >
            {[10, 20, 50, 100].map((_size) => (
              <option key={_size} value={_size}>
                {_size} items per page
              </option>
            ))}
          </select>
        </div>
      )}
      {bar}
    </React.Fragment>
  );
}
