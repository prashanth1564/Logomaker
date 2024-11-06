
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; 

function Header({ DownloadIcon }) {
  const [loggedIn, setLoggedIn] = useState(false); 
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginMessage, setShowLoginMessage] = useState(false); 
  const [showLogoutMessage, setShowLogoutMessage] = useState(false); 
  const [showDownloadMessage, setShowDownloadMessage] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setLoggedIn(true);
      setOpenDialog(false); 
      setShowLoginMessage(true); 
    } else {
      alert('Please enter valid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setShowLogoutMessage(true); 
  };

  const handleDownload = () => {
    DownloadIcon(Date.now); // Trigger the download function
    setShowDownloadMessage(true); // Show the download success message
  };
  
  useEffect(() => {
    if (showLoginMessage) {
      const timer = setTimeout(() => setShowLoginMessage(false), 3000);
      return () => clearTimeout(timer); 
    }
  }, [showLoginMessage]);

  
  useEffect(() => {
    if (showLogoutMessage) {
      const timer = setTimeout(() => setShowLogoutMessage(false), 3000);
      return () => clearTimeout(timer); 
    }
  }, [showLogoutMessage]);
  useEffect(() => {
    if (showDownloadMessage) {
      const timer = setTimeout(() => setShowDownloadMessage(false), 3000);
      return () => clearTimeout(timer); 
    }
  }, [showDownloadMessage]);
  return (
    <div 
      className='p-4 shadow-sm flex justify-between items-center'
      // style={{
      //   position: 'fixed',
      //   top: 0,
      //   left: 0,
      //   width: '100%',
      //   zIndex: 10, 
      //   backgroundColor: 'white' 
      // }}
    >
      <div className='flex items-center'>
        <img src='/logo.svg' alt="Logo" />
        <h1 className='text-lg font-bold ml-4'>        </h1>
        <span className="text-lg font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '42px', color:'#5417D7'}}>CN Logoloom</span>
      </div>
      <div className="flex gap-4 items-center">
        <Button className="flex gap-2 items-center" onClick={handleDownload/*() => DownloadIcon(Date.now)*/}>
          <Download className='h-4 w-4' />
          Download
        </Button>
        {loggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button className='flex gap-2 text-white' onClick={() => setOpenDialog(true)}>Login</Button>
        )} 
      </div>

      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Please enter your email and password to login.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </DialogContent>
      </Dialog>

      
      {showLoginMessage && (
        <div 
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg"
          role="alert"
        >
          Logged in successfully!
        </div>
      )}

      {showLogoutMessage && (
        <div 
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white py-2 px-4 rounded shadow-lg"
          role="alert"
        >
          Logged out successfully!
        </div>
      )}
      {showDownloadMessage && (
        <div 
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg"
          role="alert"
        >
          Downloaded successfully!
        </div>
      )}
    </div>
  );
}

export default Header;


/*
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle";  // Ensure this path is correct

function Header({ DownloadIcon }) {
  const [loggedIn, setLoggedIn] = useState(false); 
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginMessage, setShowLoginMessage] = useState(false); 
  const [showLogoutMessage, setShowLogoutMessage] = useState(false); 

  const handleLogin = () => {
    if (email && password) {
      setLoggedIn(true);
      setOpenDialog(false); 
      setShowLoginMessage(true); 
    } else {
      alert('Please enter valid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setShowLogoutMessage(true); 
  };

  useEffect(() => {
    if (showLoginMessage) {
      const timer = setTimeout(() => setShowLoginMessage(false), 3000);
      return () => clearTimeout(timer); 
    }
  }, [showLoginMessage]);

  useEffect(() => {
    if (showLogoutMessage) {
      const timer = setTimeout(() => setShowLogoutMessage(false), 3000);
      return () => clearTimeout(timer); 
    }
  }, [showLogoutMessage]);

  return (
    <div className='p-4 shadow-sm flex justify-between items-center'>
      <div className='flex items-center'>
        <img src='/logo.svg' alt="Logo" />
        <span className="text-lg font-bold" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '45px', color:'#5417D7'}}>CN Logoloom</span>
      </div>
      <div className="flex gap-4 items-center">
        <Button className="flex gap-2 items-center" onClick={() => DownloadIcon(Date.now)}>
          <Download className='h-4 w-4' />
          Download
        </Button>
        {loggedIn ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button className='bg-slate-600 text-black' onClick={() => setOpenDialog(true)}>Login</Button>
        )}
        <ModeToggle /> 
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Please enter your email and password to login.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </DialogContent>
      </Dialog>

      {showLoginMessage && (
        <div 
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg"
          role="alert"
        >
          Logged in successfully!
        </div>
      )}

      {showLogoutMessage && (
        <div 
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-700 text-white py-2 px-4 rounded shadow-lg"
          role="alert"
        >
          Logged out successfully!
        </div>
      )}
    </div>
  );
}

export default Header;
*/