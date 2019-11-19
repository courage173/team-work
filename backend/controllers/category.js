import Model from '../models/db'
import generateId from '../middlewares/identity'



const today = new Date();
const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${+today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;


class Category {
    static model() {
      return new Model('categories');
    }
    static async createCat(req,res){
        try{

            const {categoryName} = req.body;
            const categoryId = generateId(75673647)
            if(!categoryName){
                return res.status(404).json({
                    error: "error",
                    message: "cannot post empty Category Name"
                })
            }

            const row = await Category.model().select('*','category_name=$1', [categoryName])

            if(row[0]){
                return res.status(400).json({
                    error: "error",
                    message: " category already exist"
                })
            }

            const rows = await Category.model().insert('category_id, category_name', `'${categoryId}', '${categoryName}'`)
            return res.status(201).json({
                status: "success",
                data: {
                    message: "Category created successfully",
                    categoryName: rows[0].category_name
                }
            })

            

        }catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          })
        };
    }

  
   

}  


export default Category