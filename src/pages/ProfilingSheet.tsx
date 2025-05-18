
import React from 'react';
import Navbar from '@/components/Navbar';
import ProfilingSheet from '@/components/ProfilingSheet';
import Footer from '@/components/Footer';

const ProfilingSheetPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <ProfilingSheet />
      <Footer />
    </div>
  );
};

export default ProfilingSheetPage;
