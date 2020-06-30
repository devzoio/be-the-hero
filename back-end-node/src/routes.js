const express = require('express');

const routes = express.Router();

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const { celebrate, Segments, Joi } = require('celebrate');

/**  
 * Tipos de parâmetros:
 * 
 * Query: ?name=Jeferson (filtros, paginação)
 * Route: :id (identifica recursos únicos)
 * Body: const params = req.query | req.params (route) | req.body.corpo da requisição (recebendo dados do formulário - criar e alterar, sempre enviar no formato JSON)
*/


/* criar uma ong */
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(), 
        email: Joi.string().required().email(), 
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.post);

/** lista todas as ongs */
routes.get('/ongs', OngController.get);

/** 
 * Incidents
 * 
 * Postar
 * Listar Todos
 * Listar um Incident
 * Editar um Incident
 * Deletar um Incident
*/
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(), 
        description: Joi.string().required(), 
        value: Joi.number().required()
    })
}), IncidentController.post);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.get);

routes.get('/incident/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.getUnique);

routes.put('/incidents/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(), 
        description: Joi.string().required(), 
        value: Joi.number().required()
    })
}), IncidentController.put);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);


//acessa uma ONG específica através do ID e authorization
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.get);

//realiza a conexão com a conta
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}), SessionController.post);

module.exports = routes;