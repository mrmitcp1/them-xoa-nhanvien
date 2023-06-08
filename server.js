const express = require('express');
const app = express();
const port = 3333;
const multer = require('multer');
const upload = multer();

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/',(req, res)=>{
    res.render('create')
})
let count = 0
const employees =[];
app.post('/view', upload.none(),(req, res)=>{
    if (req.body.name && req.body.department){
        const employee = {
            id : count++,
            name : req.body.name,
            department: req.body.department
        }
        employees.push(employee)
        res.render('view',{data:employees})
    }
})

app.get('/delete',(req,res)=>{
    let id = req.query.id
    if (id){
       let index =  employees.findIndex(item=>item.id===+id)
        if (index !== -1){
            employees.splice(index,1)
            res.render('view',{data:employees})
        }
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})