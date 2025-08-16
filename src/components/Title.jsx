function Title({ text1, text2 }) {
  return (
    <div className="p-5 flex items-center justify-center uppercase gap-2">
      <h1 className="text-gray-600 text-lg sm:text-3xl lg:text-3xl font-semibold">{text1}</h1>
      <h1 className="text-gray-900 text-lg sm:text-3xl lg:text-3xl font-semibold">{text2}</h1>
    </div>
  );
}

export default Title;
