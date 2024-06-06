const CBMRepository = require("../services/CBMRepository");
//Read -> Lê todas as ocorrências da Base de dados
exports.listAllOccurrences = async (req, res) => {
    try{
        const occurence = await CBMRepository.listAllOccurrences();
        res.status(200).json(occurence);
    }catch(err){
        res.status(500).json({ error: err.toString()}, "ERRO INTERNO DO SERVER");
    }
}

//Create -> Cria uma nova ocorrência
exports.createOccurrence = async(req, res) =>{
    try {
        const occurence = await CBMRepository.createOccurrence(req.body);
        res.status(201).json(occurence)
    } catch (error) {
        res.status(500).json({ error: err.toString()}, "ERRO INTERNO DO SERVER");
    }
}

//Update -> Atualiza ocorrências ja criadas pelo id
exports.updateOccurrence = async (req, res) => {
    try{
        //await = assíncrono (instanciar em conjunto com o de cima)
        const occurence = await CBMRepository.updateOccurrence(req.params.id, req.body);
        if(!occurence){
            res.status(404).json({ error: 'User não encontrado'});   
        }else{
            res.status(200).json(occurence);
        }
        
    }catch(err){
        res.status(500).json({ error: err.toString()});
    }
}
//Delete -> deleta ocorrências pelo id
exports.deleteOccurrence = async (req, res) => {
    try{
        const occurence = await CBMRepository.deleteOccurrence(req.params.id);

console.log(occurence);

        if(occurence===null){
            res.status(404).json({ error: 'Ocorrência não encontrada'});   
        }else{
            res.status(200).json({msg: 'Ocorrência deletado com sucesso'});
        }
        
    }catch(err){
        res.status(500).json({ error: err.toString()});
    }
};
//Read -> busca ocorrencia pelo id
exports.getOccurrenceById = async (req, res) => {
    try{
        //await = assíncrono (instanciar em conjunto com o de cima)
        const occurence = await CBMRepository.getOccurrenceById(req.params.id);
        if(!occurence){
            res.status(404).json({ error: 'Ocorrencia não encontrada'});
        }else{
            res.status(200).json(occurence);
        }
    }catch(err){
        res.status(500).json({ error: err.toString()});
    }
};


// A fazer
// entender melhor a implementação da logica
// criar pasta database
//testar todos os metodos (create/read/update/delete)