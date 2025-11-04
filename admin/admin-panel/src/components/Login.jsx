export default function Login() {
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="">
          <h1 className="font-bold text-2xl mb-3">Admin Panel</h1>
          
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="you@gmail.com"
              id="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="enter your password"
              id="password"
              required
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-[#155DFC] text-white p-2 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
