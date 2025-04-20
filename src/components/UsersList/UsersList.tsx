import axios from "axios"
import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PreLoader from "../PreLoader/PreLoader";


export default function UsersList() {


  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate();

  const navigateToUserData = () => {
    navigate('/dashboard/userData')
  }

  //Retrieve 
  const [users, setUsers] = useState([])

  //! getData ===================================
  const getData = async() => {
    try {
      const response = await axios.get('https://dummyjson.com/users')
      setUsers(response.data.users)
    } catch (error) {
      console.log(error)
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  
  //Delete 
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userData, setUserData] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = (user) =>{
    setShow(true);
    setUserData(user)
    setUserId(user.id)
  };

  const deleteUser = async() => {
    try {
      const response = await axios.delete(`https://dummyjson.com/users/${userId}`)
      console.log(response)
      handleClose()
      toast.success("deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Are you want to delete <b>"{userData?.firstName} {userData?.lastName}"</b> ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteUser}>
            YES
          </Button>
          <Button variant="warning" onClick={handleClose}>
            NO
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="title d-flex justify-content-between p-3">
        <h4>User List</h4>
        <Link to='/dashboard/userData/new-user' className='btn btn-warning'>ADD NEW User</Link>
      </div>
      <hr/>
      {isLoading && <div className="w-100 d-flex justify-content-center align-items-center h-75"><PreLoader/></div>}
      {!isLoading && 
      <div className="p-3">
          <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">birthDate</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user:any)=>(
                      <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td><img className="w-25" src={user.image} alt=""/> </td>
                      <td>{user.firstName}-{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.birthDate}</td>
                      <td>
                      <Link to={`/dashboard/userData/${user.id}`} className="text-warning mx-3"><FaEdit size={25}/></Link> 
                      <MdDelete onClick={()=>handleShow(user)} className="text-danger" size={25}  style={{ cursor: 'pointer' }}/>             
                      </td>
                    </tr>
                ))}

              </tbody> 
    </table>

      </div> }
    </>
  )
}
