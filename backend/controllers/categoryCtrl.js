const asyncHandler = require('express-async-handler');
const Category = require('../model/Category');

const categoryController = {
    //! add
    create:  asyncHandler(async(req, res)=>{
        const { name, type } = req.body;
        if(!name || !type){
            throw new Error('Name and type required to create category');
        }

        // convert the name to lowercase
        const normalizedName = name.toLowerCase();

        //! check if the type is valid
        const validType =  [ 'income', 'expense'];
        if(! validType.includes(type.toLowerCase())){
            throw new Error("Invalid category type" + type);
        }

        //! check if category already exists on the user
        const categoryExists = await Category.findOne({
            name: normalizedName,
            user: req.user,
        });
        if(categoryExists){
            throw new Error(
                'Category ${categoryExists.name} already exists in the database'
            );
        }
        
        //! Create the category
        const category = await Category.create({
            name: normalizedName,
            user: req.user,
            type,
        });

        res.status(201).json(category);

    }), 


    //!lists
    lists: asyncHandler(async(req, res) => {

        const categories = await Category.find({
            user: req.user
        });

        res.status(200).json(categories);

          }),

    //!update
    update: asyncHandler(async (req,res)=> {
       
    }),

    //! delete
    delete: asyncHandler(async (req,res)=> {})
};

module.exports = categoryController;