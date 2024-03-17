

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import QRCode from 'react-qr-code';
import { useDispatch,useSelector } from 'react-redux';
import { useState,useEffect } from 'react'; 
import { addNode } from "../../features/nodelistSlice";
import {getUser } from "../../features/registerSlice";
import { BASE_URI} from '../../../config/keys-dev';


export default function Accordion(props) { 
     const dispatch=useDispatch();
     const [apidata, setData] = useState(null);
     const [error,setError]=useState(null);
     const [isLoading, setIsLoading] = useState(false);
     const [qr, setQr]=useState('')
     const [upiId,setUpiId]=useState('');
     const [ canSubmit1,setCansubmit1]= useState(false);

     useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true); // Set loading state to true
          try {
            const response = await fetch(`${BASE_URI}api/admin/cmp`);
            const fetchedData = await response.json();
            console.log("333fetchedData3333##",fetchedData.data);
            setData(fetchedData.data);
            setQr(fetchedData.data[0].UpiId)
          } catch (error) {
            console.error('Error fetching data:', error); // Handle errors gracefully
          } finally {
            setIsLoading(false); // Set loading state to false after fetch (optional)
          }
        };
    
        fetchData(); // Call the fetch function on component mount
      }, []); 

     const {userId,name,mobile,email,firstPaymentStatus,secondPaymentStatus,bankDetailsStatus,ref_upiId,ref_node} = useSelector(state => state.register)
    // const{ref_upiId,isMaturedNode,maturedNode,nodeId,ref_node,ref_node_code}=useSelector(state=>state.nodelist)
     //let nodelist=useSelector(state=>state.nodelist);
      // Use ref_node here (e.g., conditional rendering)
        // if (1=1) {
        //     ref_upiId="1";
        // } else {
        //     ref_upiId='3';
        // }

        const onchangeUpi=(e)=>{
            setUpiId(e.target.value)
          }
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Too lale...</div>;
        }
      
        return (
          <div className="timer">
            <div className="value p-4 ">{(remainingTime / 60).toFixed(2)}</div>
          </div>
        );
      };

      if (props.hide) {
        return null; // Hide the Accordion if 'hide' prop is true
    }
    const handlUpload= async (e) => {
        let formData={
            userId:props.userId,
            name:props.name,
            mobile:props.mobile,
            upiId:upiId,
            firstPaymentStatus:firstPaymentStatus,
            cmpUpi:qr,
            payment_details:{
                payment_type:"first",
                payment_status:"requsted",
                // payment_try:1,
                payment_amount:500,
                payment_date: new Date(),
                cmp_upi:qr
                }

        }
        console.log("hann",e,"jjjdata",formData)
           e.preventDefault();
            try {
                if(upiId=='' || formData.userId ==''){
                    setError("session expired !!! pls try logout and relogin!!!");
                    return  
                }else{
                   
                    try {
                        setIsLoading(true);
                        setCansubmit1(true)
                        await dispatch(addNode(formData)).unwrap()
                        await dispatch(getUser(formData.userId))
                      } catch (err) {
                        console.error('Unable to create post:', err);
                      } finally {
                        setIsLoading(false); // Reset loading state
                      }
                   
                }
             
            //   navigate('/udashboard')
            } catch (err) {
              //setSigninRequestStatus('idle')
              console.error(err)
            } 
          // Handle form submission
        // console.log(formData);
        };

       
    return ( 
        <>
        {!firstPaymentStatus?(
        <div className="border rounded-md mb-1"> 
            <button 
                className={`w-full p-4 text-left bg-gray-200  
                hover:bg-gray-300 transition duration-300 
                ${props.disabled ? 'text-gray-500' : ''}`}
                onClick={props.toggleAccordion} 
                disabled={props.disabled}
            > 
               <h2 className={`text-2xl mb-2 mx-auto  ${props.disabled ? 'text-gray-500' : 'text-green-800 '}`}>{props.title} </h2>  
                <span className={`float-right transform ${props.isOpen ?  
                                 'rotate-180' : 'rotate-0'}  
                                 transition-transform duration-300`}> 
                    &#9660; 
                </span> 
            </button> 
            {props.isOpen && ( 
                <div className="p-4 bg-white"> 
                    {props.data} 
                    <QRCode
                    className="mr-2 p-2 border-2 border-red-500"
                    size={256}
                    style={{ height: "155", maxWidth: "200", width: "155" }}
                    value={`upi://pay?pa=${qr}`}
                    viewBox={`0 0 256 256`}
                    />
                    
                    <p>user name:{props.name} </p>

                    <form onSubmit={handlUpload}>
                       
                        {props.isIfsc? 
                        <div>
                            <div style={{display:"flex"}}>
                                <label>IFSC Number :</label>
                                <input
                                type="text" 
                                value={props.ifsc}
                                className="mx-2" />
                            </div>
                            <div style={{display:"flex"}}>
                                <label>Account Number :</label>
                                <input
                                type="text" 
                                value={props.acNo}
                                className="mx-2" />
                            </div>
                            {error && (<div style={{display:"flex"}}>
                            <p className="error"><strong>{error}</strong></p> </div>)}
                            <div style={{display:"flex"}}>
                                <label>Enter your UpiId :</label>
                                <input
                                type="text" 
                                value={upiId}
                                onChange={onchangeUpi}
                                placeholder="Enter your UpiId eg:a@okaxix"
                                className="mx-2"
                                required />
                            </div>


                        
                        </div>
                        : ''}
                        <div className="float-right">
                        {props.isCount?
                         <CountdownCircleTimer
                         isPlaying
                         duration={6000}
                         size={75}
                         colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                         colorsTime={[100, 60, 30, 0]}
                         onComplete={() => ({ shouldRepeat: false, delay: 60 })}
                         >
                     {renderTime}
                     </CountdownCircleTimer> : ''}
                       

                        </div>

                        <label
                        for="form"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
                        Upload the screenshot</label> 
                       
                        <div style={{display:"flex"}}>
                 
                        <input
                         type="file" 
                         accept="image/*"
                         className="relative m-0 block min-w-200  rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" />
                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          type="submit" disabled={canSubmit1} >
                            {isLoading ? 'Processing...' : 'Upload'}
                        </button>
                        </div>
                        
                    </form>
                    
                </div> 
            )} 

            <button  title="Contact Sale"
                className="fixed z-90 bottom-10 right-8 bg-green-500 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                    <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fill-rule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            
        </div> 
        ) :(
        <div className="border rounded-md mb-1 mt-10">
                <button 
                className={`w-full p-4 text-left bg-gray-200  
                hover:bg-gray-300 transition duration-300 text-gray-500`}
                onClick={props.toggleAccordion} 
                disabled={true}
            > 
               <h2 className={`text-2xl mb-2 mx-auto text-gray-500`}>Step 1 </h2>  
                <span className={`float-right transform  rotate-0
                                 transition-transform duration-300`}> 
                    &#9660; 
                </span> 
            </button> 

            <button 
                className={`w-full p-4 text-left bg-gray-200  
                hover:bg-gray-300 transition duration-300 
                ${secondPaymentStatus ? 'text-gray-500' : ''}`}
                onClick={props.toggleAccordion} 
                //disabled={secondPaymentStatus}
            > 
               <h2 className={`text-2xl mb-2 mx-auto  ${secondPaymentStatus ? 'text-gray-500' : 'text-green-800 '}`}>Step 2</h2>  
                <span className={`float-right transform ${firstPaymentStatus ?  
                                 'rotate-180' : 'rotate-0'}  
                                 transition-transform duration-300`}> 
                    &#9660; 
                </span> 
            </button> 
            {props.isOpen && ( 
                <div className="p-4 bg-white"> 
                    {props.data} 
                    <QRCode
                    className="mr-2 p-2 border-2 border-red-500"
                    size={256}
                    style={{ height: "155", maxWidth: "200", width: "155" }}
                    value={ ref_upiId}
                    viewBox={`0 0 256 256`}
                    />
                    
                    <p>user name:{props.name} </p>
                    <p><span style={{color:"green"}}>{ref_node} </span>'s UPI Id (refferal):-  <span style={{color:"red"}}>{ref_upiId}</span></p>

                    <form onSubmit={handlUpload}>
                       
                        {props.isIfsc? 
                        <div>
                            <div style={{display:"flex"}}>
                                <label>IFSC Number :</label>
                                <input
                                type="text" 
                                value={props.ifsc}
                                className="mx-2" />
                            </div>
                            <div style={{display:"flex"}}>
                                <label>Account Number :</label>
                                <input
                                type="text" 
                                value={props.acNo}
                                className="mx-2" 
                                required/>
                            </div>
                        
                        </div>
                        : ''}
                        <div className="float-right">
                        {props.isCount?
                         <CountdownCircleTimer
                         isPlaying
                         duration={6000}
                         size={75}
                         colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                         colorsTime={[100, 60, 30, 0]}
                         onComplete={() => ({ shouldRepeat: false, delay: 60 })}
                         >
                     {renderTime}
                     </CountdownCircleTimer> : ''}
                       

                        </div>
                        <label
                        for="form"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
                        Upload the screenshot</label> 
                       
                        <div style={{display:"flex"}}>
                        <input
                         type="file" 
                         accept="image/*"
                         className="relative m-0 block min-w-200  rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" />
                         <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                            upload
                        </span> 
                        </div>
                        
                    </form>
                    
                </div> 
            )} 

            <button  title="Contact Sale"
                className="fixed z-90 bottom-10 right-8 bg-green-500 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
                    <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fill-rule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            
        </div> 

      
        ) }
        </>
    ); 
}; 