// ** React Imports
import { Fragment, useEffect, useState } from "react";

// Formik
import { Form, Formik, Field } from "formik";

// Yup
import * as Yup from "yup";

// ** Reactstrap Imports
import {
  Label,
  Button,
  InputGroup,
  InputGroupText,
  Card,
  Row,
  Col,
  Input,
} from "reactstrap";

// ** Styles
import "react-slidedown/lib/slidedown.css";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/base/pages/app-invoice.scss";
import { MessageSquare, User } from "react-feather";
import "../../assets/scss/custom.scss";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import upload from "../../assets/images/logo/add-club.png";
import uploadDark from "../../assets/images/logo/club-dark.png";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

// Third Party Components
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { addWorkout, updateWorkout, workoutsList } from "../../redux/workouts/slice";
import CustomSpinner from "../../@core/components/customSpinner";
import ReactSelect from "react-select";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { addGoal, goalsList, updateGoal } from "../../redux/goal/slice";

const MySwal = withReactContent(Swal);

const AddWorkout = () => {
  const skin = JSON.parse(localStorage.getItem("skin"));
  const { id } = useParams();
  const { reload, status } = useSelector((store) => (store.workout));
  const dispatch = useDispatch();
  const history = useHistory();
  const [imgUrl, setImgUrl] =
    skin === "light" ? useState(upload) : useState(uploadDark);
  const { state } = useLocation();

  const shaftflex = [
    { value: "Reguler", label: "Reguler" },
    { value: "Stiff", label: "Stiff" },
    { value: "Extra Stiff", label: "Extra Stiff" },
    { value: "Senior", label: "Senior" },
    { value: "Ladies", label: "Ladies" },
  ];

  useEffect(() => {
    if (reload !== null) workoutsList();
  }, [reload]);

  const logoChange = (files, setFieldValue) => {
    const fileGet = files[0];
    setFieldValue("clubImage", fileGet);
    setImgUrl(URL.createObjectURL(files[0]));
  };

  return (
    <Fragment>
      {status === "loading" && <CustomSpinner />}
      <BreadCrumbs
        breadCrumbTitle="Add Goal"
        breadCrumbParent={{ name: "Home", route: "/home" }}
        breadCrumbParent2={{ name: "Goals", route: "/goals" }}
        breadCrumbActive="Add Club"
      />
      <Card className="p-3 mt-2">
        <Formik
          initialValues={{
            workoutType: state?.state?.workoutType ?? "",
            targetHoursPerWeek: state?.state?.targetHoursPerWeek ?? '',
            targetCaloriesPerWeek: state?.state?.targetCaloriesPerWeek ?? '',
          }}
          validationSchema={Yup.object().shape({
            workoutType: Yup.string().required("Workout type is required"),
            targetHoursPerWeek: Yup.number().required("Target hours per week is required"),
            targetCaloriesPerWeek: Yup.string().required("Target calories per week is required"),
          })}
          onSubmit={(values) => {
            MySwal.fire({
              title: "Success!",
              text: id ? "Goal updated successfully!" : "Goal created successfully!",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            }).then((result) => {
              if (result.isConfirmed) {
                history.push("/goals");
                dispatch(goalsList());
              }
            });
            id ? dispatch(updateGoal({ data: values, id })) : dispatch(addGoal({ data: values }));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleReset,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit} onReset={handleReset}>
              <Row>
                <div className="w-100">
                  <div className="mb-1 w-50">
                    <Label className="form-label" for="workoutType">
                      Workout Type
                    </Label>
                    <InputGroup>
                      <InputGroupText>
                        <User size={15} />
                      </InputGroupText>
                      <Field
                        className="form-control"
                        id="workoutType"
                        placeholder="Workout Type"
                        name="workoutType"
                        onChange={(e) =>
                          setFieldValue("workoutType", e.target.value)
                        }
                      />
                    </InputGroup>
                    {errors.workoutType && touched.workoutType ? (
                      <p className={"text-danger mb-0 error-form"}>
                        {errors.workoutType}
                      </p>
                    ) : null}
                  </div>
                </div>
              </Row>
              <div className='mb-1 w-50'>
                <Label className='form-label' for='targetHoursPerWeek'>
                  Target Hours Per Week
                </Label>
                <InputGroup>
                  <InputGroupText>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-123" viewBox="0 0 16 16">
                      <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                    </svg>
                  </InputGroupText>
                  <Field type="number" className="form-control" id='targetHoursPerWeek' placeholder='Target hours per week' name="targetHoursPerWeek"
                    onChange={(e) => setFieldValue("targetHoursPerWeek", e.target.value)}
                  />
                </InputGroup>
                {errors.targetHoursPerWeek && touched.targetHoursPerWeek ? (
                  <p className={"text-danger mb-0 error-form"}>{errors.targetHoursPerWeek}</p>
                ) : null}
              </div>
              <div className='mb-1 w-50'>
                <Label className='form-label' for='targetCaloriesPerWeek'>
                Target calories per week
                </Label>
                <InputGroup>
                  <InputGroupText>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-123" viewBox="0 0 16 16">
                      <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z" />
                    </svg>
                  </InputGroupText>
                  <Field type="number" className="form-control" id='date' placeholder='Target calories per week' name="targetCaloriesPerWeek"
                    onChange={(e) => setFieldValue("targetCaloriesPerWeek", e.target.value)}
                  />
                </InputGroup>
                {errors.targetCaloriesPerWeek && touched.targetCaloriesPerWeek ? (
                  <p className={"text-danger mb-0 error-form"}>{errors.targetCaloriesPerWeek}</p>
                ) : null}
              </div>
              <div className="d-flex">
                <div className="position-relative">
                  <Button
                    color="primary"
                    type="submit"
                    className={
                      status === "loading" ? "LoadingContainer1" : "me-1"
                    }
                  >
                    Submit
                  </Button>
                </div>
                <Button
                  color="secondary"
                  type="button"
                  outline
                  onClick={() => history.push("/goals")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </Fragment >
  );
};

export default AddWorkout;
