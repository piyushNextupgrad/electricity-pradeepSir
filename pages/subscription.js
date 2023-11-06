import Link from 'next/link';
const Subscription = () => {
    return (
         <>
    
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
    <div className="row">
 
  <div className="col-md-4 col-xl-3 col-lg-4 col-sm-6">
    <div className="pricingTable2 danger card">
      <div className="pricingTable2-header">
        <h3>Premium</h3>
        <span>Lorem ipsum dolor</span>
      </div>
      <div className="pricing-plans">
        <span className="price-value1">
          <i className="fa fa-usd" />
          <span>19</span>
        </span>
        <span className="month">/month</span>
      </div>
      <div className="pricingContent2">
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
      </div>
    
      <div className="pricingTable2-sign-up">
        <a href="#" className="btn btn-block btn-danger">
          Edit
        </a>
      </div>
   
    </div>
  </div>
  <div className="col-md-4 col-xl-3 col-lg-4 col-sm-6">
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
                      <Link href="/employee-detail" className="text-inherit">
                        Untrammelled prevents{" "}
                      </Link>
                    </td>
                    <td>28 May 2018</td>
                    <td>
                      <span className="status-icon bg-success" /> Completed
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
                      <span className="status-icon bg-success" /> Completed
                    </td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                  </tr>  <tr>
                    <td>
                      <a href="#" className="text-inherit">
                        Untrammelled prevents{" "}
                      </a>
                    </td>
                    <td>28 May 2018</td>
                    <td>
                      <span className="status-icon bg-success" /> Completed
                    </td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                  </tr>  <tr>
                    <td>
                      <a href="#" className="text-inherit">
                        Untrammelled prevents{" "}
                      </a>
                    </td>
                    <td>28 May 2018</td>
                    <td>
                      <span className="status-icon bg-success" /> Completed
                    </td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                  </tr>  <tr>
                    <td>
                      <a href="#" className="text-inherit">
                        Untrammelled prevents{" "}
                      </a>
                    </td>
                    <td>28 May 2018</td>
                    <td>
                      <span className="status-icon bg-success" /> Completed
                    </td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                    <td>$56,908</td>
                  </tr>  <tr>
                    <td>
                      <a href="#" className="text-inherit">
                        Untrammelled prevents{" "}
                      </a>
                    </td>
                    <td>28 May 2018</td>
                    <td>
                      <span className="status-icon bg-success" /> Completed
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
}
 
export default Subscription;