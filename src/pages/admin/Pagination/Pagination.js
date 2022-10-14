import React, { useState, useEffect } from "react";

function Paginations({ showPerPage, onPaginationChange, total }) {
  const [count, setCount] = useState(1);
  const [numberOfButtons, setNumberOfButtons] = useState(
    Math.ceil(total / showPerPage)
  );
  useEffect(() => {
    const value = showPerPage * count;
    onPaginationChange(value - showPerPage, value);
  }, [count]);
  const onButtonClick = (type) => {
    if (type === "prev") {
      if (count === 1) {
        setCount(1);
      } else {
        setCount(count - 1);
      }
    }
    if (type === "next") {
      if (numberOfButtons === count) {
        setCount(count);
      } else {
        setCount(count + 1);
      }
    }
  };
  return (
    <div className="d-flex ">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={() => onButtonClick("prev")}>
              Previous
            </a>
          </li>
          {new Array(numberOfButtons).fill("").map((el, index) => {
            <li className="page-item">
              <a className="page-link" href="!#">
                {index + 1}
              </a>
            </li>;
          })}
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                onButtonClick("next");
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Paginations;
