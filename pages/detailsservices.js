import Link from 'next/link';
import { TbAirConditioningDisabled,TbWood } from "react-icons/tb";
import { FaAnglesRight } from "react-icons/fa6";
import { MdPlumbing,MdElectricalServices } from "react-icons/md";
const detailsservices = () => {
    return (
         <>
    
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
          <div className="row gutters-xs">
            <div className="col-3">
              <input
                type="search"
                className="form-control header-search"
                placeholder="Services Name"
                aria-label="Search"
                tabIndex={1}
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control header-search"
                placeholder="Services Charge"
              />
            </div>
            <div className="col-2">
            <input
                type="text"
                className="form-control header-search"
                placeholder="Services Details"
              />
            </div>
            <div className="col-2">
            <input
                type="text"
                className="form-control header-search"
                placeholder="Services Time"
              />
            </div>
            <div className="col-2">
              <div className="text-end row searchsexction">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="submit" className="btn btn-danger">
                 Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </div>
</div>
<div className="row">
  <div className="col-md-6 col-lg-3 features">
    <div className="card">
      <div className="card-body text-center">
        <div className="feature">
          <div className="fa-stack services bg-primary-transparent  fa-lg fa-1x  mb-3">
            <TbAirConditioningDisabled/>
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
            <MdPlumbing/>
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
  </div>
  <div className="col-md-6 col-lg-3 features">
    <div className="card">
      <div className="card-body text-center">
        <div className="feature">
          <div className="fa-stack services bg-primary-transparent  fa-lg fa-1x  mb-3">
            <TbAirConditioningDisabled/>
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
            <MdPlumbing/>
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
  </div> <div className="col-md-6 col-lg-3 features">
    <div className="card">
      <div className="card-body text-center">
        <div className="feature">
          <div className="fa-stack services bg-primary-transparent  fa-lg fa-1x  mb-3">
            <TbAirConditioningDisabled/>
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
            <MdPlumbing/>
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
  </div>
</div>

</div>
</div>


    
    </> 
    );
}
 
export default detailsservices;