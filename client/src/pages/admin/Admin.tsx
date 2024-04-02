import { Outlet } from 'react-router-dom'
import Header from './Header'

const Admin = () => {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

export default Admin