import React from 'react';
import { Header } from './components/Header';
import { QuranReader } from './components/QuranReader';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="container mx-auto px-4">
          <QuranReader />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;