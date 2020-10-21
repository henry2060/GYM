import { Router } from 'express'
import { getUsers, createUser, getUser, login, getUserByCity} from '../controllers/user.controller'
import { getCities, createCity, getCity } from '../controllers/city.controller'
import { getCampus, createCampus, getCamp } from '../controllers/campus.controller'

const router = Router();

router.route('/users')
    .get(getUsers)
    .post(createUser)

router.route('/users/:userId')
    .get(getUser)

router.route('/usersBy/:iduser')
    .get(getUserByCity)


router.route('/login')
    .put(login)

router.route('/city')
    .get(getCities)
    .post(createCity)

router.route('/city/:cityId')
    .get(getCity)

router.route('/campus')
    .get(getCampus)
    .post(createCampus)

router.route('/campus/:campusId')
    .get(getCamp)

export default router;