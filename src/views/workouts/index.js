// ** Table Columns
import React, { useEffect, useState } from "react";

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import { Edit, Eye, File, FileText, Grid, Share } from "react-feather";

// ** Reactstrap Imports
import { Button, Card, CardHeader, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader, Row, UncontrolledButtonDropdown } from "reactstrap";

// scss
import "../../assets/scss/custom.scss";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import withReactContent from 'sweetalert2-react-content'
import { activeInactiveClub, clearClubList, clearClubReload, workoutsList, deleteClub } from "../../redux/workouts/slice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomSpinner from "../../@core/components/customSpinner";
import CustomTable from "../../@core/components/table/CustomTable";

const Workouts = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { data, reload } = useSelector((store) => (store.workout));
  const [view, setView] = useState('');
  const [search, setSearch] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleModal = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }

  const [modal, setModal] = useState(null)

  useEffect(() => {
    if (reload !== null) {
      dispatch(workoutsList({ page: currentPage, limit: perPage, search }))
    }
  }, [reload]);

  useEffect(() => {
    if (reload === null) {
      dispatch(clearClubReload())
      dispatch(clearClubList())
    }
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    if (search !== null) {
      dispatch(workoutsList({ page: 1, limit: perPage, search }))
    }
  }, [search]);

  const MySwal = withReactContent(Swal)

  const deleteHandler = (row) => {
    return MySwal.fire({
      title: 'Delete Workout',
      text: "Are you sure you want to delete this workout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteClub(row.id));
      }
    })
  }

  const viewHandler = (row) => {
    setView(row)
    setModal(true)
  }

  const ColumnHeaders = () => (
    <>
      <th>No.</th>
      <th>Workout Type</th>
      <th>Duration</th>
      <th>Calories Burned</th>
      <th>Date</th>
      <th>Action</th>
    </>
  );

  const activeHandler = (e, row) => {
    dispatch(activeInactiveClub({ active: e.target.checked, id: row.id }));
  }

  const DataRows = () => (
    <>
      {(data || []).map((row, index) => (
        <tr key={index}>
          <td>
            <p className="club-no">{index + 1}</p>
          </td>
          <td>
            {row?.workoutType}
          </td>
          <td>
            <p className="mb-0">{row?.duration}</p>
          </td>
          <td>
            {row?.caloriesBurned}
          </td>
          <td>
            {row?.date.split('T')[0]}
          </td>
          <td>
            <div className="d-flex align-items-center gap-1">
              <div
                className="cursor-pointer"
                onClick={() => deleteHandler(row)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="red"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </div>
              <div
                className="edit-club"
                onClick={() => {
                  history.push(`/updateclub/${row.id}`);
                }}
              >
                <Edit color="gray" size={15} />
              </div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );

  const handlePerPageChange = (page) => {
    setPerPage(page);
    setCurrentPage(1);
    dispatch(workoutsList({ page: 1, limit: page, search }))
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(workoutsList({ page: pageNumber, limit: perPage, search }))
  };

  return (
    <>
      {status === "loading" && <CustomSpinner />}
      <Row className="justify-content-between align-items-center mb-2">
        <Col md='6'>
          <Breadcrumbs breadCrumbTitle='Workouts' breadCrumbParent={{ name: "Home", route: "/home" }} breadCrumbActive='Workouts' />
        </Col>
        <Col md='6' className="d-flex justify-content-end">
          <div className='d-flex mt-md-0 mt-1'>
            <Button tag={Link} to='/addclub' className="btn btn-danger ms-2">Add Workout</Button>
          </div>
        </Col>
      </Row>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle tag="h4">Workouts List</CardTitle>
        </CardHeader>
        <div className="react-dataTable name-width club-table">
          <CustomTable
            columnHeaders={<ColumnHeaders />}
            dataRows={<DataRows />}
            totalCount={20}
            pageNumber={currentPage}
            perPage={perPage}
            isPerPageChange={true}
            getSearchValue={setSearch}
            isSearch={true}
            handlePageChange={handlePageChange}
            handlePerPageChangeValue={handlePerPageChange}
          />
        </div>
      </Card>
      <ModalHandler modal={modal} toggleModal={toggleModal} view={view} />
    </>
  );
};

const ModalHandler = ({ modal, toggleModal, view }) => {
  return (
    <div className={`theme-modal-danger danger`}>
      <Modal
        isOpen={modal}
        toggle={() => toggleModal(!modal)}
        className='modal-dialog-centered'
      >
        <ModalHeader toggle={() => toggleModal(!modal)}>Club Description</ModalHeader>
        <ModalBody>
          <div className="d-flex align-items-center mb-1"><img src={view.clubImage} className='d-block rounded-circle' style={{ width: '50px', height: '50px', minWidth: '50px' }} />
            <div className="ms-1 d-flex w-100 justify-content-between">
              <div>
                <p className="mb-0 fs-6">
                  <span className="fw-bold">Name : </span>{view.clubName}</p>
                <p className="mb-0 fs-6">
                  <span className="fw-bold">Range : </span>{view.clubRange}
                </p>
              </div>
              <div>
                <p className="mb-0 fs-6">
                  <span className="fw-bold">Shaft Length : </span>{view.shaftLength}</p>
                <p className="mb-0 fs-6">
                  <span className="fw-bold">Shaft Flex : </span>{view.shaftFlex}
                </p>
              </div>
            </div>
          </div>
          <p className="text-break">
            {view.description}
          </p>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Workouts;
