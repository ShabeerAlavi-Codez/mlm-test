import { useState, useEffect,useMemo } from 'react';
import DataTable from 'react-data-table-component'; 
import { BASE_URI} from '../../../../config/keys-dev';
import FilterComponent from '../auth/FilterComponent';
import SideBar from '../auth/SideBar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export default function Datenjrep() {
    const [apidata, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [isChange,setChange]=useState(false);
    const [toDate, setToDate] = useState(new Date());

    const handleDateChange = (date) => {
      setFromDate(date);
      setChange(!isChange)
    };

    const fetchData = async () => {
      console.log("btnnnnnnnn")
            setIsLoading(true); // Set loading state to true
            try {
              const formData = new FormData();
              formData.append('from', fromDate);
              formData.append('to', toDate);
              const response = await fetch(`${BASE_URI}api/admin//datenjrep`,{method: 'post', body: formData});
              const fetchedData = await response.json();
              console.log("333fetchedData3333##",fetchedData.data);
              setData(fetchedData.data.Users);
            } catch (error) {
              console.error('Error fetching data:', error); // Handle errors gracefully
            } finally {
              setIsLoading(false); // Set loading state to false after fetch (optional)
            }
          };
// const expandableRows= true;
// const	expandOnRowClicked=false;
// const	expandOnRowDoubleClicked=false;
// const	expandableRowsHideExpander= false;

useEffect(() => {
   // Call the fetch function on component mount
  }, [isChange]); 
    
    const columns = [
        {
            name: 'slNo',
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: 'name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'mobile',
            selector: row => row.mobile,
            sortable: true,
        },
        {
            name: 'firstPaymentStatus',
            selector: row => row.firstPaymentStatus,
            sortable: true,
        },
        {
            name: 'secondPaymentStatus',
            selector: row => row.secondPaymentStatus,
            sortable: true,
        }
     
    ];
    
    const ExpandedComponent = ( apidata ) =>{ 
      return(
          <>
          <tr>
               <th>UpiId</th>
          </tr>
         <tr>
          <td>{apidata.data.UpiId}</td>
         </tr>
         </>
          
      )};
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false );
    const filteredItems = apidata.filter(
        item =>
          JSON.stringify(item)
            .toLowerCase()
            .indexOf(filterText.toLowerCase()) !== -1
      );
      const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }
        };
    
        return (
          <>
          <DatePicker
id="datepicker"
//className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
placeholderText="From Date" 
isClearable
 showIcon
 toggleCalendarOnIconClick
//  locale="en-GB"
 className="red-border"
 selected={fromDate} 
//  dateFormat="yyyy-MM-dd" 
 onChange={ handleDateChange} 
/>
<label htmlFor="datepicker2">To:</label>
<DatePicker
id="datepicker2"
selected={toDate} 
className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" 
 label="To Date"
 onChange={(date )=> { setToDate(date)}} 
 // value={endDate}
 // onChange={(date) => setEndDate(date)}
 // renderInput={(params) => <TextField {...params} 
 // />}
/>
<button onClick={() => fetchData()} className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"' >✅</button>
                    




          </>
        );
      }, [fromDate, resetPaginationToggle]);

     async  function convertArrayOfObjectsToCSV(array) {
        const response = await fetch(`${BASE_URI}api/admin/njus`,{method: 'post'});
        const fetchedData = await response.json();
        const data= fetchedData.data.Users;
        
        let result;
        console.log(fetchedData.data.Users,"kkkkkkkkkkkkkk")
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys =["name","email","mobile"];



         // Constructing the header row
            result = keys.join(columnDelimiter);
            result += lineDelimiter;
        

            for (let i = 0; i <data.length; i++) {
                let object = data[i];
                console.log(`Object ${i + 1}:`);
                console.log("Name:", object.name);
                console.log("Email:", object.email);
                console.log("Mobile:", object.mobile);
                console.log("----------------------");
                let n =object.name +columnDelimiter;
                let e =object.email +columnDelimiter;
                let m= object.mobile +columnDelimiter;
                
                
                // Append the row to the result string and add line delimiter
                result += n+e+m + lineDelimiter;
            }
    
       
        
    
        return result;
    }

    async function  downloadCSV(array) {
       // console.log(apidata,"console.log(array[0]")
        const link = document.createElement('a');
        let csv = await convertArrayOfObjectsToCSV(array);
        if (csv == null) return;
    
        const filename = 'export.csv';
         console.log(csv,"csv")
    
        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }
    
        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }
    
    const Export = ({ onExport }) => <button onClick={e => onExport(e.target.value)}>Export</button>;
    const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(apidata)} />, []);

    return (
        <div className="flex">
        <div className="flex flex-col h-screen sticky top-0 p-3 bg-gray-800 shadow w-60">
            <div className="space-y-3">
            <SideBar></SideBar>
            </div>
        </div>
        <div className="container mx-auto mt-12">
            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-1">
                
            {isLoading && <p>Loading data...</p>}
                {apidata && (
                  <>
  <div>


</div>
                    <DataTable
                    // title="Node List"
                    columns={columns}
                    data={ filteredItems}
                    expandableRows={true}
                    expandableRowsComponent={ExpandedComponent}
                    expandOnRowClicked={true}
                    subHeader
                    subHeaderComponent={subHeaderComponent}
                     actions={actionsMemo}
                    // expandOnRowDoubleClicked={expandOnRowDoubleClicked}
                    // expandableRowsHideExpander={expandableRowsHideExpander}
                    pagination
                />
                </>
                )}
                {!isLoading && !apidata && <p>No data available yet.</p>}
            </div>
        </div>
    </div>
    
    )
    }