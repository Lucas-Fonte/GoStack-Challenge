import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO } from 'date-fns';
import File from '../models/File';
import User from '../models/User';

import Meeting from '../models/Meeting';

class SubscribingController {
    async index(req, res) {
        const { date, page = 1 } = req.query;

        const parsedDate = parseISO(date);

        const meetings = await Meeting.findAll({
            where: {
                user_id: { [Op.ne]: req.userId },
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
                }
            },
            limit: 10,
            offset: (page - 1) * 10,
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
