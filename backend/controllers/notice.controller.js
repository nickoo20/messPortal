import Notice from '../models/notice.model.js'
export const createNotice=async(req,res)=>{
    try{
      const {Title,Description}=req.body;
      const {HostelName}=req.user;
      if(!HostelName)
      return res.status(400).json({message:"All fields are required"});
      if(!Title)
      return res.status(400).json({message:"All fields are required"});
      if(!Description)
      return res.status(400).json({message:"All fields are required"});
      const newNotice=new Notice({HostelName,Title,Description});
      newNotice.save();
      res.status(200).json({success: true,
        message: "Notice Created Successfully!",
        newNotice,});
      }catch(err){
        res.status(500).json({err:err.message});
      }

};
export const getAllNotice=async(req,res)=>{
    try{
    const {HostelName}=req.user;
    console.log(req.user.HostelName);
    const notices=await Notice.find({HostelName}).sort({ date: -1 , _id: -1 }).limit(10);
    res.status(200).json({success: true,
        message: "Notice Fetched Successfully!",
        notices});
    
    }catch(err){
        res.status(500).json({err:err.message});
    }
}
export const deleteNotice=async(req,res)=>{
  try {
    const {id}=req.params;
    console.log(id);
    const item= await Notice.findByIdAndDelete(id);
    if (!item) {
      return next(new Errorhandler("Notice not found", 404));
    }
  
    res.status(200).json({
      success: true,
      message: "Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({error:error.message});

  }
}