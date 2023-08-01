import PropTypes from "prop-types";
import React from "react";
import Pagination from "react-js-pagination";
import Select from "react-select";
import { Button, Col, Row } from "reactstrap";
import "../../../assets/scss/custom.scss";

const CustomTable = (props) => {
  const Show = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between">
        {props?.isField ? <div>{props?.field}</div> : ""}
      </div>
      <div className="table-responsive p-0 rounded-lg data-table">
        <table className="table align-items-center mb-0 table-striped">
          {/* column headers */}
          <thead className="table-head">
            <tr>{props?.columnHeaders}</tr>
          </thead>

          {/* table body */}
          <tbody>{props?.dataRows}</tbody>
        </table>
        {props?.totalCount === 0 && (
          <div className="mt-4 d-flex justify-content-center">
            <p>No Data Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

// component props validation
CustomTable.propTypes = {
  columnHeaders: PropTypes.object,
  totalCount: PropTypes.number,
  dataRows: PropTypes.object,
  isSearch: PropTypes.bool,
  isPerPageChange: PropTypes.bool,
  perPage: PropTypes.number,
  pageNumber: PropTypes.number,
  isFilterByPlan: PropTypes.bool,
  getSearchValue: PropTypes.func,
  handlePerPageChangeValue: PropTypes.func,
  handlePageChange: PropTypes.func,
  getFilterValue: PropTypes.func,
  clickOnButton: PropTypes.func,
  isButton: PropTypes.any,
  isField: PropTypes.bool,
  field: PropTypes.any,
};

export default CustomTable;
