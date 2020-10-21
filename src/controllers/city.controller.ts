import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Campus, City, Users } from '../interface/gym.interface'

export async function getCities(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const users = await conn.query('SELECT * FROM users');
        return res.json(users[0]);
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            message: 'internal derver error'
        })
    }
}

export async function createCity(req: Request, res: Response) {
    const newCity: City = req.body;
    try{
        const conn = await connect();
        await conn.query('INSERT INTO cities SET ?', [newCity]);
        res.json({
            message: 'New city Created'
        });
    }catch(e){
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}

export async function getCity(req: Request, res: Response) {
    const id = req.params.cityId;
    try{
        const conn = await connect();
        const users = await conn.query('SELECT * FROM cities WHERE idcity = ?', [id]);
        res.json(users[0]);
    }catch(e){
        return res.status(500).json({
            message: 'internal server error'
        })
    }
    
}
