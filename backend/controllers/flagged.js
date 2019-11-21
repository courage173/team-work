import Model from '../models/db'

class Flagged{
    static model() {
        return new Model('articles');
      }
    static articleComment() {
        return new Model('article_comment');
    }
    static gif() {
        return new Model('gif');
    }
    static gifComment() {
        return new Model('gif_comment');
    }

    static async flagArticles(req,res){
        const {articleId} = req.params
        const row = await Flagged.model().select('*','article_id=$1',[articleId])
        console.log(articleId)
        if(!row[0]){
            return res.status(404).json({
                status: 'error',
                message: 'article with specified id not found'
            })
        }
        const {flagged} = req.body
        if(!flagged){
            return res.status(404).json({
                status: 'error',
                message: 'not provided'
            })
        }

        const rows = await Flagged.model().update('flagged=$1','article_id=$2', [`${flagged}`, `${articleId}`])
        return res.status(200).json({
            status: 'success',
            message: 'Article sussfully flagged'
        })
    }
}


export default Flagged