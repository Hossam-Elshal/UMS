import axios from 'axios'
import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../assets/context/AuthContext';

export default function Login() {

  let {saveUserData} = useContext(AuthContext)

  const navigate = useNavigate() //react-router-dom

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try{
      const response = await axios.post("https://dummyjson.com/auth/login", data)
      localStorage.setItem("userToken",response.data.accessToken)
      saveUserData() ///////////
      toast.success("Login success!")
      navigate("/dashboard")
    }catch(error){
      toast.error("Login Failed!")
      console.log(error)
    }
  }
  return (
    <>
      <div className='container-fluid login-container'>
        <div className='row vh-100 justify-content-center align-items-center'>
              <div className='col-md-4 bg-white rounder rounded-3 px-4 py-5'>
                <div className='text-center'>
                  <h3> <b style={{ borderLeft: "6px solid #ffa200ac", paddingLeft: "10px" }}></b> User Management System</h3>
                  <h5 className='my-3'>Sign In</h5>
                  <span className='text-muted'>Enter your credentials to access your account</span>
                </div>
                <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                <div className=" mb-3">
                  <label htmlFor="" className='text-muted'>Username</label>
                    <input type="text" className="form-control" placeholder="Enter your email" aria-label="Username" aria-describedby="basic-addon1"
                    {...register('username', {required: 'username is required'})}
                    />
              </div>
              {errors?.username && <span className='text-danger'> {errors?.username?.message} </span>}
              <div className=" mb-3">
                  <label htmlFor="" className='text-muted'>Password</label>
                    <input type="password" className="form-control" placeholder="Enter your password" aria-label="password" aria-describedby="basic-addon1"
                  {...register("password", {required: 'password is required'})}/>
              </div>
              {errors?.password && <span className='text-danger'> {errors?.password?.message} </span>}

              <button type='submit' className='btn btn-warning text-white w-100'>SIGN IN</button>
                </form>
              </div>
        </div>
      </div>
    </>
  )
}
