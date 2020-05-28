import React from 'react';
import NonAuthenticatedLayout from 'layout/non-authenticated.layout';

const LoginForm = () => {
  return (
    <section className="row">
      <form className="col-12 p-0">
        {false && (
          <div className="col-12">
            <span className="text-danger small alert-danger">
              <i className="icon ion-md-remove-circle text-danger" />{' '}
              {'errorNew'}
            </span>
          </div>
        )}

        <div className="col-12 form-group">
          <label className="w-100">
            <input
              type="email"
              name="email"
              className={`${false ? 'is-invalid ' : ''}form-control`}
              placeholder="Email"
              required
            />
          </label>
        </div>

        <div className="col-md-12 form-group">
          <label className="w-100">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`${false ? 'is-invalid ' : ''}form-control`}
              required
            />
          </label>
        </div>

        <div className="col-12 mb-4">
          <button className="btn btn-md btn-primary btn-block" type="submit">
            Sign in
          </button>
        </div>
      </form>
    </section>
  );
};

const LoginView = () => {
  return (
    <div className="login-layout">
      <div className="left-bubble"></div>
      <div className="right-bubble"></div>
      <div className="middle-bubble"></div>
      <div className="wave one"></div>
      <div className="wave two"></div>
      <div className="wave three"></div>
      <div className="row justify-content-center m-0">
        <div className="col-md-4 p-5 rounded bg-white login-form">
          <h3 className="text-primary mb-4">Welcome back :)</h3>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginView;
