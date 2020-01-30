import models, { sequelize } from './index';

const createUsersWithFiles = async () => {
  await models.User.create(
    {
      authId: 'sameer',
      files: [
        {
          vaultname: 'Published the Road to learn React',
          link: '382831'
        },
      ],
    },
    {
      include: [models.File]
    }
  );

  await models.User.create(
    {
      authId: 'ddavids',
      files: [
        {
          vaultname: 'nsa hack',
          link: '832930'
        },
        {
          vaultname: 'secret files',
          link: '930232'
        },
      ],
    },
    {
      include: [models.File]
    },
  );
};

export default createUsersWithFiles