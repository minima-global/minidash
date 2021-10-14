import { useRef, useEffect } from 'react'
import {theme, themeStyles} from '../../styles';

import * as networkDetails from './network_details.json'
import * as miserables from './miserables.json'

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';




const NetworkDataGrid = () => {
    const classes = themeStyles();

    const networkRows: GridRowsProp = networkDetails.response.nodes.map((node,i) => {
        return {
            id: i + 1,
            ...node,
            outLinkCount: node.out_links.length,
            inLinkCount: node.in_links.length,
            clientLinkCount: node.client_links.length,
        }
    })

    const networkColumns: GridColDef[] = [
        { field: 'address', headerName: 'Address', width: 150 },
        { field: 'outLinkCount', headerName: 'Out Links', width: 150 },
        { field: 'inLinkCount', headerName: 'In Links', width: 150 },
        { field: 'clientLinkCount', headerName: 'Client Links', width: 200 },
    ];

    return (
        <>
            <div className={classes.dashboardComponentContainer}>
                <div>
                    <h2>Node Link Counts</h2>
                </div>
                <div style={{ height: '70vh', width: "100%" }}>
                    <DataGrid rows={networkRows} columns={networkColumns} />
                </div>
            </div>
        </>
    );
}

export default NetworkDataGrid