const Login = () => {
    return (
      <div className="h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <div className="p-6 bg-light-card dark:bg-dark-card shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="border px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="border px-3 py-2 rounded"
            />
            <button className="bg-light-primary dark:bg-dark-primary text-white py-2 rounded">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
  