import jwt from "jsonwebtoken"

function JwtGuard(enviado,resposta,next){
    const authorization = enviado.headers.authorization;
    if(!authorization) 
        return resposta.status(401).json({message: "Token não informado"});
    const[prefix,token] = authorization.split(" ")
    if(prefix !== "Bearer")
        return resposta.status(401).json({message: "Token mal informado"});
    try{
        const decoded = jwt.verify(token, "secret");
        console.log(token)
        enviado.loja = decoded;
        next()
    }
    catch (e){
        resposta.status(401).json({message: e.message})
    }
}

export default JwtGuard