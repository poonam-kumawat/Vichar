import * as jwt from "jsonwebtoken";

export function authorize(req: any, res: any, next: any) {
  try {
    const token=req.cookies.access_token;
    
    if (!token) {
      return res.status(404).json({
        success: false,
        msg: "Token not Found",
      });
    }
    jwt.verify(token, process.env.ACCESS_SECRET as string,(err:any,user:any)=>{
        if(err) return res.status(403,"Token not found")
        else req.user=user;
    next();
    });
   
  } catch (error: any) {
    return res.status(401).json({ success: false, msg: error.message });
  }
}


export const verifyUser=(req:any,res:any,next:any)=>{
    authorize(req,res, ()=>{
        if(req.user.id===req.params.id){
            next();
        }else{
    return res.status(403).json({ success: false, msg:"not authorized" });
        }

    })

}
