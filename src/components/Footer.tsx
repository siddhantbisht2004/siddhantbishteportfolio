
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-secondary border-t border-muted">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {currentYear} Siddhant Bisht. All Rights Reserved.
        </p>
        <div className="mt-2 text-xs text-gray-500">
          <p>Made with passion and code</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
