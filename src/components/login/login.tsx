import React from "react";

export default function Login({
  handleKeyDown,
  newUser,
  setNewUser,
  newLoginUser,
}: any) {
  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <div className="card px-5 py-5" id="form1">
            <div className="form-data" v-if="!submitted">
              <div className="forms-inputs mb-4">
                <span>User Name:</span>
                <br />
                <input
                  value={newUser}
                  onChange={(e) => {
                    setNewUser(e.target.value);
                  }}
                  autoComplete="off"
                  className="form-control"
                  type="text"
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-dark w-100"
                  disabled={newUser.length > 2 ? false : true}
                  onClick={newLoginUser}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
