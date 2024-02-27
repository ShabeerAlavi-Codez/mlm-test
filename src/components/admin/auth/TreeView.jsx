import DataTable from 'react-data-table-component'; 



export default function TreeView() {
// const expandableRows= true;
// const	expandOnRowClicked=false;
// const	expandOnRowDoubleClicked=false;
// const	expandableRowsHideExpander= false;
    
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
    const data=[
        {
            nodeId:1005,
            name:"A",
            mobile:"7994465721",
            ref_node:"A",
            ref_node_code:1005

        },
        {
            nodeId:1006,
            name:"B",
            mobile:"7994465721",
            ref_node:"A",
            ref_node_code:1005

        },
        {
            nodeId:1007,
            name:"C",
            mobile:"7994465721",
            ref_node:"A",
            ref_node_code:1005
        },
        {
            nodeId:1008,
            name:"D",
            mobile:"7994465721",
            ref_node:"B",
            ref_node_code:1006

        },

    ]
    const ExpandedComponent = ( {data} ) => <pre>{JSON.stringify(data, null, 2)}</pre>;
 


    return (
        <div>
         <DataTable
		// title="Node List"
		columns={columns}
		data={data}
		expandableRows={true}
		expandableRowsComponent={ExpandedComponent}
		expandOnRowClicked={true}
		// expandOnRowDoubleClicked={expandOnRowDoubleClicked}
		// expandableRowsHideExpander={expandableRowsHideExpander}
		pagination
	/>

        </div>
    )
    }