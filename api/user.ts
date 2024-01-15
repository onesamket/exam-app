import apiClient from "./end-point"

export const login=async(uid:number,name:string)=>{
const response=apiClient.post("/user/login",{uid,name});
return (await response).data;
}