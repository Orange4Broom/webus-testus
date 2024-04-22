import { ToastContainer } from 'react-toastify';
import { DefaultLayout } from './components/defaultLayout/DefaultLayout';
import { Home } from './components/home/Home';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    </>
  );
};
