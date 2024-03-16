import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginCheck } from "./redux/slices/LoginSlice";
import { adminStatus } from "./redux/slices/AdminSlice";


const LocalStorageLogin = () => {

    const dispatch = useDispatch();

    const localLoginDetails = JSON.parse(localStorage.getItem('e-learn'));

    useEffect(() => {
        if (localLoginDetails != null) {
            if (localLoginDetails.email) {
                dispatch(loginCheck(true));
            }
            
            if (localLoginDetails.role === 'admin') {
                dispatch(adminStatus(true));
            }
           
        }

    }, [dispatch, localLoginDetails]);

};

export default LocalStorageLogin;
