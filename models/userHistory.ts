import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../connection'; 

export interface HoroscopeHistoryAttributes {
  id?: number;
  userId: number;
  zodiac: string;
  date: string;
  horoscope: string;
}

export interface HoroscopeHistoryCreationAttributes extends Optional<HoroscopeHistoryAttributes, 'id'> {}

export class HoroscopeHistory extends Model<HoroscopeHistoryAttributes, HoroscopeHistoryCreationAttributes>
  implements HoroscopeHistoryAttributes {
  public id!: number;
  public userId!: number;
  public zodiac!: string;
  public date!: string;
  public horoscope!: string;
}

HoroscopeHistory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field : 'user_id',
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
  },
  {
    sequelize,
    tableName: 'user_history',
    timestamps: false,
     indexes: [
      {
        unique: true,
        fields: ['user_id', 'date'],
      },
    ],
  }
);
