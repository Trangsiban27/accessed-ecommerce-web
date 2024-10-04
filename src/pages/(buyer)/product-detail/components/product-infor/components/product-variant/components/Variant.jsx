const Variant = () => {
  return (
    <div className="w-full">
      <p>
        Color: <span className="text-lg font-bold">Titanium Yellow</span>
      </p>
      <ul className="flex items-center mt-2 gap-x-4">
        <li className="p-6 rounded-md cursor-pointer bg-subTitle hover:opacity-75"></li>
        <li className="p-6 rounded-md cursor-pointer bg-subTitle hover:opacity-75"></li>
        <li className="p-6 rounded-md cursor-pointer bg-subTitle hover:opacity-75"></li>
      </ul>
    </div>
  );
};

export default Variant;
