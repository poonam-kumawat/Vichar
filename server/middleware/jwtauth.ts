import * as jwt from "jsonwebtoken";

export function authorize(req: any, res: any, next: any) {
  try {
    // let token = req.get("authorization");
    const token=req.cookies.access_token;
    
    if (!token) {
      return res.status(404).json({
        success: false,
        msg: "Token not Found",
      });
    }
    //   token = token.split(" ")[1];
    //   const decoded: any = jwt.verify(
    //     token,
    //     process.env.ACCESS_SECRET as string
    //   );
    //   if (req.body.email) {
    //     if (req.body.email !== decoded.email) {
    //       return res.status(403).json({
    //         success: false,
    //         msg: "Unauthorized",
    //       });
    //     }
    //   }
    //   req.email = decoded.email;
    jwt.verify(token, process.env.ACCESS_SECRET as string,(err:any,user:any)=>{
        if(err) return res.status(403,"Token not found")
        else req.user=user;
    next();
    });
    //   next();
    
  } catch (error: any) {
    return res.status(401).json({ success: false, msg: error.message });
  }
}



// export function verifyRefresh(email: any, token: any) {
// //   try {
// //     const decoded: any = jwt.verify(
// //       token,
// //       process.env.REFRESH_SECRET as string
// //     );
// //     return decoded.email === email;
// //   } catch (error) {
// //     return false;
// //   }


// }

export const verifyUser=(req:any,res:any,next:any)=>{
    authorize(req,res, ()=>{
        if(req.user.id===req.params.id){
            next();
        }else{
    return res.status(403).json({ success: false, msg:"not authorized" });
        }

    })

}
