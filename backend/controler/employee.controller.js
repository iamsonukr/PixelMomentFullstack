import Employee from '../models/employee.model.js'


const getAllEmployees=async(req,res)=>{
    try {
        const employees=await Employee.find({})
        return res.status(200).send({success:true,data:employees})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:"Error fetching employees"})
    }
}
const getSinpleEmp=async(req,res)=>{
    const {id}=req.params
    try {
        const employees=await Employee.findById(id)
        return res.status(200).send({success:true,data:employees})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:"Error fetching employees"})
    }
}

const createEmployee=async(req,res)=>{
    const newEmployee= new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        dateOfBirth:req.body.dateOfBirth,
        address:req.body.dateOfBirth,
        skills:req.body.dateOfBirth,
        
    })
    await newEmployee.save()
    return res.send({success:true,message:"User Created Successfully"})
}

const updateEmployee = async (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        return res
          .status(404)
          .send({ success: false, message: "Employee not found" });
      }
  
      employee.name = req.body.name || employee.name;
      employee.email = req.body.email || employee.email;
      employee.phone = req.body.phone || employee.phone;
      employee.dateOfBirth = req.body.dateOfBirth || employee.dateOfBirth;
      employee.address = req.body.address || employee.address;
      employee.skills = req.body.skills || employee.skills;
  
      await employee.save();
      return res
        .status(200)
        .send({ success: true, message: "Employee updated successfully!" });
    } catch (error) {
      console.error("Error updating employee:", error);
      return res
        .status(500)
        .send({ success: false, message: "Employee update failed" });
    }
  };
  

const removeEmployee=async(req,res)=>{
    const id=req.params.id
    try {
        const deletedEmp=await Employee.findByIdAndDelete({id})
        return res.status(200).send({success:true,message:"Employee deleted successfully!"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:"Employee deletion failed"})
    }
}

export {removeEmployee,updateEmployee,getAllEmployees,createEmployee,getSinpleEmp}