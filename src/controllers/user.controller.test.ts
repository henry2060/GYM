import { Request, Response } from 'express'
import { connect } from '../database'
import { Users, Login } from '../interface/gym.interface'
import { getUsers, createUser, getUser, login, getUserByCity} from '../controllers/user.controller'
import { createRequest, createResponse } from 'node-mocks-http'

describe('CertificadosCAMController', () => {
     
    const mockOptions = {
        host: 'localhost',
        user: 'root',
        database: 'no_pain_no_gain_gym',
        password: 'henry2020',
        onnectionLimit: 10
    }
    test('getUsers', async () => {
        const body={}
        const req = createRequest({
            body,
            method: 'POST',
            url: `/perfilCliente/v1/claveVirtual/validacion`,
          })
          const res = createResponse()
        getUser(req,res).then((data) => {
            expect(data).toBeTruthy();
        });


    

    })
  
  })
  