export const features = {
  sounds: true,
  introWave: false,
};

export const isFeatureEnabled = (feature: keyof typeof features) => {
  return features[feature];
};
