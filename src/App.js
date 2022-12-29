import { RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes/Route';

const queryClient = new QueryClient();
function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className='dark:bg-gray-500 min-h-[100vh]'>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
