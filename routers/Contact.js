import express from 'express'
import { addContact, deleteContact, getAllContact, getContactbyId, getContactbyUserId, updateContact } from '../controllers/Contact.js'
import { Authenticate } from '../Middlewares/Auth.js';
const router = express.Router()

//get all contact
router.get('/', getAllContact);

//get contact by id
router.get('/', getContactbyId);


//add contact
router.post('/add', Authenticate,addContact)

//update contact
router.put('/:id',Authenticate,updateContact)

//delete contact
router.delete('/:id',Authenticate, deleteContact)

//contact by userId
router.get('/userId/:id',getContactbyUserId)


export default router;