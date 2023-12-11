import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { verifyIsLoggedIn, getFormatedDate } from "@/helper/helper";
import { postData, getData, deleteData } from "@/services/services";
import { Toaster, toast } from "sonner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";

import Modal from "react-bootstrap/Modal";

const Location = () => {
  const [formData, setFormData] = useState({
    locationName: "",
    locationZip: "",
    checkMeOut: false,
  });
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [locations, setlocations] = useState([]);
  const [subServiceName, setsubServiceName] = useState("");
  const [subServiceAmt, setsubServiceAmt] = useState("");
  const [subService, setsubService] = useState([]);
  const [show, setShow] = useState(false);

  //update location states

  const [locationUpdate, setlocationUpdate] = useState("");
  const [zipUpdate, setzipUpdate] = useState("");
  const [activeUpdate, setactiveUpdate] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  useEffect(() => {
    getLocation();
    getSubService();
  }, []);
  //function to post location
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your form submission logic here using formData
    try {
      setisSubmitingLoader(true);
      const result = await postData("/StoreServiceLocation", {
        location_name: formData.locationName,
        location_status: formData.checkMeOut ? 1 : 0,
        zip_code: formData.locationZip,
      });

      setisSubmitingLoader(false);
      if (result.status) {
        getLocation();
        toast.success("Location Saved");
      } else {
        toast.error("Location not Saved");
      }
    } catch (err) {
      setisSubmitingLoader(false);
      toast.error(err);
    }
  };

  //function to get location
  async function getLocation() {
    try {
      const result = await getData("/GetServiceLocation");
      if (result.status) {
        // console.log("==>", result);
        setlocations(result.data);
      } else {
        toast.error("Failed to get Locations");
      }
    } catch (err) {
      console.log(err);
    }
  }
  //function to post sub-service
  async function postSubService(e) {
    e.preventDefault();
    try {
      setisSubmitingLoader(true);
      const result = await postData("/StoreSubscriptionDetails", {
        subsc_list: subServiceName,
        subsc_amt: subServiceAmt,
      });
      // console.log("==>", result);
      if (result.status) {
        setisSubmitingLoader(false);
        getSubService();
        toast.success("Service Saved");
        setsubServiceName("");
        setsubServiceAmt("");
      } else {
        setisSubmitingLoader(false);
        toast.error("Service not saved");
      }
    } catch (err) {
      setisSubmitingLoader(false);
      toast.error(err);
    }
  }
  //function to get sub-service
  async function getSubService() {
    try {
      const result = await getData("/GetSubscriptionDetails");
      if (result.status) {
        // console.log("==>", result);
        setsubService(result.data);
      } else {
        toast.error("Failed to get Sub-services");
      }
    } catch (err) {
      console.log(err);
    }
  }

  //function to delete a location record
  async function deleteLocation(id) {
    try {
      setisSubmitingLoader(true);
      const result = await deleteData("/DeleteServiceLocation", { delId: id });
      if (result.status) {
        toast.success("Location Deleted");
        getLocation();
        setisSubmitingLoader(false);
      } else {
        setisSubmitingLoader(false);
        toast.error("Location not deleted");
      }
    } catch (err) {
      setisSubmitingLoader(false);
      toast.error(err);
    }
  }
  //function to delete a service record
  async function deleteService(id) {
    try {
      setisSubmitingLoader(true);
      const result = await deleteData("/DeleteSubscriptionDetails", {
        delId: id,
      });
      if (result.status) {
        toast.success("Service Deleted");
        getSubService();
        setisSubmitingLoader(false);
      } else {
        setisSubmitingLoader(false);
        toast.error("Service not deleted");
      }
    } catch (err) {
      setisSubmitingLoader(false);
      toast.error(err);
    }
  }
  //function to toggle Location Modal
  async function toggleLocationRecord(id) {
    const recordData = locations.filter((item) => item.id === id);
    // console.log("recordData", recordData);

    setlocationUpdate(recordData[0]?.location_name);
    setzipUpdate(recordData[0]?.zip_code);
    setactiveUpdate(recordData[0]?.location_status === "1" ? 1 : 0);
    setShow(true);
  }
  //function to update location record
  async function updateLocationSingleRecord(event) {
    event.preventDefault();
  }
  return (
    <>
      {isSubmitingLoader ? (
        <div className="overlay">
          <div className="spinner-container">
            <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
          </div>
        </div>
      ) : null}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Location Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="locationUpdateForm"
            onSubmit={updateLocationSingleRecord}
          >
            <label>
              Location:
              <input
                className="full-width-input"
                value={locationUpdate}
                type="text"
                required
                onChange={(e) => setlocationUpdate(e.target.value)}
              />
            </label>
            <label>
              Zip Code:
              <input
                className="full-width-input"
                value={zipUpdate}
                type="text"
                placeholder="Enter Zip Code"
                pattern="[0-9]{6}"
                required
                onChange={(e) => setzipUpdate(e.target.value)}
              />
            </label>
            <label>
              Active:
              <input
                checked={activeUpdate}
                type="checkbox"
                required
                onChange={(e) => setactiveUpdate(e.target.checked)}
              />
            </label>
            <button type="submit">Update</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Toaster position="top-center" richColors />
      <div className="app-content">
        <div className="side-app leftmenu-icon">
          <div className="page-header">
            <div className="page-leftheader">
              <h4 className="page-title">Locations</h4>
              <ol className="breadcrumb pl-0">
                <li className="breadcrumb-item">
                  <Link href="/Dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Locations - Sub Service
                </li>
              </ol>
            </div>
            <div className="page-rightheader">
              <div className="ml-3 ml-auto d-flex">&nbsp;</div>
            </div>
          </div>
          {/*custom form piyush start */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formLocationName">
              <Form.Label>Location Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                name="locationName"
                value={formData.locationName}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                Please enter the location name.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocationZip">
              <Form.Label>Location Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zip Code"
                name="locationZip"
                value={formData.locationZip}
                onChange={handleChange}
                pattern="[0-9]{6}" // Assuming a 5-digit zip code
                title="Please enter a valid 6-digit zip code."
                required
              />
              <Form.Text className="text-muted">
                Please enter a valid 6-digit zip code.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Active"
                name="checkMeOut"
                checked={formData.checkMeOut}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </div>
        <div className="table-responsive">
          <table className="table card-table table-bordered table-vcenter text-nowrap table-primary my-4 mx-4">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-white actionTable">Location Name</th>
                <th className="text-white actionTable">Location Zip</th>
                <th className="text-white actionTable">Status</th>
                <th className="text-white actionTable">Action</th>
              </tr>
            </thead>
            <tbody>
              {locations.length > 0
                ? locations.map((item, index) => (
                    <tr key={index}>
                      <td className="actionTable">{item.location_name}</td>
                      <td className="actionTable">{item.zip_code}</td>
                      <td className="actionTable">
                        {item.location_status === "1" ? (
                          <>
                            <span className="status-icon bg-success" />
                            Active
                          </>
                        ) : (
                          <>
                            <span className="status-icon bg-warning" />
                            Inactive
                          </>
                        )}
                      </td>
                      <td className="actionTable">
                        <span className="actionInner">
                          <span onClick={() => toggleLocationRecord(item.id)}>
                            <FaEdit className="tableIcons" />
                          </span>
                          <span onClick={() => deleteLocation(item.id)}>
                            <AiFillDelete className="tableIcons" />
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        <div className="side-app leftmenu-icon">
          <div className="page-header">
            <div className="page-leftheader">
              <h4 className="page-title">Service Descriptions</h4>
              <ol className="breadcrumb pl-0">
                <li className="breadcrumb-item">
                  <Link href="/Dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Locations -Sub Service
                </li>
              </ol>
            </div>
            <div className="page-rightheader">
              <div className="ml-3 ml-auto d-flex">&nbsp;</div>
            </div>
          </div>
          {/*custom form piyush start */}
          <Form onSubmit={postSubService}>
            <Form.Group className="mb-3" controlId="formLocationName">
              <Form.Label>Sub-Service Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subservice Name"
                name="locationName"
                value={subServiceName}
                onChange={(e) => setsubServiceName(e?.target?.value)}
                required
              />
              <Form.Text className="text-muted">
                Please enter the sub-service name.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocationZip">
              <Form.Label>Sub-service Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Sub-service Amount "
                name="locationZip"
                value={subServiceAmt}
                onChange={(e) => setsubServiceAmt(e?.target?.value)}
                // pattern="[0-9]{6}" // Assuming a 5-digit zip code
                title="Please enter a valid 6-digit zip code."
                required
              />
              <Form.Text className="text-muted">
                Please enter a valid amount.
              </Form.Text>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Active"
                name="checkMeOut"
                checked={activeSubService}
                onChange={(e) => setactiveSubService(e?.target?.value)}
              />
            </Form.Group> */}

            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </div>
        <div className="table-responsive">
          <table className="table card-table table-bordered table-vcenter text-nowrap table-primary my-4 mx-4">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-white actionTable">Service Name</th>
                <th className="text-white actionTable">Price</th>
                <th className="text-white actionTable">Status</th>
                <th className="text-white actionTable">Action</th>
              </tr>
            </thead>
            <tbody>
              {subService.length > 0
                ? subService.map((item, index) => (
                    <tr key={index}>
                      <td className="actionTable">{item.subsc_list}</td>
                      <td className="actionTable">{item.subsc_amt}</td>
                      <td className="actionTable">
                        {item.subsc_status === "1" ? (
                          <>
                            <span className="status-icon bg-success" />
                            Active
                          </>
                        ) : (
                          <>
                            <span className="status-icon bg-warning" />
                            Inactive
                          </>
                        )}
                      </td>
                      <td className="actionTable">
                        <span className="actionInner">
                          <span>
                            <FaEdit className="tableIcons" />
                          </span>
                          <span onClick={() => deleteService(item.id)}>
                            <AiFillDelete className="tableIcons" />
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Location;
