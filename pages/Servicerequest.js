import Link from 'next/link';
import { getData, putData } from '@/services/services';
import { useEffect, useState } from 'react';
import { Toaster, toast } from "sonner";
import { getFormatedDate } from '@/helper/helper';

getFormatedDate
const Servicerequest = () => {

  const [ServiceBooked, setServiceBooked] = useState('');
  const [employee, setEmployee] = useState([]);
  const [isSubmitingLoader, setisSubmitingLoader] = useState(false);
  const [AllotedEmployeeId, setAllotedEmployeeId] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [Refresh, setRefresh] = useState('')




  useEffect(() => {
    getServiceData();
  }, [Refresh]);


  const getServiceData = async () => {
    setisSubmitingLoader(true)
    const resp1 = await getData("/GetServiceBooking");
    // console.log("service booked resp", resp1.data);
    const serviceId_array = [];
    resp1.data.map((item) => {
      // const items = {
      //   "unique_service_id": item.unique_service_id,
      //   "service_name": item.service_name,
      //   "service_cost": item.service_cost,
      //   "qty": item.qty,
      //   "service_avail_date": item.service_avail_date,
      //   "created_at": item.created_at,
      //   "customer_id": item.customer_id
      // }
      // finalData.push(items)
      if (!serviceId_array.includes(item.customer_id)) {
        serviceId_array.push(item.customer_id)
      }
    })

    const resp2 = await getData("/GetAllUser");
    // console.log("all user resp", resp2.data);
    const filter_user = [];
    const filter_employee = []
    resp2.data.filter((item) => {
      if (serviceId_array.includes(item.id)) {
        filter_user.push(item)
      }
      if (item.user_type === "Employee") {
        filter_employee.push(item)
      }
    })
    setEmployee(filter_employee)
    // console.log("filter_employee", filter_employee)
    console.log("filter_user", filter_user)
    // console.log("final_data",finalData)

    resp1.data.map((item) => {
      filter_user.map((item2) => {
        if (item.customer_id == item2.id) {
          item["customer_name"] = item2.name;
          item["customer_address"] = item2.user_house_num + " " + item2.user_locality + " " + item2.user_landmark + " " + item2.user_city + " " + item2.user_state;
          item["customer_phno"] = item2.user_phno;
        }
      })
    })

    setServiceBooked(resp1.data);
    setisSubmitingLoader(false)
  }

  const ServiceAllotement = async (updateId) => {
    setisSubmitingLoader(true)
    try {
      const updateDetails = {
        "updId": updateId,
        "emp_id": AllotedEmployeeId
      }
      console.log("updateDetails", updateDetails);
      const resp = await putData("/UpdateServiceBooking", updateDetails)
      console.log("resp", resp)
      resp.message === "Service Updated Successfully" ? toast.success(resp.message) : toast.error(resp.message)
      setAllotedEmployeeId();
    } catch (error) {
      console.log("try-catch error", error)
    }
    setRefresh(Math.random())
    setisSubmitingLoader(false)
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
              <h4 className="page-title">Service Request</h4>
              <ol className="breadcrumb pl-0">
                <li className="breadcrumb-item">
                  <a href="/Dashboard">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Service Request
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
                  <div className="table-responsive">

                    <table className="table card-table table-bordered table-vcenter text-nowrap table-primary">
                      <thead className="bg-primary text-white">
                        <tr>
                          <th className="text-white">Service Booking ID</th>
                          <th className="text-white">Service Name</th>
                          <th className="text-white">Service Cost</th>
                          <th className="text-white">Service Quantity</th>
                          <th className="text-white">Service Avail Date and Time</th>
                          <th className="text-white">Service Booking Date and Time</th>
                          <th className="text-white">Customer Name and ID</th>
                          <th className="text-white">Customer Phone</th>
                          <th className="text-white">Customer Location</th>
                          {/* <th className="text-white">Services</th>
      <th className="text-white">Email ID</th>
      <th className="text-white">Address</th>
      <th className="text-white">Zip Code</th>
      <th className="text-white">Time</th> */}
                          <th className="text-white">Assigned to</th>
                          <th className="text-white">Status</th>
                          <th className="text-white">Action</th>
                        </tr>
                      </thead>
                        
                      <tbody>
                        { 
                          ServiceBooked ? ServiceBooked.map((item, index) => (
                            
                            <tr key={index}>
                              <th scope="row">{item.unique_service_id ? item.unique_service_id : <span></span>}</th>
                              {console.log("item",item)}
                              <td>{item.service_name}</td>
                              <td>${item.service_cost * item.qty}</td>
                              <td>{item.qty}</td>
                              <td>{getFormatedDate(item.service_avail_date,"DD-MM-YYYY hh:mm")}</td>
                              <td>{getFormatedDate(item.created_at,"DD-MM-YYYY hh:mm")}</td>
                              <td>{item.customer_name} [ ID:{item.customer_id} ]</td>
                              <td>{item.customer_phno}</td>
                              <td>{item.customer_address}</td>

                              <td>
                                <select className="form-control" tabIndex={-1} aria-hidden="true" value={item.emp_id} onChange={(e) => { setAllotedEmployeeId(e.target.value);item.emp_id=e.target.value }}>
                                  <option value="--">--</option>

                                  {
                                    employee.map((e, index) => (
                                      <option value={`${e.id}`} key={index}>{e.name} [id: {e.id}] </option>
                                    ))
                                  }

                                </select>
                              </td>
                              <td>
                                <span className={item.status == 0 ? "unpaid" : "paid done"}>{item.status == 0 ? <div>pending</div> : <div>Done</div>}</span>
                              </td>
                              <td>
                                {item.status == 0?(<a className="actionsubmit" href="#" onClick={() => ServiceAllotement(item.id)} >
                                  Submit
                                </a>):(<a className="actionsubmit" href="#" onClick={() => toast.error("Service is completed!")} >
                                  Submit
                                </a>)}
                                
                              </td>

                            </tr>
                          )) : ''
                        }

                        {/* <tr>
                        <th scope="row">Ser123</th>
                        <td>Joan Powell</td>
                        <td>AC Repair</td>
                        <td>Joan@gmail.com</td>
                        <td>Los Angeles</td>
                        <td>56584</td>
                        <td>18 Oct 2023</td>
                        <td>10:00AM</td>
                        <td>
                          <select className="form-control" tabIndex={-1} aria-hidden="true">
                            <option value="--">--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td>
                          <span className="paid">Paid</span>
                        </td>
                        <td>
                          <a className="actionsubmit" href="/serviceschedule#">
                            Submit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Ser123</th>
                        <td>Joan Powell</td>
                        <td>AC Repair</td>
                        <td>Joan@gmail.com</td>
                        <td>Los Angeles</td>
                        <td>56584</td>
                        <td>18 Oct 2023</td>
                        <td>10:00AM</td>
                        <td>
                          <select className="form-control" tabIndex={-1} aria-hidden="true">
                            <option value="--">--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td>
                          <span className="unpaid">Unpaid</span>
                        </td>
                        <td>
                          <a className="actionsubmit" href="/serviceschedule#">
                            Submit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Ser123</th>
                        <td>Joan Powell</td>
                        <td>AC Repair</td>
                        <td>Joan@gmail.com</td>
                        <td>Los Angeles</td>
                        <td>56584</td>
                        <td>18 Oct 2023</td>
                        <td>10:00AM</td>
                        <td>
                          <select className="form-control" tabIndex={-1} aria-hidden="true">
                            <option value="--">--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td>
                          <span className="paid">Paid</span>
                        </td>
                        <td>
                          <a className="actionsubmit" href="/serviceschedule#">
                            Submit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Ser123</th>
                        <td>Joan Powell</td>
                        <td>AC Repair</td>
                        <td>Joan@gmail.com</td>
                        <td>Los Angeles</td>
                        <td>56584</td>
                        <td>18 Oct 2023</td>
                        <td>10:00AM</td>
                        <td>
                          <select className="form-control" tabIndex={-1} aria-hidden="true">
                            <option value="--">--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td>
                          <span className="unpaid">Unpaid</span>
                        </td>
                        <td>
                          <a className="actionsubmit" href="/serviceschedule#">
                            Submit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Ser123</th>
                        <td>Joan Powell</td>
                        <td>AC Repair</td>
                        <td>Joan@gmail.com</td>
                        <td>Los Angeles</td>
                        <td>56584</td>
                        <td>18 Oct 2023</td>
                        <td>10:00AM</td>
                        <td>
                          <select className="form-control" tabIndex={-1} aria-hidden="true">
                            <option value="--">--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td>
                          <span className="paid">Paid</span>
                        </td>
                        <td>
                          <a className="actionsubmit" href="/serviceschedule#">
                            Submit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Ser123</th>
                        <td>Joan Powell</td>
                        <td>AC Repair</td>
                        <td>Joan@gmail.com</td>
                        <td>Los Angeles</td>
                        <td>56584</td>
                        <td>18 Oct 2023</td>
                        <td>10:00AM</td>
                        <td>
                          <select className="form-control" tabIndex={-1} aria-hidden="true">
                            <option value="--">--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td>
                          <span className="unpaid">Unpaid</span>
                        </td>
                        <td>
                          <a className="actionsubmit" href="/serviceschedule#">
                            Submit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Ser123</th>
                        <td>Joan Powell</td>
                        <td>AC Repair</td>
                        <td>Joan@gmail.com</td>
                        <td>Los Angeles</td>
                        <td>56584</td>
                        <td>18 Oct 2023</td>
                        <td>10:00AM</td>
                        <td>
                          <select className="form-control" tabIndex={-1} aria-hidden="true">
                            <option value="--">--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td>
                          <span className="paid">Paid</span>
                        </td>
                        <td>
                          <a className="actionsubmit" href="/serviceschedule#">
                            Submit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Ser123</th>
                        <td>Joan Powell</td>
                        <td>AC Repair</td>
                        <td>Joan@gmail.com</td>
                        <td>Los Angeles</td>
                        <td>56584</td>
                        <td>18 Oct 2023</td>
                        <td>10:00AM</td>
                        <td>
                          <select className="form-control" tabIndex={-1} aria-hidden="true">
                            <option value="--">--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td>
                          <span className="unpaid">Unpaid</span>
                        </td>
                        <td>
                          <a className="actionsubmit" href="/serviceschedule#">
                            Submit
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Ser123</th>
                        <td>Joan Powell</td>
                        <td>AC Repair</td>
                        <td>Joan@gmail.com</td>
                        <td>Los Angeles</td>
                        <td>56584</td>
                        <td>18 Oct 2023</td>
                        <td>10:00AM</td>
                        <td>
                          <select className="form-control" tabIndex={-1} aria-hidden="true">
                            <option value="--">--</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </td>
                        <td>
                          <span className="paid">Paid</span>
                        </td>
                        <td>
                          <a className="actionsubmit" href="/serviceschedule#">
                            Submit
                          </a>
                        </td>
                      </tr> */}
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}

export default Servicerequest;