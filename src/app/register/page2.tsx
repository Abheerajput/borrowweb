'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from "../../../public/Images/logo.png";

// Validation Schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    // .matches(/^[6-9]\d{9}$/, 'Invalid phone number')
    .required('Phone is required'),
  gender: Yup.string().required('Gender is required'),
  dob: Yup.string().required('Date of Birth is required'),
  state: Yup.string().required('State is required'),
});

const RegisterLoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange', // enables real-time validation
  });

  const onSubmit = (data: any) => {
    console.log('Form Submitted:', data);
    router.push('/otp'); // redirect only on valid form
  };

  return (
    <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold flex justify-center text-orange-500">
            <Image src={logo} alt="Logo" className="w-[25%]" />
          </h1>
        </div>

        {/* Header */}
        <h2 className="text-[40px] font-poppins text-black font-bold mb-1 text-start">Register/Login</h2>
        <p className="text-black text-start font-poppins font-medium mb-6">Let's get to know you better</p>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Row 1: Name and Email */}
          <div className="grid xs:grid-cols-1 grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-black mb-1">Full Name</label>
              <input
                {...register("fullName")}
                id="fullName"
                placeholder="Enter your full name"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-orange-400"
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">Email Id</label>
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="you@example.com"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-orange-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>

          {/* Row 2: Phone and Gender */}
          <div className="grid xs:grid-cols-1 grid-cols-2 gap-x-6 gap-y-4">
           <div>
  <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">Phone Number</label>
  <div className="flex">
   <select
    {...register("countryCode", { required: true })}
    className="border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-gray-600 px-3 py-2 focus:outline-none"
  >
    <option value="+91">🇮🇳 +91</option>
    <option value="+1">🇺🇸 +1</option>
    <option value="+44">🇬🇧 +44</option>
    <option value="+61">🇦🇺 +61</option>
    <option value="+971">🇦🇪 +971</option>
    {/* Add more as needed */}
  </select>
    <input
      {...register("phone", {
        required: "Phone number is required",
        pattern: {
          value: /^[0-9]{10}$/,
          message: "Phone number must be exactly 10 digits",
        },
      })}
      id="phone"
      type="tel"
      inputMode="numeric"
       onKeyDown={(e) => {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (
      !/[0-9]/.test(e.key) && // block anything that's not a number
      !allowedKeys.includes(e.key)
    ) {
      e.preventDefault();
    }
  }}
      maxLength={10}
      placeholder="9876543210"
      className="block w-full flex-1 border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
  </div>
  {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
</div>


            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-black mb-1">Gender</label>
              <select
                {...register("gender")}
                id="gender"
                className="block w-full border border-gray-300 rounded-md  px-4 py-[11px] focus:ring-orange-400"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            </div>
          </div>

          {/* Row 3: DOB and State */}
          <div className="grid xs:grid-cols-1 grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-black mb-1">Date of Birth</label>
              <input
                {...register("dob")}
                id="dob"
                type="date"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-orange-400"
              />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-black mb-1">State</label>
              <input
                {...register("state")}
                id="state"
                placeholder="e.g., Haryana"
                className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-orange-400"
              />
              {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full font-poppins py-3 rounded-md text-lg font-semibold transition-colors duration-300 ${
                isValid
                  ? 'bg-[#FF5F00] text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterLoginForm;


// 'use client';
// import React from 'react';
// import logo from "../../../public/Images/logo.png"
// import Image from 'next/image';
// import Link from 'next/link';
// const RegisterLoginForm = () => {
//   return (
//     <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center px-4 py-10">
//       <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
//         {/* Logo */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold flex justify-center text-orange-500">
//             <Image src={logo} alt="" className='w-[25%]' />
//           </h1>
//         </div>

//         {/* Header */}
        
//         <h2 className="text-[40px] font-poppins text-black  font-bold mb-1 text-start">Register/Login</h2>
//         <p className="text-black text-start font-poppins font-medium mb-6">Let's get to know you better</p>
 
//         <form className="space-y-6">
//   {/* Row 1: Name and Email */}
//   <div className="grid xs:grid-cols-1 grid-cols-2 gap-x-6 gap-y-4">
//     {/* Full Name Field */}
//     <div>
//       <label htmlFor="fullName" className="block text-sm font-medium text-black mb-1">
//         Full Name
//       </label>
//       <input
//         type="text"
//         id="fullName"
//         name="fullName"
//         placeholder="Enter your full name"
//         className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//       />
//     </div>

//     {/* Email Field */}
//     <div>
//       <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
//         Email Id
//       </label>
//       <input
//         type="email"
//         id="email"
//         name="email"
//         placeholder="you@example.com"
//         className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//       />
//     </div>
//   </div>

//   {/* Row 2: Phone and Gender */}
//   <div className="grid xs:grid-cols-1 grid-cols-2 gap-x-6 gap-y-4">
//     {/* Phone Number Field */}
//     <div>
//       <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
//         Phone Number
//       </label>
//       <div className="flex">
        // <span className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-gray-600">
        //   🇮🇳 +91
        // </span>
//         <input
//           type="tel"
//           id="phone"
//           name="phone"
//           placeholder="98765 43210"
//           className="block w-full flex-1 border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />
//       </div>
//     </div>

//     {/* Gender Field */}
//     <div>
//       <label htmlFor="gender" className="block text-sm font-medium text-black mb-1">
//         Gender
//       </label>
//       <select 
//         id="gender" 
//         name="gender" 
//         className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//       >
//         <option value="">Select Gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//     </div>
//   </div>

//   {/* Row 3: DOB and State */}
//   <div className="grid xs:grid-cols-1 grid-cols-2 gap-x-6 gap-y-4">
//     {/* Date of Birth Field */}
//     <div>
//       <label htmlFor="dob" className="block text-sm font-medium text-black mb-1">
//         Date of Birth
//       </label>
//       <input
//         type="date"
//         id="dob"
//         name="dob"
//         className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//         defaultValue="2002-03-20"
//       />
//     </div>

//     {/* State Field */}
//     <div>
//       <label htmlFor="state" className="block text-sm font-medium text-black mb-1">
//         State
//       </label>
//       <input
//         type="text"
//         id="state"
//         name="state"
//         placeholder="e.g., Haryana"
//         className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//         defaultValue="Haryana"
//       />
//     </div>
//   </div>

//   {/* Submit Button */}
//   <div className="pt-4">
//     <Link href="/otp">
//     <button
//       type="submit"
//       className="w-full font-poppins bg-[#FF5F00] text-white py-3 rounded-md text-lg font-semibold transition-colors duration-300"
//       >
//       Continue
//     </button>
//       </Link>
//   </div>
// </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterLoginForm;
