export default function Accordion(props) { 
    return ( 
        <div className="border rounded-md mb-1"> 
            <button 
                className="w-full p-4 text-left bg-gray-200  
                           hover:bg-gray-300 transition duration-300"
                onClick={props.toggleAccordion} 
            > 
               <h2 className='text-2xl mb-2 mx-auto text-green-800'>{props.title} </h2>  
                <span className={`float-right transform ${props.isOpen ?  
                                 'rotate-180' : 'rotate-0'}  
                                 transition-transform duration-300`}> 
                    &#9660; 
                </span> 
            </button> 
            {props.isOpen && ( 
                <div className="p-4 bg-white"> 
                    {props.data} 
                    <img src={props.qr}
							className="mr-2 p-2 border-2 border-red-500"
                            width={200}
                            height={200}
							alt="Logo here" /> 

                    <form>
                    <label
                    for="formFileMultiple"
                    class="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
                        Upload the screenshot</label>
                        <input
                         type="file" 
                         className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary" />
                    </form>
                </div> 
            )} 
        </div> 
    ); 
}; 