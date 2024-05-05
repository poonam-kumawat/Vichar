export const CreateSuccess=(status:any,message:any,data?:any)=>{
    const successObj
={
    status:status,
    message:message,
    data:data,
}
return successObj;
}