function NewsletterBox() {
  let handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center mb-30">
      <p className="text-2xl font-semibold">Subscribe now & get 20% off</p>
      <p className="text-gray-600 mt-3">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione,
        asperiores?
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="outline-none p-2 w-full sm:flex-1"
          required
        />
        <b  utton
          className=" bg-black text-white text-xs px-10 py-4 cursor-pointer"
          type="submit"
        >
          SUBSCRIBE
        </b>
      </form>
    </div>
  );
}

export default NewsletterBox;
