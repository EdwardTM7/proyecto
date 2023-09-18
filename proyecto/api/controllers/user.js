// 'use strict'
// var bcrypt = require('bcrypt-nodejs');
// // var mongoosePaginate= require('mongoose-pagination');


// var User = require('../models/user');
// var jwt = require('../services/jwt');

// const util = require ('util');

// //Métodos de prueba
// function home(req, res){
//     res.status(200).send({
//         message: 'Hola mundo desde el servidor de Nodejs'
//     });
// };

// function pruebas(req, res){
//     console.log(req.body);
//     res.status(200).send({
//         message: 'Acción de pruebas en el servidor de Nodejs'
//     });
// }

// //registro
// async function saveUser(req,res){
//     var params = req.body;
//     var user = new User();

//     if(params.name && params.surname && 
//         params.nick && params.email && params.password){

//             user.name = params.name;
//             user.surname = params.surname;
//             user.nick = params.nick;
//             user.email = params.email.toLowerCase();
//             user.role ='ROLE_USER';
//             user.image = null;


//             // Controlar usuarios duplicados
//             const existingUsers = await User.find({
//                 $or: [
//                     {email: user.email},
//                     {nick: user.nick.toLowerCase()}
//                 ]
//             });

//             if (existingUsers.length >= 1){
//                 return res.status(200).send({message: 'El usuario que intenta registrar ya existe'});
//             }else{
//                 try {
//                     const hash = await bcrypt.hashSync(params.password);
//                     user.password = hash;
    
//                     const userStored = await user.save();
    
//                         if(userStored){
//                             res.status(200).send({user: userStored});
//                         }else{
//                             res.status(404).send({message: 'No se ha registrado el usuario'});
//                         }
//                     } catch (err) { res.status(500).send({message: 'Error al guardar el usuario'});
//                  }
//             }  }else{
//                 res.status(200).send({ message: 'Llena todos los campos necesarios'});
//             }
//         }



//        //login

//         const compareAsync = util.promisify (bcrypt.compare);

//         async function loginUser(req, res){
//             try{
//                 const {email, password } = req.body;

//                 const user = await User.findOne ({ email: email });


//                 if (!user) {
//                     return res.status(404).send({message: 'El usuario no se ha podido identificar'});
//                 }

//                 const passwordMatch = await compareAsync (password, user.password );

//                 if (passwordMatch) {
//                     const {gettoken} = req.body;

//                     if(gettoken){
//                         //generar y devolver token
                        
//                             const token = jwt.createToken(user);

//                             return res.status(200).send({ token });
                        
//                     }else{
//                          // Devolver datos de usuario
//                          user.password = undefined;
//                     return res.status(200).send({ user });
//                     }
                    
//                 }else{
//                     return res.status(404).send({message: 'El usuario no se ha podido identificar!!'});
//                 }
//             } catch (error){
//                 console.error(error);
//                 return res.status(500).send({message: 'Error en la petición'});
//             }
//         }


//         // Conseguir datos de un usuario
//         async function getUser(req, res){
//             var userId = req.params.id;

//             try{
//                 const user = await User.findById(userId);

//                 if (!user){
//                     return res.status(404).send({message: 'El usuario no existe'});
//                 }

//                 return res.status(200).send({ user });
//             } catch (error){
//                 console.error(error);
//                 return res.status(500).send({message: 'Error en la petición'});
//             }

//         }


//         //Devolver un listado de usuarios paginados
//         //  function getUsers(req, res){
//         //      var identity_user_id = req.user.sub;

//         //       var page = 1;
//         //      if(req.params-page){
//         //          page = req.params.page;
//         //      }

//         //      var itemsPerPage = 5;

//         //      User.find().sort('_id').paginate(page, itemsPerPage,(err, users, total) => {
//         //          if(err) return res.status(500).send({message:'Error en la petición'});

//         //          if(!users) return res.status(404).send({message: 'No hay usuarios disponibles'});

//         //      return res.status(200).send({
//         //              users,
//         //              total,
//         //              pages: Math.ceil(total/itemsPerPage)
//         //          });
//         //      });

//         //      }

//         // async function getUsers(req, res) {
//         //     var identity_user_id = req.user.sub;
//         //     var page = 1;
        
//         //     if (req.query.page) {
//         //         page = parseInt(req.query.page);
//         //     }
        
//         //     var itemsPerPage = 5;
        
//         //     try {
//         //         const users = await User.find({ _id: identity_user_id })
//         //             .sort('_id')
//         //             .skip((page - 1) * itemsPerPage)
//         //             .limit(itemsPerPage)
//         //             .exec(); // Agrega .exec() al final de tu consulta
        
//         //         const total = await User.countDocuments({ _id: identity_user_id });
        
//         //         if (!users || total === 0) {
//         //             return res.status(404).send({ message: 'No hay usuarios disponibles' });
//         //         }
        
//         //         return res.status(200).send({
//         //             users,
//         //             total,
//         //             pages: Math.ceil(total / itemsPerPage),
//         //         });
//         //     } catch (error) {
//         //         console.error(error);
//         //         return res.status(500).send({ message: 'Error en la petición' });
//         //     }
//         // }
        
        
        
                    
//         module.exports = {
//             home,
//             pruebas,
//             saveUser,
//             loginUser,
//             getUser,
//             getUsers,
//         };





'use strict';
var bcrypt = require('bcrypt-nodejs');
const util = require('util');
var User = require('../models/user');
var jwt = require('../services/jwt');
var mongoosePaginate = require ('mongoose-paginate-v2')
var fs = require('fs');
var path = require ('path');

// Métodos de prueba
function home(req, res) {
    res.status(200).send({
        message: 'Hola mundo desde el servidor de Nodejs'
    });
}

function pruebas(req, res) {
    console.log(req.body);
    res.status(200).send({
        message: 'Acción de pruebas en el servidor de Nodejs'
    });
}

// Registro
async function saveUser(req, res) {
    var params = req.body;
    var user = new User();

    if (params.name && params.surname && params.nick && params.email && params.password) {

        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email.toLowerCase();
        user.role = 'ROLE_USER';
        user.image = null;

        // Controlar usuarios duplicados
        const existingUsers = await User.find({
            $or: [
                { email: user.email },
                { nick: user.nick.toLowerCase() }
            ]
        });

        if (existingUsers.length >= 1) {
            return res.status(200).send({ message: 'El usuario que intenta registrar ya existe' });
        } else {
            try {
                const hash = await bcrypt.hashSync(params.password);
                user.password = hash;

                const userStored = await user.save();

                if (userStored) {
                    res.status(200).send({ user: userStored });
                } else {
                    res.status(404).send({ message: 'No se ha registrado el usuario' });
                }
            } catch (err) {
                res.status(500).send({ message: 'Error al guardar el usuario' });
            }
        }
    } else {
        res.status(200).send({ message: 'Llena todos los campos necesarios' });
    }
}

// Login
const compareAsync = util.promisify(bcrypt.compare);

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
        }

        const passwordMatch = await compareAsync(password, user.password);

        if (passwordMatch) {
            const { gettoken } = req.body;

            if (gettoken) {
                // Generar y devolver token
                const token = jwt.createToken(user);
                return res.status(200).send({ token });
            } else {
                // Devolver datos de usuario
                user.password = undefined;
                return res.status(200).send({ user });
            }
        } else {
            return res.status(404).send({ message: 'El usuario no se ha podido identificar!!' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error en la petición' });
    }
}

// Conseguir datos de un usuario
async function getUser(req, res) {
    var userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'El usuario no existe' });
        }

        return res.status(200).send({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error en la petición' });
    }
}

// Devolver un listado de usuarios paginados
async function getUsers(req, res) {
    var identity_user_id = req.user.sub;
    var page = 1;
    var itemsPerPage = 5;
    

    if (req.query.page) {
        page = parseInt(req.query.page);
        
    }

    
    try {
        const result = await User.paginate({},
            {
                page: page,
                limit: itemsPerPage,
                sort: '_id'
            });

        if (result.docs.length === 0) {
            return res.status(404).send({ message: 'No hay usuarios disponibles' });
        }

        return res.status(200).send({
            users: result.docs,
            total: result.totalDocs,
            pages: result.totalPages,
            currentPage:page
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error en la petición' });
    }
}

//Edición de datos de usuario
async function updateUser(req, res){
    const userId= req.params.id;
    const update = req.body;

    //borrar propiedad de usuario
    delete update.password;

    if(userId !== req.user.sub){
        return res.status(403).send({message: 'No tienes permiso para actualizas los datos del usuario'});
    } 

    try{
        const userUpdated = await User.findByIdAndUpdate(userId, update, {new:true});

        if (!userUpdated) {
            return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

        }

        return res.status(200).send({ user: userUpdated});
    } catch (error) {
        console.error (error);
        return res.status(500).send({message: 'Error en la petición'});
    }

    }

    
    //Subir archivos de imagen/avatar de usuario
    // function uploadImage(req,res){
    //     var userId = req.params.id;

    //     if(userId != req.user.sub){
    //         return res.status(500).send({message: 'No tienes permiso para actualizar la imagen'});
    //     }

    //     if(req.files){
    //         var file_path = req.files.image.path;
    //         console.log(file_path);
    //         var file_split = file_path.split('\\');
    //     }
    // }

    function RemoveFilesOfUploads(res, file_path, message){
        const fs = require('fs');

        fs.unlink(file_path, (err) =>{
            if (err){
                console.error('Error al eliminar el archivo', err);
            }
            
        });

        res.status(500).send({message: message});
    }


    async function uploadImage(req,res){
        var userId = req.params.id;
        if(req.file){
            console.log(req.file);
            var file_path = req.file.path;
            console.log(file_path)
            var file_split = file_path.split('\\');
            console.log(file_split);
            var file_name = file_split[2];
            console.log(file_name);
            var ext_split = req.file.originalname.split('\.');
            var file_ext = ext_split[1].toLowerCase();
            console.log(file_ext);

            if(userId !=req.user.sub){
                return RemoveFilesOfUploads(res, file_path, 'No tienes permiso para actualizar este dato');
                //return res.status(500).send({message: 'No tienes permiso para actualizar los datos de este usuario'});
            }
            if(file_ext =='png'|| file_ext == 'gif' || file_ext == 'jpg' ){
                try{
                    const userUpdated = await User.findByIdAndUpdate(userId,{image:file_name}, {new:true});
                    if (!userUpdated){
                        return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                    }
                    console.log(file_path);
                       return res.status(200).send({user: userUpdated});
            
                }catch (error){
                    return res.status(500).send({message: 'Error en la petición'});

                } 
                }else{
                    return RemoveFilesOfUploads(res, file_path, 'Extensión del archivo no valida');
                        
                }
                  
            }else{
            res.status(200).send({message: 'No has subido ninguna imagen..'});
        }
    }
  

      function getImageFile(req,res){
        var image_file = req.params.imageFile;
        var path_file = './uploads/users/'+ image_file;

        fs.exists(path_file, (exists) => {
            if(exists){
                res.sendFile(path.resolve(path_file));
            }else{
                res.statys(200).send({message: 'No existe la imagen'});
            }
        });
      }

module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    uploadImage,
    getImageFile,
};


    
            
          
