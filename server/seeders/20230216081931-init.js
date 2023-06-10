'use strict';

const { hashPassword } = require('../helpers/bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = [
      {
        username: 'bisma',
        password: hashPassword('bisma'),
        email: 'bisma@gmail.com',
        dateOfBirth: '2001-08-23',
        firstName: 'Gusti',
        lastName: 'Bisman',
        role: 'admin',
        phoneNumber: '082298380750',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const categories = [
      {
        name: 'Sedan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hatchback',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'SUV',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Crossover',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Coupe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Convertible',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Minivan',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pickup truck',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Electric Vehicle',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sports Car',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const products = [
      {
        name: 'Honda Civic',
        slug: 'Honda-Civic',
        description:
          'The Honda Civic is a popular compact sedan known for its reliability, fuel efficiency, and practicality. It offers comfortable seating for up to five passengers and a spacious trunk for cargo storage.',
        price: 21700,
        mainImg:
          'https://media.ed.edmunds-media.com/honda/civic/2023/oem/2023_honda_civic_sedan_si_fq_oem_1_815.jpg',
        categoryId: 1,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Volkswagen Golf',
        slug: 'Volkswagen-Golf',
        description:
          'The Volkswagen Golf is a versatile and compact hatchback known for its refined driving experience and practicality. It offers a comfortable seating for up to five passengers and a flexible cargo space with a rear hatch that provides easy access.',
        price: 23195,
        mainImg:
          'https://images.autofun.co.id/file1/15d9e1c6a87c426c92e9dca14b177873_1125x630.jpg',
        categoryId: 2,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ford Focus',
        slug: 'Ford-Focus',
        description:
          'The Ford Focus is a compact hatchback known for its practicality and engaging driving dynamics. It offers seating for up to five passengers and a versatile cargo area with a rear hatch for easy loading and unloading.',
        price: 20540,
        mainImg:
          'https://www.motortrend.com/uploads/sites/10/2017/10/2018-ford-focus-se-sedan-angular-front.png',
        categoryId: 2,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Toyota Corolla Hatchback',
        slug: 'Toyota-Corolla-Hatchback',
        description:
          'The Toyota Corolla Hatchback is a compact and reliable hatchback known for its fuel efficiency and practicality. It offers comfortable seating for up to five passengers and a versatile cargo space with a rear hatch that allows for easy loading and unloading.',
        price: 20465,
        mainImg:
          'https://media.cnn.com/api/v1/images/stellar/prod/220331153038-02-toyota-gr-corolla.jpg?c=16x9',
        categoryId: 2,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Categories', categories, {});
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  },
};
