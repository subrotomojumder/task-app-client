import { RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthProvider';
import { router } from './routes/Route';

function App() {
  return (
    <AuthProvider>
      <div className='max-w-[1000px] min-h-screen mx-auto px-4 flex items-center justify-center' style={{ background: `linear-gradient(to top, rgba(255, 99, 71, 0.1), rgba(0, 0, 0, 0))`, backgroundSize: 'cover' }}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AuthProvider>
  );
}

export default App;
