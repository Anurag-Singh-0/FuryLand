function Navbar() {
  return (
    <div className="flex items-center justify-between px-10 py-3 bg-gray-100">
      <img src="../../public/Admin-logo.png" alt="admin logo" className="w-50" />
      <button className="bg-[#003DF6] text-white px-5 py-2 rounded-full cursor-pointer outline-0">Logout</button>
    </div>
  );
}

export default Navbar;
