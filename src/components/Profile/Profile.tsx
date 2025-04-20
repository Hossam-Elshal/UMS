import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



const Profile = () => {
  let { UserData } = useContext(AuthContext);

  return (
      <>
      <div className="border-bottom">
        <h3 className="fw-bold mt-3">Profile</h3>
      </div>

        <div className="text-center">
          <img src={UserData?.image} alt="Profile Pic" />
        </div>

      <div className="container-fluid">
        {/* row#1 */}
        <form className="shadow-lg m-5 p-4 border rounded-4 bg-white">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-1">
                <label className="form-label">First name</label>
                <input
                  type="text"
                  className="form-control fw-bold fs-5 text-muted bg-light"
                  readOnly 
                  value={UserData?.firstName}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-1">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control fw-bold fs-5 text-muted bg-light"
                  readOnly
                  value={UserData?.lastName}
                />
              </div>
            </div>
          </div>

        {/* row#2 */}
          <div className="row my-3">
            <div className="col-md-6">
              <div className="mb-1">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control text-muted bg-light"
                  readOnly
                  value={UserData?.email}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-1">
                <label className="form-label">Username</label>
                <input
                  type="string"
                  className="form-control text-muted bg-light"
                  readOnly
                  value={UserData?.username}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-1">
                <label className="form-label">Phone Number</label>
                <input
                  type="string"
                  className="form-control text-muted bg-light"
                  readOnly
                  value='+81 210-652-2785'
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-1">
                <label className="form-label">Gender</label>
                <input
                  type="string"
                  className="form-control text-muted bg-light"
                  readOnly
                  value={UserData?.gender}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;