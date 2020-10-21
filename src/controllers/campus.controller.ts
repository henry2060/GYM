import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Campus, City, Users } from '../interface/gym.interface'

export async function getCampus(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn = await connect();
        const users = await conn.query('SELECT * FROM campus');
        return res.json(users[0]);
    }
    catch (e) {
        console.log(e)
    }
}

export async function createCampus(req: Request, res: Response) {
    const newCampus: City = req.body;
    try{
        const conn = await connect();
        await conn.query('INSERT INTO campus SET ?', [newCampus]);
        res.json({
            message: 'New campus Created'
        });
    }catch(e){
        return res.status(500).json({
            message: 'internal derver error'
        })
    }
}

export async function getCamp(req: Request, res: Response) {
    const id = req.params.campusId;
    try{
        const conn = await connect();
        const users = await conn.query('SELECT * FROM campus WHERE idcampus = ?', [id]);
        res.json(users[0]);
    }catch(e){
        return res.status(500).json({
            message: 'internal derver error'
        })
    }
}

