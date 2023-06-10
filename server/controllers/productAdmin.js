const { Product, Image, Category, User } = require('../models');
const { sequelize } = require('../models');
class ControllerProductAdmin {
  static async getAllProduct(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt', 'role'],
            },
          },
          {
            model: Category,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Image,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      });

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
  static async getTotal(req, res, next) {
    try {
      console.log('masuk sini a');
      const productsCount = await Product.count();
      const categoryCount = await Category.count();
      res
        .status(200)
        .json({ totalProduct: productsCount, totalCategory: categoryCount });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const productId = await Product.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt', 'role'],
            },
          },
          {
            model: Category,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
          {
            model: Image,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
      });
      if (!productId) {
        throw { name: 'not found product' };
      }
      res.status(200).json(productId);
    } catch (err) {
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    const trx = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, categoryId, images } =
        req.body;
      const message = [];
      if (!name) {
        message.push({ type: 'name', message: 'name is required' });
      }
      if (!description) {
        message.push({
          type: 'description',
          message: 'description is required',
        });
      }
      if (!price) {
        message.push({ type: 'price', message: 'price is required' });
      }
      if (!mainImg) {
        message.push({ type: 'mainImg', message: 'main image is required' });
      }
      if (!categoryId) {
        message.push({ type: 'category', message: 'category is required' });
      }
      if (message.length) {
        throw { name: 'bad request', message: message, code: 400 };
      }
      const productCrated = await Product.create(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
          authorId: req.admin.id,
        },
        {
          transaction: trx,
        }
      );

      if (images?.filter((el) => el)?.length) {
        const putImage = images.map((el) => {
          return { imgUrl: el, productId: productCrated.id };
        });
        await Image.bulkCreate(putImage, { transaction: trx, validate: true });
      }
      res.status(201).json({ message: 'successfully add product' });
      await trx.commit();
    } catch (err) {
      console.log(err, '<=== ini errornya');
      await trx.rollback();
      next(err);
    }
  }

  static async editProduct(req, res, next) {
    const trx = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, categoryId, images } =
        req.body;
      const { productId } = req.params;
      const singleProduct = await Product.findByPk(productId);

      if (!singleProduct) {
        throw { name: 'not found product' };
      }

      await Product.update(
        {
          name,
          description,
          price,
          mainImg,
          categoryId,
        },
        {
          transaction: trx,
          where: {
            id: productId,
          },
          hooks: true,
        }
      );
      if (images?.filter((el) => el)?.length) {
        await Image.destroy({
          where: {
            productId,
          },
          transaction: trx,
        });
        const putImage = images.map((el) => {
          return { imgUrl: el, productId };
        });
        await Image.bulkCreate(putImage, { transaction: trx, validate: true });
      }

      await trx.commit();
      res.status(200).json({ message: 'successfully update product' });
    } catch (err) {
      console.log(err, '<===');
      await trx.rollback();
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    const trx = await sequelize.transaction();
    try {
      const { productId } = req.params;
      console.log('masuk sini?');
      const singleProduct = await Product.findByPk(productId);
      if (!singleProduct) {
        throw { name: 'not found product' };
      }
      await Product.destroy({
        where: {
          id: productId,
        },
        transaction: trx,
      });
      res.status(200).json({ message: 'successfully delete data' });
      await trx.commit();
    } catch (err) {
      await trx.rollback();
      next(err);
    }
  }
}

module.exports = ControllerProductAdmin;
