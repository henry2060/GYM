import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Users, Login } from '../interface/gym.interface'

export async function getUsers(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const users = await conn.query('SELECT * FROM users');
        return res.status(200).json(users[0]);
    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            message: 'internal server error'
        });
    }
}

export async function createUser(req: Request, res: Response) {
    const newUser: Users = req.body;
    const conn = await connect();
    try{
        const islogged = await conn.query('SELECT loginstate from users where identification = ?',[newUser.numId]);
        const resultArray = JSON.parse(JSON.stringify(islogged));
        if (resultArray[0] != undefined && resultArray[0] != '') {
            if (resultArray[0][0] > 0){
                newUser.isLogged = true;
                newUser.isEmployee = true;
            }
        }else{ newUser.keyword = null;
            newUser.isLogged = false;
                newUser.isEmployee = false;}
        const query = 'CALL create_user (?, ?, ?, ?, ?, ?, ?, ? ,@message,@estate)'
        await conn.query(query,
            [newUser.campus,newUser.numId,newUser.documentType,newUser.keyword,newUser.firstName,newUser.lastName,
           newUser.isEmployee,newUser.isLogged]); 
        const response = await conn.query('SELECT @message,@estate');
        res.status(200).json({
            message: response[0]
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'internal server error'
        });
    }
    
}

export async function login(req: Request, res: Response) {
    const newUser: Login = req.body;
    const conn = await connect();
    try{
        const islogged = await conn.query('SELECT identification from users where identification = ? AND pass = ?',[newUser.numId, newUser.keyword]);
        const resultArray = JSON.parse(JSON.stringify(islogged));
        console.log(resultArray[0][0]);
        if (resultArray[0] != undefined && resultArray[0] != '') {
            if (resultArray[0][0].identification){
                await conn.query('UPDATE users SET loginstate = true WHERE identification = ?', [newUser.numId]);
                res.status(200).json({
                    message: 'login succesful'
            });}
        }else{
        res.status(200).json({
            message: 'verify password or identification'
        });
    }
    }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'internal server error'
        });
    }
    
}

export async function getUser(req: Request, res: Response) {
    const id = req.params.userId;
    const conn = await connect();
    const users = await conn.query('SELECT * FROM users WHERE iduser = ?', [id]);
    res.json(users[0]);
}

export async function deleteUser(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM users WHERE iduser = ?', [id]);
    res.json({
        message: 'user deleted'
    });
}

export async function updateUser(req: Request, res: Response) {
    const id = req.params.postId;
    const updateUser: Users = req.body;
    const conn = await connect();
    await conn.query('UPDATE users set ? WHERE iduser = ?', [updateUser, id]);
    res.json({
        message: 'user Updated'
    });
}

export async function getUserByCity(req: Request, res: Response) {
        const id = req.params.iduser;
        try{
            const conn = await connect();
            const users = await conn.query(
                'SELECT users.firstname, users.lastname, campus.campusname, cities.cityname '+
                'FROM users INNER JOIN campus ON users.idcampus = campus.idcampus '+
                'INNER JOIN cities ON cities.idcity = campus.idcity '+
                'WHERE users.identification = ?',[id]);
            console.log(users)
            res.json(users[0]);
        }catch(e){
        console.log(e);
        res.status(500).json({
            message: 'internal server error'
        });
    }
        
}
