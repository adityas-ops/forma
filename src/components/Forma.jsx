import  { useState } from 'react';

const Forma= () => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [successfully,setSuccessfully] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: Number,
    country: '',
    file: null,
    files: [],
    geolocationStatus: 'Not Captured',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file,
    }));
  };

  const handleMultiFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      files,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const handleFormSubmitFinal = async(e)=>{
    e.preventDefault();
    console.log(formData)
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //  need to send data single one by one
          name:formData.name,
          email:formData.email,
          phone:formData.phone,
          addressLine1:formData.addressLine1,
          addressLine2:formData.addressLine2,
          city:formData.city,
          state:formData.state,
          pincode:formData.pincode,
          country:formData.country,
          single_file:formData.file,
          multi_file:formData.files,
          geolocationStatus:formData.geolocationStatus,
        }),
      });

      if (response.ok) {
        console.log('successfully submitted');
        setSuccessfully(true)

        
      } 
    } catch (error) {
      console.error('Error occurred during login:', error);
      // setErrorMessage('An error occurred during login');
    }

  }


  const handleGeolocationCapture = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
          });
          setFormData((prevFormData) => ({
            ...prevFormData,
            geolocationStatus: 'Captured',
          }));
        },
        (error) => {
          console.error(error);
          setFormData((prevFormData) => ({
            ...prevFormData,
            geolocationStatus: 'Not Captured',
          }));
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }


  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className='flex items-center justify-center   flex-col mt-5'>
            <h2 className=' text-center w-full h-full text-lg text-white font-bold mb-5'>Step 1: Basic Details</h2>
            <div className='w-full h-full flex items-center mt-[100px] lg:mt-0 justify-center'>
            <form className='w-[90%] h-full flex items-start justify-center flex-col' onSubmit={handleFormSubmit}>
              <label className='text-white pb-2'>Name:</label>
              <input type="text"   className="input input-bordered w-full bg-white text-black mb-4"  name="name" value={formData.name} onChange={handleChange} required />
              <label className='text-white pb-2'>Email:</label>
              <input type="email" name="email" className='input input-bordered w-full bg-white text-black mb-4' value={formData.email} onChange={handleChange} required />
              <label className='text-white pb-2'>Phone:</label>
              <input type="tel" name="phone" className='input input-bordered w-full bg-white text-black mb-4' value={formData.phone} onChange={handleChange} required />
             <div className='w-full h-full flex justify-end'>
             <button className=' bg-red-500 py-2 px-6 rounded hover:bg-transparent hover:border-2 hover:text-white  text-white' type="submit">Next</button>
             </div>
            </form>
            </div>
          </div>
        );
      case 2:
        return (
          <div className='flex items-center justify-center   flex-col mt-5'>
            <h2 className=' text-center w-full h-full text-lg text-white font-bold mb-5'>Step 2: Address</h2>
            <div className='w-full h-full flex items-center justify-center'>
            <form className='w-[90%] h-full flex items-start justify-center flex-col' onSubmit={handleFormSubmit}>
              <label className='text-white pb-1'>Address Line 1:</label>
              <input type="text" className="py-2 rounded input-bordered w-full bg-white text-black mb-2" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required />
              <label className='text-white pb-1'>Address Line 2:</label>
              <input type="text" className="py-2 rounded input-bordered w-full bg-white text-black mb-2" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
              <label className='text-white pb-1'>City:</label>
              <input type="text" className="py-2 rounded input-bordered w-full bg-white text-black mb-2" name="city" value={formData.city} onChange={handleChange} required />
              <label className='text-white pb-1'>State:</label>
              <input type="text" className="py-2 rounded input-bordered w-full bg-white text-black mb-2" name="state" value={formData.state} onChange={handleChange} required />
              <label className='text-white pb-1'>Pincode:</label>
              <input type="text" className="py-2 rounded input-bordered w-full bg-white text-black mb-2" name="pincode" value={formData.pincode} onChange={handleChange} required />
              <label className='text-white pb-1'>Country:</label>
              <input type="text" className="py-2 rounded input-bordered w-full bg-white text-black mb-2" name="country" value={formData.country} onChange={handleChange} required />
              <div className='w-full h-full flex justify-between mt-1'>
             <button className=' bg-red-500 py-2 px-6 rounded hover:bg-transparent  hover:text-white  text-white' onClick={handlePrev} >Prev</button>
             <button className=' bg-red-500 py-2 px-6 rounded hover:bg-transparent  hover:text-white  text-white' type="submit">Next</button>
             </div>
            </form>
            </div>
          </div>
        );
      case 3:
        return (
          <div className='flex items-center  w-full h-[100%]  flex-col mt-5'>
            <h2 className=' text-center  text-lg text-white font-bold mb-5'>Step 3: File Upload</h2>
            <form className='w-[90%] h-[80%] flex items-center  justify-center flex-col' onSubmit={handleFormSubmit}>
            <input type="file" accept=".png,.pdf"  onChange={handleFileChange} required className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
            <div className=' flex w-[70%] justify-between mt-[100px]'>
             <button className=' bg-red-500 py-2 px-6 rounded hover:bg-transparent  hover:text-white  text-white' onClick={handlePrev} >Prev</button>
             <button className=' bg-red-500 py-2 px-6 rounded hover:bg-transparent  hover:text-white  text-white' type="submit">Next</button>
             </div>
            </form>
          </div>
        );
      case 4:
        return (
          <div className='flex items-center  w-full h-[100%]  flex-col mt-5'>
            <h2 className=' text-center  text-lg text-white font-bold mb-5'>Step 4: Multi File Upload</h2>
            <form className='w-[90%] h-[80%] flex items-center  justify-center flex-col' onSubmit={handleFormSubmitFinal}>
              <label>Upload Files (Max 5):</label>
              <input type="file" accept=".png,.pdf" onChange={handleMultiFileChange} required multiple className="file-input mt-2 file-input-bordered file-input-accent w-full max-w-xs" />
              <div className='mt-10 '>
                <p className='text-lg text-white'>Geolocation Status: {formData.geolocationStatus}</p>
               {
                  formData.geolocationStatus === 'captured' && (
                    <>
                    <p className='text-lg text-white'>Latitude: {location.latitude}</p>
                <p className='text-lg text-white'>Longitude: {location.longitude}</p>
                    </>)
               }
                <div className='mt-3 w-full flex justify-center'>
                <button className='btn btn-primary' onClick={handleGeolocationCapture}>Capture Geolocation</button>
                </div>
              </div>
              <div className=' flex w-[70%] justify-between mt-[100px]'>
             <button className=' bg-red-500 py-2 px-6 rounded hover:bg-transparent  hover:text-white  text-white' onClick={handlePrev} >Prev</button>
             <button className=' bg-red-500 py-2 px-6 rounded hover:bg-transparent  hover:text-white  text-white' type="submit">Next</button>
             </div>
            </form>
          </div>
        );
      case 5:
        return (
          <div className='flex items-center  w-full h-[100%]  flex-col mt-5'>
            <h2 className=' text-center  text-lg text-white font-bold mb-5'>Step 5: Status</h2>
            <p className='mt-[300px]'>{
              successfully === true ? (
                <span className='text-green-500 font-bold text-4xl'>Form submitted successfully</span>
              ):
              (
                <span className='text-red-500 font-bold text-4xl'>Form submission failed</span>
              )
            }</p>
          </div>
        );
      default:
        return null;
    }
  };


  const handlePrev = () => {
    //  write logic if step less then 1 then it should not work
    setStep((step) =>{
      if(step <= 1){
        return 1;
      }
      return step - 1;
    }
    );
  };
  return (
    <div className='w-full max-h-screen flex flex-col items-center justify-center'>
    <h2 className='mt-10 text-2xl lg:text-4xl font-bold text-red-500'>Form data</h2>
    <div className='w-full h-full flex items-center justify-center mt-10'>
    <ul className="steps step-horizontal w-full">
  <li className={`step ${step >=1 ? "step-primary":""}`} onClick={()=>{setStep(1);}}/>
  <li className={`step ${step >=2 ? "step-primary":"" }`} onClick={()=>{setStep(2);}} />
  <li className={`step ${step >=3 ? "step-primary":""}`} onClick={()=>{setStep(3);}}/>
  <li className={`step ${step >=4 ? "step-primary":""}`} onClick={()=>{setStep(4);}}/>
  <li className={`step  ${step >=5 ? "step-primary":""}`} onClick={()=>{setStep(5);}}/>
</ul>
    </div>
    <div className=' mt-10 h-[80vh] flex items-center justify-center w-full '>
      <div className='lg:w-[500px] w-[95%] h-[95%] lg:h-[100%]  border-2 '>
        {renderFormStep()}
      </div>
    </div>
    </div>
  );
};

export default Forma;
