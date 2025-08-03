import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('user_history', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      zodiac: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      horoscope: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });


    await queryInterface.addIndex('user_history', ['user_id', 'date'], {
      name: 'user_date_unique_index',
      unique: true,
    });
  },

  async down(queryInterface: QueryInterface) {

    await queryInterface.removeIndex('user_history', 'user_date_unique_index');

    await queryInterface.dropTable('user_history');
  },
};
