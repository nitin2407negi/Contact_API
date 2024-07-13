import { Contact } from "../Models/Contact.js";
//get all contact
export const getAllContact = async (req, res) => {
    const usercontact = await Contact.find()
    if (!usercontact) return res.status(404).json({ message: "no contact found", usercontact });
    res.json({ message: "contact fetched", usercontact });
}

//get specific contact

export const getContactbyId = async (req, res) => {
    const id = req.params.id;
    const usercontact = await Contact.findById(id)
    if (!usercontact) return res.status(404).json({ message: "no contact found", usercontact });
    res.json({ message: "contact fetched", usercontact });

}

//add  New contact

export const addContact = async (req, res) => {
    const { name, email, phone, type } = req.body
    if (name == ' ' || email == ' ' || phone == ' ' || type == ' ') return res.status(400).json({ message: "all field are required" });

    const saveContact = await Contact.create({
        name, email, phone, type,user:req.user
    });
    res.json({ message: "contact saved succesfully", saveContact });
}

//update Contact

export const updateContact = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, type } = req.body;
    const updatecontact = await Contact.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        type,

    }, { new: true })
    if (!updatecontact) return res.status(404).json({ message: "no contact found" })

    res.json({ message: "contact found updated succesfully", updatecontact })
}

//delete contact

export const deleteContact = async (req, res) => {
    const id = req.params.id;
    const deletecontact = await Contact.findByIdAndDelete(id);

    if (!deletecontact) return res.status(404).json({ message: "contact not exist" })
    res.json({ message: "contact deleted succesfully", deletecontact })
}

//get contact by userid

export const getContactbyUserId=async(req,res)=>{
    const id=req.params.id;
    let contact=await Contact.find({user:id})
    if(!contact) return res.status(404).json({message:"contact not founf"})
        res.json({message :"user specific contact ",contact})
}