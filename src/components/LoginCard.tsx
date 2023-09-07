import Link from "next/link";

const LoginCard = () => {
  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Welcome Back !!...</h1>
          <p className="login-subtitle">Proceed to login</p>
          <Link href="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
        <div className="login-blob"></div>
      </div>
    </>
    // <div>
    //
    // </div>
  );
};

export default LoginCard;
