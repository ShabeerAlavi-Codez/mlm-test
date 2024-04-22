import { useState, useEffect,useMemo } from 'react';
import DataTable from 'react-data-table-component'; 
import { BASE_URI} from '../../../../config/keys-dev';
import FilterComponent from './FilterComponent';
import SideBar from './SideBar';



export default function TreeView() {
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
        const response = await fetch(`${BASE_URI}api/admin/nl`);
        const fetchedData = await response.json();
       // console.log("333fetchedData3333##",fetchedData.data);
        setData(fetchedData.data);
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
            name: 'nodeId',
            selector: row => row.nodeId,
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
            name: 'ref_node',
            selector: row => row.ref_node,
            sortable: true,
        },
    ];
    
    const ExpandedComponent = ( apidata ) => <pre>{JSON.stringify(apidata.data, null, 2)}</pre>;
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
          <FilterComponent
            onFilter={e => setFilterText(e.target.value)}
            onClear={handleClear}
            filterText={filterText}
          />
        );
      }, [filterText, resetPaginationToggle]);


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
                    <DataTable
                    // title="Node List"
                    columns={columns}
                    data={ filteredItems}
                    expandableRows={true}
                    expandableRowsComponent={ExpandedComponent}
                    expandOnRowClicked={true}
                    subHeader
                    subHeaderComponent={subHeaderComponent}
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