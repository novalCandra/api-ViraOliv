import express from "express";
const app = express()
const port = 3001

app.use("/", (req, res) => {
    res.send('API VIRAOLIV Update')
})

app.listen(port, () => {
    return console.log(`BACK END BERJALAN FOR PORT : ${port}`)
})