import Link from "next/link";
import { TbAirConditioningDisabled, TbWood } from "react-icons/tb";
import { FaAnglesRight } from "react-icons/fa6";
import { MdPlumbing, MdElectricalServices } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { verifyIsLoggedIn } from "@/helper/helper";
import { postData, getData } from "@/services/services";
import { Toaster, toast } from "sonner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const detailsservices = () => {
  const router = useRouter();
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceDetail, setServiceDetail] = useState("");
  const [Services, setServices] = useState([]);
  const [locations, setlocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [SubServices, setSubServices] = useState([]);
  const [selectedSubServices, setselectedSubServices] = useState([]);

  useEffect(() => {
    verifyIsLoggedIn(router);
    getServices();
    getLocation();
    getSubService();
  }, []);

  //function to post service
  async function saveService(event) {
    event.preventDefault();
    if (selectedLocations.length > 0 && selectedSubServices.length > 0) {
      try {
        setisSubmitingLoader(true);
        const result = await postData("/StoreService", {
          service_name: serviceName,
          service_des: serviceDetail,
          service_des_id: selectedSubServices,
          location: selectedLocations,
        });
        console.log("===>", {
          service_name: serviceName,
          service_des: serviceDetail,
          service_des_id: selectedSubServices,
          location: selectedLocations,
        });
        if (result.status) {
          setisSubmitingLoader(false);
          toast.success("Service Saved.");
          setServiceName("");
          setServiceDetail("");
          getServices();
        } else {
          setisSubmitingLoader(false);
          toast.error("Service Not Saved.");
        }
      } catch (err) {
        setisSubmitingLoader(false);
        console.log(err);
      }
    } else {
      toast.warning("Please select a location and Service");
    }
  }

  //get services
  async function getServices() {
    try {
      setisSubmitingLoader(true);
      const result = await getData("/GetService");
      if (result.status) {
        setisSubmitingLoader(false);
        setServices(result.data);
      } else {
        setisSubmitingLoader(false);
        toast.error("Faied to load Services");
      }
    } catch (err) {
      setisSubmitingLoader(false);
      toast.error(err);
    }
  }
  //function to get locations
  async function getLocation() {
    try {
      const result = await getData("/GetServiceLocation");
      if (result.status) {
        console.log("==>", result);
        const collator = new Intl.Collator(undefined, { sensitivity: "base" });
        const sortedList = [...result.data].sort((a, b) =>
          collator.compare(a.location_name, b.location_name)
        );

        // Assuming setSubServices is a state update function
        setlocations(sortedList);
      } else {
        toast.error("Failed to get Locations");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleLocationChange = (location) => {
    const isSelected = selectedLocations.includes(location);

    if (isSelected) {
      setSelectedLocations((prevSelected) =>
        prevSelected.filter((selected) => selected !== location)
      );
    } else {
      setSelectedLocations((prevSelected) => [...prevSelected, location]);
    }
  };
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

  const handleLocationSubmit = (e) => {
    e?.preventDefault();
    // Add your form submission logic here using selectedLocations
    console.log(selectedLocations);
  };
  const handleSubserviceSubmit = (e) => {
    e?.preventDefault();
    // Add your form submission logic here using selectedLocations
    console.log(selectedSubServices);
  };
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

  return (
    <>
      {isSubmitingLoader ? (
        <div className="overlay">
          <div className="spinner-container">
            <img className="animatingSpinnerSvg" src="/spinner.svg" alt="" />
          </div>
        </div>
      ) : null}
      <Toaster position="top-center" richColors />
      <div className="app-content">
        <div className="side-app leftmenu-icon">
          <div className="page-header">
            <div className="page-leftheader">
              <h4 className="page-title">Details of Services</h4>
              <ol className="breadcrumb pl-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Details of Services
                </li>
              </ol>
            </div>
            <div className="page-rightheader">
              <div className="ml-3 ml-auto d-flex">&nbsp;</div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="form-group m-0">
                    <form className="row gutters-xs" onSubmit={saveService}>
                      {/* <div className="col-3">
                        <input
                          type="search"
                          className="form-control header-search"
                          placeholder="Services Name"
                          aria-label="Search"
                          tabIndex={1}
                        />
                      </div> */}
                      <div className="col-3">
                        <input
                          type="text"
                          value={serviceName}
                          className="form-control header-search"
                          placeholder="Service Name"
                          required={true}
                          onChange={(e) => setServiceName(e?.target?.value)}
                        />
                      </div>
                      <div className="col-2">
                        <input
                          type="text"
                          value={serviceDetail}
                          className="form-control header-search"
                          placeholder="Service Details"
                          required={true}
                          onChange={(e) => setServiceDetail(e?.target?.value)}
                        />
                      </div>
                      {/* <div className="col-2">
                        <input
                          type="text"
                          className="form-control header-search"
                          placeholder="Services Time"
                        />
                      </div> */}
                      <div className="col-2">
                        <div className="text-end row searchsexction">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>

                          {/* <button type="submit" className="btn btn-danger">
                            Delete
                          </button> */}
                        </div>
                      </div>
                    </form>
                    <div className="parent_Loc_Service">
                      <div className="sec1">
                        <h4>Locations</h4>
                        {locations.length > 0 ? (
                          <Form
                            className="locationsList"
                            onSubmit={handleLocationSubmit}
                          >
                            {locations.map((location, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`locationCheckbox-${location.id}`}
                                label={location.location_name}
                                checked={selectedLocations.includes(location)}
                                onChange={() => handleLocationChange(location)}
                              />
                            ))}

                            {/* <Button variant="primary" type="submit">
                              Submit
                            </Button> */}
                          </Form>
                        ) : null}
                      </div>
                      <div className="sec2">
                        <h4>Service Details</h4>
                        {SubServices.length > 0 ? (
                          <Form
                            className="locationsList"
                            onSubmit={handleSubserviceSubmit}
                          >
                            {SubServices.map((location, index) => (
                              <Form.Check
                                key={index}
                                type="checkbox"
                                id={`locationCheckbox-${location.id}`}
                                label={location.subsc_list}
                                checked={selectedSubServices.includes(location)}
                                onChange={() =>
                                  handleSubServiceChange(location)
                                }
                              />
                            ))}

                            {/* <Button variant="primary" type="submit">
                              Submit
                            </Button> */}
                          </Form>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {Services?.map((item, index) => (
              <div className="col-md-6 col-lg-3 features">
                <div key={index} className="card">
                  <div className="card-body text-center">
                    <div className="feature">
                      <div className="fa-stack services bg-primary-transparent  fa-lg fa-1x  mb-3">
                        <TbAirConditioningDisabled />
                      </div>
                      <h3>{item.service_name}</h3>
                      <p>{item.service_des}</p>
                      <ul>
                        <li>Suspendisse eleifend.</li>
                        <li>Proin et dui imperdiet.</li>
                        <li>Proin at magna posuere.</li>
                        <li>Proin hendrerit magna.</li>
                        <li>Donec consequat quam.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-danger-transparent  mb-3">
                      <TbWood />
                    </div>
                    <h3>Carpainter</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-success-transparent mb-3">
                      <MdPlumbing />
                    </div>
                    <h3>Plumber</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x bg-warning-transparent mb-3">
                      <MdElectricalServices />
                    </div>
                    <h3>Electrician</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services bg-primary-transparent  fa-lg fa-1x  mb-3">
                      <TbAirConditioningDisabled />
                    </div>
                    <h3>AC Repair</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-danger-transparent  mb-3">
                      <TbWood />
                    </div>
                    <h3>Carpainter</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-success-transparent mb-3">
                      <MdPlumbing />
                    </div>
                    <h3>Plumber</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x bg-warning-transparent mb-3">
                      <MdElectricalServices />
                    </div>
                    <h3>Electrician</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services bg-primary-transparent  fa-lg fa-1x  mb-3">
                      <TbAirConditioningDisabled />
                    </div>
                    <h3>AC Repair</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-danger-transparent  mb-3">
                      <TbWood />
                    </div>
                    <h3>Carpainter</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x  bg-success-transparent mb-3">
                      <MdPlumbing />
                    </div>
                    <h3>Plumber</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 features">
              <div className="card">
                <div className="card-body text-center">
                  <div className="feature">
                    <div className="fa-stack services fa-lg fa-1x bg-warning-transparent mb-3">
                      <MdElectricalServices />
                    </div>
                    <h3>Electrician</h3>
                    <ul>
                      <li>Suspendisse eleifend.</li>
                      <li>Proin et dui imperdiet.</li>
                      <li>Proin at magna posuere.</li>
                      <li>Proin hendrerit magna.</li>
                      <li>Donec consequat quam.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default detailsservices;
