import React, { Component } from "react";
import _ from "lodash";

const Pagination = props => {
  console.log("I am here");
  const { count, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {pages.map(page => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a class="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
