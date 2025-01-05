import { createContext } from "react";
import { useState,useEffect } from "react";


export const CentralGovContext=createContext(null)


const CentralGovProvider = ({ children }) => {
    const [token, setToken] = useState('');

    const url=`http://localhost:5002`
    // const url=`https://pixelmomentfullstack.onrender.com/`



    const govValues={
        url,
 
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
