export const features = {
  sounds: true,
  introWave: true,
};

export const isFeatureEnabled = (feature: keyof typeof features) => {
  return features[feature];
};
