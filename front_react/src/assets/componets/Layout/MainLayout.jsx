import Header from 'Header';
import { Outlet } from 'react-router';

function MainLayout() {

  return (
    <>
        < Header />
        <main>
            < Outlet />
        </main>
    </>
  )
}

export default MainLayout