module.exports = {
  apps: [
    {
      name: "cocktail-api",
      script: "./build/server.js",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
    },
  ],
};
