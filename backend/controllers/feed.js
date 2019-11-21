import FeedService from '../models/fieldDb'


const getFeed = async (req,res)=>{
    const result = await FeedService.getFeed()
    if(!result){
        res.status(200).json({
            error: "error",
            message: "No Aricles or gifs Post found"
        })
    }
    res.status(200).json({
        status: "success",
        data: result
    })
}

export default getFeed