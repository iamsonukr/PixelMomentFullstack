import { createContext } from "react";
import { useState,useEffect } from "react";


export const CentralGovContext=createContext(null)


const CentralGovProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState('');

    // const url=`http://localhost:5009`
    const url=`https://pixelmomentfullstack.onrender.com`



    const govValues={
        url,
        adminToken,
        setAdminToken
 
    }

    return(
        <>
        <CentralGovContext.Provider value={govValues}>
            {children}
        </CentralGovContext.Provider>
        </>
    )
}


export default CentralGovProvider;
