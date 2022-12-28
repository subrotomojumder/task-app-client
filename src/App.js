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
        <div className='max-w-[1000px] min-h-[88vh] mx-auto px-4' style={{ background: `linear-gradient(to top, rgba(255, 99, 71, 0.1), rgba(0, 0, 0, 0))`, backgroundSize: 'cover' }}>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
