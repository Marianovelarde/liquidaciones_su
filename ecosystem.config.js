module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npx",
      args: "serve -s dist --single -l 5173",
      cwd: "C:/Users/informatica/Desktop/proyectos/liquidaciones_su/client",
      interpreter: "none",
    },
  ],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
