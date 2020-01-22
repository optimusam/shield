import models, { sequelize } from './index';

const createUsersWithFiles = async () => {
  await models.User.create(
    {
      username: 'sameer',
      password: 'password',
      files: [
        {
          filename: 'Published the Road to learn React',
          link: '382831'
        },
      ],
    },
    {
      include: [models.File]
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      password: 'noname',
      files: [
        {
          filename: 'nsa hack',
          link: '832930'
        },
        {
          filename: 'secret files',
          link: '930232'
        },
      ],
    },
    {
      include: [models.File]
    },
  );
  sequelize.close();
};

export default createUsersWithFiles