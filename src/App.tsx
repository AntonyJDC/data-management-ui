import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { Toaster } from 'sonner';

function App() {

  return (
    <Suspense
      fallback={
        <div className="h-screen w-full bg-base-100 flex justify-center content-center">
          <span className="loading loading-ring loading-lg "></span>
        </div>
      }
    >
      <RouterProvider router={router} />
      <Toaster
        richColors
        expand={true}
        closeButton
      />
    </Suspense>
  );
}

export default App;
