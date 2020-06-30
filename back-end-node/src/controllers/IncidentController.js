const connection = require('../database/connection');

module.exports = {
    async post(req, res) {
        const { title, description, value } = req.body;
        //cabeçalho da requisição (localização, idioma, etc.. autenticação)
        const ong_id = req.headers.authorization;
       
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id });
    },

    async get(req, res) {
        const { page = 1 } = req.query

        const [count] = await connection('incidents')
            .count()

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])

        res.header('X-Total-Count', count['count(*)'])
        
        return res.json(incidents);
    },

    async getUnique(req, res) {
        const { id } = req.params;

        const incident = await connection('incidents')
            .where('id', id)
            .select('*')

        return res.json(incident);  
    },

    async put(req, res) {
        const { id } = req.params;

        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        
        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.' })
        }

        const { title, description, value } = req.body;

        await connection('incidents')
            .where('id', id)
            .update({
                title: req.body.title,
                description: req.body.description,
                value: req.body.value
            }, ['id', 'title', 'description', 'value']);

        return res.status(204).send();
    },

    async delete(req, res) {
        const { id } = req.params;

        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted.' })
        }

        await connection('incidents').where('id', id).delete()

        return res.status(204).send()
    }
}