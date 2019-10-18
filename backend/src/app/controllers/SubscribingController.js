import Sequelize from 'sequelize';
import File from '../models/File';
import User from '../models/User';

import Meeting from '../models/Meeting';

class SubscribingController {
    async index(req, res) {
        const { Op } = Sequelize;
        const meetings = await Meeting.findAll({
            where: {
                user_id: { [Op.ne]: req.userId },
                canceled_at: null
            },
            limit: 10,
            order: ['date'],
            attributes: ['id', 'title', 'description', 'location', 'date'],
            include: [
                {
                    model: File,
                    as: 'banner',
                    attributes: ['id', 'path', 'url']
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                }
            ]
        });

        return res.json(meetings);
    }
}

export default new SubscribingController();
