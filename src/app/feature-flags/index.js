const LocalConfig = require('./local');
const DevConfig = require('./dev');
const QaConfig = require('./qa');
const UatConfig = require('./uat');
const ProductionConfig = require('./production');

const localConfig = new LocalConfig();
const devConfig = new DevConfig();
const qaConfig = new QaConfig();
const uatConfig = new UatConfig();
const productionConfig = new ProductionConfig();

const get = (env) => {
  switch(env) {
    case 'dev': return devConfig;
    case 'qa': return qaConfig;
    case 'uat': return uatConfig;
    case 'production': return productionConfig;
    default: return localConfig;
  }
};

const getAll = () => {
  const local = get('local');
  const dev = get('dev');
  const qa = get('qa');
  const uat = get('uat');
  const production = get('production');
  const flags = Object.keys({ ...local, ...dev, ...qa, ...uat, ...production });

  return {
    local,
    dev,
    qa,
    uat,
    production,
    flags
  };
};

module.exports.get = get;
module.exports.getAll = getAll;
