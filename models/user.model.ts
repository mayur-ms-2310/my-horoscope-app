import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../connection';
import crypto from 'node:crypto'

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  birthdate: string;
  zodiacSign : string
}


export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public birthdate!: string;
  public zodiacSign! : string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value : string){
      this.setDataValue('password',crypto.pbkdf2Sync(value, "SECRETSALT1234", 60, 64, "sha256").toString('hex'))
      }
    },
    birthdate: {
      type: DataTypes.STRING,
      field: 'birth_date',
      allowNull: false,
    },
    zodiacSign: {
      type: DataTypes.STRING,
      field: 'zodiac_sign',
      allowNull: false, 
    }
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
  }
);
