
import Accordion from './Accordion'; 
import { useState } from 'react'; 
import Navbar from './Navbar'; 
import cmpqr from '../../assets/cmpqr.png';
export default function Dashboard() {
    const [qr, setQr]=useState([cmpqr,cmpqr])
    const [accordions, setAccordion] = useState([ 
        { 
            key: 1, 
            title: 'Step 1', 
            data: `Please scan the QR and done your first payment and upload the screenshot`, 
            qr:qr[0],
            isOpen: false
        }, 
        { 
            key: 2, 
            title: 'Step 2', 
            data: `Please scan the QR and done your second payment and upload the screenshot`, 
            qr:qr[1],
            isOpen: false
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
                {accordions.map((accordion) => ( 
                    <Accordion 
                        key={accordion.key} 
                        title={accordion.title} 
                        data={accordion.data} 
                        isOpen={accordion.isOpen} 
                        qr={accordion.qr}
                        toggleAccordion={() => toggleAccordion(accordion.key)} 
                    /> 
                ))} 
            </div> 
        
        <p className="text-center text-gray-600 textbase mt-9">
            Still have questions?
           <a href='/adashboard' ><span className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover-underline">Contact
                our support
            </span> </a>
        </p>
    </div>

    );
  }
  