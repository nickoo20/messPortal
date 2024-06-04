import Config from "../models/Config.model.js" ;

export const getCostPerDay = async(req, res) => {
    try{
        const config = await Config.findOne() ;
        return res.status(200).json({ costPerDay: config.costPerDay });
    }catch(err){
        return res.status(500).json({ error: error.message });
    }
}

export const updateCostPerDay = async(req, res) => {
    const {costPerDay} = req.body ;
    if(typeof costPerDay === 'number' && costPerDay > 0){
        try{
            let config = await Config.findOne() ;
            if(!config){
                config=new Config({costPerDay}) ;
            }
            else config.costPerDay=costPerDay ;
            await config.save();
            return res.status(200).json({ message: 'Cost per day updated successfully' });
        }catch(err){
            return res.status(500).json({ error: error.message });
        }
    }
}