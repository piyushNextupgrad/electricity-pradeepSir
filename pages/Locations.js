import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { verifyIsLoggedIn, getFormatedDate } from "@/helper/helper";
import { postData, getData, deleteData } from "@/services/services";
import { Toaster, toast } from "sonner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";

const Location = () => {
  const [formData, setFormData] = useState({
    locationName: "",
    locationZip: "",
    checkMeOut: false,
  });
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [locations, setlocations] = useState([]);

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
        console.log("==>", result);
        setlocations(result.data);
      } else {
        toast.error("Failed to get Locations");
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
              <h4 className="page-title">Locations</h4>
              <ol className="breadcrumb pl-0">
                <li className="breadcrumb-item">
                  <Link href="/Dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Locations
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
                label="Check me out"
                name="checkMeOut"
                checked={formData.checkMeOut}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="table-responsive">
          <table className="table card-table table-bordered table-vcenter text-nowrap table-primary my-4 mx-4">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-white">Location Name</th>
                <th className="text-white">Location Zip</th>
                <th className="text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {locations.length > 0
                ? locations.map((item, index) => (
                    <tr key={index}>
                      <td>{item.location_name}</td>
                      <td>{item.zip_code}</td>
                      <td>
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
