import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import PreLoader from '../PreLoader/PreLoader'

export default function UserData() {

  let {id} = useParams()
  console.log(id)

  const {register, handleSubmit, setValue,formState:{errors, isSubmitting}} = useForm()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  //! Add New User - Update User ***********************************
  const onSubmit = async(data) =>{
    if(id){
        try {
          const response = await axios.put(`https://dummyjson.com/users/${id}`,data)
          navigate('/dashboard/users')
          console.log(response?.data)
          toast.success('Yeah! user edited successfully')
        } catch (error) {
          console.log(error)
          toast.error("Sorry, something went wrong.");
        }
    }else{
        try {
          const response = await axios.post("https://dummyjson.com/users/add",data)
          console.log(response?.data)
          navigate('/dashboard/users')
          toast.success('user added successfully')
        } catch (error) {
          console.log(error)
        }
    }
  }
  //!Get User Data in form (EDIT USER) ****************************** 
  const [userDetails, setUserDetails] = useState(null)
  const getUserData = async() =>{
    try {
      const {data} = await axios.get(`https://dummyjson.com/users/${id}`)
      const birthDate =new Date(data.birthDate).toISOString().split("T")[0];
      setUserDetails({...data,birthDate})

      setValue("firstName", data.firstName)
      setValue("lastName", data.lastName)
      setValue("email", data.email)
      setValue("age", data.age)
      setValue("phone", data.phone)
      setValue("birthDate", birthDate)

    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      getUserData(); // finally => setIsLoading(false) 
    } else {
      setIsLoading(false); 
    }
  }, []);
  

  return (
    <>
      <div className="title p-3">
        <h4>{id?"Update User":"User List"}</h4>
      </div>
      <hr />

      {isLoading && <div className="w-100 d-flex justify-content-center align-items-center h-75"><PreLoader/></div>}
        <div className="">
      {!isLoading &&
          <form onSubmit={handleSubmit(onSubmit)} className='shadow-lg p-4 m-4 rounded' action="">
            {/* row#1 */}
            <div className="row">
              <div className="col-md-6">
                <div className=" mb-3">
                  <label htmlFor="" className='text-muted mb-1'>First Name</label>
                  <input type="text" className="form-control" placeholder="Enter your First Name" aria-label="FirstName" aria-describedby="basic-addon1"
                  {...register("firstName", {required: 'first name is required'})}
                  ></input>
                </div>
                {errors?.firstName && <span className='text-danger'>{errors?.firstName.message}</span>}
              </div>
              <div className="col-md-6">
                  <div className=" mb-3">
                    <label htmlFor="" className='text-muted mb-1'>Last Name</label>
                  <input type="text" className="form-control" placeholder="Enter your Last Name" aria-label="LastName" aria-describedby="basic-addon1"
                  {...register("lastName", {required: 'last name is required'})}
                  ></input>
                </div>
                {errors?.lastName && <span className='text-danger'>{errors?.lastName.message}</span>}
              </div>
            </div>
            {/* row#2 */}
            <div className="row my-3">
              <div className="col-md-6">
                <div className=" mb-3">
                  <label htmlFor="" className='text-muted mb-1'>Email</label>
                  <input type="text" className="form-control" placeholder="Enter your Email" aria-label="email" aria-describedby="basic-addon1"
                    {...register("email", {required: 'Email is required', pattern:{value:/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/ ,message:'Email should be valid'}})}
                  ></input>
                </div>
                {errors?.email && <span className='text-danger'>{errors?.email?.message}</span>}
              </div>
              <div className="col-md-6">
                  <div className=" mb-3">
                    <label htmlFor="" className='text-muted mb-1'>Age</label>
                  <input type="number" className="form-control" placeholder="Enter your Age" aria-label="age" aria-describedby="basic-addon1"
                  {...register("age", {required: 'Age is required', max:{value:50,message:'Max age is 50'}})}
                  ></input>
                </div>
                {errors?.age && <span className='text-danger'>{errors?.age?.message}</span>}
              </div>
            </div>
            {/* row3 */}
            <div className="row">
              <div className="col-md-6">
                <div className=" mb-3">
                  <label htmlFor="" className='text-muted mb-1'>Phone Number</label>
                  <input type="text" className="form-control" placeholder="Enter your Phone Number" aria-label="PhoneNumber" aria-describedby="basic-addon1"
                  {...register("phone",{required:'phone is required', pattern:{value:/^(\+?\d{1,3}[\s-]?)?\d{3}[\s-]?\d{3}[\s-]?\d{4}$/, message:'Phone number should be valid'}})}
                  ></input>
                </div>
                {errors?.phone && <span className='text-danger'>{errors?.phone?.message}</span>}

              </div>
              <div className="col-md-6">
                  <div className=" mb-3">
                    <label htmlFor="" className='text-muted mb-1'>birth Data</label>
                  <input type="date" className="form-control" placeholder="Enter your birth Data" aria-label="BirthData" aria-describedby="basic-addon1"
                  {...register("birthDate", {required: 'Birth date is required',})}
                  ></input>
                </div>
              {errors?.birthDate && <span className='text-danger'>{errors?.birthDate?.message}</span>}
              </div>
            </div>
            <div className='text-center my-4'>
              <button disabled={isSubmitting} className={`btn btn-warning w-50 ${isSubmitting?'opacity-50':''}`}>
                {isSubmitting?'Submitting...':id?'Update':'Save'}
              </button>
            </div>
          </form>}
        </div>
    </>
  )
}
