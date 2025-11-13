export const features = {
  sounds: false,
  introWave: false,
};

export const isFeatureEnabled = (feature: keyof typeof features) => {
  return features[feature];
};
