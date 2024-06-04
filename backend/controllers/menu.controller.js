import Menu from "../models/menu.model.js" ;

export const getMenu = async(req, res)=>{
    try{
        const menu = await Menu.find() ;
        return res.status(200).json(menu) ;
    }catch(err){
        console.log('Error getting mess menu', err.message) ; 
        return res.status(500).json(err.message) ;
    }
}