import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function PlaceOrder() {
  return (
    <div>
      <hr className="text-gray-300 mb-10" />
      <div className="flex justify-between flex-col md:flex-row gap-5 md:gap-10">
        {/* Left-side section user order information */}
        <div className="flex-1/2">
          <h1 className="text-lg md:text-2xl uppercase font-semibold text-gray-500 mb-5">
            Delivery <span className="text-gray-900">Information</span>
          </h1>

          <div>
            <h1>form</h1>
          </div>
        </div>

        {/* Right-side section payment method */}
        <div className="flex-1/2 bg-fuchsia-500">
          <h1>Right Side</h1>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
