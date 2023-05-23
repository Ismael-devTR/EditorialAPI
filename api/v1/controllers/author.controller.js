const {Author} = require("../models");
const logger = require("../utils/logger");

// ACTIONS CONTROLLER USER 

    // /authors
    async function GET_ALL_USERS(req, res){
        try{
            return Author.findAll({}).
                then(author => res.status(200).json(author)).
                catch(error => res.status(400).json({error: "something went wrong"}))
        }catch(error){
            res.status(500).json({error: "Error server failed"})
        }
    }

    //  /authors/:id
    async function GET_USER_BY_ID(req, res){
        try{
            const {id}  = req.params
            const author = await Author.findByPk(id)
            if(author){
                res.json(author)
            }else{
                res.status(404).json({error: "Author not found"})
            }
        }catch(error){
            res.status(500).json({error: error.toString()})
        }
    }

    // /authors 
    async function CREATE_USER(req, res){
        try{
            const {name, lastname, second_lastname, birthdate} = req.body;
            logger.info(req.body)
            const author = await Author.create({name, lastname, second_lastname, birthdate})
            res.json(author)
        }catch(error){
            res.status(500).json({error: error.toString()})
        }
    }

    // /authors/:id
    async function DELETE_USER(req, res){
        try{
            const {id} = req.params
            const author = await Author.findByPk(id)
            if(author){
                await author.destroy()
                res.json({message: "Author deleted success"})
            }else{

            }
        }catch(error){
            res.status(500).json({error: "Server error 500"})
        }

    }

    module.exports = {
        GET_ALL_USERS,
        GET_USER_BY_ID,
        CREATE_USER,
        DELETE_USER
    }