import React from 'react'
import { Link } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { baseUrl } from '../assets/pagesData/data'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCheck } from 'react-icons/bs'
import Loader from '../components/Loader'
import HomeLOading from '../components/HomeLOading'
function Home() {
  const [originalLink, setOriginalLink] = useState<String>("");
  const [hashedLink, setHashedLink] = useState<string>("");
  const [showUrlForm, setShowUrlForm] = useState<boolean>(false);
  const [copied, setCOpied] = useState<boolean>(false);
  const [shortening, setShortening] = useState<boolean>(false)
  const [startLoading, setStartLoading] = useState<boolean>(true)
  let errorNumber = 0;
  const send = async () => {
    if (originalLink == null || originalLink == "") {
      toast.error("Url is  invalid url or url is empty");
      errorNumber += 1;
    }
    if (errorNumber > 0) {
      return 0;
    }
    try {
      setShortening(true)
      await axios.post(baseUrl + "/url", {
          originalUrl: originalLink,
          shortUrl: "vava2003"
       
      }).then((result) => {
        setHashedLink(result.data.hashedUrl);
        setOriginalLink(result.data.originalUrl)
        setShowUrlForm(true);
        setShortening(false);
      }).catch((err) => {
        setShortening(false);
        toast.error(" sorry! this service is currently unvailable");
      })

    } catch (error) {
      console.log(error);

    }

  }

  const copy = () => {
    navigator.clipboard.writeText(hashedLink);
    toast.success("short link copied to clipboard")
    setCOpied(true)
    setTimeout(() => {
      setCOpied(false)
    }, 6000)
  }
  const getContent = () => {
    if (copied) {
      return < BsCheck className='text-center' />
    } else {
      return "Copy"
    }
  }
  const getClass = () => {
    if (copied) {
      return "bg-[#0B0B45] w-[20%] h-[100%]  text-[2.5rem] pl-[6%] font-bold hover:bg-[#00008B] ";
    } else {
      return "bg-[#0B0B45] w-[20%] h-[100%] text-center  font-bold hover:bg-[#00008B] "
    }
  }

  const handleChange = (data : string) => {
    setOriginalLink(data);
    setShowUrlForm(false)
  }
  useEffect(() => {
    const start = () => {
      setTimeout(() => {
        setStartLoading(false);
      }, 2000)
    }

    start();
  })
  return startLoading ? (<div className='h-screen grid items-center'>
    <HomeLOading />
  </div>) : (
    <div className='h-[100vh] grid items-center'>
      <Nav />
      <div className=" w-[100%] md:h-[70vh]  h-[75vh] grid items-center mx-auto  text-white ">
        <ToastContainer className="text-white w-[20%] left-4" />
        <div className='md:w-[40%]  w-[96%] border p-4   h-[100%] mx-auto'>
          <p className='text-center text-[2rem] text-black font-bold '>Short URL</p>
          <div className='flex flex-col space-y-5'>
            <p className='text-center text-[grey] my-3' >Past URL here and see The magic</p>

            <div className=' w-[92%] md:w-[80%] mx-auto flex flex-row h-[7vh]'>
              <TextField className='h-[80%] rounded-r-0  w-[76%] md:w-[80%] p-4' onChange={
                 (e) => handleChange(e.target.value)
              } id="outlined-basic" label="Enter the url to shorten" variant="outlined" />
              <button onClick={() => send()} className='bg-[#0B0B45] md:p-0 rounded-r-lg  h-[6vh] md:h-[100%] w-[24%] font-bold hover:bg-[#00008B] '> {shortening ? <Loader /> : "Shorten"} </button>
            </div>
            <div className='text-black text-[0.80rem] mt-2 text-center '>
              {showUrlForm ? " Your shortUrl was generated bellow: " :
                <div>
                  <p>ShortURL.at is a free tool to shorten a URL or reduce a link</p>
                  <p>Use our URL Shortener to create a shortened link making it easy to remember</p>
                </div>
              }
            </div>
          </div>
          <div className='w-[95%] translate-y-5 grid items-center h-[30%] mx-auto'>
            <div className='h-[6vh]  flex my-4 grid items-center   w-[90%] mx-auto '>
              {showUrlForm ? <div className='w-[96%] mx-auto flex h-[80%]'>
                <input className='h-[100%] focus:outline-0 border text-black  w-[80%] p-4' onChange={() => console.log("")} value={hashedLink.substring(8)} type="text" />
                <button onClick={() => copy()} className={getClass()} >{getContent()}</button>
              </div> : null}


            </div>
            <div className='border w-[90%] text-[0.70rem]  md:h-[19vh] mx-auto'>
              <h1>Want More? Try Premium Features!</h1>
              <div className='w-[98%] mx-auto flex flex-col   md:h-[75%] text-[1rem] md:text-[0.70rem]   h-[75%] pb-4  text-center text-black'>
                <p>Happy and enjoy using our service</p>
                <p>browser extension, 50+ app integrations and support. Only $9/month.</p>
                <Link to="/message" className=' text-center mx-auto mt-4 text-white h-[86%]   rounded w-[20%] font-bold '>
                  <button className='w-[100%] h-[100%] md:h-[80%] bg-[#0B0B45] rounded hover:bg-[#00008B] '>Reply</button>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home