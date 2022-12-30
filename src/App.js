import { RouterProvider } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes/Route';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const queryClient = new QueryClient();
function App() {
  const darkTheme = useSelector((state)=> state.darkTheme.value)

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme])
  // useEffect(() => {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     setDarkTheme(true)
  //   } else {
  //     setDarkTheme(false)
  //   }
  // }, [])

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
