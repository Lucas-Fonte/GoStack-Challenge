import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Meeting from '../models/Meeting';
import File from '../models/File';
import User from '../models/User';

class MeetingController {
    async index(req, res) {
        const { id } = req.query;
        if (id) {
            const result = await Meeting.findOne({
                where: { id },
                attributes: ['id', 'title', 'description', 'location', 'date'],
                include: [
                    {
                        model: File,
                        as: 'banner',
                        attributes: ['name', 'path', 'url']
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name']
                    }
                ]
            });

            return res.json(result);
        }

        const meetings = await Meeting.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null
            },
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

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required(),
            banner_id: Yup.number()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        const { title, description, location, date, banner_id } = req.body;

        const hourStart = startOfHour(parseISO(date));

        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ error: 'Past dates are not permitted' });
        }

        const checkAvailability = await Meeting.findOne({
            where: {
                title,
                canceled_at: null,
                date: hourStart
            }
        });

        if (checkAvailability) {
            return res
                .status(400)
                .json({ error: 'Meeting date is not available' });
        }

        const meeting = await Meeting.create({
            user_id: req.userId,
            title,
            description,
            location,
            date,
            banner_id
        });

        return res.json(meeting);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string(),
            location: Yup.string(),
            date: Yup.date()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        const meeting = await Meeting.findOne({
            where: { title: req.body.title }
        });

        const {
            id,
            title,
            description,
            location,
            banner_id
        } = await meeting.update(req.body);

        return res.json({
            id,
            title,
            description,
            location,
            banner_id
        });
    }
}

export default new MeetingController();
