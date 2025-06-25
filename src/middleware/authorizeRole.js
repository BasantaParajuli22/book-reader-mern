//@ts-check


//middleware to check if user has authorized roles 
export default function authorizeRole(...allowedRoles){
    return(req, res, next)=>{
        if(!req.user){
            return res.status(401).json({ message: "Not authenticated" });
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({ message: "You do not have permission" });
        }
        next();
    }
}