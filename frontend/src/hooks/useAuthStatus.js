import {useState , useEffect} from 'react'
//take the state check user login or not .
import {useSelector} from 'react-redux'
import { useFetcher } from 'react-router-dom'

export const useAuthStatus = () => {
    const [loggedIn , setLoggedIn] = useState(false)
    const [checkingStatus,setCheckingStatus] = useState(true)

    //getting the user from Redux ( also we can say that backend).
    const {user} = useSelector((state) => state.auth )

    useEffect( () => {
        if(user) {
            setLoggedIn(true)
        }else {
            setLoggedIn(false)
        }
        setCheckingStatus(false);
    },[user])

    return {loggedIn , checkingStatus}
}

