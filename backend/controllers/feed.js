import FeedService from '../models/fieldDb'


const getFeed = async (req,res)=>{
    const result = await FeedService.getFeed()
    res.status(200).json({
        status: "success",
        data: result
    })
}

export default getFeed