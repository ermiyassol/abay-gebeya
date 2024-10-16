export default function handler(req:any, res:any) { 
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
 
    res.status(200).json({ message: "Authorized access" });
  }
  
  function isAuthorized(req:any) { 
    const authToken = req.headers.authorization; 
    if (!authToken || authToken !== "valid_token") {
      return false;
    }
    return true;
  }