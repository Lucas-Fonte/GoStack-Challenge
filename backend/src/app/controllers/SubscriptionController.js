import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import File from '../models/File';
import User from '../models/User';
import Meeting from '../models/Meeting';
import Mail from '../../lib/Mail';

class SubscriptionController {
    async index(req, res) {
        const subscriptions = await Subscription.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null
            },
            attributes: ['id', 'user_id', 'meeting_id'],
            include: [
                {
                    model: Meeting,
                    as: 'meeting',
                    attributes: [
                        'id',
                        'title',
                        'description',
                        'location',
                        'date',
                        'user_id',
                        'banner_id'
                    ],
                    where: {
                        date: { [Op.gt]: new Date() }
                    },
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
                }
            ],
            order: [[{ model: Meeting, as: 'meeting' }, 'date']]
        });

        return res.json(subscriptions);
    }

    async store(req, res) {
        const { meeting_id } = req.body;

        const thisMeeting = await Meeting.findByPk(meeting_id, {
            include: [
                {
                    model: User,
                    as: 'user'
                }
            ]
        });

        if (thisMeeting.user_id === req.user_id) {
            return res
                .status(400)
                .json({ error: 'Cannot subscribe to meetups you organize' });
        }

        const subscriptionExists = await Subscription.findOne({
            where: {
                user_id: req.userId,
                meeting_id
            }
        });

        if (subscriptionExists) {
            return res.status(400).json({ error: 'Subscription already done' });
        }

        const meetingsTime = await Subscription.findAll({
            where: {
                user_id: req.userId
            },
            include: {
                model: Meeting,
                as: 'meeting',
                attributes: ['date']
            }
        });

        const currentMeetingsTime = meetingsTime.map(meetup =>
            String(meetup.meeting.date)
        );

        const isMeetingTaken = currentMeetingsTime.find(
            meetingTime => meetingTime === String(thisMeeting.date)
        );

        if (isMeetingTaken) {
            return res.status(400).json({
                error:
                    'Cannot subscribe to two meetings happening at the same time'
            });
        }

        const subscription = await Subscription.create({
            user_id: req.userId,
            meeting_id
        });

        const thisUser = await User.findByPk(req.userId);

        await Mail.sendMail({
            to: `${thisMeeting.user.name} <${thisMeeting.user.email}>`,
            subject: 'Inscrição realizada',
            template: 'subscription',
            context: {
                host: thisMeeting.user.name,
                title: thisMeeting.title,
                user: thisUser.name,
                email: thisUser.email,
                date: thisMeeting.date
            }
        });

        return res.json(subscription);
    }

    async delete(req, res) {
        const { meeting_id } = req.body;

        const subscription = await Subscription.findOne({
            where: {
                user_id: req.userId,
                meeting_id
            }
        });

        if (!subscription) {
            return res.status(400).json({ error: 'Could not finding meeting' });
        }

        await subscription.destroy();

        return res.json({ subscription });
    }
}

export default new SubscriptionController();
