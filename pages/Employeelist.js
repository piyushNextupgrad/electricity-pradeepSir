import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { verifyIsLoggedIn, getFormatedDate } from "@/helper/helper";
import { postData, getData, deleteData } from "@/services/services";
import { Toaster, toast } from "sonner";
import { AiFillStar } from "react-icons/ai";

const Employeelist = () => {
  const [employeeList, setemployeeList] = useState([]);
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const router = useRouter();
  useEffect(() => {
    verifyIsLoggedIn(router);
    getEmployeeList();
  }, []);

  //function to get the list of all employees
  async function getEmployeeList() {
    try {
      setisSubmitingLoader(true);
      const result = await getData("/GetAllUser");
      if (result.status) {
        console.log("Employee List", result);
        setisSubmitingLoader(false);
        const employees = result.data.filter(
          (item) => item.user_type == "Employee"
        );
        setemployeeList(employees);
      } else {
        setisSubmitingLoader(false);
        toast.error("Cannot get Employee List.");
      }
    } catch (err) {
      toast.error(err);
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
      <div className="app-content">
        <div className="side-app leftmenu-icon">
          <div className="page-header">
            <div className="page-leftheader">
              <h4 className="page-title">List of Employee</h4>
              <ol className="breadcrumb pl-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  List of Employee
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
                    <div className="row gutters-xs">
                      <div className="col-4">
                        <input
                          type="search"
                          className="form-control header-search"
                          placeholder="Search…"
                          aria-label="Search"
                          tabIndex={1}
                        />
                      </div>
                      <div className="col-3">
                        <input
                          type="email"
                          className="form-control header-search"
                          placeholder="email ID"
                        />
                      </div>
                      <div className="col-2">
                        <select className="form-control custom-select">
                          <option value="">Services</option>
                          <option value="Services1">Services 1</option>
                          <option value="Services2">Services 2</option>
                        </select>
                      </div>
                      <div className="col-2">
                        <select className="form-control custom-select">
                          <option value="">Rating</option>
                          <option value="Rating1">Rating 1</option>
                          <option value="Rating2">Rating 2</option>
                        </select>
                      </div>
                      <div className="col-1">
                        <div className="text-end">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    {/* <table className="table table-bordered  border-top table-hover  mb-0 text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Campaign</th>
                <th>Client</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mails</td>
                <td><Link   href="/employee-detail">Ryan MacLeod</Link></td>
                <td>$12k</td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Total Pageviews</td>
                <td>Jacob Sutherland</td>
                <td>$16k</td>
                <td>
                  <span className="badge badge-primary">Running</span>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Total Visits</td>
                <td>James Oliver</td>
                <td>$14k</td>
                <td>
                  <span className="badge badge-warning">Active</span>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Total Clicks</td>
                <td>Lisa Nash</td>
                <td>$19k</td>
                <td>
                  <span className="badge badge-danger">Active</span>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>Total Requests</td>
                <td>Alan Walsh</td>
                <td>$21k</td>
                <td>
                  <span className="badge badge-primary">Hold</span>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>Network Traffic</td>
                <td>Pippa Mills</td>
                <td>$14k</td>
                <td>
                  <span className="badge badge-warning">Hold</span>
                </td>
              </tr>
            </tbody>
          </table> */}
                    <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="text-white">Employee Name</th>
                          <th className="text-white">Email</th>
                          <th className="text-white">Status</th>
                          <th className="text-white">Phone</th>
                          <th className="text-white">Rating</th>
                          <th className="text-white">Country</th>
                          <th className="text-white">Address</th>
                          <th className="text-white">Zip</th>
                          <th className="text-white"> Date Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employeeList.length > 0
                          ? employeeList.map((item, index) => (
                              <tr>
                                <td>
                                  {/* <Link
                                    href="/employee-detail"
                                    className="text-inherit"
                                  >
                                    Untrammelled prevents{" "}
                                  </Link> */}
                                  {item.name}
                                </td>
                                <td>{item.email}</td>
                                <td>
                                  {item.user_status == "1" ? (
                                    <>
                                      <span className="status-icon bg-success" />
                                      active
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <span className="status-icon bg-danger" />
                                      inactive
                                    </>
                                  )}
                                </td>
                                <td>{item.user_phno}</td>
                                <td>
                                  {item.user_rating ? (
                                    <>
                                      {item.user_rating} <span> </span>
                                      <AiFillStar className="star" />{" "}
                                    </>
                                  ) : null}
                                </td>
                                <td>{item.user_country}</td>
                                <td>{item.user_city}</td>
                                <td>{item.user_zipcode}</td>
                                <td>
                                  {getFormatedDate(
                                    item.created_at,
                                    "DD/MM/YYYY"
                                  )}
                                </td>
                              </tr>
                            ))
                          : null}
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

export default Employeelist;
