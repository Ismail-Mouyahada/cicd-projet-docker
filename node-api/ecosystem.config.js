module.exports = {
  apps: [
    {
      name: 'server',
      script: './index.js',
      env_production: {
        NODE_ENV: 'production',
        PORT: 80,
      },
      exec_mode: 'cluster',
      instances: 0,
    },
  ],
};
