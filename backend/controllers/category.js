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
                    categoryId: categoryId,
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

    static async updateCat(req,res){
        try{
            const {categoryId} = req.params;
            console.log(categoryId)
            const {categoryName} = req.body;
            console.log(categoryName)
            //async update(columns, clause, values)

            const update = await Category.model().update('category_name=$1','category_id=$2', [`${categoryName}`, `${categoryId}`])
            console.log(update)
            return res.status(201).json({
                status: 'success',
                data: {
                    message: "Category updated successfully",
                    categoryName: update.category_name
                }                
            })

        }catch (e) {
          return res.status(500).json({
            error: e.message,
            e
          })
        };
    }


    static async getAllCat(req,res){
        try{
            
            const rows = await  Category.model().select("*")
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
    static async getSingleCat(req,res){
        try{
            const {categoryId} = req.params
            const rows = await Category.model().select('*','category_id=$1',[categoryId])
            if(!rows[0]){
                return res.status(404).json({
                    error: 'error',
                    message: 'category with specified id not found'
                })
            }
            return res.status(200).json({
                status: "success",
                data: {
                    categoryId: rows[0].category_id,
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

    static async deleteCat(req,res){
        try{
            const {categoryId} = req.params
            const rows = await Category.model().select('*','category_id=$1',[categoryId])
            if(!rows[0]){
                return res.status(404).json({
                    error: 'error',
                    message: 'category with specified id not found'
                })
            }
            console.log(categoryId)
            const row = await Category.model().delete('category_id=$1',[categoryId])
            return res.status(200).json({
                status: "success",
                message: 'category successfully deleted'
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