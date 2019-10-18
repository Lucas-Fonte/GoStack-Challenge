import Sequelize, { Model } from 'sequelize';

class Subscription extends Model {
    static init(sequelize) {
        super.init(
            {
                user_id: Sequelize.NUMBER
            },
            {
                sequelize
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Meeting, {
            foreignKey: 'meeting_id',
            as: 'meeting'
        });
    }
}

export default Subscription;
