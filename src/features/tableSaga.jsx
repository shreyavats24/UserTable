import {delay,takeLatest} from "redux-saga";
import axios from "axios";
function* getTotalUsers(){
    yield delay(200); //200ms waiting before getting total user 
    const usersData =yield axios.get("https://jsonplaceholder.typicode.com/users");
    return usersData.length;
}
export function* NumberOfUser(){
    yield takeLatest("/fetchUserData",getTotalUsers)
}