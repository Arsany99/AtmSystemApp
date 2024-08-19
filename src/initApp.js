import dotenv from "dotenv"
dotenv.config()
import connectionDB from "../db/connectionDB.js"
import { AppError } from "./utils/classError.js"
import { globalErrorHandling } from "./utils/globalErrorHandling.js"
import * as routers from '../src/modules/index.routes.js'

export const initApp=(app,express)=>{
    const port = process.env.PORT || 3001

app.use(express.json())


app.use('/users' , routers.userRouter)
app.use('/account' , routers.accountRouter)




connectionDB()


app.use("*" , (req ,res , next)=>{
    //res.status(404).json({msg:'page not dound'})
    return next(new AppError(`invalid url ${req.originalUrl}`,404))
})
app.use(globalErrorHandling)




app.listen(port, () => console.log(`Example app listening on port ${port}!`))

}