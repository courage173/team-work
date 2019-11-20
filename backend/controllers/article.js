import Model from '../models/db'
import generateId from '../middlewares/identity'



const today = new Date();
const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${+today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;


class Articles {
    static model() {
      return new Model('articles');
    }
    static Cat() {
        return new Model('categories');
      }

    static async uploadArticle(req,res){
        try{
            const createdBy = req.user.email;
            const userId = req.user.userId
            console.log(userId)
            const {title,article, categoryId} = req.body
            let {flagged} = req.body
            const articleId = generateId(938327364)
            const createdOn = dateTime

            if(!title){
                return res.status(401).json({
                    error: "error",
                    data: {
                        message: "no article title provided"
                    }
                })
            }
            if(!flagged){
                flagged = false
            }

            if(!article){
                return res.status(401).json({
                    error: "error",
                    data: {
                        message: "no article body provided"
                    }
                })
            }

            const category = await Articles.Cat().select('*','category_id=$1', [categoryId])

            if(!category[0]){
                return res.status(404).json({
                    error: "error",
                    message: "Specified Category not found"

                })
            }

            const rows = await Articles.model().insert(
                'article_id,title,flagged, category_id,article,created_by,created_on,user_id',
                `'${articleId}', '${title}', '${flagged}', '${categoryId}','${article}','${createdBy}', '${createdOn}', '${userId}'`
          );

          return res.status(201).json({
              status: "success",
              data: {
                  message: "Article successfully posted",
                  articleId: rows[0].article_id,
                  createdOn: rows[0].created_on,
                  title: rows[0].article
              }
          })

        }catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          })
        };
    }

    static async updateArticle(req,res){
        try{
            const { articleId } = req.params;
            const row = await Articles.model().select('*','article_id=$1', [articleId])
            if(!row){
                return res.status(404).json({
                    error: "error",
                    message: "article with specified Id not found"
                })
            }
            const createdBy = req.user.email;
            const userId = req.user.userId
            const {title,article} = req.body 
            const createdOn = dateTime
            console.log(row[0].user_id)
            console.log(userId)
            if(row[0].user_id != userId){
                return res.status(401).json({
                    status: "error",
                    message: "You cannot edit this article"
                })
            }
            const rows = await Articles.model().update('title=$1,article=$2','article_id=$3', [`${title}`,`${article}`, `${articleId}`])
            return res.status(201).json({
                status: "success",
                data: {
                    message:"Article successfully updated",
                    title,
                    article,
                    articleId
                }
            })



        }catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          })
        };
    }

    static async getSingleArticle(req,res){
        try{
            const {articleId} = req.params
            const rows = await Articles.model().select('*','article_id=$1', [articleId])
            if(!rows[0]){
                return res.status(404).json({
                    status: 'error',
                    message: 'Article with the specified articleId NOT found'
                })
            }
            return res.status(201).json({
                status: "success",
                data: {
                    id: rows[0].article_id,
                    createdOn: rows[0].created_on,
                    title: rows[0].title,
                    article: rows[0].article
                }
            })
        }catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          })
        };
    }
    static async getAllArticles(req,res){
        try{
            
            const rows = await Articles.model().select('*')
            if(!rows){
                return res.status(404).json({
                    status: 'error',
                    message: 'Articles not found'
                })
            }
            return res.status(201).json({
                status: "success",
                data: rows
            })
        }catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          })
        };
    }
    static async deleteArticle(req,res){
        try{
          const {articleId} = req.params;
          console.log(articleId)
          
        const row = await Articles.model().select('*', 'article_id=$1', [articleId]);
        
  
        if(!row[0]){
          return res.status(404).json({
            status: "error",
            data: {
              message: "article with required Id not found"
            }
          })
        }
  
        const email = req.user.email
        const user_email = row[0].created_by
  
        if(user_email !== email){
          return res.status(401).json({
            status: "error",
            data: {
              message: "you dont have permission to delete required specified article"
            }
          })
        }
  
  
         await Articles.model().delete('article_id=$1', [articleId]);
        return res.status(200).json({
          status: "success",
          data: {
            message: "article deleted successfully deleted"
          }
        })
  
        
      } catch (e) {
        return res.status(500).json({
          error: e.message,
          e
        })
      };
  }
    static async getArticlesInCategory(req, res) {
        try{
            const { categoryId } = req.params;
        const article = await Articles.model().select('*','category_id=$1', [categoryId]);
        if (!article) {
          return res.status(404).json({
            status: 'error',
            message: 'No articles in the specified Category',
          });
        }
        return res.status(200).json({
          status: 'success',
          data: article
        });}catch (e) {
            return res.status(500).json({
              error: e.message,
              e
            })
          };
      }

      static async getFeed(req, res) {
        try{
            const feed = Model.getFeed()
            console.log(feed)
        }catch (e) {
            return res.status(500).json({
              error: e.message,
              e
            })
          };
      }


   

}  


export default Articles