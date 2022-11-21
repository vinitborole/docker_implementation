export const Layout = (props) => {
  return (
    <div>
      <div className="header">
        <div className="logo">
          <p className="logo_text">Daily Schedular</p>
        </div>
      </div>
      <div className="app_body">{props.children}</div>
      <div className="footer">
        <p className="footer_text">
          A simple program to demonstrate the contenaristion of react
          application
        </p>
      </div>
    </div>
  );
};
