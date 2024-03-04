
import Accordion from './Accordion'; 
import { useState,useEffect } from 'react'; 
import Navbar from './Navbar'; 
import { useDispatch,useSelector } from 'react-redux';
import { BASE_URI} from '../../../config/keys-dev';

export default function Dashboard() {
    const {userId,name,mobile,email,firstPaymentStatus,secondPaymentStatus,bankDetailsStatus} = useSelector(state => state.register)
    const [cmpQr, setCmpQr]=useState('')
    
    // const {name,email,mobile,firstPaymentStatus,secondPaymentStatus,bankDetailsStatus} = useSelector(state => state.register)
    // const dispatch= useDispatch();
 
  

    const [accordions, setAccordion] = useState([ 
        { 
            key: 1, 
            title: 'Step 1', 
            data: `Please scan the QR and done your first payment and upload the screenshot`, 
            qr:cmpQr,
            isOpen: true,
            isCount:true
        }, 
        { 
            key: 2, 
            title: 'Step 2', 
            data: `Please scan the QR and done your second payment and upload the screenshot`, 
            qr:cmpQr,
            isOpen: false,
            isCount:false
        }, ])

        const toggleAccordion = (accordionkey) => { 
            const updatedAccordions = accordions.map((accord) => { 
                if (accord.key === accordionkey) { 
                    return { ...accord, isOpen: !accord.isOpen }; 
                } else { 
                    return { ...accord, isOpen: false }; 
                } 
            }); 
      
            setAccordion(updatedAccordions); 
        }; 
    return (

    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            </h2>
        </div>
        <Navbar/> 
            <div className="p-2 m-8"> 
                
                <Accordion 
                        key={accordions[0].key} 
                        title={accordions[0].title} 
                        data={accordions[0].data} 
                        isOpen={accordions[0].isOpen} 
                        isCount={accordions[0].isCount}
                        isIfsc={true}
                        ifsc={"BNKN 0 XXX XXX"}
                        acNo={"XXXX XXXX XXXX XXXX"}
                        // qr={accordions[0].qr}
                        toggleAccordion={() => toggleAccordion(accordions[0].key)} 
                        name={name}
                       
                       
                    /> 
                {/* <Accordion 
                        key={accordions[1].key} 
                        title={accordions[1].title} 
                        data={accordions[1].data} 
                        isOpen={accordions[1].isOpen} 
                        isCount={accordions[1].isCount}
                        qr={accordions[1].qr}
                        toggleAccordion={() => toggleAccordion(accordions[1].key)} 
                    />  */}
            </div> 
        
        <p className="text-center text-gray-600 textbase mt-9">
            Still have questions? 
           <a href='/adashboard' ><span className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover-underline">Contact
                our support
            </span> </a>
        </p>
        <a href="https://api.whatsapp.com/send?phone=51955081075&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202." class="float" target="_blank">
            <i class="fa fa-whatsapp my-float"></i>
        </a>
    </div>

    );
  }
  