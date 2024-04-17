import { useState, useEffect,useMemo } from 'react';
import DataTable from 'react-data-table-component'; 
import { BASE_URI} from '../../../../config/keys-dev';
import FilterComponent from './FilterComponent';
import sideBar from './sideBar';



export default function Pend2Rep() {
    const [apidata, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
// const expandableRows= true;
// const	expandOnRowClicked=false;
// const	expandOnRowDoubleClicked=false;
// const	expandableRowsHideExpander= false;

useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const response = await fetch(`${BASE_URI}api/admin/pend2pay`,{method: 'post'});
        const fetchedData = await response.json();
        console.log("333fetchedData3333##",fetchedData.data);
        setData(fetchedData.data.Users);
      } catch (error) {
        console.error('Error fetching data:', error); // Handle errors gracefully
      } finally {
        setIsLoading(false); // Set loading state to false after fetch (optional)
      }
    };

    fetchData(); // Call the fetch function on component mount
  }, []); 
    
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
    const filteredItems = Array.isArray(apidata) ? apidata.filter(
      item =>
        JSON.stringify(item)
          .toLowerCase()
          .indexOf(filterText.toLowerCase()) !== -1
    ) : [];
      const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }
        };
    
        return (
          <FilterComponent
            onFilter={e => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        );
      }, [filterText, resetPaginationToggle]);

     async  function convertArrayOfObjectsToCSV(array) {
        const response = await fetch(`${BASE_URI}api/admin/pend2pay`,{method: 'post'});
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
        
            if(data.length>0){
                for (let i = 0; i <data.length; i++) {
                    let object = data[i];
                    let n =object.name +columnDelimiter;
                    let e =object.email +columnDelimiter;
                    let m= object.mobile +columnDelimiter;
                    // Append the row to the result string and add line delimiter
                    result += n+e+m + lineDelimiter;
                }
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
        <div className="flex flex-col h-screen p-3 bg-gray-800 shadow w-60">
            <div className="space-y-3">
            <sideBar></sideBar>
            </div>
        </div>
        <div className="container mx-auto mt-12">
            <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-1">
                
            {isLoading && <p>Loading data...</p>}
                {apidata && (
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
                )}
                {!isLoading && !apidata && <p>No data available yet.</p>}
            </div>
        </div>
    </div>
    
    )
    }