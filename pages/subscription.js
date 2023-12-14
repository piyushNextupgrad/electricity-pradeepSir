import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { verifyIsLoggedIn } from "@/helper/helper";
import { postData, getData, deleteData } from "@/services/services";
import { Toaster, toast } from "sonner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const Subscription = () => {
  const router = useRouter();
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [serviceName, setserviceName] = useState("");
  const [serviceDescription, setserviceDescription] = useState("");
  const [amount, setamount] = useState("");
  const [services, setservices] = useState([]);
  const [subService, setsubService] = useState("");
  const [subServiceDesc, setsubServiceDesc] = useState("");
  const [subserviceAmount, setsubserviceAmount] = useState("");
  const [SubServices, setSubServices] = useState([]);
  const [selectedSubServices, setselectedSubServices] = useState([]);
  //bootstrap modal states------
  const [show, setShow] = useState(false);
  const handleClose = () => {
    settrackBtn("");
    settrackId("");
    setsubService("");
    setsubServiceDesc("");
    setsubserviceAmount("");
    setShow(false);
  };
  const [trackBtn, settrackBtn] = useState("");
  const [trackId, settrackId] = useState("");
  const handleShow = (buttonText, id) => {
    settrackId(id);
    settrackBtn(buttonText);
    setShow(true);
  };
  useEffect(() => {
    verifyIsLoggedIn(router);
    getPlans();
    getSubService();
  }, []);

  //function to post service
  async function handleServiceSave(event) {
    event.preventDefault();
    try {
      if (serviceName != "" && serviceDescription != "" && amount != "") {
        if (selectedSubServices.length > 0) {
          setisSubmitingLoader(true);
          const result = await postData("/StoreSubscription", {
            subscription_name: serviceName,
            subscription_description: serviceDescription,
            subscription_amt: amount,
            service_id_array: selectedSubServices,
          });
          if (result.status) {
            getPlans();
            setisSubmitingLoader(false);
            toast.success("Subscription Added");
            setserviceDescription("");
            setserviceName("");
            setamount("");
          }
        } else {
          setisSubmitingLoader(false);
          toast.error("Please select atleast one service");
        }
      } else {
        setisSubmitingLoader(false);
        toast.warning("All the fields are required.");
      }
    } catch (err) {
      setisSubmitingLoader(false);
      console.log(err);
    }
  }

  //api to get the subscription data
  async function getPlans() {
    try {
      const result = await getData("/GetSubscription");
      if (result?.status) {
        setservices(result?.data);
      } else {
        toast.error("Failed to get services.");
      }
    } catch (err) {
      toast(err);
    }
  }

  //function to delete service
  async function deleteService() {
    handleClose();

    try {
      setisSubmitingLoader(true);
      const result = await deleteData("/DeleteSubscription", {
        delId: trackId,
      });
      if (result.status) {
        getPlans();
        setisSubmitingLoader(false);
        toast.success("Plan Deleted");

        settrackId("");
        settrackBtn("");
      } else {
        setisSubmitingLoader(false);
        toast.success("Plan Not Deleted");
      }
    } catch (err) {
      toast.error(err);
    }
  }

  //function to save sub service
  async function saveSubService() {
    handleClose();
    try {
      setisSubmitingLoader(true);
      const result = await postData("/StoreSubscriptionDetails", {
        subsc_id: trackId,
        subsc_list: subServiceDesc,
        subsc_amt: subserviceAmount,
      });
      if (result.status) {
        getPlans();
        setisSubmitingLoader(false);
        toast.success("Service Added in Plan");
        settrackId("");
        settrackBtn("");
        setsubService("");
        setsubServiceDesc("");
        setsubserviceAmount("");
      } else {
        setisSubmitingLoader(false);
        toast.error("Service not added");
      }
    } catch (err) {
      toast.error(err);
    }
  }

  //function to get subService
  async function getSubService() {
    try {
      const result = await getData("/GetSubscriptionDetails");
      if (result.status) {
        // console.log("==>", result);
        const collator = new Intl.Collator(undefined, { sensitivity: "base" });
        const sortedList = [...result.data].sort((a, b) =>
          collator.compare(a.subsc_list, b.subsc_list)
        );

        // Assuming setSubServices is a state update function
        setSubServices(sortedList);
      } else {
        toast.error("Failed to get Sub-services");
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleSubServiceChange = (service) => {
    const isSelected = selectedSubServices.includes(service);

    if (isSelected) {
      setselectedSubServices((prevSelected) =>
        prevSelected.filter((selected) => selected !== service)
      );
    } else {
      setselectedSubServices((prevSelected) => [...prevSelected, service]);
    }
  };
  return (
    <>
      {isSubmitingLoader ? (
        <div className="overlay">
          <div className="spinner-container">
            <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
          </div>
        </div>
      ) : null}
      <>
        {trackBtn == "add" ? (
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Services to your plan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  value={subService}
                  placeholder="Service Name"
                  type="text"
                  onChange={(e) => setsubService(e?.target?.value)}
                />
                <input
                  value={subServiceDesc}
                  placeholder="Service Description"
                  type="text"
                  onChange={(e) => setsubServiceDesc(e?.target?.value)}
                />
                <input
                  value={subserviceAmount}
                  placeholder="Service Description"
                  type="number"
                  onChange={(e) => setsubserviceAmount(e?.target?.value)}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={saveSubService}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : trackBtn == "update" ? (
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Modal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you are reading this text in a modal!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Plan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                You are about to delete a plan , Are you sure!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={deleteService}>
                  Delete Plan
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </>
      <Toaster position="top-center" richColors />
      <div className="app-content">
        <div className="side-app leftmenu-icon">
          <div className="page-header">
            <div className="page-leftheader">
              <h4 className="page-title">Subscription</h4>
              <ol className="breadcrumb pl-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Subscription
                </li>
              </ol>
            </div>
            <div className="page-rightheader">
              <div className="ml-3 ml-auto d-flex">&nbsp;</div>
            </div>
          </div>
          {/*custom form piyush start */}
          <div className="container">
            <div className="d-flex justify-content-center mt-4 mb-4">
              <form onSubmit={handleServiceSave}>
                <input
                  value={serviceName}
                  className="mx-4"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setserviceName(e?.target?.value)}
                  required={true}
                />
                <input
                  value={serviceDescription}
                  className="mx-4"
                  type="text"
                  placeholder="Description"
                  onChange={(e) => setserviceDescription(e?.target?.value)}
                  required={true}
                />
                <input
                  value={amount}
                  className="mx-4"
                  type="number"
                  placeholder="Amount"
                  onChange={(e) => setamount(e?.target?.value)}
                  required={true}
                />
                <button>Save</button>
              </form>
            </div>
          </div>
          <div className="subServicediv">
            <h4>Select Service</h4>
            {SubServices.length > 0 ? (
              <Form className="locationsList">
                {SubServices.map((location, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={`locationCheckbox-${location.id}`}
                    label={location.subsc_list}
                    checked={selectedSubServices.includes(location)}
                    onChange={() => handleSubServiceChange(location)}
                  />
                ))}

                {/* <Button variant="primary" type="submit">
                              Submit
                            </Button> */}
              </Form>
            ) : null}
          </div>
          <div className="row">
            {services.length > 0 ? (
              <>
                {services.map((item, index) =>
                  item.subscription_status == "1" ? (
                    <>
                      <div
                        key={index}
                        className="col-md-4 col-xl-3 col-lg-4 col-sm-6"
                      >
                        <div className="pricingTable2 danger card">
                          <div className="pricingTable2-header">
                            <h3>{item?.subscription_name}</h3>
                            <span>{item?.subscription_description}</span>
                          </div>
                          <div className="pricing-plans">
                            <span className="price-value1">
                              <i className="fa fa-usd" />
                              <span>{item?.subscription_amt}</span>
                            </span>
                            <span className="month">/month</span>
                          </div>
                          {/* <div className="pricingContent2">
                            <ul>
                              <li>
                                <b>3 Free </b> Domain Name
                              </li>
                              <li>
                                <b>6</b> One-Click Apps
                              </li>
                              <li>
                                <b>3</b> Databases
                              </li>
                              <li>
                                <b>Money</b> BackGuarntee
                              </li>
                              <li>
                                <b>24/7</b> Support
                              </li>
                            </ul>
                          </div> */}

                          <div className="pricingTable2-sign-up"></div>
                          <Button
                            className="my-1 mx-2"
                            variant="primary"
                            onClick={() => handleShow("add", item.id)}
                          >
                            Add Service
                          </Button>
                          <Button
                            className="my-1 mx-2"
                            variant="primary"
                            onClick={() => handleShow("update", item.id)}
                          >
                            Update Plan
                          </Button>
                          <Button
                            className="my-1 mx-2 mb-2"
                            variant="primary"
                            onClick={() => handleShow("delete", item.id)}
                          >
                            Delete Plan
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : null
                )}
              </>
            ) : null}
            {/* <div className="col-md-4 col-xl-3 col-lg-4 col-sm-6">
              <div className="pricingTable2 green card">
                <div className="pricingTable2-header">
                  <h3>Silver</h3>
                  <span>Lorem ipsum dolor</span>
                </div>
                <div className="pricing-plans">
                  <span className="price-value1">
                    <i className="fa fa-usd" />
                    <span>67</span>
                  </span>
                  <span className="month">/month</span>
                </div>
                <div className="pricingContent2">
                  <ul>
                    <li>
                      <b>4 Free </b> Domain Name
                    </li>
                    <li>
                      <b>8</b> One-Click Apps
                    </li>
                    <li>
                      <b>5</b> Databases
                    </li>
                    <li>
                      <b>Money</b> BackGuarntee
                    </li>
                    <li>
                      <b>24/7</b> Support
                    </li>
                  </ul>
                </div>

                <div className="pricingTable2-sign-up">
                  <a href="#" className="btn btn-block btn-success">
                    Edit
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xl-3 col-lg-4 col-sm-6">
              <div className="pricingTable2 info card">
                <div className="pricingTable2-header">
                  <h3>Gold</h3>
                  <span>Lorem ipsum dolor</span>
                </div>
                <div className="pricing-plans">
                  <span className="price-value1">
                    <i className="fa fa-usd" />
                    <span>78</span>
                  </span>
                  <span className="month">/month</span>
                </div>
                <div className="pricingContent2">
                  <ul>
                    <li>
                      <b>7 Free </b> Domain Name
                    </li>
                    <li>
                      <b>12</b> One-Click Apps
                    </li>
                    <li>
                      <b>8</b> Databases
                    </li>
                    <li>
                      <b>Money</b> BackGuarntee
                    </li>
                    <li>
                      <b>24/7</b> Support
                    </li>
                  </ul>
                </div>

                <div className="pricingTable2-sign-up">
                  <a href="#" className="btn btn-block btn-secondary">
                    Edit
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xl-3 col-lg-4 col-sm-6">
              <div className="pricingTable2 primary card">
                <div className="pricingTable2-header">
                  <h3>Free</h3>
                  <span>Lorem ipsum dolor</span>
                </div>
                <div className="pricing-plans">
                  <span className="price-value1">
                    <i className="fa fa-usd" />
                    <span>99</span>
                  </span>
                  <span className="month">/month</span>
                </div>
                <div className="pricingContent2">
                  <ul>
                    <li>
                      <b>2 Free </b> Domain Name
                    </li>
                    <li>
                      <b>5</b> One-Click Apps
                    </li>
                    <li>
                      <b>1</b> Databases
                    </li>
                    <li>
                      <b>Money</b> BackGuarntee
                    </li>
                    <li>
                      <b>24/7</b> Support
                    </li>
                  </ul>
                </div>

                <div className="pricingTable2-sign-up">
                  <a href="#" className="btn btn-block btn-primary">
                    Edit
                  </a>
                </div>
              </div>
            </div> */}
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="text-white">Project Name</th>
                          <th className="text-white">Date</th>
                          <th className="text-white">Status</th>
                          <th className="text-white">Price</th>
                          <th className="text-white">Project Name</th>
                          <th className="text-white">Date</th>
                          <th className="text-white">Status</th>
                          <th className="text-white">Price</th>
                          <th className="text-white">Status</th>
                          <th className="text-white">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Link
                              href="/employee-detail"
                              className="text-inherit"
                            >
                              Untrammelled prevents{" "}
                            </Link>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" className="text-inherit">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <a href="#" className="text-inherit">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <a href="#" className="text-inherit">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <a href="#" className="text-inherit">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>{" "}
                        <tr>
                          <td>
                            <a href="#" className="text-inherit">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2018</td>
                          <td>
                            <span className="status-icon bg-success" />{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                          <td>$56,908</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
